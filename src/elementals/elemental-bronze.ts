export interface ElementalOptions {
  size?: number;
}

export function createElementalBronze(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 71; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const verdigris = Array.from({ length: 7 }, () => {
    const x = 100 + rand() * 120; const y = 110 + rand() * 120; const r = 3 + rand() * 7;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#2dd4bf" opacity="0.35"><animate attributeName="r" values="${r.toFixed(1)};${(r * 1.6).toFixed(1)};${r.toFixed(1)}" dur="${(3 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="bronze-skin" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#d97706" /><stop offset="45%" stop-color="#92400e" /><stop offset="100%" stop-color="#78350f" />
    </linearGradient>
    <filter id="bronze-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="4" /></filter>
  </defs>
  <ellipse cx="160" cy="288" rx="78" ry="12" fill="#b45309" opacity="0.2" />
  <g>
    <path d="M160 66 C214 66 248 108 248 166 C248 226 208 272 160 272 C112 272 72 226 72 166 C72 108 106 66 160 66 Z" fill="url(#bronze-skin)">
      <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="4.6s" repeatCount="indefinite" />
    </path>
    <path d="M118 118 L142 138 M202 118 L178 138" stroke="#fcd34d" stroke-width="6" stroke-linecap="round" opacity="0.8" />
    <circle cx="132" cy="170" r="10" fill="#451a03" /><circle cx="188" cy="170" r="10" fill="#451a03" />
    <circle cx="135" cy="167" r="3" fill="#fde68a" /><circle cx="191" cy="167" r="3" fill="#fde68a" />
    <rect x="140" y="196" width="40" height="10" rx="5" fill="#451a03" opacity="0.85" />
    <g stroke="#fbbf24" stroke-width="3" fill="none" opacity="0.65">
      <path d="M92 200 Q84 190 92 182" />
      <path d="M228 200 Q236 190 228 182" />
    </g>
    <circle cx="160" cy="98" r="14" fill="#fcd34d" filter="url(#bronze-glow)">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" />
    </circle>
  </g>
  ${verdigris}
</svg>`;
}
