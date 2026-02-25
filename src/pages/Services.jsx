import React, { useState } from 'react';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const svcRows = [
  {
    id: 1,
    name: 'iPay Service',
    serviceId: 'qcmk0vBzyQ83DjMqcw',
    status: 'ACTIVE',
    client: 'TPay',
    vsBrand: '--',
    serviceType: '--',
    mno: '--',
    carrierGradeNat: '--',
    shieldMode: 'Standout',
    headerEnrichedFlow: '--',
    hpPaymentFlow: '--',
    wifiPaymentFlow: '--',
    serviceCreated: '2026-08-30',
    lastUpdate: '2026-12-08',
    lastUpdateStatus: 'Advanced Setup Session',
    lastUpdateStatusColor: 'teal',
  },
];

// ─── Column Definitions ───────────────────────────────────────────────────────

const SERVICE_COLUMNS = [
  { key: 'sr',                  label: 'Sr.',                   roles: ['admin', 'partner'] },
  { key: 'name',                label: 'Name',                  roles: ['admin', 'partner'] },
  { key: 'serviceId',           label: 'Service ID',            roles: ['admin', 'partner'] },
  { key: 'status',              label: 'Status',                roles: ['admin', 'partner'] },
  { key: 'client',              label: 'Client',                roles: ['admin'] },
  { key: 'vsBrand',             label: 'VS Brand',              roles: ['admin'] },
  { key: 'serviceType',         label: 'Service Type',          roles: ['admin', 'partner'] },
  { key: 'mno',                 label: 'MNO',                   roles: ['admin'] },
  { key: 'carrierGradeNat',     label: 'Carrier Grade NAT',     roles: ['admin'] },
  { key: 'shieldMode',          label: 'ShieldMode',            roles: ['admin', 'partner'] },
  { key: 'headerEnrichedFlow',  label: 'Header Enriched Flow',  roles: ['admin', 'partner'] },
  { key: 'hpPaymentFlow',       label: 'HP Payment Flow',       roles: ['admin'] },
  { key: 'wifiPaymentFlow',     label: 'WiFi Payment Flow',     roles: ['admin'] },
  { key: 'serviceCreated',      label: 'Service Created',       roles: ['admin'] },
  { key: 'lastUpdate',          label: 'Last Update',           roles: ['admin', 'partner'] },
  { key: 'actions',             label: 'Actions',               roles: ['admin', 'partner'] },
];

// ─── Action Definitions ───────────────────────────────────────────────────────

const SERVICE_ACTIONS = {
  admin: [
    { label: 'Solution',       color: '#6c757d' },
    { label: 'Map Service',    color: '#17a2b8' },
    { label: 'Dashboard',      color: '#6c757d' },
    { label: 'Edit',           color: '#0d6efd' },
    { label: 'IP',             color: '#6c757d' },
    { label: 'Clone Service',  color: '#6c757d' },
    { label: 'Update Summary', color: '#6c757d' },
  ],
  partner: [
    { label: 'Dashboard',      color: '#17a2b8' },
    { label: 'Map Service',    color: '#17a2b8' },
  ],
};

// ─── Badge Styles ─────────────────────────────────────────────────────────────

const STATUS_COLORS = {
  ACTIVE:   { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
  INACTIVE: { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
  PENDING:  { bg: '#fef9c3', text: '#854d0e', border: '#fde047' },
};

const SHIELD_MODE_COLORS = {
  Standout: { bg: '#0dcaf0', text: '#fff' },
  Active:   { bg: '#198754', text: '#fff' },
  Passive:  { bg: '#6c757d', text: '#fff' },
  Default:  { bg: '#e2e8f0', text: '#475569' },
};

const UPDATE_STATUS_COLORS = {
  teal:   { bg: '#0d9488', text: '#fff' },
  blue:   { bg: '#2563eb', text: '#fff' },
  orange: { bg: '#ea580c', text: '#fff' },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS.PENDING;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      letterSpacing: 0.4,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.text, opacity: 0.7 }} />
      {status}
    </span>
  );
}

function ShieldBadge({ mode }) {
  const c = SHIELD_MODE_COLORS[mode] || SHIELD_MODE_COLORS.Default;
  return (
    <span style={{
      padding: '3px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600,
      background: c.bg, color: c.text,
    }}>
      {mode}
    </span>
  );
}

function DateBadge({ date }) {
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
      background: '#e0f2fe', color: '#0369a1',
      fontFamily: 'monospace', letterSpacing: 0.4,
    }}>
      {date}
    </span>
  );
}

