import { useState } from 'react';
import {
  ResponsiveContainer, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip,
} from 'recharts';
import { SLATE } from '../../constants/colors';
import { blockReasons, blockLegend } from '../../data/charts';

// ─── Dark tooltip ─────────────────────────────────────────────────────────────
function RadarTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#1a1a2e', borderRadius: 10, padding: '10px 14px',
      boxShadow: '0 8px 24px rgba(0,0,0,.25)', minWidth: 190,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 800, color: '#fff', marginBottom: 8,
        borderBottom: '1px solid rgba(255,255,255,.1)', paddingBottom: 6,
      }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 3 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,.65)' }}>{p.name}</span>
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: 'monospace' }}>
            {Number(p.value).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Pill day label ───────────────────────────────────────────────────────────
function DayTick({ x, y, payload }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-22} y={-11} width={44} height={22} rx={11} fill="#eff6ff" />
      <text x={0} y={0} textAnchor="middle" dominantBaseline="central"
        fill="#1d4ed8" fontSize={11} fontWeight={700}>
        {payload.value}
      </text>
    </g>
  );
}

/**
 * BlockRadarChart — reusable polished radar chart for block pattern data.
 *
 * @param {number}  height      Chart height in px (default 300)
 * @param {boolean} showBadge   Show the "7-day view" badge (default true)
 * @param {number}  seriesLimit How many series to show (default 5)
 */
export default function BlockRadarChart({ height = 300, showBadge = true, seriesLimit = 5 }) {
  const [hidden, setHidden] = useState({});
  const toggle = (key) => setHidden((h) => ({ ...h, [key]: !h[key] }));
  const series = blockLegend.slice(0, seriesLimit);

  return (
    <div style={{ background: 'linear-gradient(145deg,#fafcff,#f0f4ff)', borderRadius: 12, padding: '16px 16px 12px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#1a1a2e' }}>Weekly Block Pattern</div>
          <div style={{ fontSize: 11, color: SLATE, marginTop: 2 }}>Threat distribution by day of week</div>
        </div>
        {showBadge && (
          <div style={{
            background: '#1d4ed8', color: '#fff', borderRadius: 10,
            padding: '5px 12px', fontSize: 11, fontWeight: 700, flexShrink: 0,
          }}>7-day view</div>
        )}
      </div>

      {/* Radar */}
      <ResponsiveContainer width="100%" height={height}>
        <RadarChart data={blockReasons} margin={{ top: 16, right: 50, bottom: 16, left: 50 }}>
          <PolarGrid gridType="polygon" stroke="#dde5f5" strokeWidth={1} strokeDasharray="4 3" />
          <PolarAngleAxis dataKey="subject" tick={<DayTick />} />
          <PolarRadiusAxis angle={90} domain={[0, 5500]} tick={{ fontSize: 9, fill: '#94a3b8' }}
            axisLine={false} tickCount={4} />
          <Tooltip content={<RadarTooltip />} />
          {series.map((b) =>
            !hidden[b.key] && (
              <Radar key={b.key} name={b.key} dataKey={b.key}
                stroke={b.color} strokeWidth={2}
                fill={b.color} fillOpacity={0.18}
                dot={{ fill: b.color, r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
              />
            )
          )}
        </RadarChart>
      </ResponsiveContainer>

      {/* Clickable legend */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center',
        marginTop: 4, paddingTop: 12, borderTop: '1px solid #e8ecf3',
      }}>
        {series.map((b) => (
          <button key={b.key} onClick={() => toggle(b.key)} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', borderRadius: 20, border: 'none', cursor: 'pointer',
            background: hidden[b.key] ? '#f1f5f9' : `${b.color}18`,
            opacity: hidden[b.key] ? 0.45 : 1,
            transition: 'all .15s',
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: hidden[b.key] ? '#cbd5e1' : b.color,
              boxShadow: hidden[b.key] ? 'none' : `0 0 4px ${b.color}88`,
            }} />
            <span style={{ fontSize: 10, fontWeight: 600, color: hidden[b.key] ? SLATE : '#334155' }}>
              {b.key}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
