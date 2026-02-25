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

const ADMIN_ACTIONS = [
  { label: 'Solution',       color: '#6c757d' },
  { label: 'Map Service',    color: '#17a2b8' },
  { label: 'Dashboard',      color: '#6c757d' },
  { label: 'Edit',           color: '#0d6efd' },
  { label: 'IP',             color: '#6c757d' },
  { label: 'Clone Service',  color: '#6c757d' },
  { label: 'Update Summary', color: '#6c757d' },
];

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

// ─── Actions Dropdown (admin only) ───────────────────────────────────────────

function ActionsDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          padding: '3px 10px', borderRadius: 6, fontSize: 15, fontWeight: 700,
          border: '1px solid #cbd5e1', cursor: 'pointer',
          background: open ? '#f1f5f9' : '#fff',
          color: '#475569', letterSpacing: 2, lineHeight: 1,
        }}
        title="Actions"
      >
        ···
      </button>
      {open && (
        <>
          {/* Click outside overlay */}
          <div style={{ position: 'fixed', inset: 0, zIndex: 998 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'absolute', right: 0, top: 'calc(100% + 4px)', zIndex: 999,
            background: '#fff', borderRadius: 8, minWidth: 160,
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
            overflow: 'hidden',
          }}>
            {ADMIN_ACTIONS.map((a, i) => (
              <button
                key={a.label}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '8px 14px', fontSize: 12, fontWeight: 500,
                  border: 'none', borderTop: i > 0 ? '1px solid #f1f5f9' : 'none',
                  cursor: 'pointer', background: 'transparent', color: a.color,
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {a.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function PageServices({ role = 'admin' }) {
  const [tab, setTab] = useState('active');
  const isPartner = role === 'partner';
  const isAdmin   = role === 'admin';

  const activeServices   = svcRows.filter((r) => r.status === 'active');
  const inactiveServices = svcRows.filter((r) => r.status !== 'active');
  const displayed        = tab === 'active' ? activeServices : inactiveServices;

  const SUMMARY_STATS = [
    { label: 'Total Services', value: svcRows.length,           color: '#2563eb' },
    { label: 'Active',         value: activeServices.length,    color: '#22c55e' },
    { label: 'Inactive',       value: inactiveServices.length,  color: '#f59e0b' },
  ];

  // Columns — admin sees all, partner sees restricted set
  const ALL_COLUMNS = [
    { key: 'sr',                 label: 'Sr.',                  admin: true,  partner: true  },
    { key: 'name',               label: 'Name',                 admin: true,  partner: true  },
    { key: 'serviceId',          label: 'Service ID',           admin: true,  partner: true  },
    { key: 'status',             label: 'Status',               admin: true,  partner: true  },
    { key: 'client',             label: 'Client',               admin: true,  partner: false },
    { key: 'vsBrand',            label: 'VS Brand',             admin: true,  partner: false },
    { key: 'serviceType',        label: 'Service Type',         admin: true,  partner: true  },
    { key: 'mno',                label: 'MNO',                  admin: true,  partner: false },
    { key: 'carrierGradeNat',    label: 'Carrier Grade NAT',    admin: true,  partner: false },
    { key: 'shieldMode',         label: 'ShieldMode',           admin: true,  partner: true  },
    { key: 'headerEnrichedFlow', label: 'Header Enriched Flow', admin: true,  partner: true  },
    { key: 'hePaymentFlow',      label: 'HE Payment Flow',      admin: true,  partner: false },
    { key: 'wifiPaymentFlow',    label: 'WiFi Payment Flow',    admin: true,  partner: false },
    { key: 'serviceCreated',     label: 'Service Created',      admin: true,  partner: false },
    { key: 'lastUpdate',         label: 'Last Update',          admin: true,  partner: true  },
    { key: 'actions',            label: 'Actions',              admin: true,  partner: true  },
  ];

  const visibleCols = ALL_COLUMNS.filter(c => isAdmin ? c.admin : c.partner);

  function renderCell(col, row, idx) {
    switch (col.key) {
      case 'sr':
        return <span style={{ color: '#94a3b8' }}>{idx + 1}</span>;
      case 'name':
        return <span style={{ fontWeight: 700, color: BLUE }}>{row.name}</span>;
      case 'serviceId':
        return <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#64748b' }}>{row.id}</span>;
      case 'status':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: statusColor(row.status), display: 'inline-block' }} />
            <span style={{ fontWeight: 600, textTransform: 'capitalize', color: statusColor(row.status) }}>{row.status}</span>
          </span>
        );
      case 'client':
        return row.client || '--';
      case 'vsBrand':
        return row.vsBrand || '--';
      case 'serviceType':
        return <Badge color={VIOLET}>{row.type}</Badge>;
      case 'mno':
        return row.mno || '--';
      case 'carrierGradeNat':
        return row.carrierGradeNat || '--';
      case 'shieldMode':
        return row.shieldMode
          ? <span style={{ padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: '#0dcaf0', color: '#fff' }}>{row.shieldMode}</span>
          : '--';
      case 'headerEnrichedFlow':
        return row.headerEnrichedFlow || '--';
      case 'hePaymentFlow':
        return row.hePaymentFlow || '--';
      case 'wifiPaymentFlow':
        return row.wifiPaymentFlow || '--';
      case 'serviceCreated':
        return row.serviceCreated
          ? <span style={{ padding: '2px 8px', borderRadius: 5, fontSize: 11, background: '#e0f2fe', color: '#0369a1', fontFamily: 'monospace' }}>{row.serviceCreated}</span>
          : '--';
      case 'lastUpdate':
        return row.lastUpdate
          ? <span style={{ padding: '2px 8px', borderRadius: 5, fontSize: 11, background: '#e0f2fe', color: '#0369a1', fontFamily: 'monospace' }}>{row.lastUpdate}</span>
          : '--';
      case 'actions':
        return isAdmin
          ? <ActionsDropdown />
          : (
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="btn-secondary" style={{ fontSize: 11 }}>Dashboard</button>
              <button className="btn-secondary" style={{ fontSize: 11 }}>Map Service</button>
            </div>
          );
      default:
        return '--';
    }
  }

  return (
    <div>
      {/* Summary stats — unchanged */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
        {SUMMARY_STATS.map(({ label, value, color }) => (
          <Card key={label} style={{ textAlign: 'center', borderTop: `4px solid ${color}` }}>
            <div style={{ fontSize: 34, fontWeight: 900, color, fontFamily: 'Georgia' }}>{value}</div>
            <div style={{ fontSize: 12, color: SLATE, fontWeight: 600 }}>{label}</div>
          </Card>
        ))}
      </div>

      {/* Charts — unchanged */}
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

      {/* Service Registry — updated columns + dropdown */}
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

          {/* Active / Inactive tab bar — unchanged */}
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

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                {visibleCols.map(col => (
                  <th key={col.key} style={{ textAlign: 'left', padding: 10, fontSize: 11, color: SLATE, whiteSpace: 'nowrap' }}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayed.length === 0 ? (
                <tr>
                  <td colSpan={visibleCols.length} style={{ padding: 30, textAlign: 'center', color: SLATE, fontSize: 13 }}>
                    No {tab} services found.
                  </td>
                </tr>
              ) : displayed.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f8fafc' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  {visibleCols.map(col => (
                    <td key={col.key} style={{ padding: 10, verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                      {renderCell(col, row, idx)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}