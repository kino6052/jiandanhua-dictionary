import { useState } from 'preact/hooks';

const FONTS = [
  { key: 'font-rounded', label: 'Rounded' },
  { key: 'font-warm', label: 'Serif' },
  { key: 'font-classic', label: 'Classic' },
];

export function FontSelector() {
  const [active, setActive] = useState('font-rounded');

  function pick(key) {
    setActive(key);
    FONTS.forEach(f => document.documentElement.classList.remove(f.key));
    document.documentElement.classList.add(key);
  }

  return (
    <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
      {FONTS.map(f => (
        <button
          key={f.key}
          onClick={() => pick(f.key)}
          style={{
            padding: '4px 10px',
            borderRadius: '6px',
            border: active === f.key ? '2px solid var(--accent)' : '1.5px solid var(--border-card)',
            background: active === f.key ? 'var(--bg-callout)' : 'transparent',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: 600,
            color: active === f.key ? 'var(--accent)' : 'var(--text-muted)',
            fontFamily: 'inherit',
          }}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
