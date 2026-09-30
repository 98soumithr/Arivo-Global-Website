import type { ProductContent } from '@/lib/schema';
import { product as filterCandles } from './ceramic-fibre-filter-candles';

/** The product registry. Adding a product = one data file + one line here. Order is display order.
 *  Other industrial products archived — content files kept on disk for later. */
export const products: ProductContent[] = [
  filterCandles,
];
