import { Card } from '../components/ui';
import { SLATE } from '../constants/colors';

/**
 * PageStub — placeholder for pages that are not yet implemented.
 * Used for Partners, Audit Log, GEO Stats, Device Stats, Docs, Sandbox.
 *
 * @param {string} title  Page title
 * @param {string} icon   Emoji / symbol
 */
export default function PageStub({ title, icon }) {
  return (
    <Card style={{
      minHeight: 300,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 12,
    }}>
      <div style={{ fontSize: 40 }}>{icon}</div>
      <div style={{ fontSize: 20, fontWeight: 800, color: '#1a1a2e' }}>{title}</div>
      <div style={{ fontSize: 13, color: SLATE }}>This page is under construction.</div>
    </Card>
  );
}
