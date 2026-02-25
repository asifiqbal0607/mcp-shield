import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, SectionTitle } from '../components/ui';
import { SLATE, PALETTE } from '../constants/colors';
import { topDevicesData, topOsData, topBrowsersData, topNetworksData } from '../data/tables';

const RADIAN = Math.PI / 180;

function renderLabel({ cx, cy, midAngle, outerRadius, name, percent }) {
  if (percent < 0.03) return null;
  const radius = outerRadius + 30;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#475569" textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central" fontSize={9} fontWeight={600}>
      {name.length > 24 ? name.slice(0, 24) + '…' : name} ({(percent * 100).toFixed(1)}%)
    </text>
  );
}

function StatPieCard({ title, data }) {
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <SectionTitle>{title}</SectionTitle>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: SLATE, fontSize: 16 }}>≡</button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name"
            cx="50%" cy="50%" outerRadius={100}
            label={renderLabel} labelLine={true}>
            {data.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
          </Pie>
          <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default function PageDevice() {
  const stats = [
    { label: 'Unique Devices',  value: '48,291', color: '#1d4ed8' },
    { label: 'Mobile Share',    value: '91.4%',  color: '#22c55e' },
    { label: 'Top OS',          value: 'Android',color: '#f59e0b' },
    { label: 'Top Browser',     value: 'Chrome', color: '#8b5cf6' },
  ];

  return (
    <div>
      {/* ── Summary ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
        {stats.map((s) => (
          <Card key={s.label} style={{ textAlign: 'center', borderTop: `3px solid ${s.color}` }}>
            <div style={{ fontSize: 28, fontWeight: 900, fontFamily: 'Georgia,serif', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: SLATE, marginTop: 4, fontWeight: 600 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* ── Top 10 Devices + Top 10 OS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
        <StatPieCard title="Top 10 Devices"           data={topDevicesData} />
        <StatPieCard title="Top 10 Operating Systems" data={topOsData}      />
      </div>

      {/* ── Top 10 Browsers + Top 10 Networks ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <StatPieCard title="Top 10 Browsers" data={topBrowsersData} />
        <StatPieCard title="Top 10 Networks" data={topNetworksData} />
      </div>
    </div>
  );
}
