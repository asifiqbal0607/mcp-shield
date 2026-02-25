import { useState } from 'react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip,
  BarChart, Bar, Cell,
} from 'recharts';

import { Card, SectionTitle, Badge } from '../components/ui';
import { BLUE, GREEN, AMBER, ROSE, VIOLET, SLATE } from '../constants/colors';
import { repTrend } from '../data/charts';

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

// ─── Dummy service rows ───────────────────────────────────────────────────────

const svcRows = [
  { id: 1,  name: 'True Digital Group Co.,Ltd (4237) | Horo Sap4 - 4237424 - True',      serviceId: '-36KlpABQGMxF54qLUGn',  status: 'active',   client: 'True Digital', vsBrand: '--', type: '--',  mno: '--', carrierGradeNat: '--', shieldMode: '--',       headerEnrichedFlow: '--', hePaymentFlow: '--', wifiPaymentFlow: '--', serviceCreated: '2024-01-10', lastUpdate: '2024-06-01' },
  { id: 2,  name: 'True Digital Group Co.,Ltd (4239) | Wan Duang dee 3 - 4239469 - True', serviceId: '-37bZ5MBQGMxF54qXIB_',  status: 'active',   client: 'True Digital', vsBrand: '--', type: '--',  mno: '--', carrierGradeNat: '--', shieldMode: 'Standard', headerEnrichedFlow: '--', hePaymentFlow: '--', wifiPaymentFlow: '--', serviceCreated: '2024-01-12', lastUpdate: '2024-06-03' },
  { id: 3,  name: 'True Digital Group Co.,Ltd (4238) | Hora Duange4 - 4238572 - True',    serviceId: '-6gEeJcBP_A8TV-HbUzE',  status: 'active',   client: 'True Digital', vsBrand: '--', type: '--',  mno: '--', carrierGradeNat: '--', shieldMode: 'Standard', headerEnrichedFlow: '--', hePaymentFlow: '--', wifiPaymentFlow: '--', serviceCreated: '2024-01-15', lastUpdate: '2024-06-05' },
  { id: 4,  name: 'gvi services | anus-sub-acc',                                           serviceId: '-8u4q5cB1fchDeWJNjg3',  status: 'active',   client: 'GVI',          vsBrand: '--', type: '--',  mno: '--', carrierGradeNat: '--', shieldMode: 'Standard', headerEnrichedFlow: '--', hePaymentFlow: '--', wifiPaymentFlow: '--', serviceCreated: '2024-02-01', lastUpdate: '2024-06-10' },
  { id: 5,  name: 'True Digital Group Co.,Ltd (4237) | Horo Sap - 4237421 - True',        serviceId: '-H6llpABQGMxF54qjEGX',  status: 'active',   client: 'True Digital', vsBrand: '--', type: '--',  mno: '--', carrierGradeNat: '--', shieldMode: '--',       headerEnrichedFlow: '--', hePaymentFlow: '--', wifiPaymentFlow: '--', serviceCreated: '2024-02-10', lastUpdate: '2024-06-12' },
  { id: 6,  name: 'Teleinfotech | Duang Den - 4218043 - True',                             serviceId: '-H6kiZEBQGMxF54qRUQX',  status: 'active',   client: 'Teleinfotech', vsBrand: '--', type: '--',  mno: '--', carrierGradeNat: '--', shieldMode: 'Standard', headerEnrichedFlow: '--', hePaymentFlow: '--', wifiPaymentFlow: '--', serviceCreated: '2024-03-01', lastUpdate: '2024-06-15' },
  { id: 7,  name: 'True Digital Group Co.,Ltd (4239) | Health care 2 - 4239462 - True',   serviceId: '-H7RZ5MBQGMxF54q0IAp',  status: 'active',   client: 'True Digital', vsBrand: '--', type: '--',  mno: '--', carrierGradeNat: '--', shieldMode: 'Standard', headerEnrichedFlow: '--', hePaymentFlow: '--', wifiPaymentFlow: '--', serviceCreated: '2024-03-05', lastUpdate: '2024-06-18' },
  { id: 8,  name: 'True Digital Group Co.,Ltd (4238) | XR Academy - 4238069 - True',      serviceId: '-Mp2d5AB-W5fcuufUc83',  status: 'active',   client: 'True Digital', vsBrand: '--', type: '--',  mno: '--', carrierGradeNat: '--', shieldMode: 'Standard', headerEnrichedFlow: '--', hePaymentFlow: '--', wifiPaymentFlow: '--', serviceCreated: '2024-03-10', lastUpdate: '2024-06-20' },
  { id: 9,  name: 'True Digital Group Co.,Ltd (4239) | Horo Lucky Dee9 - 4239355 - True', serviceId: '-Muv_ZQB-W5fcuufnkmx',  status: 'active',   client: 'True Digital', vsBrand: '--', type: '--',  mno: '--', carrierGradeNat: '--', shieldMode: 'Standard', headerEnrichedFlow: '--', hePaymentFlow: '--', wifiPaymentFlow: '--', serviceCreated: '2024-03-15', lastUpdate: '2024-06-22' },
  { id: 10, name: 'True Digital Group Co.,Ltd (4237) | Horo Sap2 - 4237422 - True',       serviceId: '-X6JlpABQGMxF54qHkFO',  status: 'active',   client: 'True Digital', vsBrand: '--', type: '--',  mno: '--', carrierGradeNat: '--', shieldMode: '--',       headerEnrichedFlow: '--', hePaymentFlow: '--', wifiPaymentFlow: '--', serviceCreated: '2024-04-01', lastUpdate: '2024-06-25' },
  { id: 11, name: 'iPay Service',                                                          serviceId: 'qcmk0vBzyQ83DjMqcw',    status: 'inactive', client: 'TPay',          vsBrand: '--', type: 'API', mno: '--', carrierGradeNat: '--', shieldMode: 'Standout', headerEnrichedFlow: '--', hePaymentFlow: '--', wifiPaymentFlow: '--', serviceCreated: '2024-05-01', lastUpdate: '2024-07-01' },
];

