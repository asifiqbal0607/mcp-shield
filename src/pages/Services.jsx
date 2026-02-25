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

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SHIELD_MODE_COLORS = {
  Standout:  { bg: '#0dcaf0', text: '#fff' },
  Active:    { bg: '#198754', text: '#fff' },
  Passive:   { bg: '#6c757d', text: '#fff' },
  Default:   { bg: '#dee2e6', text: '#333' },
};

const STATUS_COLORS = {
  ACTIVE:    { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
  INACTIVE:  { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
  PENDING:   { bg: '#fef9c3', text: '#854d0e', border: '#fde047' },
};

const UPDATE_STATUS_COLORS = {
  teal:      { bg: '#0d9488', text: '#fff' },
  blue:      { bg: '#2563eb', text: '#fff' },
  orange:    { bg: '#ea580c', text: '#fff' },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS.PENDING;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      letterSpacing: 0.5,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: c.text, opacity: 0.8,
      }} />
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
      background: '#1e3a5f', color: '#7dd3fc',
      fontFamily: 'monospace', letterSpacing: 0.5,
    }}>
      {date}
    </span>
  );
}

function UpdateStatusBadge({ label, colorKey }) {
  const c = UPDATE_STATUS_COLORS[colorKey] || UPDATE_STATUS_COLORS.blue;
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
      background: c.bg, color: c.text, whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

function ActionButton({ label, color }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
        border: `1px solid ${color}`, cursor: 'pointer', whiteSpace: 'nowrap',
        background: hovered ? color : 'transparent',
        color: hovered ? '#fff' : color,
        transition: 'all 0.15s ease',
      }}
    >
      {label}
    </button>
  );
}

function RoleBanner({ role }) {
  const isAdmin = role === 'admin';
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 14px', borderRadius: 20, marginBottom: 20,
      background: isAdmin ? '#1e1b4b' : '#052e16',
      border: `1px solid ${isAdmin ? '#4338ca' : '#16a34a'}`,
    }}>
      <span style={{ fontSize: 13 }}>{isAdmin ? '🛡️' : '🤝'}</span>
      <span style={{
        fontSize: 12, fontWeight: 700, letterSpacing: 0.5,
        color: isAdmin ? '#a5b4fc' : '#86efac',
        textTransform: 'uppercase',
      }}>
        {isAdmin ? 'Admin View — Full Access' : 'Partner View — Restricted Access'}
      </span>
    </div>
  );
}

// ─── Cell Renderer ────────────────────────────────────────────────────────────

function renderCell(col, row, idx, role) {
  switch (col.key) {
    case 'sr':
      return idx + 1;
    case 'name':
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: '#22c55e', fontSize: 12 }}>✓</span>
          <span style={{ fontWeight: 600, color: '#f1f5f9' }}>{row.name}</span>
        </div>
      );
    case 'serviceId':
      return (
        <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#94a3b8' }}>
          {row.serviceId}
        </span>
      );
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
            <UpdateStatusBadge
              label={row.lastUpdateStatus}
              colorKey={row.lastUpdateStatusColor}
            />
          )}
        </div>
      );
    case 'actions':
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {SERVICE_ACTIONS[role]?.map(a => (
            <ActionButton key={a.label} label={a.label} color={a.color} />
          ))}
        </div>
      );
    default:
      return (
        <span style={{ color: row[col.key] === '--' ? '#475569' : '#cbd5e1' }}>
          {row[col.key] ?? '--'}
        </span>
      );
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Services({ role = 'admin' }) {
  const [activeRole, setActiveRole] = useState(role);

  const visibleCols = SERVICE_COLUMNS.filter(c => c.roles.includes(activeRole));

  return (
    <div style={{ padding: '24px 28px', fontFamily: 'Roboto, sans-serif' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#f1f5f9' }}>
            Services
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
            Manage and monitor all registered services
          </p>
        </div>

        {/* Role switcher — for demo; in production this comes from App.jsx */}
        <div style={{ display: 'flex', gap: 8 }}>
          {['admin', 'partner'].map(r => (
            <button
              key={r}
              onClick={() => setActiveRole(r)}
              style={{
                padding: '6px 16px', borderRadius: 8, fontSize: 12,
                fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize',
                border: `1px solid ${activeRole === r ? '#6366f1' : '#334155'}`,
                background: activeRole === r ? '#6366f1' : 'transparent',
                color: activeRole === r ? '#fff' : '#94a3b8',
                transition: 'all 0.15s ease',
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <RoleBanner role={activeRole} />

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total Services', value: svcRows.length, color: '#6366f1' },
          { label: 'Active',         value: svcRows.filter(r => r.status === 'ACTIVE').length,   color: '#22c55e' },
          { label: 'Inactive',       value: svcRows.filter(r => r.status === 'INACTIVE').length, color: '#ef4444' },
        ].map(s => (
          <div key={s.label} style={{
            padding: '12px 20px', borderRadius: 10, minWidth: 110,
            background: '#0f172a', border: `1px solid #1e293b`,
          }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{
        borderRadius: 12, overflow: 'hidden',
        border: '1px solid #1e293b', background: '#0f172a',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#1e293b' }}>
                {visibleCols.map(col => (
                  <th key={col.key} style={{
                    padding: '12px 16px', textAlign: 'left', fontWeight: 600,
                    color: '#94a3b8', whiteSpace: 'nowrap', fontSize: 12,
                    letterSpacing: 0.4,
                    borderBottom: '1px solid #334155',
                  }}>
                    {col.label}
                    {/* Show lock icon for admin-only columns when in admin view */}
                    {col.roles.length === 1 && col.roles[0] === 'admin' && activeRole === 'admin' && (
                      <span title="Admin only" style={{ marginLeft: 4, fontSize: 10, opacity: 0.5 }}>🔒</span>
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
                    background: idx % 2 === 0 ? '#0f172a' : '#0a1628',
                    borderBottom: '1px solid #1e293b',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#172033'}
                  onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? '#0f172a' : '#0a1628'}
                >
                  {visibleCols.map(col => (
                    <td key={col.key} style={{
                      padding: '12px 16px', color: '#cbd5e1',
                      verticalAlign: 'middle',
                    }}>
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
          padding: '10px 16px', background: '#1e293b',
          fontSize: 12, color: '#64748b',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span>Showing 1 to {svcRows.length} of {svcRows.length} entries</span>
          <span style={{ color: '#475569' }}>
            {visibleCols.length} columns visible
            {activeRole === 'partner' && (
              <span style={{ color: '#f59e0b', marginLeft: 8 }}>
                ⚠ Some columns hidden based on your role
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}