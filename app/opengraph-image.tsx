import { renderOg, ogContentType, ogSize } from '@/lib/og';
import { site } from '@/content/site';

export const alt = `${site.legalName} — ${site.tagline}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    key: 'home',
    eyebrow: 'Refractory and foundry products',
    title: 'Ceramic fibre and foundry consumables, specified to the process',
  });
}
