import { renderOg, ogContentType, ogSize } from '@/lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Arivo Global — Arivo Global';

export default function Image() {
  return renderOg({ key: 'company', eyebrow: 'Company', title: 'Arivo Global', subtitle: 'Refractory ceramic fibre products and foundry consumables for export' });
}
