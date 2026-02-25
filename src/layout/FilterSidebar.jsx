import { BLUE, SLATE } from '../constants/colors';

const FILTER_OPTIONS = [
  'Choose Service',
  'Choose Network',
  'Choose OS',
  'Choose Platform',
  'Choose Google/Non-Google',
  'Custom Variables',
];

function SelectFilter({ label }) {
  return (
    <div style={{ marginBottom: 9 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        border: '1px solid #e2e8f0', borderRadius: 7, padding: '9px 12px',
        fontSize: 12, color: '#667085', background: '#fff', cursor: 'pointer',
      }}>
        <span>{label}</span>
        <span style={{ fontSize: 10, color: SLATE }}>▾</span>
      </div>
    </div>
  );
}

/**
 * FilterSidebar — the left-hand filter panel present on every page.
 */
export default function FilterSidebar() {
  return (
    <aside style={{
      width: 210, flexShrink: 0,
      background: '#fff', borderRight: '1px solid #e8ecf3',
      padding: '20px 14px',
      position: 'sticky', top: 100,
      height: 'calc(100vh - 100px)', overflowY: 'auto',
    }}>
      {/* Section header */}
      <div style={{
        fontSize: 10, fontWeight: 700, color: SLATE,
        letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 14,
      }}>Filters</div>

      {/* GEO */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 10, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 5 }}>GEO</label>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: 7, padding: '9px 12px', fontSize: 12, color: '#334155' }}>
          South Africa (ZA)
        </div>
      </div>

      {/* Date Range */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 10, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 5 }}>Date Range</label>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: 7, padding: '9px 12px', fontSize: 11, color: '#334155' }}>
          01-09-2024 — 26-09-2024
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        <button style={{
          flex: 1, padding: 8, borderRadius: 7,
          border: '1px solid #e2e8f0', background: '#f8fafc',
          fontSize: 12, color: '#64748b', cursor: 'pointer', fontWeight: 700,
        }}>Reset</button>
        <button style={{
          flex: 1, padding: 8, borderRadius: 7,
          border: 'none', background: BLUE,
          fontSize: 12, color: '#fff', cursor: 'pointer', fontWeight: 700,
        }}>Apply</button>
      </div>

      {/* Options section */}
      <div style={{
        fontSize: 10, fontWeight: 700, color: SLATE,
        letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 10,
      }}>Options</div>

      {FILTER_OPTIONS.map((label) => (
        <SelectFilter key={label} label={label} />
      ))}
    </aside>
  );
}
