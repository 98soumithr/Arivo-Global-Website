import { DiagramSvg, Leader, T, refs, type DiagramProps } from './parts';

const uid = 'ps';

/** Section versus blanket wrap on a pipe. */
export default function PipeSectionsDiagram({ title, description }: DiagramProps) {
  const r = refs(uid);
  return (
    <DiagramSvg uid={uid} title={title} description={description}>
      <T x={40} y={56} kind="head">A — Pre-formed section</T>
      <T x={510} y={56} kind="head">B — Wrapped blanket</T>

      {/* A: even annulus split into two halves */}
      <circle cx="250" cy="270" r="150" fill={r.fibre} className="stroke-navy" strokeWidth="1.5" />
      <circle cx="250" cy="270" r="80" className="fill-mist stroke-navy" strokeWidth="1.5" />
      <circle cx="250" cy="270" r="68" className="fill-white stroke-navy" strokeWidth="1" />
      <path d="M100 270h70M330 270h70" className="stroke-navy" strokeWidth="2" />
      <Leader d="M400 270h40" />
      <T x={410} y={300} kind="note">Split line</T>
      <T x={250} y={276} anchor="middle" kind="note">Pipe</T>
      <T x={40} y={460}>Same wall thickness all the way round</T>
      <T x={40} y={484} kind="note">Rigid; regular surface for cladding</T>

      {/* B: uneven blanket — r(θ) = 135 − 40·cos(θ − 45°): thick at the overlap, thin opposite */}
      <path d="M826.7 270.0 L823.3 280.9 L819.2 291.1 L814.5 300.7 L809.2 309.7 L803.5 318.2 L797.3 326.1 L790.6 333.6 L783.6 340.6 L776.1 347.3 L768.2 353.5 L759.7 359.2 L750.7 364.5 L741.1 369.2 L730.9 373.3 L720.0 376.7 L708.5 379.2 L696.5 380.7 L683.9 381.1 L670.9 380.2 L657.7 377.9 L644.3 374.2 L631.1 368.8 L618.1 361.7 L605.7 353.0 L594.1 342.7 L583.6 330.7 L574.3 317.3 L566.6 302.6 L560.7 286.7 L556.7 270.0 L554.8 252.6 L555.1 235.0 L557.7 217.3 L562.6 199.9 L569.6 183.2 L578.8 167.4 L590.0 152.9 L602.9 140.0 L617.4 128.8 L633.2 119.6 L649.9 112.6 L667.3 107.7 L685.0 105.1 L702.6 104.8 L720.0 106.7 L736.7 110.7 L752.6 116.6 L767.3 124.3 L780.7 133.6 L792.7 144.1 L803.0 155.7 L811.7 168.1 L818.8 181.1 L824.2 194.3 L827.9 207.7 L830.2 220.9 L831.1 233.9 L830.7 246.5 L829.2 258.5Z" fill={r.fibre} className="stroke-navy" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M576 176c10-22 26-36 50-44" className="stroke-navy" strokeWidth="1.5" />
      <circle cx="720" cy="270" r="80" className="fill-mist stroke-navy" strokeWidth="1.5" />
      <circle cx="720" cy="270" r="68" className="fill-white stroke-navy" strokeWidth="1" />
      <T x={720} y={276} anchor="middle" kind="note">Pipe</T>
      <circle cx="787" cy="337" r="10" className="stroke-burgundy" strokeWidth="2" />
      <Leader d="M795 345l50 60" highlight />
      <T x={800} y={448} highlight>Thin spot</T>
      <T x={800} y={470} kind="note">{'Surface temperature\nshows up here'}</T>
      <Leader d="M596 146l-40 -30" />
      <T x={520} y={100} kind="note">Overlap — compressed and thick</T>
      <T x={510} y={484} kind="note">Compresses unevenly</T>
    </DiagramSvg>
  );
}
