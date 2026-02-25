/**
 * Card — the base surface used across every page.
 * Accepts an optional `style` override for per-instance tweaks.
 */
export default function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 14,
        padding: '20px 22px',
        boxShadow: '0 1px 8px rgba(0,0,0,.06)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
