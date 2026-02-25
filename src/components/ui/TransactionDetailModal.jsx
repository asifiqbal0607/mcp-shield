import { useState, useEffect } from 'react';

const GREEN  = '#22c55e';
const BLUE   = '#1d4ed8';
const SLATE  = '#64748b';
const ROSE   = '#dc2626';

// ─── Mock detail data generator ───────────────────────────────────────────────
function makeDetail(row) {
  return {
    url:           'http://aciq.playit.mobi/confirm-asiacell?uniquid=ask004b49312599e074c94c3951d698ad23',
    referrer:      'http://aciq.playit.mobi/signup?parameter=60432life-15od-4cb2-837f-2e8e7f380f6b&trafficsource=OffyClick',
    time:          row?.time || 'Feb 25, 04:23:08.438 AM',
    timezone:      'Asia/Baghdad',
    transactionId: row?.id || '20260225042308_fd1f907042ef4af9bfe261415926f45',
    client:        'IQ Grand Technology',
    clientColor:   '#22c55e',
    service:       'GC 2231 Playit',
    serviceColor:  '#0891b2',
    queried:       'Yes',
    queriedTime:   '2026-02-25 07:23:08.488 AM',
    queriedLabel:  'Asia/Baghdad',
    userIp:        row?.userIp || '89.46.206.31',
    userAgent:     'Mozilla/5.0 (Linux; Android 13; SM-M127F Build/TP1A.220624.014) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.135 Mobile Safari/537.36',
    country:       'Iraq',
    continent:     'Asia',
    timezone2:     'Asia/Baghdad',
    device:        'Samsung SM-M127F',
    os:            'Android',
    browser:       'Chrome Mobile',
    network:       row?.network || 'Asiacell Communications Pjsc',
    status:        row?.status || 'Clean',
    statusColor:   '#22c55e',
    score:         10,
    apk:           row?.apk || '',
    reasons:       row?.reasons || [],
  };
}

const EVENTS = [
  { name: 'Pointerdown', time: '2026-02-25 04:23:19.217 AM', tests: ['Screen Test', 'Event Layers Test', 'Client Test'] },
  { name: 'Touchstart',  time: '2026-02-25 04:23:19.221 AM', tests: ['Screen Test', 'Client Test', 'Touch Area Test'] },
  { name: 'Pointerup',   time: '2026-02-25 04:23:19.225 AM', tests: ['Screen Test', 'Event Layers Test', 'Client Test'] },
  { name: 'Touchend',    time: '2026-02-25 04:23:19.257 AM', tests: ['Screen Test', 'Client Test', 'Touch Area Test'] },
  { name: 'Mousedown',   time: '2026-02-25 04:23:19.428 AM', tests: ['Screen Test', 'Event Layers Test', 'Client Test'] },
  { name: 'Mouseup',     time: '2026-02-25 04:23:19.432 AM', tests: ['Screen Test', 'Event Layers Test', 'Client Test'] },
  { name: 'Click',       time: '2026-02-25 04:23:19.457 AM', tests: ['Screen Test', 'Event Layers Test', 'Client Test'] },
];

const DEVICE_CHECKS = {
  'UI Rendering': [
    'Point 0 Test', 'Background Rendering Test',
    '0x0 0x0 Pixel View W.R.T Device', '0x0 0x0 Pixel View W.R.T Browser',
  ],
  'Spoofing': [
    'Canvas Fingerprint Test', 'WebGL Renderer Test',
    'Audio Context Test', 'Font Metrics Test',
  ],
  'JavaScript Challenge': [
    'Timing Attack Test', 'Prototype Chain Test',
    'Eval Behavior Test', 'Async Context Test',
  ],
};

function PassedBadge() {
  return (
    <span style={{
      padding: '2px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700,
      background: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0',
    }}>Passed</span>
  );
}

function Field({ label, children, mono }) {
  return (
    <div style={{ display: 'contents' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: SLATE, padding: '7px 0', borderBottom: '1px solid #f1f5f9', alignSelf: 'center' }}>{label}</div>
      <div style={{ fontSize: 11, color: '#1a1a2e', padding: '7px 0 7px 16px', borderBottom: '1px solid #f1f5f9', fontFamily: mono ? 'monospace' : 'inherit', wordBreak: 'break-all' }}>{children}</div>
    </div>
  );
}

