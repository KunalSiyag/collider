export interface ElementalOptions {
  size?: number;
}

export function createElementalBrine(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 61; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const crystals = Array.from({ length: 6 }, () => {
    const x = 70 + rand() * 180; const y = 120 + rand() * 130; const s2 = 5 + rand() * 9;
    return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(s2 * 0.7).toFixed(1)}" height="${s2.toFixed(1)}" fill="#e0f2fe" opacity="0.85" transform="rotate(${(rand() * 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"><animate attributeName="opacity" values="0.85;0.3;0.85" dur="${(2 + rand() * 2).toFixed(1)}s" repeatCount="indefinite" /></rect>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="brine-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#67e8f9" /><stop offset="100%" stop-color="#155e75" />
    </linearGradient>
    <filter id="brine-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5" /></filter>
  </defs>
  <ellipse cx="160" cy="290" rx="80" ry="11" fill="#22d3ee" opacity="0.18" />
  <path d="M160 60 C216 60 250 100 250 158 C250 220 210 268 160 268 C110 268 70 220 70 158 C70 100 104 60 160 60 Z" fill="url(#brine-body)" filter="url(#brine-glow)" opacity="0.55">
    <animate attributeName="d" dur="4.4s" repeatCount="indefinite"
      values="M160 60 C216 60 250 100 250 158 C250 220 210 268 160 268 C110 268 70 220 70 158 C70 100 104 60 160 60 Z;
              M160 54 C222 62 256 104 246 162 C238 224 206 274 160 272 C114 270 76 218 74 158 C72 102 108 56 160 54 Z;
              M160 60 C216 60 250 100 250 158 C250 220 210 268 160 268 C110 268 70 220 70 158 C70 100 104 60 160 60 Z" />
  </path>
  <path d="M160 68 C212 68 244 106 244 160 C244 218 206 260 160 260 C114 260 76 218 76 160 C76 106 108 68 160 68 Z" fill="#164e63" opacity="0.9" />
  <path d="M96 150 Q120 132 144 150 T192 150 T240 150" stroke="#67e8f9" stroke-width="5" fill="none" opacity="0.6">
    <animate attributeName="d" dur="3s" repeatCount="indefinite"
      values="M96 150 Q120 132 144 150 T192 150 T240 150;
              M96 158 Q120 176 144 158 T192 158 T240 158;
              M96 150 Q120 132 144 150 T192 150 T240 150" />
  </path>
  <circle cx="134" cy="112" r="10" fill="#f8fafc" /><circle cx="186" cy="112" r="10" fill="#f8fafc" />
  <circle cx="137" cy="115" r="5" fill="#0e7490" /><circle cx="183" cy="115" r="5" fill="#0e7490" />
  <path d="M146 136 L160 144 L174 136" stroke="#a5f3fc" stroke-width="4.5" fill="none" stroke-linecap="round" />
  ${crystals}
</svg>`;
}
