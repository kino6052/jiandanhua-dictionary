export function ProgressBar({ done, total }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div>
      <div class="progress-label">
        <span>Your progress</span>
        <span>{done}/{total}</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style={{ width: pct + '%' }} />
      </div>
    </div>
  );
}
