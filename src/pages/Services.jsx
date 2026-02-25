import { useState } from 'react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip,
  BarChart, Bar, Cell,
} from 'recharts';

import { Card, SectionTitle, Badge } from '../components/ui';
import { BLUE, GREEN, AMBER, ROSE, VIOLET, SLATE } from '../constants/colors';
import { repTrend } from '../data/charts';
import { svcRows }  from '../data/tables';

const API_CALL_DATA = [
  { name: 'Shield',       calls: 10  },
  { name: 'Click',        calls: 8   },
  { name: 'APK',          calls: 6   },
  { name: 'Fraud',        calls: 5   },
  { name: 'Export',       calls: 70  },
  { name: 'Geo',          calls: 4   },
  { name: 'Notification', calls: 320 },
];

const BAR_COLORS = [BLUE, GREEN, VIOLET, ROSE, AMBER, '#06b6d4', '#f97316'];

function uptimeColor(uptime) {
  return parseFloat(uptime) >= 99 ? GREEN : AMBER;
}

function latencyColor(latency) {
  const ms = parseInt(latency);
  return ms > 200 ? ROSE : ms > 50 ? AMBER : GREEN;
}

function statusColor(status) {
  return status === 'active' ? GREEN : status === 'warning' ? AMBER : ROSE;
}

export default function PageServices({ role = 'admin' }) {
  const [tab, setTab] = useState('active');
  const isPartner = role === 'partner';

  const activeServices   = svcRows.filter((r) => r.status === 'active');
  const inactiveServices = svcRows.filter((r) => r.status !== 'active');
  const displayed        = tab === 'active' ? activeServices : inactiveServices;

  const SUMMARY_STATS = [
    { label: 'Total Services', value: svcRows.length,           color: '#2563eb' },
    { label: 'Active',         value: activeServices.length,    color: '#22c55e' },
    { label: 'Inactive',       value: inactiveServices.length,  color: '#f59e0b' },
  ];

  return (
    <div>
      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
        {SUMMARY_STATS.map(({ label, value, color }) => (
          <Card key={label} style={{ textAlign: 'center', borderTop: `4px solid ${color}` }}>
            <div style={{ fontSize: 34, fontWeight: 900, color, fontFamily: 'Georgia' }}>{value}</div>
            <div style={{ fontSize: 12, color: SLATE, fontWeight: 600 }}>{label}</div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginBottom: 20 }}>
        <Card>
          <SectionTitle>Uptime Trend (14 days)</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={repTrend}>
              <XAxis dataKey="d" />
              <YAxis />
              <Tooltip />
              <Line dataKey="visits" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle>API Calls by Service</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={API_CALL_DATA}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="calls" radius={[4, 4, 0, 0]}>
                {API_CALL_DATA.map((_, i) => <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Service registry */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <SectionTitle>Service Registry</SectionTitle>
            {isPartner && (
              <button style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '4px 12px', borderRadius: 6, cursor: 'pointer',
                background: '#f0fdfa', color: '#0d9488',
                border: '1.5px solid #99f6e4',
                fontSize: 11, fontWeight: 700,
              }}>⊕ New Service</button>
            )}
          </div>

          {/* Active / Inactive tab bar */}
          <div style={{ display: 'flex', gap: 0 }}>
            {[['active', GREEN, '22c55e', 'dcfce7', '16a34a'], ['inactive', AMBER, 'f59e0b', 'fef3c7', 'd97706']].map(([key, borderColor, dotHex, bgHex, textHex]) => {
              const isOn = tab === key;
              const count = key === 'active' ? activeServices.length : inactiveServices.length;
              const label = key === 'active' ? '✓ Active' : '⊘ Inactive';
              return (
                <button key={key} onClick={() => setTab(key)} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 20px', border: 'none', cursor: 'pointer',
                  background: 'transparent', fontWeight: 700, fontSize: 13,
                  color: isOn ? `#${textHex}` : '#94a3b8',
                  borderBottom: isOn ? `2.5px solid ${borderColor}` : '2.5px solid transparent',
                  transition: 'all .15s',
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: isOn ? `#${dotHex}` : '#cbd5e1', display: 'inline-block' }} />
                  {label}
                  <span style={{
                    padding: '2px 9px', borderRadius: 20, fontSize: 11, fontWeight: 800,
                    background: isOn ? `#${bgHex}` : '#f1f5f9',
                    color: isOn ? `#${textHex}` : '#94a3b8',
                  }}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
              {['ID', 'Service', 'Type', 'Region', 'Uptime', 'Latency', 'Calls', 'Status', 'Action'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: 10, fontSize: 11, color: SLATE }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayed.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ padding: 30, textAlign: 'center', color: SLATE, fontSize: 13 }}>
                  No {tab} services found.
                </td>
              </tr>
            ) : displayed.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                <td style={{ padding: 10, fontWeight: 700, color: BLUE }}>{r.id}</td>
                <td style={{ padding: 10, fontWeight: 700 }}>{r.name}</td>
                <td style={{ padding: 10 }}><Badge color={VIOLET}>{r.type}</Badge></td>
                <td style={{ padding: 10 }}>{r.region}</td>
                <td style={{ padding: 10, fontWeight: 700, color: uptimeColor(r.uptime) }}>{r.uptime}</td>
                <td style={{ padding: 10, fontWeight: 700, color: latencyColor(r.latency) }}>{r.latency}</td>
                <td style={{ padding: 10, fontFamily: 'monospace' }}>{r.calls}</td>
                <td style={{ padding: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: statusColor(r.status), display: 'inline-block', marginRight: 6 }} />
                  <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{r.status}</span>
                </td>
                <td style={{ padding: 10 }}>
                  <button className="btn-secondary">Config</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