function ActionsDropdown({ actions }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          padding: '5px 12px', borderRadius: 6, fontSize: 13, fontWeight: 700,
          border: '1px solid #cbd5e1', cursor: 'pointer',
          background: open ? '#f1f5f9' : '#fff',
          color: '#475569', letterSpacing: 2,
          transition: 'all 0.15s ease',
        }}
        title="Actions"
      >
        ···
      </button>

      {open && (
        <div style={{
          position: 'absolute', right: 0, top: 'calc(100% + 6px)', zIndex: 100,
          background: '#fff', borderRadius: 8, minWidth: 160,
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
          overflow: 'hidden',
        }}>
          {actions.map((a, i) => (
            <button
              key={a.label}
              onClick={() => setOpen(false)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '9px 16px', fontSize: 13, fontWeight: 500,
                border: 'none', cursor: 'pointer', background: 'transparent',
                color: a.color,
                borderTop: i > 0 ? '1px solid #f1f5f9' : 'none',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Cell Renderer ────────────────────────────────────────────────────────────

function renderCell(col, row, idx, role) {
  switch (col.key) {
    case 'sr':
      return <span style={{ color: '#64748b' }}>{idx + 1}</span>;
    case 'name':
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: '#22c55e', fontSize: 12 }}>✓</span>
          <span style={{ fontWeight: 600, color: '#1e293b' }}>{row.name}</span>
        </div>
      );
    case 'serviceId':
      return <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#64748b' }}>{row.serviceId}</span>;
    case 'status':
      return <StatusBadge status={row.status} />;
    case 'shieldMode':
      return <ShieldBadge mode={row.shieldMode} />;
    case 'serviceCreated':
      return <DateBadge date={row.serviceCreated} />;
    case 'lastUpdate':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <DateBadge date={row.lastUpdate} />
          {role === 'admin' && (
            <span style={{
              padding: '3px 8px', borderRadius: 5, fontSize: 11, fontWeight: 600,
              whiteSpace: 'nowrap',
              background: UPDATE_STATUS_COLORS[row.lastUpdateStatusColor]?.bg || '#0d9488',
              color: '#fff',
            }}>
              {row.lastUpdateStatus}
            </span>
          )}
        </div>
      );
    case 'actions':
      if (role === 'admin') {
        return <ActionsDropdown actions={SERVICE_ACTIONS.admin} />;
      }
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {SERVICE_ACTIONS.partner.map(a => (
            <button
              key={a.label}
              style={{
                padding: '3px 10px', borderRadius: 5, fontSize: 11, fontWeight: 600,
                border: `1px solid ${a.color}`, cursor: 'pointer',
                background: '#fff', color: a.color,
              }}
            >
              {a.label}
            </button>
          ))}
        </div>
      );
    default:
      return (
        <span style={{ color: row[col.key] === '--' ? '#94a3b8' : '#334155' }}>
          {row[col.key] ?? '--'}
        </span>
      );
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Services({ role = 'admin' }) {
  const [activeRole, setActiveRole] = useState(role);
  const visibleCols = SERVICE_COLUMNS.filter(c => c.roles.includes(activeRole));
  const isAdmin = activeRole === 'admin';

  return (
    <div style={{ padding: '24px 28px', fontFamily: 'Roboto, sans-serif', background: '#f8fafc', minHeight: '100%' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1e293b' }}>Services</h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
            Manage and monitor all registered services
          </p>
        </div>

        {/* Role switcher — remove in production, use role prop from App.jsx */}
        <div style={{ display: 'flex', gap: 6 }}>
          {['admin', 'partner'].map(r => (
            <button
              key={r}
              onClick={() => setActiveRole(r)}
              style={{
                padding: '6px 18px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                cursor: 'pointer', textTransform: 'capitalize',
                border: `1px solid ${activeRole === r ? '#3b82f6' : '#cbd5e1'}`,
                background: activeRole === r ? '#3b82f6' : '#fff',
                color: activeRole === r ? '#fff' : '#64748b',
                transition: 'all 0.15s ease',
              }}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Role Banner */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '5px 14px', borderRadius: 6, marginBottom: 20,
        background: isAdmin ? '#eff6ff' : '#f0fdf4',
        border: `1px solid ${isAdmin ? '#bfdbfe' : '#bbf7d0'}`,
      }}>
        <span style={{ fontSize: 13 }}>{isAdmin ? '🛡️' : '🤝'}</span>
        <span style={{
          fontSize: 12, fontWeight: 600,
          color: isAdmin ? '#1d4ed8' : '#15803d',
        }}>
          {isAdmin ? 'Admin View — Full Access' : 'Partner View — Restricted Access'}
        </span>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Total Services', value: svcRows.length,                                       color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
          { label: 'Active',         value: svcRows.filter(r => r.status === 'ACTIVE').length,    color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
          { label: 'Inactive',       value: svcRows.filter(r => r.status === 'INACTIVE').length,  color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
        ].map(s => (
          <div key={s.label} style={{
            padding: '12px 20px', borderRadius: 8, minWidth: 110,
            background: s.bg, border: `1px solid ${s.border}`,
          }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{
        borderRadius: 10, overflow: 'hidden',
        border: '1px solid #e2e8f0', background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
                {visibleCols.map(col => (
                  <th key={col.key} style={{
                    padding: '10px 14px', textAlign: 'left', fontWeight: 600,
                    color: '#475569', whiteSpace: 'nowrap', fontSize: 12,
                    letterSpacing: 0.3,
                  }}>
                    {col.label}
                    {col.roles.length === 1 && col.roles[0] === 'admin' && isAdmin && (
                      <span title="Admin only" style={{ marginLeft: 4, fontSize: 10, opacity: 0.4 }}>🔒</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {svcRows.map((row, idx) => (
                <tr
                  key={row.id}
                  style={{
                    background: idx % 2 === 0 ? '#fff' : '#f8fafc',
                    borderBottom: '1px solid #f1f5f9',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f0f9ff'}
                  onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? '#fff' : '#f8fafc'}
                >
                  {visibleCols.map(col => (
                    <td key={col.key} style={{ padding: '10px 14px', verticalAlign: 'middle' }}>
                      {renderCell(col, row, idx, activeRole)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{
          padding: '10px 14px', background: '#f8fafc', borderTop: '1px solid #e2e8f0',
          fontSize: 12, color: '#94a3b8',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span>Showing 1 to {svcRows.length} of {svcRows.length} entries</span>
          <span>
            {!isAdmin && (
              <span style={{ color: '#f59e0b', fontWeight: 500 }}>
                ⚠ Some columns hidden based on your role
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}