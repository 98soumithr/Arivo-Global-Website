import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Home-screen icon: the mark from icon.svg at 180px. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#192E5D', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="120" height="120" viewBox="0 0 32 32">
          <path d="M9.5 24 15 8h2l5.5 16h-2.6l-1.4-4.3h-5L12.1 24zm4.3-6.5h3.4L15.5 12z" fill="#E2E1E0" />
          <rect x="9" y="26" width="14" height="1.5" fill="#6B93B4" />
        </svg>
      </div>
    ),
    size,
  );
}
