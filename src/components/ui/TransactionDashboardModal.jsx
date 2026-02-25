import { useState, useEffect } from 'react';
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';

const BLUE  = '#1d4ed8';
const GREEN = '#22c55e';
const AMBER = '#f59e0b';
const ROSE  = '#dc2626';
const SLATE = '#64748b';
const VIOLET= '#7c3aed';
const CYAN  = '#0891b2';

const PALETTE = [BLUE, GREEN, AMBER, ROSE, VIOLET, CYAN, '#f97316', '#84cc16'];

// ── Generate mock dashboard data scoped to the filter context ─────────────────
function makeData(title) {
  const isExcluded = title.toLowerCase().includes('excluded');
  const base = isExcluded ? 12000 : 50000;

  const trend = Array.from({ length: 14 }, (_, i) => ({
    d: `Feb ${i + 12}`,
    visits: Math.round(base * (0.7 + Math.random() * 0.6)),
    clicks: Math.round(base * (0.3 + Math.random() * 0.4)),
    blocks: Math.round(base * (0.1 + Math.random() * 0.2)),
  }));

  const byNetwork = [
    { name: 'Total Access Comm.', value: 42 },
    { name: 'Asiacell',           value: 28 },
    { name: 'TRUE INTERNET',      value: 14 },
    { name: 'Al Atheer',          value: 9  },
    { name: 'Others',             value: 7  },
  ];

  const byReason = [
    { name: 'MCPS-2000',  value: 38 },
    { name: 'MCPS-1300',  value: 31 },
    { name: 'AMCPS-1310', value: 22 },
    { name: 'MCPS-1100',  value: 9  },
  ];

  const byHour = Array.from({ length: 24 }, (_, h) => ({
    h: `${String(h).padStart(2,'0')}:00`,
    count: Math.round(base * 0.02 * (0.5 + Math.random())),
  }));

  const stats = [
    { label: 'Total Transactions', value: base.toLocaleString(),                   color: BLUE  },
    { label: 'Unique IPs',         value: Math.round(base * 0.12).toLocaleString(), color: CYAN  },
    { label: 'Unique Networks',    value: '18',                                     color: VIOLET},
    { label: 'Avg Score',          value: isExcluded ? '3.2' : '8.7',              color: GREEN },
  ];

  return { trend, byNetwork, byReason, byHour, stats };
}

function SectionHead({ color, children }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 800, color: '#1a1a2e', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ width: 4, height: 16, background: color, borderRadius: 2, display: 'inline-block' }} />
      {children}
    </div>
  );
}

