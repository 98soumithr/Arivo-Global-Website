'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

// Cloudflare's documented always-pass test site key, used when no key is configured (development).
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

/** Cloudflare Turnstile, Managed mode — no puzzle challenge (WCAG 2.2, 3.3.8). */
export function Turnstile({ onToken, resetKey }: { onToken: (token: string) => void; resetKey: number }) {
  const el = useRef<HTMLDivElement>(null);
  const widget = useRef<string | undefined>(undefined);
  const [loaded, setLoaded] = useState(() => typeof window !== 'undefined' && Boolean(window.turnstile));
  const tokenCb = useRef(onToken);
  useEffect(() => {
    tokenCb.current = onToken;
  }, [onToken]);

  useEffect(() => {
    if (!loaded || !el.current || !window.turnstile) return;
    widget.current = window.turnstile.render(el.current, {
      sitekey: SITE_KEY,
      appearance: 'interaction-only',
      callback: (t: string) => tokenCb.current(t),
      'expired-callback': () => tokenCb.current(''),
      'error-callback': () => tokenCb.current(''),
    });
    return () => window.turnstile?.remove(widget.current);
  }, [loaded, resetKey]);

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="lazyOnload" onReady={() => setLoaded(true)} />
      <div ref={el} />
    </>
  );
}
