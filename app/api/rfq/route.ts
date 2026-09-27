import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { MIN_ELAPSED_MS, type RfqField, type RfqResult } from '@/lib/rfq';
import { rfqSchema } from '@/lib/rfq-schema';
import { clientIp, rateLimited } from '@/lib/rate-limit';
import { getProduct } from '@/lib/content';
import { site } from '@/content/site';

const isProd = process.env.NODE_ENV === 'production';
// Cloudflare's documented always-pass test secret, used only outside production.
const TURNSTILE_TEST_SECRET = '1x0000000000000000000000000000000AA';

const json = (body: RfqResult, status = 200) => NextResponse.json(body, { status });

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY || (isProd ? '' : TURNSTILE_TEST_SECRET);
  if (!secret) return false;
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const isBlobUrl = (url: string) => {
  try {
    const u = new URL(url);
    return u.protocol === 'https:' && u.hostname.endsWith('.blob.vercel-storage.com');
  } catch {
    return false;
  }
};

export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  if (rateLimited(`rfq:${ip}`, 5, 10 * 60_000)) {
    return json({ ok: false, error: 'Too many enquiries from this connection. Please try again in a few minutes, or email us.' }, 429);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: 'The enquiry could not be read.' }, 400);
  }

  // 1. Validate
  const parsed = rfqSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<RfqField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as RfqField;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return json({ ok: false, error: 'Please correct the highlighted fields.', fieldErrors }, 422);
  }
  const data = parsed.data;

  // 2. Honeypot and minimum elapsed time — silently accept bots rather than teach them.
  if (data.website || Date.now() - data.startedAt < MIN_ELAPSED_MS) return json({ ok: true });

  // 3. Turnstile, server-side
  if (!(await verifyTurnstile(data.token, ip))) {
    return json({ ok: false, error: 'The spam check did not complete. Please try again.' }, 400);
  }

  // 4. Files were uploaded direct to Vercel Blob by the browser; accept only Blob URLs.
  if (data.files.some((f) => !isBlobUrl(f.url))) {
    return json({ ok: false, error: 'An attachment could not be verified. Please upload it again.' }, 400);
  }

  // 5. Deliver
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RFQ_TO_EMAIL;
  const from = process.env.RFQ_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    if (isProd) return json({ ok: false, error: 'Enquiries are temporarily unavailable. Please email us directly.' }, 503);
    console.info('[rfq] Resend not configured — development submission accepted, not sent.');
    return json({ ok: true });
  }

  const productName = data.product ? (getProduct(data.product)?.name ?? data.product) : 'Not specified';
  const rows: [string, string][] = [
    ['Name', data.name],
    ['Company', data.company],
    ['Country', data.country],
    ['Email', data.email],
    ['Phone', data.phone || '—'],
    ['Product', productName],
  ];
  const html = `
    <h2 style="font-family:Georgia,serif;color:#192E5D">New enquiry — ${esc(productName)}</h2>
    <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><th align="left" style="color:#5B6475">${k}</th><td>${esc(v)}</td></tr>`).join('')}
    </table>
    <h3 style="font-family:Arial,sans-serif">Message</h3>
    <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${esc(data.message)}</p>
    ${
      data.files.length
        ? `<h3 style="font-family:Arial,sans-serif">Attachments</h3><ul>${data.files
            .map((f) => `<li><a href="${esc(f.url)}">${esc(f.name)}</a> (${(f.size / 1024 / 1024).toFixed(1)} MB)</li>`)
            .join('')}</ul>`
        : ''
    }`;

  const resend = new Resend(apiKey);
  try {
    const sent = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Enquiry: ${productName} — ${data.company}, ${data.country}`,
      html,
    });
    if (sent.error) throw new Error(sent.error.message);

    // 6. Acknowledge the enquirer with the response-time commitment
    await resend.emails.send({
      from,
      to: data.email,
      replyTo: to,
      subject: `We have your enquiry — ${site.legalName}`,
      html: `<p style="font-family:Arial,sans-serif;font-size:14px">Dear ${esc(data.name)},</p>
        <p style="font-family:Arial,sans-serif;font-size:14px">Thank you for your enquiry about ${esc(productName.toLowerCase())}. ${esc(site.responseCommitment)}</p>
        <p style="font-family:Arial,sans-serif;font-size:14px">${esc(site.legalName)}</p>`,
    });
  } catch {
    // Never log the enquirer's address.
    console.error('[rfq] delivery failed');
    return json({ ok: false, error: 'The enquiry could not be sent. Please try again, or email us directly.' }, 502);
  }

  return json({ ok: true });
}
