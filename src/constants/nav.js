import { GREEN } from './colors';

export const NAV_GROUPS = [
  {
    group: null,
    items: [
      { key: 'overview',  label: 'Dashboard',       icon: '▦', roles: ['admin', 'partner'] },
    ],
  },
  {
    group: 'Analytics',
    items: [
      { key: 'reporting', label: 'Reporting',        icon: '≡', roles: ['admin', 'partner'] },
      { key: 'users',     label: 'Manage Users',     icon: '≡', roles: ['admin', 'partner'] },
      { key: 'services',  label: 'Manage Services',  icon: '≡', roles: ['admin', 'partner'] },
      { key: 'blocking',  label: 'Blocking Reasons', icon: '⊗', roles: ['admin', 'partner'] },
      { key: 'geo',       label: 'GEO Stats',        icon: '⊕', roles: ['admin', 'partner'] },
      { key: 'device',    label: 'Device Stats',     icon: '⊡', roles: ['admin', 'partner'] },
      { key: 'apks',      label: 'APK Stats',        icon: '📦', roles: ['admin', 'partner'] },
    ],
  },
  {
    group: 'Management',
    items: [
      { key: 'users',    label: 'Manage Users',    icon: '◎', roles: ['admin'] },
      { key: 'services', label: 'Manage Services', icon: '⚙', roles: ['admin'] },
      { key: 'partners', label: 'Partners',        icon: '◈', roles: ['admin'], badge: { n: '12',  c: GREEN } },
      { key: 'audit',    label: 'Audit Log',       icon: '📋', roles: ['admin'], badge: { n: 'New', c: GREEN } },
    ],
  },
  {
    group: 'Resources',
    items: [
      { key: 'docs',    label: 'Documentation',       icon: '📖', roles: ['admin', 'partner'] },
      { key: 'sandbox', label: 'Sandbox Environment', icon: '📋', roles: ['admin'], badge: { n: 'New', c: GREEN } },
    ],
  },
];

export const ALL_PAGES = NAV_GROUPS.flatMap((g) => g.items);

export function groupsForRole(role) {
  return NAV_GROUPS
    .map((g) => ({ ...g, items: g.items.filter((i) => i.roles.includes(role)) }))
    .filter((g) => g.items.length > 0);
}
