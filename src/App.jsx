import { useState } from 'react';
import AppLayout  from './layout/AppLayout';
import PageRouter from './routes';

/**
 * App — the root component.
 *
 * Owns the two pieces of top-level state:
 *   role  — 'admin' | 'partner'
 *   page  — active page key (matches NAV_GROUPS item keys)
 *
 * `handleNav` is passed down so both the role switcher (in TopNav)
 * and page links share a single navigation handler.
 */
export default function App() {
  const [role, setRole] = useState('admin');
  const [page, setPage] = useState('overview');

  const handleNav = (newPage, newRole) => {
    if (newRole !== undefined) {
      setRole(newRole);
      setPage('overview');
    } else {
      setPage(newPage);
    }
  };

  return (
    <AppLayout role={role} page={page} setPage={handleNav}>
      <PageRouter page={page} role={role} />
    </AppLayout>
  );
}
