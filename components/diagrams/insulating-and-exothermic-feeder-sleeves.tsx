import { DiagramSvg, Leader, T, refs, type DiagramProps } from './parts';

const uid = 'fs';

/** Feeder and casting in section: unsleeved versus sleeved feeder, and where shrinkage ends up. */
export default function FeederSleevesDiagram({ title, description }: DiagramProps) {
  const r = refs(uid);
  return (
    <DiagramSvg uid={uid} title={title} description={description}>
      <T x={40} y={56} kind="head">A — Unsleeved sand feeder</T>
      <T x={510} y={56} kind="head">B — Sleeved feeder</T>

      {/* A */}
      <rect x="40" y="80" width="420" height="360" fill={r.sand} className="stroke-slate" strokeWidth="1" />
      <rect x="150" y="100" width="170" height="190" className="fill-mist stroke-navy" strokeWidth="1.5" />
      <rect x="70" y="290" width="330" height="100" className="fill-mist stroke-navy" strokeWidth="1.5" />
      <path d="M190 100c10 90 30 160 45 250 15-90 35-160 45-250z" className="fill-burgundy" opacity="0.85" />
      <Leader d="M250 330l70 70" highlight />
      <T x={250} y={470} highlight>{'Shrinkage reaches\ninto the casting'}</T>
      <T x={40} y={470} kind="note">{'Large feeder,\nlow yield'}</T>

      {/* B */}
      <rect x="500" y="80" width="420" height="360" fill={r.sand} className="stroke-slate" strokeWidth="1" />
      <rect x="640" y="150" width="120" height="140" className="fill-mist stroke-navy" strokeWidth="1.5" />
      <path d="M628 140h12v150h-12zM760 140h12v150h-12z" className="fill-harbour" />
      <rect x="628" y="138" width="144" height="12" className="fill-harbour" />
      <rect x="530" y="290" width="330" height="100" className="fill-mist stroke-navy" strokeWidth="1.5" />
      <path d="M670 150c8 40 18 70 30 105 12-35 22-65 30-105z" className="fill-navy" opacity="0.6" />
      <Leader d="M628 214h-24" />
      <T x={516} y={210}>Sleeve</T>
      <T x={516} y={232} kind="note">{'insulating or\nexothermic'}</T>
      <Leader d="M708 232l76 20" />
      <T x={790} y={250} kind="note">{'Shrinkage stays\nin the feeder'}</T>
      <T x={530} y={470} kind="note">{'Smaller feeder does the same work — more of the\npoured metal leaves the foundry as saleable castings'}</T>
    </DiagramSvg>
  );
}
