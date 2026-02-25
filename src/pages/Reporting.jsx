import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell,
} from 'recharts';

import { Card, SectionTitle, Badge } from '../components/ui';
import { BLUE, GREEN, AMBER, VIOLET, CYAN, SLATE } from '../constants/colors';
import { repTrend }   from '../data/charts';
import { repReports } from '../data/tables';

const SUMMARY_STATS = [
  { label: 'Total Reports', value: '6',    color: BLUE   },
  { label: 'Scheduled',     value: '4',    color: VIOLET },
  { label: 'On-demand',     value: '2',    color: CYAN   },
  { label: 'Avg Delivery',  value: '4.2s', color: GREEN  },
];

export default function PageReporting() {
  return (
    <div>
      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
        {SUMMARY_STATS.map(({ label, value, color }) => (
          <Card key={label} style={{ textAlign: 'center', borderTop: `4px solid ${color}` }}>
            <div style={{ fontSize: 32, fontWeight: 900, color, fontFamily: 'Georgia' }}>{value}</div>
            <div style={{ fontSize: 12, color: SLATE, fontWeight: 600 }}>{label}</div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginBottom: 20 }}>
        <Card>
          <SectionTitle>30-Day Reporting Trends</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={repTrend}>
              <XAxis dataKey="d" />
              <YAxis />
              <Tooltip />
              <Line dataKey="visits"  stroke="#3b82f6" strokeWidth={2} />
              <Line dataKey="clicks"  stroke="#22c55e" strokeWidth={2} />
              <Line dataKey="blocked" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle>Report Type Split</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <PieChart width={150} height={150}>
              <Pie data={[{ v: 4 }, { v: 2 }]} dataKey="v"
                cx={70} cy={70} innerRadius={42} outerRadius={68} paddingAngle={4}>
                <Cell fill={VIOLET} />
                <Cell fill={CYAN}   />
              </Pie>
            </PieChart>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[[VIOLET, 'Scheduled', '4 reports'], [CYAN, 'On-demand', '2 reports']].map(([c, l, v]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, background: '#f8fafc' }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
                  <div style={{ flex: 1, fontSize: 12, fontWeight: 700, color: '#1a1a2e' }}>{l}</div>
                  <span style={{ fontSize: 11, color: SLATE }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Reports table */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <SectionTitle>All Reports</SectionTitle>
          <button className="btn-primary" style={{ borderRadius: 20, padding: '8px 16px', fontSize: 12 }}>+ New Report</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee' }}>
              {['Report Name', 'Type', 'Frequency', 'Last Run', 'Rows', 'Status', 'Actions'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: 10, color: SLATE, fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {repReports.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: 10, fontWeight: 700 }}>{r.name}</td>
                <td style={{ padding: 10 }}><Badge color={r.type === 'Scheduled' ? VIOLET : CYAN}>{r.type}</Badge></td>
                <td style={{ padding: 10 }}>{r.freq}</td>
                <td style={{ padding: 10 }}>{r.lastRun}</td>
                <td style={{ padding: 10, fontFamily: 'monospace' }}>{r.rows}</td>
                <td style={{ padding: 10 }}><Badge color={r.status === 'active' ? GREEN : AMBER}>{r.status}</Badge></td>
                <td style={{ padding: 10 }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-primary">Run Now</button>
                    <button className="btn-secondary">Download Now</button>
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
