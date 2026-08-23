export interface ElementalOptions {
  size?: number;
}

export function createElementalStatic(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1559; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const lines = Array.from({ length: 8 }, () => {
    const y0 = rand() * 320;
    return `<line x1="0" y1="${y0.toFixed(1)}" x2="320" y2="${y0.toFixed(1)}" stroke="#a3e635" stroke-width="1.6" opacity="0.4"><animate attributeName="opacity" values="0.4;0.02;0.4" dur="${(0.5 + rand() * 0.9).toFixed(2)}s" repeatCount="indefinite" /><animate attributeName="y1" values="${y0.toFixed(1)};${(rand() * 320).toFixed(0)};${y0.toFixed(1)}" dur="${(1 + rand() * 2).toFixed(1)}s" repeatCount="indefinite" /></line>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  ${lines}
  <defs>
    <radialGradient id="sta-body" cx="46%" cy="42%" r="62%">
      <stop offset="0%" stop-color="#ecfccb" /><stop offset="65%" stop-color="#84cc16" /><stop offset="100%" stop-color="#365314" />
    </radialGradient>
    <filter id="sta-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
  </defs>
  <circle cx="160" cy="160" r="90" fill="#a3e635" opacity="0.18" filter="url(#sta-glow)">
    <animate attributeName="opacity" values="0.05;0.25;0.05" dur="0.5s" repeatCount="indefinite" />
  </circle>
  <path d="M160 66 C220 70 248 114 244 170 C240 226 202 262 156 258 C110 254 74 218 78 162 C82 106 104 62 160 66 Z" fill="url(#sta-body)">
    <animate attributeName="opacity" values="1;0.85;0.95;0.88;1" dur="0.6s" repeatCount="indefinite" />
  </path>
  <g>
    <rect x="126" y="140" width="28" height="10" fill="#111"><animate attributeName="x" values="126;120;130;126" dur="0.35s" repeatCount="indefinite" /></rect>
    <rect x="172" y="140" width="28" height="10" fill="#111"><animate attributeName="x" values="172;178;166;172" dur="0.42s" repeatCount="indefinite" /></rect>
    <rect x="146" y="184" width="34" height="8" fill="#111"><animate attributeName="y" values="184;180;186;184" dur="0.38s" repeatCount="indefinite" /></rect>
  </g>
  <circle cx="238.3" cy="168.7" r="2.8" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.5s" begin="0.2s" repeatCount="indefinite" /></circle>
  <circle cx="120.0" cy="204.2" r="1.8" fill="none" stroke="#fbbf24" stroke-width="1.4"><animate attributeName="r" values="1.8;6.8;1.8" dur="2.6s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.1s" repeatCount="indefinite" /></circle>
  <rect x="145.3" y="64.7" width="4.0" height="3.4" fill="#22d3ee" opacity="0.55" transform="rotate(80 145.3 64.7)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite" /></rect>
  <circle cx="226.3" cy="102.5" r="3.8" fill="#fb7185" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.7s" begin="0.7s" repeatCount="indefinite" /></circle>
  <circle cx="278.9" cy="284.6" r="3.0" fill="none" stroke="#fb7185" stroke-width="1.4"><animate attributeName="r" values="3.0;8.0;3.0" dur="2.9s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.1s" repeatCount="indefinite" /></circle>
  <circle cx="57" cy="167" r="2" fill="#22d3ee" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
