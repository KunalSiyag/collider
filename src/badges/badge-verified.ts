/** Verified Badge — a seal with a check that draws in and glints. */
export interface VerifiedBadgeOptions {
  color?: string;
  size?: number;
}

export function createVerifiedBadge(options: VerifiedBadgeOptions = {}): string {
  const { color = '#38bdf8', size = 72 } = options;
  const seal = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    const x1 = 36 + Math.cos(a) * 26;
    const y1 = 36 + Math.sin(a) * 26;
    const x2 = 36 + Math.cos(a + 0.22) * 34;
    const y2 = 36 + Math.sin(a + 0.22) * 34;
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="4" stroke-linecap="round" opacity="0.85"/>`;
  }).join('');
  return `<svg viewBox="0 0 72 72" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  ${seal}
  <circle cx="36" cy="36" r="24" fill="${color}">
    <animate attributeName="r" values="24;25.4;24" dur="3s" repeatCount="indefinite"/>
  </circle>
  <path d="M26 37 l7 7 L50 29" fill="none" stroke="#08222e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"
    stroke-dasharray="40" stroke-dashoffset="40">
    <animate attributeName="stroke-dashoffset" from="40" to="0" dur="0.6s" begin="0.3s" fill="freeze"/>
  </path>
</svg>`;
}
