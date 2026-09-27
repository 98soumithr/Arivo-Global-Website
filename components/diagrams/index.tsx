import type { ComponentType } from 'react';
import type { DiagramProps } from './parts';
import FilterCandles from './ceramic-fibre-filter-candles';
import Boards from './ceramic-fibre-boards';
import FeederSleeves from './insulating-and-exothermic-feeder-sleeves';
import Crucibles from './crucibles';
import TapOutCones from './tap-out-cones';
import PouringCups from './pouring-cups';
import Gaskets from './ceramic-fibre-gaskets';
import BurnerShapes from './shapes-for-burner-applications';
import PipeSections from './ceramic-fibre-pipe-sections';
import SamplingSpoons from './ceramic-fibre-sampling-spoons';

/** Diagram registry, keyed by product slug. File name = slug, which validation checks. */
const diagrams: Record<string, ComponentType<DiagramProps>> = {
  'ceramic-fibre-filter-candles': FilterCandles,
  'ceramic-fibre-boards': Boards,
  'insulating-and-exothermic-feeder-sleeves': FeederSleeves,
  crucibles: Crucibles,
  'tap-out-cones': TapOutCones,
  'pouring-cups': PouringCups,
  'ceramic-fibre-gaskets': Gaskets,
  'shapes-for-burner-applications': BurnerShapes,
  'ceramic-fibre-pipe-sections': PipeSections,
  'ceramic-fibre-sampling-spoons': SamplingSpoons,
};

export const hasDiagram = (slug: string) => slug in diagrams;

export function Diagram({ slug, title, description }: { slug: string } & DiagramProps) {
  const Component = diagrams[slug];
  if (!Component) throw new Error(`No diagram registered for "${slug}"`);
  return <Component title={title} description={description} />;
}
