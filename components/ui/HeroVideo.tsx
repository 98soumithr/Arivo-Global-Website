'use client';

import { useEffect, useRef, useState } from 'react';

export interface VideoSource {
  src: string;
  type: 'video/mp4' | 'video/webm';
  /** Chosen by the browser in order; e.g. '(min-width: 768px)' for the 1080p files. */
  media?: string;
}

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/**
 * Background video layered over its poster (the poster is rendered by the server as the LCP image).
 * - Loads only after hydration, and never under reduced motion, Save-Data or a 2G connection.
 * - Fades in once it is actually playing, so the swap from poster is invisible (poster = frame 0).
 * - Pauses while off-screen; a visible control pauses it for good (WCAG 2.2.2 Pause, Stop, Hide).
 */
export function HeroVideo({ sources }: { sources: VideoSource[] }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const slow = conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? '');
    if (reduced || slow) return;
    // Start only after the page has fully loaded and the browser is idle, so the video never
    // competes with the poster (the LCP image), fonts or scripts for bandwidth.
    let idle = 0;
    let timer = 0;
    const start = () => {
      timer = window.setTimeout(() => {
        idle = window.requestIdleCallback ? window.requestIdleCallback(() => setAllowed(true), { timeout: 2000 }) : window.setTimeout(() => setAllowed(true), 0);
      }, 800);
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => {
      window.removeEventListener('load', start);
      window.clearTimeout(timer);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  // Load once, when allowed. Kept separate from play/pause so pausing never reloads (and rewinds) the video.
  const userPausedRef = useRef(false);
  useEffect(() => {
    const video = ref.current;
    if (!allowed || !video) return;
    video.load();
    const io = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      if (entry.isIntersecting && !userPausedRef.current) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, [allowed]);

  if (!allowed) return null;

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPausedRef.current = false;
      setUserPaused(false);
      video.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      setUserPaused(true);
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={ref}
        aria-hidden
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${playing || userPaused ? 'opacity-100' : 'opacity-0'}`}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} media={s.media} />
        ))}
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause background video' : 'Play background video'}
        className="absolute right-(--gutter) bottom-5 z-10 flex size-10 items-center justify-center rounded-full border border-[rgba(244,244,243,0.4)] text-paper transition-colors duration-150 hover:border-paper"
      >
        {playing ? (
          <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="currentColor">
            <rect x="4" y="3" width="2.5" height="10" />
            <rect x="9.5" y="3" width="2.5" height="10" />
          </svg>
        ) : (
          <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="currentColor">
            <path d="M5 3v10l8-5z" />
          </svg>
        )}
      </button>
    </>
  );
}
