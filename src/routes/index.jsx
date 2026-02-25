import PageOverview  from '../pages/Overview';
import PageBlocking  from '../pages/Blocking';
import PageAPKs      from '../pages/APKs';
import PageReporting from '../pages/Reporting';
import PageUsers     from '../pages/Users';
import PageServices  from '../pages/Services';
import PageDevice    from '../pages/Device';
import PageGeo       from '../pages/Geo';
import PageStub      from '../pages/Stub';

export const ROUTES = {
  overview:  <PageOverview />,
  reporting: <PageReporting />,
  blocking:  <PageBlocking />,
  apks:      <PageAPKs />,
  users:     <PageUsers />,
  services:  <PageServices />,
  device:    <PageDevice />,
  geo:       <PageGeo />,
  partners:  <PageStub title="Partners"             icon="◈" />,
  audit:     <PageStub title="Audit Log"            icon="📋" />,
  docs:      <PageStub title="Documentation"        icon="📖" />,
  sandbox:   <PageStub title="Sandbox Environment"  icon="🧪" />,
};

const ALIASES = {
  'users-all':    'users',
  'users-roles':  'users',
  'svc-registry': 'services',
  'svc-api':      'services',
  'svc-webhooks': 'services',
};

export default function PageRouter({ page, role = 'admin' }) {
  const key = ALIASES[page] ?? page;
  // Pages that need role awareness
  if (key === 'users')    return <PageUsers    role={role} />;
  if (key === 'services') return <PageServices role={role} />;
  return ROUTES[key] ?? <PageOverview />;
}
