import { ImageResponse } from 'next/og';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

const C = {
  navy: '#192E5D',
  deepNavy: '#0F1C3A',
  mist: '#E2E1E0',
  steel: '#6B93B4',
  lightSteel: '#9DB8CF',
};

const font = (file: string) => readFile(join(process.cwd(), 'assets/og-fonts', file));

/**
 * Share image for a route. A supplied photograph at /public/images/og/[key].jpg takes over
 * full-bleed; until then a typographic card in the brand system stands in.
 */
export async function renderOg({ key, eyebrow, title, subtitle }: { key: string; eyebrow: string; title: string; subtitle?: string }) {
  const [serif, sans, mono] = await Promise.all([font('SourceSerif4-600.woff'), font('IBMPlexSans-400.woff'), font('IBMPlexMono-400.woff')]);
  const fonts = [
    { name: 'Serif', data: serif, weight: 600 as const, style: 'normal' as const },
    { name: 'Sans', data: sans, weight: 400 as const, style: 'normal' as const },
    { name: 'Mono', data: mono, weight: 400 as const, style: 'normal' as const },
  ];

  const photo = join(process.cwd(), 'public/images/og', `${key}.jpg`);
  if (existsSync(photo)) {
    const src = `data:image/jpeg;base64,${(await readFile(photo)).toString('base64')}`;
    return new ImageResponse(
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} width={ogSize.width} height={ogSize.height} style={{ objectFit: 'cover' }} alt="" />,
      { ...ogSize, fonts },
    );
  }

  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: C.navy, position: 'relative', padding: '72px 80px', flexDirection: 'column' }}>
        {/* Meridian lines, cropped off the right edge */}
        <svg width="560" height="630" viewBox="0 0 560 630" style={{ position: 'absolute', right: 0, top: 0 }}>
          {[110, 200, 290, 380, 470].map((rx) => (
            <ellipse key={rx} cx="600" cy="315" rx={rx} ry="420" fill="none" stroke={C.steel} strokeWidth="1.5" opacity="0.4" />
          ))}
          {[130, 250, 370, 490].map((y) => (
            <line key={y} x1="0" x2="560" y1={y} y2={y} stroke={C.steel} strokeWidth="1.5" opacity="0.22" />
          ))}
        </svg>

        <div style={{ display: 'flex', fontFamily: 'Mono', fontSize: 22, letterSpacing: 3, color: C.lightSteel, textTransform: 'uppercase' }}>{eyebrow}</div>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 44, maxWidth: 820 }}>
          <div style={{ fontFamily: 'Serif', fontSize: title.length > 34 ? 64 : 76, lineHeight: 1.08, color: '#FFFFFF', letterSpacing: -1 }}>{title}</div>
          {subtitle && <div style={{ fontFamily: 'Sans', fontSize: 30, lineHeight: 1.4, color: C.lightSteel, marginTop: 28 }}>{subtitle}</div>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 'auto' }}>
          <div style={{ fontFamily: 'Serif', fontSize: 34, letterSpacing: 5, color: C.mist }}>ARIVO</div>
          <div style={{ width: 1.5, height: 38, background: C.steel }} />
          <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Sans', fontSize: 12, letterSpacing: 4.5, color: C.mist, lineHeight: 1.45 }}>
            <div>GLOBAL</div>
            <div>PRIVATE LIMITED</div>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
