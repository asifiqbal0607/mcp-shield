import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, SectionTitle } from '../components/ui';
import { BLUE, GREEN, AMBER, ROSE, SLATE, PALETTE } from '../constants/colors';
import { geoSpreadData } from '../data/tables';

// ─── Mini world map using SVG paths (Africa-centric) ──────────────────────────
// Approximate bounding boxes for highlighted countries as SVG rects on a
// 800×420 equirectangular projection (lon -180→180, lat 90→-90)
function lonToX(lon) { return ((lon + 180) / 360) * 800; }
function latToY(lat) { return ((90 - lat)  / 180) * 420; }

const COUNTRY_SHAPES = [
  { code: 'SD', name: 'Sudan',        lon: 30,  lat: 15,  w: 60,  h: 55  },
  { code: 'ZA', name: 'South Africa', lon: 25,  lat: -29, w: 55,  h: 40  },
  { code: 'NG', name: 'Nigeria',      lon: 8,   lat: 8,   w: 30,  h: 30  },
  { code: 'ET', name: 'Ethiopia',     lon: 40,  lat: 9,   w: 40,  h: 35  },
  { code: 'KE', name: 'Kenya',        lon: 37,  lat: 0,   w: 30,  h: 30  },
  { code: 'EG', name: 'Egypt',        lon: 30,  lat: 26,  w: 45,  h: 30  },
  { code: 'GH', name: 'Ghana',        lon: -1,  lat: 8,   w: 18,  h: 20  },
  { code: 'TZ', name: 'Tanzania',     lon: 35,  lat: -6,  w: 30,  h: 28  },
  { code: 'UG', name: 'Uganda',       lon: 32,  lat: 1,   w: 18,  h: 18  },
  { code: 'ZM', name: 'Zambia',       lon: 28,  lat: -14, w: 28,  h: 25  },
  { code: 'US', name: 'United States',lon: -100,lat: 38,  w: 80,  h: 40  },
];