export default function TransactionDetailModal({ row, onClose, onUserIp }) {
  const [devTab,      setDevTab]      = useState('UI Rendering');
  const [expandedEvt, setExpandedEvt] = useState(null);
  const d = makeDetail(row);

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(15,23,42,.6)',
        backdropFilter: 'blur(4px)', zIndex: 1000,
      }} />

      {/* Modal shell */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 'min(96vw, 920px)', maxHeight: '92vh',
        background: '#fff', borderRadius: 18,
        boxShadow: '0 32px 80px rgba(0,0,0,.3)',
        zIndex: 1001, display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>

        {/* ── Header ── */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 22px', background: 'linear-gradient(135deg,#0f172a,#1e3a5f)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16,
            }}>🔍</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>Transaction Detail</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', fontFamily: 'monospace', marginTop: 1, wordBreak: 'break-all', maxWidth: 580 }}>
                {d.transactionId}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={() => onUserIp && onUserIp(d.userIp)} style={{ padding: '6px 13px', borderRadius: 7, border: 'none', cursor: 'pointer', background: 'rgba(99,102,241,.8)', color: '#fff', fontSize: 11, fontWeight: 700 }}>👤 User IP</button>
            <button style={{ padding: '6px 13px', borderRadius: 7, border: 'none', cursor: 'pointer', background: 'rgba(245,158,11,.8)', color: '#fff', fontSize: 11, fontWeight: 700 }}>📊 Anomaly Analysis</button>
            <button style={{ padding: '6px 13px', borderRadius: 7, border: 'none', cursor: 'pointer', background: 'rgba(34,197,94,.8)', color: '#fff', fontSize: 11, fontWeight: 700 }}>📄 Show Raw Data</button>
            <button onClick={onClose} style={{
              width: 30, height: 30, borderRadius: 8, border: '1px solid rgba(255,255,255,.2)',
              background: 'rgba(255,255,255,.08)', cursor: 'pointer',
              color: '#fff', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>×</button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>

          {/* ── 1. Transaction Info ── */}
          <section>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#1a1a2e', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 4, height: 16, background: BLUE, borderRadius: 2, display: 'inline-block' }} />
              Transaction Information
            </div>

            <div style={{ border: '1px solid #e8ecf3', borderRadius: 12, overflow: 'hidden' }}>
              {/* Two-column rows */}
              {[
                [['URL',            <a href="#" style={{ color: BLUE, fontSize: 11, wordBreak:'break-all' }}>{d.url}</a>],
                 ['Country',        d.country]],
                [['Referrer',       <a href="#" style={{ color: BLUE, fontSize: 11, wordBreak:'break-all' }}>{d.referrer}</a>],
                 ['Continent',      d.continent]],
                [['Time',           <>{d.time} <span style={{ color: SLATE, fontSize: 10 }}>({d.timezone})</span></>],
                 ['Time Zone',      d.timezone2]],
                [['Transaction ID', <span style={{ fontFamily:'monospace', fontSize:11 }}>{d.transactionId}</span>],
                 ['Device',         d.device]],
                [['Client',         <span style={{ background: d.clientColor, color:'#fff', padding:'2px 12px', borderRadius:20, fontSize:11, fontWeight:700 }}>{d.client}</span>],
                 ['OS',             d.os]],
                [['Service',        <span style={{ background: d.serviceColor, color:'#fff', padding:'2px 12px', borderRadius:20, fontSize:11, fontWeight:700 }}>{d.service}</span>],
                 ['Browser',        d.browser]],
                [['Queried',        <><span style={{ background:GREEN, color:'#fff', padding:'2px 10px', borderRadius:6, fontSize:11, fontWeight:700, marginRight:8 }}>{d.queried}</span><span style={{ fontSize:11, color:SLATE }}>{d.queriedTime}</span></>],
                 ['Network',        d.network]],
                [['User IP',        <span style={{ fontFamily:'monospace', fontSize:12, fontWeight:700 }}>{d.userIp}</span>],
                 ['Status',         <><span style={{ background: d.statusColor, color:'#fff', padding:'2px 10px', borderRadius:20, fontSize:11, fontWeight:700, marginRight:10 }}>{d.status}</span><span style={{ fontSize:12, fontWeight:700, color:'#1a1a2e' }}>Score: {d.score}</span></>]],
              ].map(([left, right], i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '140px 1fr 140px 1fr',
                  background: i % 2 === 0 ? '#fff' : '#fafafa',
                  borderBottom: '1px solid #f1f5f9',
                }}>
                  <div style={{ padding: '10px 16px', fontSize: 11, fontWeight: 700, color: SLATE, borderRight: '1px solid #f1f5f9' }}>{left[0]}</div>
                  <div style={{ padding: '10px 16px', fontSize: 12, color: '#1a1a2e', borderRight: '1px solid #f1f5f9' }}>{left[1]}</div>
                  <div style={{ padding: '10px 16px', fontSize: 11, fontWeight: 700, color: SLATE, borderRight: '1px solid #f1f5f9' }}>{right[0]}</div>
                  <div style={{ padding: '10px 16px', fontSize: 12, color: '#1a1a2e' }}>{right[1]}</div>
                </div>
              ))}

              {/* User Agent — full width */}
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', background: '#fff' }}>
                <div style={{ padding: '10px 16px', fontSize: 11, fontWeight: 700, color: SLATE, borderRight: '1px solid #f1f5f9' }}>User Agent</div>
                <div style={{ padding: '10px 16px', fontSize: 11, color: '#334155', fontFamily: 'monospace', lineHeight: 1.7 }}>{d.userAgent}</div>
              </div>
            </div>
          </section>

          {/* ── 2. Device Verification ── */}
          <section>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#1a1a2e', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 4, height: 16, background: '#7c3aed', borderRadius: 2, display: 'inline-block' }} />
              Device Verification
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 2, marginBottom: 12, background: '#f1f5f9', borderRadius: 10, padding: 4 }}>
              {Object.keys(DEVICE_CHECKS).map((tab) => (
                <button key={tab} onClick={() => setDevTab(tab)} style={{
                  flex: 1, padding: '7px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                  fontSize: 11, fontWeight: 700,
                  background: devTab === tab ? '#fff' : 'transparent',
                  color:      devTab === tab ? '#1a1a2e' : SLATE,
                  boxShadow:  devTab === tab ? '0 1px 4px rgba(0,0,0,.1)' : 'none',
                  transition: 'all .15s',
                }}>{tab}</button>
              ))}
            </div>

            {/* Checks grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {DEVICE_CHECKS[devTab].map((check) => (
                <div key={check} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 14px', background: '#fafafa', borderRadius: 10,
                  border: '1px solid #f1f5f9',
                }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#334155' }}>{check}</span>
                  <PassedBadge />
                </div>
              ))}
            </div>
          </section>

          {/* ── 3. Events Timeline ── */}
          <section>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#1a1a2e', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 4, height: 16, background: GREEN, borderRadius: 2, display: 'inline-block' }} />
              Events Timeline
              <span style={{ fontSize: 10, color: SLATE, fontWeight: 500 }}>— click an event to expand tests</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {EVENTS.map((evt, i) => {
                const isOpen = expandedEvt === i;
                return (
                  <div key={i} style={{ border: `1px solid ${isOpen ? '#bbf7d0' : '#f1f5f9'}`, borderRadius: 12, overflow: 'hidden', transition: 'border-color .15s' }}>
                    {/* Event row */}
                    <div onClick={() => setExpandedEvt(isOpen ? null : i)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '10px 16px', cursor: 'pointer',
                        background: isOpen ? '#f0fdf4' : '#fafafa',
                        transition: 'background .15s',
                      }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: '50%',
                          background: isOpen ? GREEN : '#e2e8f0',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, fontWeight: 800, color: isOpen ? '#fff' : SLATE,
                          flexShrink: 0, transition: 'all .15s',
                        }}>{i + 1}</div>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 800, color: '#1a1a2e' }}>{evt.name}</div>
                          <div style={{ fontSize: 10, color: SLATE, marginTop: 1 }}>Event Information</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 10, color: SLATE, fontFamily: 'monospace' }}>{evt.time}</span>
                        <span style={{ fontSize: 11, color: SLATE, transition: 'transform .15s', display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
                      </div>
                    </div>

                    {/* Expanded tests — compact inline grid */}
                    {isOpen && (
                      <div style={{ padding: '10px 16px 12px', background: '#fff', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                        {evt.tests.map((test) => (
                          <div key={test} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '7px 12px', background: '#f0fdf4', borderRadius: 8,
                            border: '1px solid #bbf7d0',
                          }}>
                            <span style={{ fontSize: 10, fontWeight: 600, color: '#166534' }}>{test}</span>
                            <PassedBadge />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* ── Footer ── */}
        <div style={{
          display: 'flex', justifyContent: 'flex-end', gap: 8,
          padding: '12px 22px', borderTop: '1px solid #f1f5f9', background: '#fafafa', flexShrink: 0,
        }}>
          <button onClick={onClose} style={{
            padding: '8px 20px', borderRadius: 8, border: '1px solid #e2e8f0',
            background: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: SLATE,
          }}>Close</button>
          <button style={{
            padding: '8px 20px', borderRadius: 8, border: 'none',
            background: BLUE, cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#fff',
          }}>Export This Transaction</button>
        </div>
      </div>
    </>
  );
}
