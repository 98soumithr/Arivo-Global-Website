import { DiagramSvg, Flow, Leader, T, refs, type DiagramProps } from './parts';

const uid = 'ss';

/** Bowl thermal mass versus steel: heat flow out of the sample, and the chill edge. */
export default function SamplingSpoonsDiagram({ title, description }: DiagramProps) {
  const r = refs(uid);
  const outward = (cx: number, big: boolean) =>
    [-60, -30, 0, 30, 60].map((dx) => (
      <Flow key={dx} uid={uid} d={`M${cx + dx} ${big ? 330 : 318}v${big ? 60 : 24}`} width={big ? 2.5 : 1.2} highlight={big} />
    ));
  return (
    <DiagramSvg uid={uid} title={title} description={description}>
      <T x={40} y={56} kind="head">A — Steel spoon</T>
      <T x={510} y={56} kind="head">B — Ceramic fibre bowl</T>

      {/* A: thick steel bowl, chill layer */}
      <path d="M110 160h280c0 110-60 170-140 170S110 270 110 160z" className="fill-navy" />
      <path d="M130 170h240c0 90-50 142-120 142S130 260 130 170z" className="fill-burgundy" opacity="0.8" />
      <path d="M142 178h216c0 80-44 124-108 124S142 258 142 178z" className="fill-steel" opacity="0.55" />
      {outward(250, true)}
      <Leader d="M372 200h40" highlight />
      <T x={418} y={196} highlight>{'Chill\nedge'}</T>
      <T x={40} y={440}>High thermal mass draws heat out</T>
      <T x={40} y={464} kind="note">{'The spoon is an alloy itself and gives some of it\nup to the sample'}</T>

      {/* B: fibre bowl */}
      <path d="M580 160h280c0 110-60 170-140 170S580 270 580 160z" fill={r.fibre} className="stroke-navy" strokeWidth="1.5" />
      <path d="M600 170h240c0 90-50 142-120 142S600 260 600 170z" className="fill-steel" opacity="0.55" />
      {outward(720, false)}
      <T x={510} y={440}>Very low thermal mass, inert to the melt</T>
      <T x={510} y={464} kind="note">{'The sample stays hotter for longer and\nsolidifies the way it should'}</T>
      <Leader d="M720 240v-110" />
      <T x={730} y={120} kind="note">Sample</T>
    </DiagramSvg>
  );
}
