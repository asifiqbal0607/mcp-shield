import { useState } from 'react';
import { GREEN, ROSE, SLATE, BLUE } from '../constants/colors';
import { groupsForRole } from '../constants/nav';

const PARTNER_VISIBLE = 4; // first N tabs shown directly; rest go into "More"

export default function TopNav({ role, page, setPage }) {
  const [openGroup, setOpenGroup] = useState(null);
  const groups     = groupsForRole(role);
  const isPartner  = role === 'partner';

  const flatItems   = groups.filter((g) => g.group === null).flatMap((g) => g.items);
  const groupedSecs = groups.filter((g) => g.group !== null);

  // All partner items flattened in order: flat first, then grouped
  const allPartnerItems = [
    ...flatItems,
    ...groupedSecs.flatMap((g) => g.items),
  ];
  const partnerVisible = allPartnerItems.slice(0, PARTNER_VISIBLE);
  const partnerMore    = allPartnerItems.slice(PARTNER_VISIBLE);
  const moreHasActive  = partnerMore.some((i) => i.key === page);

  const closeAll    = () => setOpenGroup(null);
  const toggleGroup = (g) => setOpenGroup((open) => (open === g ? null : g));

  return (
    <header style={{
      background: '#fff',
      borderBottom: '1px solid #e8ecf3',
      position: 'sticky', top: 0, zIndex: 200,
      boxShadow: '0 1px 6px rgba(0,0,0,.05)',
    }}>
      {/* ── Top strip ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 56, borderBottom: '1px solid #f1f5f9',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg,#1d4ed8,#3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 18, fontWeight: 900,
            boxShadow: '0 2px 8px rgba(29,78,216,.3)',
          }}>S</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1, color: '#0f172a' }}>MCP Shield</div>
            <div style={{ fontSize: 9, color: SLATE, letterSpacing: '1px', textTransform: 'uppercase', marginTop: 2 }}>
              {isPartner ? 'Partner Portal' : 'Admin Portal'}
            </div>
          </div>
          <div style={{
            marginLeft: 4, padding: '3px 10px', borderRadius: 20,
            fontSize: 10, fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase',
            background: !isPartner ? '#fef3c7' : '#dbeafe',
            color:      !isPartner ? '#92400e' : '#1e40af',
            border:     !isPartner ? '1px solid #fde68a' : '1px solid #bfdbfe',
          }}>
            {isPartner ? 'Partner' : 'Admin'}
          </div>
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Live pill */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '5px 11px', borderRadius: 22,
            background: '#f0fdf4', border: '1px solid #bbf7d0',
          }}>
            <span className="live-dot" style={{
              display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
              background: GREEN, boxShadow: `0 0 5px ${GREEN}88`,
            }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#16a34a' }}>Live · ZA</span>
          </div>

          <button style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 13px',
            borderRadius: 22, border: '1px solid #e2e8f0', background: '#f8fafc',
            color: SLATE, fontSize: 11, fontWeight: 600, cursor: 'pointer',
          }}>📅 Sep 2024</button>

          <div className="nav-divider" />

          {/* Role switcher */}
          <div className="role-pill">
            {['admin', 'partner'].map((r) => (
              <button key={r} className={`rp-btn ${role === r ? 'on' : 'off'}`}
                onClick={() => setPage('overview', r)}>
                {r === 'admin' ? 'Admin' : 'Partner'}
              </button>
            ))}
          </div>

          <div className="nav-divider" />

          {/* Bell */}
          <div style={{ position: 'relative' }}>
            <button style={{
              width: 34, height: 34, borderRadius: 8, border: '1px solid #e2e8f0',
              background: '#f8fafc', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 14, color: SLATE,
            }}>🔔</button>
            <span style={{
              position: 'absolute', top: 5, right: 5, width: 8, height: 8,
              borderRadius: '50%', background: ROSE, border: '2px solid #fff',
            }} />
          </div>

          {/* Avatar */}
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'linear-gradient(135deg,#1d4ed8,#3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 800, color: '#fff', cursor: 'pointer',
          }}>
            {isPartner ? 'P' : 'A'}
          </div>

          <button className="exp-btn">Export ↗</button>
        </div>
      </div>

      {/* ── Tab row ── */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '0 20px', height: 44, gap: 0, position: 'relative',
      }} onClick={(e) => { if (e.currentTarget === e.target) closeAll(); }}>

        {/* ── PARTNER: first 4 tabs + "More" dropdown ── */}
        {isPartner ? (
          <>
            {partnerVisible.map((p) => (
              <button key={p.key}
                className={`nav-tab${page === p.key ? ' active' : ''}`}
                onClick={() => { setPage(p.key); closeAll(); }}>
                <span className="t-icon">{p.icon}</span>
                {p.label}
              </button>
            ))}

            {/* "More" dropdown sits immediately after the visible tabs */}
            {partnerMore.length > 0 && (
              <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
                <button
                  className={`group-btn${moreHasActive ? ' active' : ''}${openGroup === '__more__' ? ' open' : ''}`}
                  onClick={() => toggleGroup('__more__')}>
                  <span style={{ fontSize: 13, marginRight: 2 }}>⊞</span> More
                  <span className="chev">▾</span>
                </button>

                {openGroup === '__more__' && (
                  <>
                    <div style={{ position: 'fixed', inset: 0, zIndex: 499 }} onClick={closeAll} />
                    <div className="group-drop" style={{ left: 'auto', right: 0 }}>
                      <div style={{
                        padding: '4px 12px 8px', fontSize: 9, fontWeight: 700,
                        color: SLATE, textTransform: 'uppercase', letterSpacing: '1px',
                      }}>More Pages</div>
                      {partnerMore.map((p) => (
                        <button key={p.key}
                          className={`drop-item${page === p.key ? ' active' : ''}`}
                          onClick={() => { setPage(p.key); closeAll(); }}>
                          <span className="di-ic">{p.icon}</span>
                          <span style={{ flex: 1 }}>{p.label}</span>
                          {page === p.key && <span style={{ color: BLUE, fontSize: 13 }}>✓</span>}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        ) : (
          /* ── ADMIN: original grouped dropdown behaviour ── */
          <>
            {flatItems.map((p) => (
              <button key={p.key}
                className={`nav-tab${page === p.key ? ' active' : ''}`}
                onClick={() => { setPage(p.key); closeAll(); }}>
                <span className="t-icon">{p.icon}</span>
                {p.label}
              </button>
            ))}

            {groupedSecs.map((sec) => {
              const secActive = sec.items.some((i) => i.key === page);
              const isOpen    = openGroup === sec.group;
              return (
                <div key={sec.group} style={{
                  position: 'relative', height: '100%',
                  display: 'flex', alignItems: 'center',
                }}>
                  <button
                    className={`group-btn${secActive ? ' active' : ''}${isOpen ? ' open' : ''}`}
                    onClick={() => toggleGroup(sec.group)}>
                    {sec.group}
                    <span className="chev">▾</span>
                  </button>

                  {isOpen && (
                    <>
                      <div style={{ position: 'fixed', inset: 0, zIndex: 499 }} onClick={closeAll} />
                      <div className="group-drop">
                        <div style={{
                          padding: '4px 12px 8px', fontSize: 9, fontWeight: 700,
                          color: SLATE, textTransform: 'uppercase', letterSpacing: '1px',
                        }}>{sec.group}</div>
                        {sec.items.map((p) => (
                          <button key={p.key}
                            className={`drop-item${page === p.key ? ' active' : ''}`}
                            onClick={() => { setPage(p.key); closeAll(); }}>
                            <span className="di-ic">{p.icon}</span>
                            <span style={{ flex: 1 }}>{p.label}</span>
                            {p.badge && (
                              <span style={{
                                background: `${p.badge.c}20`, color: p.badge.c,
                                fontSize: 9, fontWeight: 800,
                                padding: '2px 6px', borderRadius: 10,
                              }}>{p.badge.n}</span>
                            )}
                            {page === p.key && <span style={{ color: BLUE, fontSize: 13 }}>✓</span>}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </header>
  );
}
