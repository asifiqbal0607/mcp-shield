import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from 'recharts';

import { Card, SectionTitle, Badge, ChartTooltip } from '../components/ui';
import { BlockRadarChart }                          from '../components/charts';
import { ROSE, AMBER, GREEN, SLATE, BLUE }          from '../constants/colors';
import { blkRows }                                  from '../data/tables';

const SEVERITY_COLORS = { Critical: ROSE, High: AMBER, Medium: BLUE, Low: GREEN };

const SUMMARY_STATS = [
  { label: 'Total Blocked',   value: '15,39,810', color: ROSE  },
  { label: 'Critical Events', value: '2,53,660',  color: ROSE  },
  { label: 'High Risk',       value: '6,15,350',  color: AMBER },
  { label: 'Auto-Resolved',   value: '8,24,110',  color: GREEN },
];

export default function PageBlocking() {
  return (
    <div>
      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 18 }}>
        {SUMMARY_STATS.map((s) => (
          <Card key={s.label} style={{ textAlign: 'center', borderTop: `3px solid ${s.color}` }}>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: 'Georgia,serif', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: SLATE, marginTop: 4, fontWeight: 600 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 14, marginBottom: 18 }}>
        <Card>
          <BlockRadarChart height={300} showBadge={true} />
        </Card>

        <Card>
          <SectionTitle>Volume by Reason</SectionTitle>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={blkRows} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
              <XAxis type="number" tick={{ fontSize: 9, fill: '#cbd5e1' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="reason" tick={{ fontSize: 9, fill: '#64748b' }}
                axisLine={false} tickLine={false} width={130}
                tickFormatter={(v) => v.length > 16 ? v.slice(0, 16) + '…' : v} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="pct" name="Share %" radius={[0, 4, 4, 0]}>
                {blkRows.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Full breakdown table */}
      <Card>
        <SectionTitle>Full Breakdown</SectionTitle>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
              {['Block Reason', 'Count', 'Share', '7d Trend', 'Severity', 'Progress'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 10, fontWeight: 700, color: SLATE, textTransform: 'uppercase', letterSpacing: '.8px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {blkRows.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                <td style={{ padding: '11px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{ width: 11, height: 11, borderRadius: 3, background: r.color, flexShrink: 0 }} />
                    <span style={{ fontWeight: 700, color: '#1a1a2e' }}>{r.reason}</span>
                  </div>
                </td>
                <td style={{ padding: '11px 12px', fontFamily: 'monospace', fontWeight: 700 }}>{r.count}</td>
                <td style={{ padding: '11px 12px', fontWeight: 700, color: r.color }}>{r.pct}%</td>
                <td style={{ padding: '11px 12px', fontWeight: 700, color: r.trend.startsWith('+') ? ROSE : GREEN }}>{r.trend}</td>
                <td style={{ padding: '11px 12px' }}><Badge color={SEVERITY_COLORS[r.sev]}>{r.sev}</Badge></td>
                <td style={{ padding: '11px 12px', width: 140 }}>
                  <div style={{ height: 6, background: '#f1f5f9', borderRadius: 3 }}>
                    <div style={{ height: '100%', width: `${r.pct * 3.5}%`, maxWidth: '100%', background: r.color, borderRadius: 3 }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
