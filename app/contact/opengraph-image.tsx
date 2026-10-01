export const dynamic = "force-static";
import { renderOg, ogContentType, ogSize } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Request a quote — Arivo Global';

export default function Image() {
  return renderOg({ key: 'contact', eyebrow: 'Contact', title: 'Request a quote', subtitle: 'Tell us what you need' });
}
