import React from 'react';

/* =========================================================================
   INTEREST DIAGRAM — visuals for simple interest.
   • GrowthBars   one bar per year: principal block + stacked interest blocks
   • FormulaCard  I = P × R × T ÷ 100 with each slot filled or "?"
   • BankCards    two side-by-side bank offers
   ========================================================================= */

export const C_P = '#38bdf8';
export const C_I = '#facc15';
export const money = v => {
  if (!Number.isFinite(v)) return '?';
  const r = Math.round(v * 100) / 100;
  return '$' + (Number.isInteger(r) ? r.toLocaleString('en-US') : r.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
};

/**
 * Growth bars for years 0..years. Each bar = principal + k × yearly interest.
 * target: optional amount drawn as a dashed line.
 */
export function GrowthBars({ P, yearly, years, maxYears = 10, target = null, x = 34, y = 14, w = 312, h = 150, fs = 11 }) {
  const top = Math.max(P + yearly * maxYears, target || 0) * 1.05;
  const Y = v => y + h - (v / top) * h;
  const bw = w / (maxYears + 1);
  return (
    <g>
      <line x1={x} y1={y + h} x2={x + w} y2={y + h} stroke="#e9d5ff" strokeWidth="2" />
      {target !== null && (
        <g>
          <line x1={x} y1={Y(target)} x2={x + w} y2={Y(target)} stroke="#4ade80" strokeWidth="2" strokeDasharray="6 4" />
          <text x={x + w} y={Y(target) - 5} fill="#4ade80" fontSize={fs} fontWeight="900" textAnchor="end">target {money(target)}</text>
        </g>
      )}
      {[...Array(years + 1)].map((_, k) => {
        const bx = x + k * bw + 3;
        return (
          <g key={k}>
            <rect x={bx} y={Y(P)} width={bw - 6} height={Y(0) - Y(P)} rx="3" fill={C_P} fillOpacity="0.75" />
            {[...Array(k)].map((__, j) => (
              <rect key={j} x={bx} y={Y(P + yearly * (j + 1))} width={bw - 6} height={Math.max(1, Y(P + yearly * j) - Y(P + yearly * (j + 1)) - 1)} rx="2" fill={C_I} fillOpacity="0.9" />
            ))}
            <text x={bx + (bw - 6) / 2} y={y + h + 13} fill="#cbd5e1" fontSize={fs} fontWeight="800" textAnchor="middle">{k}</text>
          </g>
        );
      })}
      <text x={x + w} y={y + h + 26} fill="#c4b5fd" fontSize={fs} fontWeight="900" textAnchor="end">years</text>
    </g>
  );
}

/** Formula card: slots { P, R, T, I } (strings or null → "?"), ok flags. */
export function FormulaCard({ slots, ok = {}, y = 40, fs = 15 }) {
  const box = (cx, key, label, unit) => {
    const v = slots[key];
    const good = ok[key];
    return (
      <g key={key}>
        <rect x={cx - 38} y={y} width="76" height="56" rx="12" fill={good ? '#064e3b' : '#14082c'} stroke={good ? '#4ade80' : v == null ? '#f472b6' : '#a78bfa'} strokeWidth="2.5" />
        <text x={cx} y={y + 18} fill="#c4b5fd" fontSize={fs - 4} fontWeight="900" textAnchor="middle">{label}</text>
        <text x={cx} y={y + 42} fill="#fff" fontSize={v && v.length > 6 ? fs - 3 : fs} fontWeight="900" textAnchor="middle">{v == null ? '?' : v}{v != null && unit ? unit : ''}</text>
      </g>
    );
  };
  return (
    <g>
      {box(44, 'I', 'I', '')}
      <text x="94" y={y + 36} fill="#facc15" fontSize="20" fontWeight="900" textAnchor="middle">=</text>
      {box(144, 'P', 'P', '')}
      <text x="190" y={y + 36} fill="#facc15" fontSize="18" fontWeight="900" textAnchor="middle">×</text>
      {box(234, 'R', 'R %', '')}
      <text x="280" y={y + 36} fill="#facc15" fontSize="18" fontWeight="900" textAnchor="middle">×</text>
      {box(320, 'T', 'T yrs', '')}
      <text x="232" y={y + 84} fill="#e9d5ff" fontSize="13" fontWeight="900" textAnchor="middle">÷ 100</text>
    </g>
  );
}

/** Two bank offers side by side. banks: [{ name, P, R, T, I }] (strings). */
export function BankCards({ banks, y = 18 }) {
  return (
    <g>
      {banks.map((b, i) => {
        const x = 18 + i * 172;
        const col = i ? '#38bdf8' : '#f472b6';
        return (
          <g key={i}>
            <rect x={x} y={y} width="152" height="150" rx="16" fill="#14082c" stroke={col} strokeWidth="2.5" />
            <text x={x + 76} y={y + 26} fill={col} fontSize="15" fontWeight="900" textAnchor="middle">🏦 {b.name}</text>
            {[['Principal', b.P], ['Rate', b.R], ['Time', b.T]].map(([l, v], k) => (
              <g key={l}>
                <text x={x + 12} y={y + 54 + k * 24} fill="#c4b5fd" fontSize="12" fontWeight="900">{l}</text>
                <text x={x + 140} y={y + 54 + k * 24} fill="#fff" fontSize="14" fontWeight="900" textAnchor="end">{v}</text>
              </g>
            ))}
            <line x1={x + 12} y1={y + 116} x2={x + 140} y2={y + 116} stroke="#ffffff33" />
            <text x={x + 12} y={y + 138} fill="#facc15" fontSize="12" fontWeight="900">Interest</text>
            <text x={x + 140} y={y + 138} fill={b.ok ? '#4ade80' : '#fff'} fontSize="15" fontWeight="900" textAnchor="end">{b.I}</text>
          </g>
        );
      })}
    </g>
  );
}

/** Practice diagram wrapper. */
export function InterestDiagram({ diagramData, size = 180 }) {
  if (!diagramData) return null;
  const d = diagramData;
  let body = null;
  if (d.type === 'growth') body = <GrowthBars P={d.P} yearly={d.yearly} years={d.years} maxYears={Math.max(d.years, 4)} y={20} />;
  else if (d.type === 'formula') body = <FormulaCard slots={d.slots} y={50} />;
  else if (d.type === 'banks') body = <BankCards banks={d.banks} y={22} />;
  if (!body) return null;
  return (
    <div className="flex items-center justify-center my-1">
      <svg width={size * 1.8} height={size} viewBox="0 0 360 200" className="max-w-full drop-shadow-[0_0_18px_rgba(250,204,21,0.25)]">
        {body}
      </svg>
    </div>
  );
}
