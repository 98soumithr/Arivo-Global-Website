import { DiagramSvg, Flow, T, refs, type DiagramProps } from './parts';

const uid = 'gk';

function Joint({ x, gasket, bolted, fibre }: { x: number; gasket: number; bolted: boolean; fibre: string }) {
  return (
    <g>
      <rect x={x} y="130" width="200" height="40" className="fill-mist stroke-navy" strokeWidth="1.5" />
      <rect x={x} y={170} width="200" height={gasket} fill={fibre} className="stroke-navy" strokeWidth="1.2" />
      <rect x={x} y={170 + gasket} width="200" height="40" className="fill-mist stroke-navy" strokeWidth="1.5" />
      {bolted && (
        <>
          <rect x={x + 30} y="112" width="12" height={118 + gasket} className="fill-navy" />
          <rect x={x + 158} y="112" width="12" height={118 + gasket} className="fill-navy" />
        </>
      )}
    </g>
  );
}

/** The three substrates against bolt load. */
export default function GasketsDiagram({ title, description }: DiagramProps) {
  const r = refs(uid);
  return (
    <DiagramSvg uid={uid} title={title} description={description}>
      <T x={40} y={56} kind="head">Substrate follows the joint</T>

      <Joint x={40} gasket={22} bolted={false} fibre={r.fibre} />
      <T x={40} y={290}>Paper</T>
      <T x={40} y={314} kind="note">{'Doors, hatches — compliance\nat low bolt load'}</T>

      <Joint x={360} gasket={12} bolted fibre={r.fibre} />
      <T x={360} y={290}>Millboard or rigid board</T>
      <T x={360} y={314} kind="note">{'Bolted flanges — resists\ncrushing under load'}</T>

      {/* Vacuum-formed 3D seal */}
      <path d="M700 150h180v40h-40v50h-100v-50h-40z" fill={r.fibre} className="stroke-navy" strokeWidth="1.5" />
      <T x={700} y={290}>Vacuum-formed seal</T>
      <T x={700} y={314} kind="note">{'Three-dimensional geometry —\na moulded part, not a flat cut'}</T>

      <Flow uid={uid} d="M40 420h580" />
      <T x={40} y={404} kind="head">Increasing bolt load</T>
      <T x={40} y={460} kind="note">Low load</T>
      <T x={620} y={460} kind="note" anchor="end">Bolted flange</T>
      <T x={40} y={522} kind="note">A supplier offering one substrate ends up recommending it for all three joints.</T>
    </DiagramSvg>
  );
}
