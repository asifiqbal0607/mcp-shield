import TopNav       from './TopNav';
import FilterSidebar from './FilterSidebar';
import { ALL_PAGES } from '../constants/nav';
import { SLATE }     from '../constants/colors';

/**
 * AppLayout — wraps every page with the shared TopNav + FilterSidebar.
 * Also renders the breadcrumb bar and an "Admin only" badge for restricted pages.
 */
export default function AppLayout({ role, page, setPage, children }) {
  const curPage  = ALL_PAGES.find((p) => p.key === page);
  const curLabel = curPage?.label ?? 'Dashboard';
  const isAdminOnly = curPage?.roles?.includes('admin') && !curPage?.roles?.includes('partner');

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', minHeight: '100vh',
      background: '#f0f4f8', fontFamily: "'DM Sans','Segoe UI',sans-serif",
      color: '#1a1a2e',
    }}>
      <TopNav role={role} page={page} setPage={setPage} />

      <div style={{ display: 'flex', flex: 1 }}>
        <FilterSidebar />

        <main style={{ flex: 1, padding: '22px 22px 50px', overflowY: 'auto', minWidth: 0 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <span style={{ fontSize: 12, color: SLATE }}>Shield</span>
            <span style={{ fontSize: 12, color: '#d1d5db' }}>›</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#1a1a2e' }}>{curLabel}</span>
            {isAdminOnly && (
              <span style={{
                fontSize: 9, fontWeight: 800, padding: '2px 8px',
                borderRadius: 10, background: '#fef3c7', color: '#92400e',
                border: '1px solid #fde68a', textTransform: 'uppercase', letterSpacing: '0.5px',
              }}>Admin only</span>
            )}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
