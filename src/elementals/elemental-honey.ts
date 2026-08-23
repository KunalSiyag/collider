export interface ElementalOptions {
  size?: number;
}

export function createElementalHoney(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 563; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const drips = Array.from({ length: 4 }, () => {
    const x = 100 + rand() * 120; const len = 30 + rand() * 50;
    return `<path d="M${x.toFixed(1)} 236 q4 ${len * 0.5} 0 ${len} q-4 -${len * 0.5} 0 -${len}" fill="#f59e0b"><animate attributeName="opacity" values="0.9;0.4;0.9" dur="${(2.6 + rand() * 2).toFixed(1)}s" repeatCount="indefinite" /></path>`;
  }).join('');
  const hex = (cx: number, cy: number, r: number): string =>
    Array.from({ length: 6 }, (_, i) => `${(cx + r * Math.cos((i * Math.PI) / 3)).toFixed(1)},${(cy + r * Math.sin((i * Math.PI) / 3)).toFixed(1)}`).join(' ');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="honey-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fde047" /><stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <filter id="honey-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5" /></filter>
  </defs>
  ${drips}
  <ellipse cx="160" cy="292" rx="76" ry="10" fill="#f59e0b" opacity="0.25" />
  <path d="M160 62 C222 66 252 112 248 170 C244 226 206 262 158 260 C110 258 72 220 74 164 C76 108 102 58 160 62 Z" fill="url(#honey-body)">
    <animate attributeName="d" dur="4.2s" repeatCount="indefinite"
      values="M160 62 C222 66 252 112 248 170 C244 226 206 262 158 260 C110 258 72 220 74 164 C76 108 102 58 160 62 Z;
              M162 68 C224 60 250 116 244 174 C240 230 200 268 156 256 C110 244 78 216 80 162 C82 106 104 74 162 68 Z;
              M160 62 C222 66 252 112 248 170 C244 226 206 262 158 260 C110 258 72 220 74 164 C76 108 102 58 160 62 Z" />
  </path>
  <g fill="#78350f" opacity="0.35">
    <polygon points="${hex(126, 140, 16)}" /><polygon points="${hex(160, 158, 16)}" />
    <polygon points="${hex(194, 140, 16)}" /><polygon points="${hex(142, 190, 14)}" /><polygon points="${hex(178, 192, 14)}" />
  </g>
  <circle cx="138" cy="128" r="9" fill="#451a03" /><circle cx="186" cy="128" r="9" fill="#451a03" />
  <circle cx="141" cy="125" r="3" fill="#fef9c3" /><circle cx="189" cy="125" r="3" fill="#fef9c3" />
  <path d="M148 152 Q160 159 172 152" stroke="#451a03" stroke-width="4.5" fill="none" stroke-linecap="round" />
  <circle cx="160" cy="96" r="12" fill="#fde047" filter="url(#honey-glow)" opacity="0.7">
    <animate attributeName="r" values="11;14;11" dur="2.4s" repeatCount="indefinite" />
  </circle>
</svg>`;
}
