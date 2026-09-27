'use client';

/** Last-resort boundary when the root layout itself fails. Inline styles only — globals.css may not have loaded. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-GB">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', background: '#FFFFFF', color: '#141A26' }}>
        <main style={{ maxWidth: 680, margin: '0 auto', padding: '96px 20px' }}>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: 24, letterSpacing: '0.16em', color: '#192E5D', margin: 0 }}>ARIVO</p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 36, lineHeight: 1.15, color: '#192E5D', marginTop: 40 }}>
            The website could not be loaded
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#5B6475' }}>Please try again in a moment.</p>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: 24, padding: '14px 28px', border: 0, borderRadius: 2, background: '#192E5D', color: '#FFFFFF', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
