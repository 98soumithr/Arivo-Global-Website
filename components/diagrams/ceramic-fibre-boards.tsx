import { DiagramSvg, Dim, Flow, T, refs, type DiagramProps } from './parts';

const uid = 'bd';

/** Lining build-up in section: all-board lining, and board as back-up behind brick. */
export default function BoardsDiagram({ title, description }: DiagramProps) {
  const r = refs(uid);
  return (
    <DiagramSvg uid={uid} title={title} description={description}>
      <T x={40} y={56} kind="head">A — Board lining</T>
      <T x={500} y={56} kind="head">B — Board behind brick</T>

      {/* A: hot face board | back-up board | casing */}
      <g>
        <rect x="80" y="100" width="90" height="300" fill={r.fibre} className="stroke-navy" strokeWidth="1.5" />
        <rect x="170" y="100" width="110" height="300" className="fill-mist stroke-navy" strokeWidth="1.5" />
        <rect x="280" y="100" width="14" height="300" className="fill-navy" />
        <T x={125} y={430} anchor="middle">Hot face</T>
        <T x={125} y={452} anchor="middle" kind="note">higher density</T>
        <T x={225} y={430} anchor="middle">Back-up</T>
        <T x={225} y={452} anchor="middle" kind="note">lower density</T>
        <T x={287} y={88} anchor="middle" kind="note">Casing</T>
        <Flow uid={uid} d="M40 250h34" />
        <T x={40} y={236} kind="note">Heat</T>
        <path d="M80 130C150 150 220 260 294 330" className="stroke-burgundy" strokeWidth="1.5" strokeDasharray="4 4" />
        <T x={300} y={330} kind="note">{'Temperature falls\nthrough the lining'}</T>
      </g>

      {/* B: brick | board back-up | casing */}
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="540" y={100 + i * 60} width="110" height="60" className="fill-mist stroke-slate" strokeWidth="1" />
        ))}
        <rect x="540" y="100" width="110" height="300" className="stroke-navy" strokeWidth="1.5" />
        <rect x="650" y="100" width="100" height="300" fill={r.fibre} className="stroke-navy" strokeWidth="1.5" />
        <rect x="750" y="100" width="14" height="300" className="fill-navy" />
        <T x={595} y={430} anchor="middle">Refractory brick</T>
        <T x={700} y={430} anchor="middle">Board</T>
        <T x={700} y={452} anchor="middle" kind="note">back-up</T>
        <T x={757} y={88} anchor="middle" kind="note">Casing</T>
        <Flow uid={uid} d="M500 250h34" />
        <T x={500} y={236} kind="note">Heat</T>
        <T x={790} y={230} kind="note">{'Stays dimensionally\nstable for years\nbehind the brick'}</T>
      </g>

      <Dim x1={80} y1={480} x2={294} y2={480} />
      <T x={187} y={510} anchor="middle" kind="note">Low thermal mass: cycles economically</T>
      <Dim x1={540} y1={480} x2={764} y2={480} />
      <T x={652} y={510} anchor="middle" kind="note">Brick carries load; board insulates behind it</T>
    </DiagramSvg>
  );
}
