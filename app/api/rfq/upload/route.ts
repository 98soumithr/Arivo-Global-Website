import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { ALLOWED_CONTENT_TYPES, FILE_TYPES, MAX_FILE_BYTES, extensionOf } from '@/lib/rfq';
import { clientIp, rateLimited } from '@/lib/rate-limit';

/**
 * Issues client-upload tokens so drawings go browser → Vercel Blob directly.
 * Route-handler request bodies are capped at 4.5 MB on Vercel; drawings can be 25 MB.
 */
export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'File upload is not configured.' }, { status: 503 });
  }
  if (rateLimited(`upload:${clientIp(request.headers)}`, 12, 10 * 60_000)) {
    return NextResponse.json({ error: 'Too many uploads. Please try again in a few minutes.' }, { status: 429 });
  }

  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith('rfq/') || !(extensionOf(pathname) in FILE_TYPES)) {
          throw new Error('File type not accepted');
        }
        return {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: MAX_FILE_BYTES,
          addRandomSuffix: true,
          validUntil: Date.now() + 15 * 60_000,
        };
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
