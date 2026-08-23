export interface ElementalOptions {
  size?: number;
}

export function createElementalIron(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 619; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const rivets = Array.from({ length: 8 }, () => {
    const x = 90 + rand() * 140; const y = 90 + rand() * 150;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.4" fill="#94a3b8" stroke="#1e293b" stroke-width="1.2"><animate attributeName="fill" values="#94a3b8;#cbd5e1;#94a3b8" dur="${(3 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="iron-plate" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#cbd5e1" /><stop offset="50%" stop-color="#475569" /><stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
    <filter id="iron-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="4" /></filter>
  </defs>
  <ellipse cx="160" cy="288" rx="80" ry="11" fill="#334155" opacity="0.35" />
  <path d="M160 62 L244 110 L244 210 L160 258 L76 210 L76 110 Z" fill="url(#iron-plate)" stroke="#0f172a" stroke-width="3">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="5.2s" repeatCount="indefinite" />
  </path>
  ${rivets}
  <g>
    <rect x="118" y="152" width="34" height="16" rx="8" fill="#f59e0b">
      <animate attributeName="fill" values="#f59e0b;#fde047;#f59e0b" dur="1.8s" repeatCount="indefinite" />
    </rect>
    <rect x="168" y="152" width="34" height="16" rx="8" fill="#f59e0b">
      <animate attributeName="fill" values="#f59e0b;#fde047;#f59e0b" dur="1.8s" begin="0.9s" repeatCount="indefinite" />
    </rect>
    <circle cx="135" cy="160" r="4" fill="#111" /><circle cx="185" cy="160" r="4" fill="#111" />
  </g>
  <rect x="138" y="196" width="44" height="12" rx="6" fill="#0f172a" />
  <line x1="96" y1="238" x2="224" y2="238" stroke="#0f172a" stroke-width="3" opacity="0.7" />
  <circle cx="183.5" cy="160.6" r="1.6" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="1.8s" begin="1.0s" repeatCount="indefinite" /></circle>
  <circle cx="275" cy="125" r="2" fill="#fb7185" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
