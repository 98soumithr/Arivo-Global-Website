import { DiagramSvg, Flow, Leader, T, refs, type DiagramProps } from './parts';

const uid = 'fc';

/** Filter position in a flue gas train: filtering hot, upstream of heat recovery. */
export default function FilterCandlesDiagram({ title, description }: DiagramProps) {
  const r = refs(uid);
  const candles = [0, 1, 2, 3, 4, 5];
  return (
    <DiagramSvg uid={uid} title={title} description={description}>
      {/* 1 Furnace */}
      <T x={40} y={56} kind="head">01 Furnace / boiler</T>
      <rect x="40" y="110" width="150" height="190" className="fill-mist stroke-navy" strokeWidth="1.5" />
      <path d="M78 262c10-34 26-38 20-70 22 20 34 42 22 70z" className="fill-steel" opacity="0.55" />

      {/* 2 Candle filter vessel */}
      <T x={300} y={56} kind="head">02 Candle filter</T>
      <path d="M300 90h200v260l-60 50h-80l-60-50z" className="fill-white stroke-navy" strokeWidth="1.5" />
      <line x1="300" y1="130" x2="500" y2="130" className="stroke-navy" strokeWidth="4" />
      {candles.map((i) => (
        <g key={i}>
          <rect x={322 + i * 28} y="130" width="14" height="190" rx="7" fill={r.fibre} className="stroke-navy" strokeWidth="1.2" />
          <rect x={320 + i * 28} y="124" width="18" height="8" className="fill-navy" />
        </g>
      ))}
      <path d="M430 400v22" className="stroke-navy" strokeWidth="1.5" />
      <Leader d="M478 300l70 90" />
      <T x={554} y={396} kind="note">{'Dust collects on\nthe outer surface'}</T>
      <Flow uid={uid} d="M392 70v40" width={1.5} />
      <T x={404} y={80} kind="note">Reverse pulse</T>

      {/* 3 Heat recovery */}
      <T x={612} y={56} kind="head">03 Heat recovery</T>
      <rect x="612" y="110" width="140" height="190" className="fill-mist stroke-navy" strokeWidth="1.5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M632 ${140 + i * 30}h100`} className="stroke-harbour" strokeWidth="1.5" strokeDasharray="10 6" />
      ))}

      {/* 4 Stack */}
      <T x={830} y={56} kind="head">04 Stack</T>
      <path d="M842 300V96h44v204z" className="fill-white stroke-navy" strokeWidth="1.5" />

      {/* Gas path */}
      <Flow uid={uid} d="M190 270h104" width={2.5} />
      <T x={196} y={296} kind="note">{'Hot,\ndusty gas'}</T>
      <path d="M500 110h24v-10h82" className="stroke-harbour" strokeWidth="2.5" fill="none" />
      <Flow uid={uid} d="M580 100h26" width={2.5} />
      <T x={520} y={88} kind="note">Hot, clean gas</T>
      <Flow uid={uid} d="M752 270h84" width={2.5} />
      <T x={760} y={296} kind="note">{'Cooled,\nclean gas'}</T>

      <T x={300} y={452} highlight>{'Filtering before heat recovery keeps the\nheat in the gas available to the plant'}</T>

      {/* Alternative route */}
      <line x1="40" y1="494" x2="920" y2="494" className="stroke-border" strokeWidth="1" />
      <T x={40} y={522} kind="note">Fabric filter route, for comparison: furnace → quench or heat exchanger → fabric filter → stack. The gas must be cooled first.</T>
    </DiagramSvg>
  );
}
