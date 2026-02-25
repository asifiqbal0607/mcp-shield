import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, SectionTitle, Badge, StatusDot } from '../components/ui';
import { BLUE, GREEN, AMBER, ROSE, SLATE, PALETTE } from '../constants/colors';
import { apkRows, trustedApkData, cleanApkData, specifiedApkData, hiddenApkData } from '../data/tables';

const RISK_COLORS = { Low: GREEN, Medium: AMBER, High: ROSE };

const RADIAN = Math.PI / 180;
function renderLabel({ cx, cy, midAngle, innerRadius, outerRadius, name, percent }) {
  if (percent < 0.04) return null;
  const radius = outerRadius + 28;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#475569" textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central" fontSize={9} fontWeight={600}>
      {name.length > 22 ? name.slice(0, 22) + '…' : name} ({(percent * 100).toFixed(1)}%)
    </text>
  );
}

function ApkPieCard({ title, data }) {
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <SectionTitle>{title}</SectionTitle>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: SLATE, fontSize: 16 }}>≡</button>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name"
            cx="50%" cy="50%" outerRadius={95}
            labelLine={true} label={renderLabel}>
            {data.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
          </Pie>
          <Tooltip formatter={(v) => `${v}%`} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default function PageAPKs() {
  const [query, setQuery] = useState('');
  const rows = apkRows.filter(
    (r) => r.pkg.toLowerCase().includes(query.toLowerCase()) ||
           r.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      {/* ── Summary stats ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 18 }}>
        {[
          { label: 'Total APKs',   value: '170', color: BLUE  },
          { label: 'Clean APKs',   value: '142', color: GREEN },
          { label: 'Flagged APKs', value: '28',  color: ROSE  },
        ].map((s) => (
          <Card key={s.label} style={{ textAlign: 'center', borderTop: `3px solid ${s.color}` }}>
            <div style={{ fontSize: 36, fontWeight: 900, fontFamily: 'Georgia,serif', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: SLATE, marginTop: 4, fontWeight: 600 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* ── Top 10 APK pie charts ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
        <ApkPieCard title="Trusted APKs"  data={trustedApkData} />
        <ApkPieCard title="Clean APKs"    data={cleanApkData}   />
      </div>

      {/* ── Specified APKs ── */}
      <div style={{ marginBottom: 18 }}>
        <ApkPieCard title="Specified APKs" data={specifiedApkData} />
      </div>

      {/* ── Hidden APKs ── */}
      <div style={{ marginBottom: 18 }}>
        <ApkPieCard title="Hidden APKs" data={hiddenApkData} />
      </div>

      {/* ── APK Directory table ── */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <SectionTitle>APK Directory</SectionTitle>
          <input placeholder="Search…" value={query} onChange={(e) => setQuery(e.target.value)}
            style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: '7px 12px', fontSize: 12, outline: 'none', width: 180 }} />
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
              {['#', 'Package', 'App', 'Installs', 'Clicks', 'Clean', 'Risk', 'Status'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 10px', fontSize: 10, fontWeight: 700, color: SLATE, textTransform: 'uppercase', letterSpacing: '.8px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                <td style={{ padding: '10px', fontWeight: 700, color: SLATE }}>{r.rank}</td>
                <td style={{ padding: '10px', color: '#334155', fontFamily: 'monospace', fontSize: 10 }}>{r.name}</td>
                <td style={{ padding: '10px', fontWeight: 700, color: '#1a1a2e' }}>{r.pkg}</td>
                <td style={{ padding: '10px' }}>{r.installs}</td>
                <td style={{ padding: '10px' }}>{r.clicks}</td>
                <td style={{ padding: '10px', fontWeight: 700, color: GREEN }}>{r.clean}</td>
                <td style={{ padding: '10px' }}><Badge color={RISK_COLORS[r.risk]}>{r.risk}</Badge></td>
                <td style={{ padding: '10px' }}>
                  <StatusDot status={r.status} />
                  <span style={{ color: r.status === 'active' ? GREEN : r.status === 'warning' ? AMBER : ROSE, fontSize: 11, fontWeight: 600, textTransform: 'capitalize' }}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
