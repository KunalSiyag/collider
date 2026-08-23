export interface TargetLockOptions {
  color?: string;
  size?: number;
}

export function createTargetLock(options: TargetLockOptions = {}): string {
  const { color = '#f87171', size = 400 } = options;
  const c = size / 2;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g fill="none" stroke="${color}" stroke-width="3">
    <circle cx="${c}" cy="${c}" r="${size * 0.34}" stroke-dasharray="20 12" opacity="0.9">
      <animateTransform attributeName="transform" type="rotate" values="0 ${c} ${c};360 ${c} ${c}" dur="24s" repeatCount="indefinite" />
    </circle>
    <circle cx="${c}" cy="${c}" r="${size * 0.22}" stroke-dasharray="8 10" opacity="0.7" stroke-width="2">
      <animateTransform attributeName="transform" type="rotate" values="360 ${c} ${c};0 ${c} ${c}" dur="16s" repeatCount="indefinite" />
    </circle>
  </g>
  <g stroke="${color}" stroke-width="4" stroke-linecap="round">
    <line x1="${(c - size * 0.42).toFixed(0)}" y1="${c}" x2="${(c - size * 0.32).toFixed(0)}" y2="${c}" />
    <line x1="${(c + size * 0.32).toFixed(0)}" y1="${c}" x2="${(c + size * 0.42).toFixed(0)}" y2="${c}" />
    <line x1="${c}" y1="${(c - size * 0.42).toFixed(0)}" x2="${c}" y2="${(c - size * 0.32).toFixed(0)}" />
    <line x1="${c}" y1="${(c + size * 0.32).toFixed(0)}" x2="${c}" y2="${(c + size * 0.42).toFixed(0)}" />
  </g>
  <circle cx="${c}" cy="${c}" r="5" fill="${color}">
    <animate attributeName="r" values="4;7;4" dur="1.6s" repeatCount="indefinite" />
  </circle>
</svg>`;
}
