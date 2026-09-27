import { DiagramSvg, Dim, Leader, T, refs, type DiagramProps } from './parts';

const uid = 'bs';

/** Flame development through a quarl in section: throat, quarl angle, tunnel length. */
export default function BurnerShapesDiagram({ title, description }: DiagramProps) {
  const r = refs(uid);
  return (
    <DiagramSvg uid={uid} title={title} description={description}>
      <T x={40} y={56} kind="head">Burner block in section</T>

      {/* Burner */}
      <rect x="40" y="244" width="150" height="52" className="fill-navy" />
      <T x={40} y={330} kind="note">Burner</T>

      {/* Block: upper and lower halves around the void */}
      <path d="M190 110h420v140H400l-150 0-60-5z" fill={r.fibre} className="stroke-navy" strokeWidth="1.5" />
      <path d="M190 110v135l60 5h0l150-80h210V110z" fill={r.fibre} className="stroke-navy" strokeWidth="1.5" />
      <path d="M190 430h420V290H400l-150 0-60 5z" fill={r.fibre} className="stroke-navy" strokeWidth="1.5" />
      <path d="M190 430V295l60-5 150 80h210v60z" fill={r.fibre} className="stroke-navy" strokeWidth="1.5" />
      {/* Void: throat → quarl → tunnel */}
      <path d="M190 245l60-5 150-70h210v200H400l-150-80-60-5z" className="fill-white stroke-navy" strokeWidth="1.5" />

      {/* Flame */}
      <path d="M200 270c80-12 180-40 300-60 120-4 240 10 330 60-90 50-210 64-330 60-120-20-220-48-300-60z" className="fill-harbour" opacity="0.25" />
      <path d="M200 270c90-6 200-20 300-28 110 0 210 10 300 28-90 18-190 28-300 28-100-8-210-22-300-28z" className="fill-harbour" opacity="0.45" />

      {/* Chamber */}
      <rect x="610" y="90" width="310" height="360" className="stroke-slate" strokeWidth="1" strokeDasharray="4 6" />
      <T x={640} y={120} kind="note">Furnace chamber</T>

      <Leader d="M250 240v-110" />
      <T x={200} y={96}>Throat</T>
      <Leader d="M320 205l40-80" />
      <T x={330} y={96} highlight>Quarl angle</T>
      <Dim x1={400} y1={470} x2={610} y2={470} />
      <T x={505} y={500} anchor="middle">Tunnel length</T>
      <T x={640} y={410} kind="note">{'The internal profile sets flame shape,\nstability and heat distribution'}</T>
    </DiagramSvg>
  );
}
