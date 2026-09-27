import { renderOg, ogContentType, ogSize } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'All products — Arivo Global';

export default function Image() {
  return renderOg({ key: 'products', eyebrow: 'Products', title: 'All products', subtitle: 'Ten product lines in three families' });
}
