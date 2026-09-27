import type { ImageSlot } from './schema';

/** Target pixel sizes per slot: 2× the largest rendered size, so photographs stay sharp on retina screens. */
export const SLOT_TARGET: Record<ImageSlot['slot'] | 'og', { ratio: number; width: number; minWidth: number }> = {
  hero: { ratio: 4 / 5, width: 1600, minWidth: 1000 },
  detail: { ratio: 1, width: 1400, minWidth: 1000 },
  context: { ratio: 3 / 2, width: 1800, minWidth: 1000 },
  diagram: { ratio: 16 / 9, width: 1920, minWidth: 1200 },
  backdrop: { ratio: 16 / 9, width: 2400, minWidth: 1600 },
  og: { ratio: 1200 / 630, width: 1200, minWidth: 1200 },
};

export const RATIO_TOLERANCE = 0.02;
