'use client';

import { useEffect, useRef, useState } from 'react';

export interface VideoSource {
  src: string;
  type: 'video/mp4' | 'video/webm';
  media?: string;
}

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

export function HeroVideo({ sources }: { sources: VideoSource[] }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [skip, setSkip] = useState(true);
  const userPausedRef = useRef(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const slow = conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? '');
    if (reduced || slow) return;
    setSkip(false);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (skip || !video) return;

    const io = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      if (entry.isIntersecting && !userPausedRef.current) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
    io.observe(video);
    return () => io.disconnect();
  }, [skip]);

  if (skip) return null;

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
        autoPlay
        preload="auto"
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
