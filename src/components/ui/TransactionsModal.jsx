import { useState, useEffect } from 'react';
import { transactionRows } from '../../data/tables';
import TransactionDetailModal from './TransactionDetailModal';
import TransactionDashboardModal from './TransactionDashboardModal';

const REASON_COLORS = {
  'MCPS-2000':  { bg: '#7c3aed', text: '#fff' },
  'MCPS-1300':  { bg: '#2563eb', text: '#fff' },
  'AMCPS-1310': { bg: '#0891b2', text: '#fff' },
};

const PAGE_SIZE_OPTIONS = [10, 25, 50];

export default function TransactionsModal({ onClose, title = 'Clicked Clean — Transactions', ipFilter: initialIp = '' }) {
  const [selectedRow,   setSelectedRow]   = useState(null);
  const [dashMode,      setDashMode]      = useState(null); // null | 'dashboard' | 'excluded'
  const [ipFilter,  setIpFilter]  = useState(initialIp);
  const [search,   setSearch]   = useState(initialIp);
  const [page,     setPage]     = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const filtered = transactionRows.filter((r) =>
    r.id.includes(search) ||
    r.network.toLowerCase().includes(search.toLowerCase()) ||
    r.apk.toLowerCase().includes(search.toLowerCase()) ||
    r.userIp.includes(search)
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalEntries = 112003; // simulate large dataset

  // Page buttons
  const pageNums = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pageNums.push(i);
  } else {
    pageNums.push(1, 2, 3, 4, 5, '…', totalPages);
  }

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(15,23,42,.55)',
        backdropFilter: 'blur(3px)', zIndex: 900,
      }} />

      {/* Modal */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 'min(98vw, 1300px)', maxHeight: '90vh',
        background: '#fff', borderRadius: 16,
        boxShadow: '0 24px 80px rgba(0,0,0,.25)',
        zIndex: 901, display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 24px', borderBottom: '1px solid #f1f5f9',
          background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg,#22c55e,#16a34a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, color: '#fff', fontWeight: 900,
            }}>✓</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#14532d' }}>{ipFilter ? `Transactions — IP: ${ipFilter}` : title}</div>
              <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>
                Showing {filtered.length.toLocaleString()} of {totalEntries.toLocaleString()} entries
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button style={{
              padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: '#1d4ed8', color: '#fff', fontSize: 12, fontWeight: 700,
            }}>Export Transactions</button>
            <button onClick={() => setDashMode('dashboard')} style={{
              padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: '#0f766e', color: '#fff', fontSize: 12, fontWeight: 700,
            }}>Dashboard</button>
            <button onClick={() => setDashMode('excluded')} style={{
              padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: '#7c3aed', color: '#fff', fontSize: 12, fontWeight: 700,
            }}>Excluded Dashboard</button>
            <button onClick={onClose} style={{
              width: 32, height: 32, borderRadius: 8, border: '1px solid #e2e8f0',
              background: '#f8fafc', cursor: 'pointer', fontSize: 18, color: '#64748b',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
            }}>×</button>
          </div>
        </div>

        {/* Active IP filter pill */}
        {ipFilter && (
          <div style={{ padding: '8px 24px', background: '#eff6ff', borderBottom: '1px solid #dbeafe', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 11, color: '#1d4ed8', fontWeight: 600 }}>🔍 Filtering by User IP:</span>
            <span style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: '#1e40af', background: '#dbeafe', padding: '2px 10px', borderRadius: 20 }}>{ipFilter}</span>
            <button onClick={() => { setIpFilter(''); setSearch(''); }} style={{ marginLeft: 4, padding: '2px 10px', borderRadius: 20, border: 'none', background: '#fee2e2', color: '#dc2626', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>✕ Clear</button>
          </div>
        )}

        {/* Toolbar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 24px', borderBottom: '1px solid #f1f5f9', background: '#fafafa',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569' }}>
            Show
            <select value={pageSize} onChange={(e) => { setPageSize(+e.target.value); setPage(1); }} style={{
              border: '1px solid #e2e8f0', borderRadius: 6, padding: '4px 8px',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', outline: 'none',
            }}>
              {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            entries
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569' }}>
            Search:
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              style={{
                border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 12px',
                fontSize: 12, outline: 'none', width: 220,
              }} />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead style={{ position: 'sticky', top: 0, background: '#f8fafc', zIndex: 10 }}>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                {['Sr.', 'ID', 'Time', 'Network', 'APK', 'User IP', 'MSISDN', 'Status', 'Reason', 'Interaction', 'View'].map((h) => (
                  <th key={h} style={{
                    padding: '10px 12px', textAlign: 'left', fontSize: 11,
                    fontWeight: 700, color: '#64748b', textTransform: 'uppercase',
                    letterSpacing: '.6px', whiteSpace: 'nowrap',
                  }}>
                    {h} {h !== 'View' && h !== 'Sr.' && <span style={{ opacity: .4, fontSize: 9 }}>↕</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((r, i) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: '#94a3b8' }}>
                    {(page - 1) * pageSize + i + 1}
                  </td>
                  <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontSize: 11, color: '#334155', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {r.id}
                  </td>
                  <td style={{ padding: '10px 12px', color: '#475569', whiteSpace: 'nowrap' }}>{r.time}</td>
                  <td style={{ padding: '10px 12px', color: '#334155', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.network}</td>
                  <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontSize: 10, color: '#475569', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.apk || '—'}</td>
                  <td style={{ padding: '10px 12px', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{r.userIp}</td>
                  <td style={{ padding: '10px 12px', color: '#64748b' }}>{r.msisdn || '—'}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                      background: r.status === 'Block' ? '#fef2f2' : '#f0fdf4',
                      color:      r.status === 'Block' ? '#dc2626'  : '#16a34a',
                    }}>{r.status}</span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {r.reasons.map((rsn) => {
                        const col = REASON_COLORS[rsn] || { bg: '#64748b', text: '#fff' };
                        return (
                          <span key={rsn} style={{
                            padding: '2px 8px', borderRadius: 5, fontSize: 10, fontWeight: 700,
                            background: col.bg, color: col.text, whiteSpace: 'nowrap',
                          }}>{rsn}</span>
                        );
                      })}
                    </div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                      background: '#fef2f2', color: '#dc2626',
                    }}>{r.interaction}</span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <button onClick={() => setSelectedRow(r)} style={{
                      padding: '5px 14px', borderRadius: 6, border: 'none', cursor: 'pointer',
                      background: '#22c55e', color: '#fff', fontSize: 11, fontWeight: 700,
                    }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 24px', borderTop: '1px solid #f1f5f9', background: '#fafafa',
        }}>
          <div style={{ fontSize: 12, color: '#64748b' }}>
            Showing {Math.min((page - 1) * pageSize + 1, filtered.length)} to {Math.min(page * pageSize, filtered.length)} of {totalEntries.toLocaleString()} entries
          </div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} style={{
              padding: '5px 12px', borderRadius: 6, border: '1px solid #e2e8f0',
              background: page === 1 ? '#f8fafc' : '#fff', cursor: page === 1 ? 'default' : 'pointer',
              fontSize: 12, color: page === 1 ? '#cbd5e1' : '#334155', fontWeight: 600,
            }}>Previous</button>
            {pageNums.map((n, i) => (
              <button key={i} onClick={() => typeof n === 'number' && setPage(n)} style={{
                width: 34, height: 34, borderRadius: 6, border: 'none', cursor: typeof n === 'number' ? 'pointer' : 'default',
                background: page === n ? '#1d4ed8' : '#fff',
                color:      page === n ? '#fff'    : '#475569',
                fontWeight: 700, fontSize: 12,
                border: page === n ? 'none' : '1px solid #e2e8f0',
              }}>{n}</button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{
              padding: '5px 12px', borderRadius: 6, border: '1px solid #e2e8f0',
              background: '#fff', cursor: 'pointer', fontSize: 12, color: '#334155', fontWeight: 600,
            }}>Next</button>
          </div>
        </div>
      </div>
      {selectedRow && <TransactionDetailModal row={selectedRow} onClose={() => setSelectedRow(null)} onUserIp={(ip) => { setSelectedRow(null); setIpFilter(ip); setSearch(ip); setPage(1); }} />}
      {dashMode && <TransactionDashboardModal title={ipFilter ? `IP: ${ipFilter}` : title} mode={dashMode} onClose={() => setDashMode(null)} />}
    </>
  );
}
