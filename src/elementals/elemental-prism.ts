export interface ElementalOptions {
  size?: number;
}

export function createElementalPrism(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1087; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const beams = ['#f87171', '#fbbf24', '#4ade80', '#22d3ee', '#a78bfa', '#f472b6'].map((c, i) => {
    const spread = (i - 2.5) * 14;
    return `<line x1="160" y1="150" x2="${(250 + spread).toFixed(0)}" y2="${(240 + Math.abs(spread) * 0.6).toFixed(0)}" stroke="${c}" stroke-width="5" opacity="0.85"><animate attributeName="opacity" values="0.85;0.4;0.85" dur="${(1.6 + i * 0.3 + rand()).toFixed(1)}s" begin="${(i * 0.2).toFixed(1)}s" repeatCount="indefinite" /></line>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="prism-glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e0f2fe" stop-opacity="0.95" /><stop offset="100%" stop-color="#7dd3fc" stop-opacity="0.55" />
    </linearGradient>
    <filter id="prism-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
  </defs>
  ${beams}
  <line x1="20" y1="150" x2="118" y2="150" stroke="#fff" stroke-width="6" filter="url(#prism-soft)" opacity="0.9">
    <animate attributeName="opacity" values="0.9;0.55;0.9" dur="2s" repeatCount="indefinite" />
  </line>
  <g transform="translate(-10 10)">
    <polygon points="170,60 260,220 80,220" fill="url(#prism-glass)" stroke="#bae6fd" stroke-width="2">
      <animate attributeName="opacity" values="1;0.75;1" dur="3.2s" repeatCount="indefinite" />
    </polygon>
    <polygon points="170,74 244,208 96,208" fill="#fff" opacity="0.18" />
  </g>
  <circle cx="140" cy="176" r="8" fill="#0c4a6e" /><circle cx="182" cy="176" r="8" fill="#0c4a6e" />
  <circle cx="142.5" cy="173" r="2.6" fill="#fff" /><circle cx="184.5" cy="173" r="2.6" fill="#fff" />
  <path d="M148 200 Q161 208 174 198" stroke="#0c4a6e" stroke-width="4" fill="none" stroke-linecap="round" />
  <circle cx="160.1" cy="124.9" r="2.7" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.1s" begin="0.8s" repeatCount="indefinite" /></circle>
  <circle cx="189.2" cy="240.1" r="3.3" fill="none" stroke="#22d3ee" stroke-width="1.4"><animate attributeName="r" values="3.3;8.3;3.3" dur="3.7s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="2.7s" repeatCount="indefinite" /></circle>
  <rect x="278.1" y="61.1" width="4.0" height="3.7" fill="#4ade80" opacity="0.55" transform="rotate(24 278.1 61.1)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.7s" repeatCount="indefinite" /></rect>
  <circle cx="223.2" cy="258.4" r="3.5" fill="#fde047" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.7s" begin="0.5s" repeatCount="indefinite" /></circle>
  <circle cx="169" cy="139" r="2" fill="#fb7185" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