export default function TransactionDashboardModal({ title, mode = 'dashboard', onClose }) {
  const isExcluded = mode === 'excluded';
  const data = makeData(title);

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0,
        background: 'rgba(15,23,42,.6)', backdropFilter: 'blur(4px)', zIndex: 1000,
      }} />

      {/* Modal */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 'min(98vw, 1200px)', maxHeight: '92vh',
        background: '#f0f4f8', borderRadius: 18,
        boxShadow: '0 32px 80px rgba(0,0,0,.3)',
        zIndex: 1001, display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 22px', flexShrink: 0,
          background: isExcluded
            ? 'linear-gradient(135deg,#7c1d1d,#991b1b)'
            : 'linear-gradient(135deg,#0f172a,#1e3a5f)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: isExcluded ? 'rgba(252,165,165,.2)' : 'rgba(255,255,255,.12)',
              border: `1px solid ${isExcluded ? 'rgba(252,165,165,.3)' : 'rgba(255,255,255,.2)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            }}>{isExcluded ? '🚫' : '📊'}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>
                {isExcluded ? 'Excluded Dashboard' : 'Transaction Dashboard'}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', marginTop: 1 }}>
                {title} — filtered overview
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: 8,
            border: '1px solid rgba(255,255,255,.2)',
            background: 'rgba(255,255,255,.08)',
            cursor: 'pointer', color: '#fff', fontSize: 18,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>

          {/* ── KPI stats ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
            {data.stats.map((s) => (
              <div key={s.label} style={{
                background: '#fff', borderRadius: 12, padding: '16px 18px',
                borderTop: `3px solid ${s.color}`,
                boxShadow: '0 1px 6px rgba(0,0,0,.06)',
              }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: s.color, fontFamily: 'Georgia,serif' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: SLATE, fontWeight: 600, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* ── Trend line ── */}
          <div style={{ background: '#fff', borderRadius: 12, padding: '16px 18px', boxShadow: '0 1px 6px rgba(0,0,0,.06)' }}>
            <SectionHead color={BLUE}>Transaction Trend — Last 14 Days</SectionHead>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data.trend} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="d" tick={{ fontSize: 9, fill: '#cbd5e1' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: '#cbd5e1' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Line type="monotone" dataKey="visits" stroke={BLUE}  strokeWidth={2.5} dot={false} name="Visits" />
                <Line type="monotone" dataKey="clicks" stroke={GREEN} strokeWidth={2}   dot={false} name="Clicks" />
                <Line type="monotone" dataKey="blocks" stroke={ROSE}  strokeWidth={2}   dot={false} name="Blocks" strokeDasharray="4 2" />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 8 }}>
              {[['Visits', BLUE], ['Clicks', GREEN], ['Blocks', ROSE]].map(([l, c]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: SLATE }}>
                  <div style={{ width: 10, height: 3, background: c, borderRadius: 2 }} />{l}
                </div>
              ))}
            </div>
          </div>

          {/* ── Hourly volume + by-network pie ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: '16px 18px', boxShadow: '0 1px 6px rgba(0,0,0,.06)' }}>
              <SectionHead color={AMBER}>Transactions by Hour</SectionHead>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={data.byHour} margin={{ top: 0, right: 8, bottom: 0, left: -20 }}>
                  <XAxis dataKey="h" tick={{ fontSize: 8, fill: '#cbd5e1' }} axisLine={false} tickLine={false}
                    interval={2} />
                  <YAxis tick={{ fontSize: 9, fill: '#cbd5e1' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  <Bar dataKey="count" name="Transactions" radius={[3,3,0,0]}>
                    {data.byHour.map((_, i) => <Cell key={i} fill={i >= 6 && i <= 20 ? BLUE : VIOLET} fillOpacity={0.8} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background: '#fff', borderRadius: 12, padding: '16px 18px', boxShadow: '0 1px 6px rgba(0,0,0,.06)' }}>
              <SectionHead color={CYAN}>By Network</SectionHead>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <PieChart width={120} height={120}>
                  <Pie data={data.byNetwork} dataKey="value" cx={55} cy={55}
                    innerRadius={30} outerRadius={52} paddingAngle={2}>
                    {data.byNetwork.map((_, i) => <Cell key={i} fill={PALETTE[i]} />)}
                  </Pie>
                </PieChart>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {data.byNetwork.map((n, i) => (
                    <div key={n.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: PALETTE[i], flexShrink: 0 }} />
                        <span style={{ fontSize: 10, color: '#334155', fontWeight: 600 }}>{n.name}</span>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 800, color: PALETTE[i] }}>{n.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Block reasons bar ── */}
          <div style={{ background: '#fff', borderRadius: 12, padding: '16px 18px', boxShadow: '0 1px 6px rgba(0,0,0,.06)' }}>
            <SectionHead color={ROSE}>Block Reason Distribution</SectionHead>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
              {data.byReason.map((r, i) => (
                <div key={r.name} style={{
                  padding: '14px 16px', borderRadius: 10,
                  background: `${PALETTE[i]}10`, border: `1px solid ${PALETTE[i]}30`,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: PALETTE[i], fontFamily: 'Georgia,serif' }}>{r.value}%</div>
                  <div style={{ marginTop: 4 }}>
                    <span style={{
                      padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 800,
                      background: PALETTE[i], color: '#fff',
                    }}>{r.name}</span>
                  </div>
                  <div style={{ height: 4, background: '#f1f5f9', borderRadius: 2, marginTop: 8 }}>
                    <div style={{ height: '100%', width: `${r.value}%`, background: PALETTE[i], borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', justifyContent: 'flex-end',
          padding: '12px 22px', borderTop: '1px solid #e2e8f0',
          background: '#fff', flexShrink: 0,
        }}>
          <button onClick={onClose} style={{
            padding: '8px 22px', borderRadius: 8, border: 'none', cursor: 'pointer',
            background: BLUE, color: '#fff', fontSize: 12, fontWeight: 700,
          }}>Close</button>
        </div>
      </div>
    </>
  );
}
