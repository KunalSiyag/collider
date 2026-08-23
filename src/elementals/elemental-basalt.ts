export interface ElementalOptions {
  size?: number;
}

export function createElementalBasalt(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 47; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const embers = Array.from({ length: 5 }, () => {
    const x = 90 + rand() * 140; const y = 150 + rand() * 90;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.5 + rand() * 2).toFixed(1)}" fill="#f97316"><animate attributeName="cy" values="${y.toFixed(1)};${(y - 50).toFixed(1)};${y.toFixed(1)}" dur="${(2.5 + rand() * 2).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0;0.9;0" dur="${(2.5 + rand() * 2).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="basalt-rock" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3f3f46" /><stop offset="100%" stop-color="#18181b" />
    </linearGradient>
    <filter id="basalt-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5" /></filter>
  </defs>
  <ellipse cx="160" cy="286" rx="92" ry="14" fill="#f97316" opacity="0.15" />
  <g filter="url(#basalt-glow)">
    <path d="M160 250 L110 268 L160 284 L210 268 Z" fill="#f97316" opacity="0.7">
      <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.2s" repeatCount="indefinite" />
    </path>
  </g>
  <path d="M160 70 L238 118 L252 210 L196 268 L124 268 L68 210 L82 118 Z" fill="url(#basalt-rock)">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="5s" repeatCount="indefinite" />
  </path>
  <g stroke="#000" stroke-width="2.5" opacity="0.7">
    <line x1="160" y1="70" x2="150" y2="170" />
    <line x1="150" y1="170" x2="82" y2="210" />
    <line x1="150" y1="170" x2="238" y2="118" />
    <line x1="150" y1="170" x2="124" y2="268" />
    <line x1="150" y1="170" x2="196" y2="268" />
  </g>
  <polygon points="160,70 238,118 150,170" fill="#52525b" opacity="0.55" />
  <circle cx="126" cy="212" r="9" fill="#f97316"><animate attributeName="fill" values="#f97316;#fbbf24;#f97316" dur="1.8s" repeatCount="indefinite" /></circle>
  <circle cx="194" cy="212" r="9" fill="#f97316"><animate attributeName="fill" values="#f97316;#fbbf24;#f97316" dur="1.8s" begin="0.6s" repeatCount="indefinite" /></circle>
  <path d="M142 240 L154 248 L166 240 L178 248" stroke="#f97316" stroke-width="4" fill="none" stroke-linecap="round" />
  ${embers}
</svg>`;
}
