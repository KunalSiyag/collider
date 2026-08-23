export interface ElementalOptions {
  size?: number;
}

export function createElementalBloom(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 53; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const petals = Array.from({ length: 6 }, (_, i) => {
    const angle = i * 60;
    const len = 60 + rand() * 16;
    return `<ellipse cx="160" cy="${160 - len}" rx="26" ry="${len}" fill="${i % 2 ? '#f472b6' : '#fb7185'}" opacity="0.9" transform="rotate(${angle} 160 160)">
      <animateTransform attributeName="transform" type="rotate" values="${angle} 160 160;${angle + 8} 160 160;${angle} 160 160" dur="${(4 + rand() * 2).toFixed(1)}s" repeatCount="indefinite" />
    </ellipse>`;
  }).join('');
  const floaters = Array.from({ length: 5 }, () => {
    const x = rand() * 320; const y = 40 + rand() * 240;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(2 + rand() * 3).toFixed(1)}" fill="#f9a8d4"><animate attributeName="cy" values="${y.toFixed(1)};${(y - 30).toFixed(1)};${y.toFixed(1)}" dur="${(3 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.8;0.2;0.8" dur="${(3 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="bloom-heart" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#fef08a" /><stop offset="100%" stop-color="#f59e0b" />
    </radialGradient>
    <filter id="bloom-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="6" /></filter>
  </defs>
  <ellipse cx="160" cy="292" rx="70" ry="10" fill="#f472b6" opacity="0.2" />
  <g>${petals}</g>
  <circle cx="160" cy="160" r="40" fill="url(#bloom-heart)" filter="url(#bloom-glow)" opacity="0.7">
    <animate attributeName="r" values="38;46;38" dur="2.6s" repeatCount="indefinite" />
  </circle>
  <circle cx="160" cy="160" r="34" fill="url(#bloom-heart)">
    <animate attributeName="r" values="33;37;33" dur="2.6s" repeatCount="indefinite" />
  </circle>
  <circle cx="147" cy="154" r="5.5" fill="#7c2d12" /><circle cx="173" cy="154" r="5.5" fill="#7c2d12" />
  <circle cx="149" cy="152" r="1.8" fill="#fff" /><circle cx="175" cy="152" r="1.8" fill="#fff" />
  <path d="M150 174 Q160 182 170 174" stroke="#7c2d12" stroke-width="4" fill="none" stroke-linecap="round" />
  <path d="M160 200 Q156 250 140 284" stroke="#4ade80" stroke-width="6" fill="none" stroke-linecap="round" />
  <path d="M158 240 Q134 232 126 210 Q152 214 158 240 Z" fill="#4ade80" />
  ${floaters}
</svg>`;
}