// ─── Partner action buttons ───────────────────────────────────────────────────

const PARTNER_ACTIONS = [
  { label: '👁',               color: '#17a2b8', title: 'View'         },
  { label: '✎',               color: '#17a2b8', title: 'Edit'             },
  { label: 'Clone Service',    color: '#0d9488', title: 'Clone Service'   },
  { label: 'Custom Variables', color: '#0d9488', title: 'Custom Variables' },
];

// ─── Admin dropdown actions ───────────────────────────────────────────────────

const ADMIN_ACTIONS = [
  { label: 'Solution',         color: '#6c757d' },
  { label: 'Map Service',      color: '#17a2b8' },
  { label: 'Dashboard',        color: '#6c757d' },
  { label: 'Edit',             color: '#0d6efd' },
  { label: 'IP',               color: '#6c757d' },
  { label: 'Clone Service',    color: '#0d9488' },
  { label: 'Custom Variables', color: '#0d9488' },
  { label: 'Update Summary',   color: '#6c757d' },
];

// ─── Admin dropdown ───────────────────────────────────────────────────────────

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
      >···</button>
      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 998 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'absolute', right: 0, top: 'calc(100% + 4px)', zIndex: 999,
            background: '#fff', borderRadius: 8, minWidth: 160,
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
            overflow: 'hidden',
          }}>
            {ADMIN_ACTIONS.map((a, i) => (
              <button key={a.label} onClick={() => setOpen(false)} style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '8px 14px', fontSize: 12, fontWeight: 500,
                border: 'none', borderTop: i > 0 ? '1px solid #f1f5f9' : 'none',
                cursor: 'pointer', background: 'transparent', color: a.color,
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >{a.label}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Partner action buttons ───────────────────────────────────────────────────

function PartnerActions() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      {PARTNER_ACTIONS.map(a => (
        <button key={a.label} title={a.title} style={{
          padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
          border: `1px solid ${a.color}`, cursor: 'pointer',
          background: a.label.length <= 2 ? a.color : '#fff',
          color: a.label.length <= 2 ? '#fff' : a.color,
          whiteSpace: 'nowrap',
        }}>{a.label}</button>
      ))}
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
    { label: 'Total Services', value: svcRows.length,          color: '#2563eb' },
    { label: 'Active',         value: activeServices.length,   color: '#22c55e' },
    { label: 'Inactive',       value: inactiveServices.length, color: '#f59e0b' },
  ];

  const ALL_COLUMNS = [
    { key: 'sr',                 label: 'Sr.',                  admin: true, partner: true  },
    { key: 'name',               label: 'Name',                 admin: true, partner: true  },
    { key: 'serviceId',          label: 'Service ID',           admin: true, partner: true  },
    { key: 'status',             label: 'Status',               admin: true, partner: true  },
    { key: 'client',             label: 'Client',               admin: true, partner: false },
    { key: 'vsBrand',            label: 'VS Brand',             admin: true, partner: false },
    { key: 'serviceType',        label: 'Service Type',         admin: true, partner: true  },
    { key: 'mno',                label: 'MNO',                  admin: true, partner: false },
    { key: 'carrierGradeNat',    label: 'Carrier Grade NAT',    admin: true, partner: false },
    { key: 'shieldMode',         label: 'ShieldMode',           admin: true, partner: true  },
    { key: 'headerEnrichedFlow', label: 'Header Enriched Flow', admin: true, partner: true  },
    { key: 'hePaymentFlow',      label: 'HE Payment Flow',      admin: true, partner: false },
    { key: 'wifiPaymentFlow',    label: 'WiFi Payment Flow',    admin: true, partner: false },
    { key: 'serviceCreated',     label: 'Service Created',      admin: true, partner: false },
    { key: 'lastUpdate',         label: 'Last Update',          admin: true, partner: true  },
    { key: 'actions',            label: 'Actions',              admin: true, partner: true  },
  ];

  const visibleCols = ALL_COLUMNS.filter(c => isAdmin ? c.admin : c.partner);

  function renderCell(col, row, idx) {
    switch (col.key) {
      case 'sr':
        return <span style={{ color: '#94a3b8' }}>{idx + 1}</span>;
      case 'name':
        return <span style={{ fontWeight: 600, color: '#f59e0b', fontSize: 12 }}>{row.name}</span>;
      case 'serviceId':
        return <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#64748b' }}>{row.serviceId}</span>;
      case 'status':
        return (
          <span style={{
            display: 'inline-block', padding: '2px 10px', borderRadius: 4,
            fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
            background: row.status === 'active' ? '#16a34a' : '#f59e0b',
            color: '#fff',
          }}>
            {row.status.toUpperCase()}
          </span>
        );
      case 'client':           return <span style={{ fontSize: 12 }}>{row.client || '--'}</span>;
      case 'vsBrand':          return <span style={{ color: '#94a3b8' }}>{row.vsBrand || '--'}</span>;
      case 'serviceType':      return <span style={{ color: '#94a3b8' }}>{row.type || '--'}</span>;
      case 'mno':              return <span style={{ color: '#94a3b8' }}>{row.mno || '--'}</span>;
      case 'carrierGradeNat':  return <span style={{ color: '#94a3b8' }}>{row.carrierGradeNat || '--'}</span>;
      case 'shieldMode':
        return row.shieldMode && row.shieldMode !== '--'
          ? <span style={{ padding: '2px 10px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: '#0dcaf0', color: '#fff' }}>{row.shieldMode}</span>
          : <span style={{ color: '#94a3b8' }}>--</span>;
      case 'headerEnrichedFlow': return <span style={{ color: '#94a3b8' }}>{row.headerEnrichedFlow || '--'}</span>;
      case 'hePaymentFlow':      return <span style={{ color: '#94a3b8' }}>{row.hePaymentFlow || '--'}</span>;
      case 'wifiPaymentFlow':    return <span style={{ color: '#94a3b8' }}>{row.wifiPaymentFlow || '--'}</span>;
      case 'serviceCreated':
        return <span style={{ fontFamily: 'monospace', fontSize: 11, padding: '2px 6px', borderRadius: 4, background: '#e0f2fe', color: '#0369a1' }}>{row.serviceCreated}</span>;
      case 'lastUpdate':
        return <span style={{ fontFamily: 'monospace', fontSize: 11, padding: '2px 6px', borderRadius: 4, background: '#e0f2fe', color: '#0369a1' }}>{row.lastUpdate}</span>;
      case 'actions':
        return isAdmin ? <ActionsDropdown /> : <PartnerActions />;
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

      {/* Service Registry */}
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

          {/* Active / Inactive tabs — unchanged */}
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