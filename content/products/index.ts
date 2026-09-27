import type { ProductContent } from '@/lib/schema';
import { product as filterCandles } from './ceramic-fibre-filter-candles';
import { product as boards } from './ceramic-fibre-boards';
import { product as feederSleeves } from './insulating-and-exothermic-feeder-sleeves';
import { product as crucibles } from './crucibles';
import { product as tapOutCones } from './tap-out-cones';
import { product as pouringCups } from './pouring-cups';
import { product as gaskets } from './ceramic-fibre-gaskets';
import { product as burnerShapes } from './shapes-for-burner-applications';
import { product as pipeSections } from './ceramic-fibre-pipe-sections';
import { product as samplingSpoons } from './ceramic-fibre-sampling-spoons';

/** The product registry. Adding a product = one data file + one line here. Order is display order. */
export const products: ProductContent[] = [
  filterCandles,
  boards,
  gaskets,
  burnerShapes,
  pipeSections,
  feederSleeves,
  crucibles,
  tapOutCones,
  pouringCups,
  samplingSpoons,
];
