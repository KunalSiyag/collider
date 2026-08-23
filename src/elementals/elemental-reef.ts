export interface ElementalOptions {
  size?: number;
}

export function createElementalReef(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1163; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const polyps = Array.from({ length: 7 }, () => {
    const x = 60 + rand() * 200; const h = 20 + rand() * 40;
    return `<path d="M${x.toFixed(1)} 300 q-4 -${(h / 2).toFixed(0)} 0 -${h} q4 ${(h / 2).toFixed(0)} 0 ${h}" stroke="#2dd4bf" stroke-width="3.5" fill="none" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" values="-8 ${x.toFixed(1)} 300;8 ${x.toFixed(1)} 300;-8 ${x.toFixed(1)} 300" dur="${(3 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></path><circle cx="${x.toFixed(1)}" cy="${(300 - h).toFixed(1)}" r="4" fill="#fde047"><animate attributeName="opacity" values="1;0.4;1" dur="${(2 + rand() * 2).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="reef-sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0891b2" /><stop offset="100%" stop-color="#164e63" />
    </linearGradient>
    <filter id="reef-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
  </defs>
  <rect width="320" height="320" fill="url(#reef-sea)" />
  <path d="M0 268 Q60 244 130 264 T320 258 L320 320 L0 320 Z" fill="#155e75" />
  ${polyps}
  <g transform="translate(160 170)">
    <ellipse cx="0" cy="30" rx="46" ry="52" fill="#f472b6">
      <animate attributeName="ry" values="50;55;50" dur="3s" repeatCount="indefinite" />
    </ellipse>
    <path d="M-34 12 A38 38 0 0 1 34 10" stroke="#fbcfe8" stroke-width="5" fill="none" opacity="0.85">
      <animate attributeName="d" dur="3s" repeatCount="indefinite"
        values="M-34 12 A38 38 0 0 1 34 10;
                M-32 16 A36 36 0 0 1 32 14;
                M-34 12 A38 38 0 0 1 34 10" />
    </path>
    <circle cx="-16" cy="18" r="7.5" fill="#fff" /><circle cx="18" cy="18" r="7.5" fill="#fff" />
    <circle cx="-13.5" cy="21" r="3.8" fill="#9d174d" /><circle cx="15.5" cy="21" r="3.8" fill="#9d174d" />
    <circle cx="-15" cy="17" r="1.6" fill="#fff" /><circle cx="16.5" cy="17" r="1.6" fill="#fff" />
    <path d="M-8 36 Q0 42 10 35" stroke="#9d174d" stroke-width="3.5" fill="none" stroke-linecap="round" />
  </g>
  <circle cx="160" cy="120" r="10" fill="#a5f3fc" opacity="0.6"><animate attributeName="cy" values="120;96;120" dur="3.4s" repeatCount="indefinite" /></circle>
</svg>`;
}
