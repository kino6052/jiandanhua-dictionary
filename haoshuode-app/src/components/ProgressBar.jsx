export function ProgressBar({ done, total, onReset }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div>
      <div class="progress-label">
        <span>Your progress</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {done}/{total}
          {done > 0 && onReset && (
            <button
              onClick={onReset}
              aria-label="Reset progress"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '11px',
                color: 'var(--text-muted)',
                padding: '0 2px',
                lineHeight: 1,
              }}
              title="Reset progress"
            >
              ↺
            </button>
          )}
        </span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style={{ width: pct + '%' }} />
      </div>
    </div>
  );
}
