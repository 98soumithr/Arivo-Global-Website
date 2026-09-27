import { DiagramSvg, Flow, Leader, T, refs, type DiagramProps } from './parts';

const uid = 'pc';

/** Cup position in a gating system: cup, sprue, runner, ingates, casting. */
export default function PouringCupsDiagram({ title, description }: DiagramProps) {
  const r = refs(uid);
  return (
    <DiagramSvg uid={uid} title={title} description={description}>
      <T x={920} y={56} kind="head" anchor="end">Gating system in section</T>
      <rect x="140" y="150" width="760" height="320" fill={r.sand} className="stroke-slate" strokeWidth="1" />

      {/* Cup */}
      <path d="M180 100h120l-40 60h-40z" className="fill-harbour" />
      <path d="M192 108h96l-34 46h-28z" className="fill-steel" opacity="0.55" />
      {/* Sprue */}
      <path d="M222 160h16v230h-16z" className="fill-steel" opacity="0.8" />
      {/* Runner */}
      <path d="M222 390h420v24H222z" className="fill-steel" opacity="0.8" />
      {/* Ingates + casting */}
      <path d="M430 370h16v20h-16zM590 370h16v20h-16z" className="fill-steel" opacity="0.8" />
      <rect x="400" y="250" width="260" height="120" className="fill-mist stroke-navy" strokeWidth="1.5" />
      {/* Feeder */}
      <rect x="700" y="210" width="80" height="120" className="fill-mist stroke-navy" strokeWidth="1.5" />
      <path d="M660 300h40" className="stroke-navy" strokeWidth="1.5" />

      <Flow uid={uid} d="M240 40v52" highlight />
      <T x={256} y={60} kind="note">Metal stream</T>
      <Leader d="M300 104h40" highlight />
      <T x={346} y={96} highlight>Pouring cup</T>
      <T x={346} y={118} kind="note">{'Controlled entry: a target to hit, keeps the\nsprue full, calms the stream'}</T>
      <Leader d="M238 260h-60" />
      <T x={40} y={256}>Sprue</T>
      <Leader d="M400 414v30" />
      <T x={400} y={462}>Runner</T>
      <Leader d="M446 380h-10l-30-60" />
      <T x={410} y={240} kind="note">Ingates</T>
      <T x={530} y={316} anchor="middle">Casting</T>
      <T x={740} y={274} anchor="middle" kind="note">Feeder</T>
      <T x={40} y={522} kind="note">Oxide film torn off an unprotected stream ends up in the casting as inclusions and cold shuts.</T>
    </DiagramSvg>
  );
}
