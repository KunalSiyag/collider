export interface ElementalOptions {
  size?: number;
}

export function createElementalGranite(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 467; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const flecks = Array.from({ length: 12 }, () => {
    const x = 90 + rand() * 140; const y = 90 + rand() * 160;
    return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(2 + rand() * 3).toFixed(1)}" height="${(2 + rand() * 3).toFixed(1)}" fill="${rand() > 0.5 ? '#d6d3d1' : '#78716c'}" opacity="0.8" transform="rotate(${(rand() * 60).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" />`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="gran-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#a8a29e" /><stop offset="100%" stop-color="#44403c" />
    </linearGradient>
    <filter id="gran-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="3" /></filter>
  </defs>
  <ellipse cx="160" cy="290" rx="84" ry="11" fill="#78716c" opacity="0.25" />
  <g>
    <path d="M160 66 L240 108 L252 200 L196 266 L124 266 L68 200 L80 108 Z" fill="url(#gran-body)">
      <animate attributeName="opacity" values="1;0.92;1" dur="4.4s" repeatCount="indefinite" />
    </path>
    <path d="M160 66 L240 108 L160 148 L80 108 Z" fill="#d6d3d1" opacity="0.35" />
    ${flecks}
    <circle cx="134" cy="176" r="10" fill="#1c1917"><animate attributeName="r" values="9;10.5;9" dur="2.6s" repeatCount="indefinite" /></circle>
    <circle cx="186" cy="176" r="10" fill="#1c1917"><animate attributeName="r" values="10.5;9;10.5" dur="2.6s" repeatCount="indefinite" /></circle>
    <path d="M142 206 Q152 214 164 206 T184 208" stroke="#1c1917" stroke-width="4.5" fill="none" stroke-linecap="round" />
    <line x1="96" y1="216" x2="224" y2="216" stroke="#292524" stroke-width="3" opacity="0.6" />
  </g>
  <g filter="url(#gran-glow)" opacity="0.5">
    <circle cx="70" cy="90" r="4" fill="#fbbf24"><animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" /></circle>
    <circle cx="252" cy="120" r="3" fill="#f97316"><animate attributeName="opacity" values="1;0;1" dur="2.6s" repeatCount="indefinite" /></circle>
  </g>
  <circle cx="89.2" cy="124.4" r="2.5" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.0s" begin="0.6s" repeatCount="indefinite" /></circle>
  <circle cx="259" cy="69" r="2" fill="#4ade80" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
