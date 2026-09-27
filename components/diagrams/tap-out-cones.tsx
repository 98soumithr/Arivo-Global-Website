import { DiagramSvg, Flow, Leader, T, refs, type DiagramProps } from './parts';

const uid = 'tc';

/** Cone seated in a tap hole, in section, against the head of molten metal. */
export default function TapOutConesDiagram({ title, description }: DiagramProps) {
  const r = refs(uid);
  return (
    <DiagramSvg uid={uid} title={title} description={description}>
      <T x={40} y={56} kind="head">Section through a holding furnace tap hole</T>

      {/* Molten metal */}
      <path d="M40 150h330v300H40z" className="fill-steel" opacity="0.35" />
      <path d="M40 150c30-10 60 10 90 0s60 10 90 0 60 10 90 0 60 10 60 0" className="stroke-harbour" strokeWidth="1.5" />
      <T x={70} y={250}>Molten aluminium</T>
      <Flow uid={uid} d="M200 290h150" />
      <T x={200} y={320} kind="note">Head pressure</T>

      {/* Refractory wall with tapered tap hole */}
      <path d="M370 100h200v250l0 0H370z" className="fill-mist stroke-navy" strokeWidth="1.5" />
      <path d="M370 380h200v70H370z" className="fill-mist stroke-navy" strokeWidth="1.5" />
      <path d="M370 350l200-20v50l-200 0z" className="fill-white" />
      <path d="M370 350 570 330M370 380h200" className="stroke-navy" strokeWidth="1.5" />

      {/* Cone */}
      <path d="M430 346l150-15v52l-150-3z" fill={r.fibre} className="stroke-navy" strokeWidth="1.5" />
      <path d="M580 331c14 0 22 12 22 26s-8 26-22 26" className="fill-mist stroke-navy" strokeWidth="1.5" />

      <Leader d="M560 342l80-110" />
      <T x={646} y={214}>Ceramic fibre cone</T>
      <T x={646} y={238} kind="note">{'Not wetted by aluminium;\nenough give to seat tightly'}</T>
      <Leader d="M470 350l-40 110" highlight />
      <T x={380} y={484} highlight>Tapered seat matched to the tap hole</T>
      <T x={470} y={130} kind="note" anchor="middle">Furnace wall</T>

      {/* Launder */}
      <path d="M640 420h280v30H640z" className="fill-mist stroke-navy" strokeWidth="1.5" />
      <T x={660} y={400} kind="note">To launder when tapped</T>
      <T x={40} y={522} kind="note">Replaced every tap: the unit cost is lower than a leaking seal or an interrupted cast.</T>
    </DiagramSvg>
  );
}
