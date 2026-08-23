export interface ElementalOptions {
  size?: number;
}

export function createElementalPetal(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1061; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const falling = Array.from({ length: 8 }, () => {
    const x = rand() * 320; const dur = 4 + rand() * 4;
    return `<path d="M${x.toFixed(1)} -12 q10 6 0 14 q-10 -8 0 -14" fill="#f9a8d4"><animate attributeName="transform" type="translate" values="0 0;${((rand() - 0.5) * 80).toFixed(0)} 340" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /><animateTransform attributeName="transform" type="rotate" values="0;360" additive="sum" dur="${(2 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></path>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="petal-pink" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbcfe8" /><stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
    <filter id="petal-soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="4" /></filter>
  </defs>
  ${falling}
  <ellipse cx="160" cy="290" rx="72" ry="9" fill="#f472b6" opacity="0.18" />
  <g transform="translate(160 158)">
    ${[0, 72, 144, 216, 288].map((a, i) => `<path d="M0 0 C26 -22 30 -62 0 -84 C-30 -62 -26 -22 0 0 Z" fill="url(#petal-pink)" opacity="0.92" transform="rotate(${a})">
      <animateTransform attributeName="transform" type="rotate" values="${a};${a + 6};${a}" dur="${(3.5 + i * 0.4).toFixed(1)}s" repeatCount="indefinite" />
    </path>`).join('')}
  </g>
  <circle cx="160" cy="158" r="24" fill="#fef08a">
    <animate attributeName="r" values="23;26;23" dur="2.4s" repeatCount="indefinite" />
  </circle>
  <circle cx="152" cy="152" r="4" fill="#92400e" /><circle cx="168" cy="152" r="4" fill="#92400e" />
  <circle cx="153.5" cy="150.5" r="1.5" fill="#fff" /><circle cx="169.5" cy="150.5" r="1.5" fill="#fff" />
  <path d="M154 164 Q160 168 166 164" stroke="#92400e" stroke-width="3" fill="none" stroke-linecap="round" />
  <circle cx="160" cy="158" r="34" fill="none" stroke="#fbcfe8" stroke-width="1.6" opacity="0.55" filter="url(#petal-soft)">
    <animate attributeName="r" values="32;38;32" dur="2.4s" repeatCount="indefinite" />
  </circle>
  <circle cx="150.8" cy="137.1" r="1.7" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.9s" begin="0.3s" repeatCount="indefinite" /></circle>
  <circle cx="87" cy="97" r="2" fill="#4ade80" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
