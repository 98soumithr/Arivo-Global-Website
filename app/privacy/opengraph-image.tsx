import { renderOg, ogContentType, ogSize } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Privacy notice — Arivo Global';

export default function Image() {
  return renderOg({ key: 'privacy', eyebrow: 'Legal', title: 'Privacy notice' });
}
