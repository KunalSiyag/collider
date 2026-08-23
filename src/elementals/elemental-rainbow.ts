export interface ElementalOptions {
  size?: number;
}

export function createElementalRainbow(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1151; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const colors = ['#ef4444', '#f97316', '#facc15', '#4ade80', '#22d3ee', '#818cf8'];
  const arcs = colors.map((c, i) => {
    const r = 130 - i * 16;
    return `<path d="M${160 - r} 260 A${r} ${r} 0 0 1 ${160 + r} 260" fill="none" stroke="${c}" stroke-width="12" opacity="0.9">
      <animate attributeName="opacity" values="0.9;${(0.35 + i * 0.08).toFixed(2)};0.9" dur="${(2.6 + i * 0.5).toFixed(1)}s" begin="${(i * 0.25).toFixed(1)}s" repeatCount="indefinite" />
    </path>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <filter id="rbw-soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4" /></filter>
  </defs>
  <ellipse cx="60" cy="70" rx="44" ry="20" fill="#e2e8f0" opacity="0.85"><animate attributeName="cx" values="60;76;60" dur="10s" repeatCount="indefinite" /></ellipse>
  <ellipse cx="266" cy="56" rx="34" ry="16" fill="#e2e8f0" opacity="0.75"><animate attributeName="cx" values="266;250;266" dur="12s" repeatCount="indefinite" /></ellipse>
  <g filter="url(#rbw-soft)" opacity="0.5">${arcs}</g>
  <rect y="252" width="320" height="68" fill="#14532d" />
  <path d="M0 256 L320 248 L320 320 L0 320 Z" fill="#166534" />
  ${arcs}
  <g transform="translate(160 176)">
    <circle r="40" fill="#fef9c3" opacity="0.95">
      <animate attributeName="r" values="38;43;38" dur="2.6s" repeatCount="indefinite" />
    </circle>
    <circle cx="-14" cy="-8" r="6" fill="#7c2d12" /><circle cx="16" cy="-8" r="6" fill="#7c2d12" />
    <circle cx="-12.5" cy="-9.5" r="2" fill="#fff" /><circle cx="17.5" cy="-9.5" r="2" fill="#fff" />
    <path d="M-10 10 Q0 18 12 9" stroke="#7c2d12" stroke-width="3.5" fill="none" stroke-linecap="round" />
  </g>
  <circle cx="44.2" cy="87.1" r="2.4" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.3s" begin="0.7s" repeatCount="indefinite" /></circle>
  <circle cx="62.4" cy="264.0" r="3.8" fill="none" stroke="#a78bfa" stroke-width="1.4"><animate attributeName="r" values="3.8;8.8;3.8" dur="3.8s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.3s" repeatCount="indefinite" /></circle>
  <rect x="216.7" y="160.0" width="5.5" height="5.7" fill="#fde047" opacity="0.55" transform="rotate(83 216.7 160.0)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.8s" repeatCount="indefinite" /></rect>
  <circle cx="110" cy="40" r="2" fill="#a78bfa" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