function GeoMap({ data }) {
  const maxVal = Math.max(...data.map((d) => d.visits));
  const byCode = Object.fromEntries(data.map((d) => [d.code, d]));

  return (
    <div style={{ background: '#f0f7ff', borderRadius: 12, padding: 12, overflow: 'hidden' }}>
      <svg viewBox="0 0 800 420" style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* Ocean background */}
        <rect width="800" height="420" fill="#d6eaf8" rx="8" />

        {/* Grid lines */}
        {[-60,-30,0,30,60].map((lat) => (
          <line key={lat} x1="0" y1={latToY(lat)} x2="800" y2={latToY(lat)}
            stroke="#b3d4ec" strokeWidth="0.5" strokeDasharray="4,4" />
        ))}
        {[-120,-60,0,60,120].map((lon) => (
          <line key={lon} x1={lonToX(lon)} y1="0" x2={lonToX(lon)} y2="420"
            stroke="#b3d4ec" strokeWidth="0.5" strokeDasharray="4,4" />
        ))}

        {/* Land fill (simplified continent blocks) */}
        {[
          // Africa block
          'M 370 100 L 440 95 L 460 120 L 455 200 L 430 260 L 395 295 L 370 290 L 345 265 L 330 220 L 335 150 Z',
          // Europe block
          'M 340 40 L 430 35 L 445 70 L 420 85 L 380 80 L 345 70 Z',
          // Asia block
          'M 450 35 L 680 30 L 720 80 L 700 130 L 640 150 L 560 145 L 490 120 L 455 90 Z',
          // North America block
          'M 50 50 L 200 45 L 220 100 L 200 160 L 150 175 L 80 160 L 45 110 Z',
          // South America block
          'M 150 190 L 220 185 L 235 260 L 210 320 L 165 330 L 135 290 L 130 230 Z',
          // Australia block
          'M 580 230 L 660 225 L 675 270 L 650 300 L 590 295 L 565 265 Z',
        ].map((d, i) => <path key={i} d={d} fill="#c8ddb0" stroke="#a8c890" strokeWidth="1" />)}

        {/* Country highlight overlays */}
        {COUNTRY_SHAPES.map((c) => {
          const d = byCode[c.code];
          if (!d) return null;
          const intensity = d.visits / maxVal;
          const alpha = 0.3 + intensity * 0.65;
          const x = lonToX(c.lon) - c.w / 2;
          const y = latToY(c.lat) - c.h / 2;
          return (
            <g key={c.code}>
              <rect x={x} y={y} width={c.w} height={c.h} rx="4"
                fill={BLUE} fillOpacity={alpha}
                stroke={BLUE} strokeWidth="1.5" strokeOpacity="0.6" />
              <text x={x + c.w / 2} y={y + c.h / 2 - 4}
                textAnchor="middle" fontSize="7" fill="#fff" fontWeight="800">{c.code}</text>
              <text x={x + c.w / 2} y={y + c.h / 2 + 7}
                textAnchor="middle" fontSize="7" fill="rgba(255,255,255,.9)">
                {d.visits.toLocaleString()}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Gradient legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, padding: '0 8px' }}>
        <span style={{ fontSize: 10, color: SLATE, fontWeight: 600 }}>30</span>
        <div style={{ flex: 1, height: 10, borderRadius: 5,
          background: `linear-gradient(to right, #93c5fd, ${BLUE})` }} />
        <span style={{ fontSize: 10, color: SLATE, fontWeight: 600 }}>
          {Math.max(...geoSpreadData.map((d) => d.visits)).toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default function PageGeo() {
  const sortedData = [...geoSpreadData].sort((a, b) => b.visits - a.visits);

  return (
    <div>
      {/* ── Summary stats ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Countries Reached', value: '12',       color: BLUE  },
          { label: 'Top Country',       value: 'Sudan',    color: ROSE  },
          { label: 'Total Visits',      value: '5,23,690', color: GREEN },
          { label: 'Total Clicks',      value: '2,31,000', color: AMBER },
        ].map((s) => (
          <Card key={s.label} style={{ textAlign: 'center', borderTop: `3px solid ${s.color}` }}>
            <div style={{ fontSize: 26, fontWeight: 900, fontFamily: 'Georgia,serif', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: SLATE, marginTop: 4, fontWeight: 600 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* ── World map ── */}
      <Card style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <SectionTitle>Geo Spread</SectionTitle>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: SLATE, fontSize: 16 }}>≡</button>
        </div>
        <GeoMap data={geoSpreadData} />
      </Card>

      {/* ── Bar chart + table side by side ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Card>
          <SectionTitle>Visits by Country</SectionTitle>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sortedData} layout="vertical"
              margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
              <XAxis type="number" tick={{ fontSize: 9, fill: '#cbd5e1' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="country" width={90}
                tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              <Bar dataKey="visits" name="Visits" radius={[0, 4, 4, 0]}>
                {sortedData.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle>Country Breakdown</SectionTitle>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                {['Country', 'Visits', 'Clicks', 'Share', ''].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 10px', fontSize: 10, fontWeight: 700, color: SLATE, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ padding: '8px 10px', fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: PALETTE[i % PALETTE.length] }} />
                      {r.country}
                    </div>
                  </td>
                  <td style={{ padding: '8px 10px', fontFamily: 'monospace' }}>{r.visits.toLocaleString()}</td>
                  <td style={{ padding: '8px 10px', fontFamily: 'monospace' }}>{r.clicks.toLocaleString()}</td>
                  <td style={{ padding: '8px 10px', fontWeight: 700, color: BLUE }}>{r.pct}%</td>
                  <td style={{ padding: '8px 10px', width: 80 }}>
                    <div style={{ height: 5, background: '#f1f5f9', borderRadius: 3 }}>
                      <div style={{ height: '100%', width: `${r.pct}%`, background: PALETTE[i % PALETTE.length], borderRadius: 3 }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
