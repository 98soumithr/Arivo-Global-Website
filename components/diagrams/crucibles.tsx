import { DiagramSvg, T, type DiagramProps } from './parts';

const uid = 'cr';

const cols = ['Gas- or oil-fired', 'Induction'];
const rows: { metal: string; duty: string; cells: [string, string]; highlight?: boolean }[] = [
  { metal: 'Aluminium', duty: 'moderate temperature, long hold', cells: ['Oxidation resistance', 'Oxidation resistance +\ncontrolled resistivity'] },
  { metal: 'Copper alloys', duty: 'high temperature', cells: ['Refractoriness,\nerosion resistance', 'Refractoriness +\ncontrolled resistivity'] },
  { metal: 'Zinc, precious metals', duty: 'by operating window', cells: ['Matched to the window', 'Matched to the window +\ncontrolled resistivity'] },
  { metal: 'Any metal, heavy flux', duty: 'flux attacks the bond', cells: ['Chemical attack resistance', 'Chemical attack resistance +\ncontrolled resistivity'], highlight: true },
];

/** Selection matrix: what the crucible grade is selected for, by metal and furnace. */
export default function CruciblesDiagram({ title, description }: DiagramProps) {
  const x0 = 40;
  const colX = [330, 630];
  const rowY = (i: number) => 130 + i * 90;
  return (
    <DiagramSvg uid={uid} title={title} description={description}>
      <T x={x0} y={56} kind="head">What the grade is selected for</T>
      <T x={x0} y={108} kind="head">Metal and duty</T>
      {cols.map((c, i) => (
        <T key={c} x={colX[i]! + 10} y={108} kind="head">{c}</T>
      ))}
      <line x1={x0} y1="120" x2="920" y2="120" className="stroke-navy" strokeWidth="1.5" />
      {rows.map((row, i) => (
        <g key={row.metal}>
          {row.highlight && <rect x={x0} y={rowY(i)} width="880" height="90" className="fill-paper" />}
          <T x={x0} y={rowY(i) + 36}>{row.metal}</T>
          <T x={x0} y={rowY(i) + 60} kind="note">{row.duty}</T>
          {row.cells.map((cell, j) => (
            <T key={j} x={colX[j]! + 10} y={rowY(i) + 36} highlight={row.highlight && j === 0}>{cell}</T>
          ))}
          <line x1={x0} y1={rowY(i) + 90} x2="920" y2={rowY(i) + 90} className="stroke-border" strokeWidth="1" />
        </g>
      ))}
      <line x1={colX[0]} y1="84" x2={colX[0]} y2="490" className="stroke-border" strokeWidth="1" />
      <line x1={colX[1]} y1="84" x2={colX[1]} y2="490" className="stroke-border" strokeWidth="1" />
      <T x={x0} y={522} kind="note">A crucible is specified by its operating window, the metal and the furnace — not by a maximum temperature alone.</T>
    </DiagramSvg>
  );
}
