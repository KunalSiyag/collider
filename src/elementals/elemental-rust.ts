export interface ElementalOptions {
  size?: number;
}

export function createElementalRust(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1579; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const patches = Array.from({ length: 8 }, () => {
    const x = 90 + rand() * 140; const y = 80 + rand() * 150; const r = 5 + rand() * 14;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${rand() > 0.5 ? '#c2410c' : '#9a3412'}" opacity="0.6"><animate attributeName="r" values="${r.toFixed(1)};${(r * 1.4).toFixed(1)};${r.toFixed(1)}" dur="${(3 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="rust-metal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#78716c" /><stop offset="60%" stop-color="#44403c" /><stop offset="100%" stop-color="#292524" />
    </linearGradient>
    <filter id="rust-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="4" /></filter>
  </defs>
  <ellipse cx="160" cy="288" rx="76" ry="11" fill="#7c2d12" opacity="0.25" />
  <path d="M160 62 C222 66 250 110 246 168 C242 224 202 260 154 256 C106 252 70 216 74 160 C78 104 102 58 160 62 Z" fill="url(#rust-metal)">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="5.2s" repeatCount="indefinite" />
  </path>
  ${patches}
  <g stroke="#fbbf24" stroke-width="2.5" fill="none" opacity="0.55">
    <path d="M100 120 q10 8 4 18 M212 200 q-10 6 -6 16" />
  </g>
  <circle cx="136" cy="152" r="9" fill="#fdba74"><animate attributeName="opacity" values="1;0.5;1" dur="2.4s" repeatCount="indefinite" /></circle>
  <circle cx="186" cy="150" r="9" fill="#fdba74"><animate attributeName="opacity" values="0.5;1;0.5" dur="2.4s" begin="0.6s" repeatCount="indefinite" /></circle>
  <circle cx="138.5" cy="149" r="3" fill="#431407" /><circle cx="188.5" cy="147" r="3" fill="#431407" />
  <path d="M148 182 L158 190 L168 181 L178 189" stroke="#fdba74" stroke-width="4" fill="none" stroke-linecap="round" />
  <circle cx="160" cy="92" r="10" fill="#fb923c" filter="url(#rust-glow)" opacity="0.6">
    <animate attributeName="r" values="9;12;9" dur="2.6s" repeatCount="indefinite" />
  </circle>
  <circle cx="155.7" cy="250.3" r="2.2" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.1s" begin="0.9s" repeatCount="indefinite" /></circle>
  <circle cx="288.2" cy="276.3" r="2.4" fill="none" stroke="#67e8f9" stroke-width="1.4"><animate attributeName="r" values="2.4;7.4;2.4" dur="3.5s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.6s" repeatCount="indefinite" /></circle>
  <circle cx="260" cy="210" r="2" fill="#f472b6" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
