export const dynamic = "force-static";
import { renderOg, ogContentType, ogSize } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Products by industry — Arivo Global';

export default function Image() {
  return renderOg({ key: 'industries', eyebrow: 'Industries', title: 'Products by industry' });
}
