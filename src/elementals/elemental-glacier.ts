export interface ElementalOptions {
  size?: number;
}

export function createElementalGlacier(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1511; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const bergs = Array.from({ length: 3 }, () => {
    const x = rand() > 0.5 ? 20 + rand() * 50 : 250 + rand() * 40; const h = 30 + rand() * 50;
    return `<polygon points="${x.toFixed(1)},290 ${(x - 16).toFixed(1)},${(290 - h).toFixed(1)} ${(x + 14).toFixed(1)},${(290 - h * 0.8).toFixed(1)}" fill="#bae6fd" opacity="0.5"><animate attributeName="opacity" values="0.5;0.2;0.5" dur="${(4 + rand() * 4).toFixed(1)}s" repeatCount="indefinite" /></polygon>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="glc-ice" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f0f9ff" /><stop offset="60%" stop-color="#38bdf8" /><stop offset="100%" stop-color="#0c4a6e" />
    </linearGradient>
    <filter id="glc-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7" /></filter>
  </defs>
  ${bergs}
  <rect y="266" width="320" height="54" fill="#082f49" />
  <path d="M60 266 Q160 246 260 264 L260 282 Q160 266 60 280 Z" fill="#0ea5e9" opacity="0.4">
    <animate attributeName="d" dur="4.6s" repeatCount="indefinite"
      values="M60 266 Q160 246 260 264 L260 282 Q160 266 60 280 Z;
              M60 270 Q160 252 260 268 L260 284 Q160 272 60 276 Z;
              M60 266 Q160 246 260 264 L260 282 Q160 266 60 280 Z" />
  </path>
  <g transform="translate(160 150)">
    <path d="M-64 96 L-84 -10 L-30 -92 L44 -104 L86 -18 L58 96 Z" fill="url(#glc-ice)" stroke="#e0f2fe" stroke-width="2.5">
      <animateTransform attributeName="transform" type="rotate" values="-1;1;-1" dur="6s" additive="sum" repeatCount="indefinite" />
    </path>
    <path d="M-84 -10 L-30 -92 L-6 20 Z" fill="#fff" opacity="0.35" />
    <path d="M-64 96 L-6 20 L58 96 Z" fill="#075985" opacity="0.45" />
    <circle cx="-22" cy="-16" r="8" fill="#082f49"><animate attributeName="r" values="7.5;9;7.5" dur="2.6s" repeatCount="indefinite" /></circle>
    <circle cx="26" cy="-16" r="8" fill="#082f49"><animate attributeName="r" values="9;7.5;9" dur="2.6s" begin="0.6s" repeatCount="indefinite" /></circle>
    <circle cx="-19.5" cy="-19" r="2.6" fill="#fff" /><circle cx="28.5" cy="-19" r="2.6" fill="#fff" />
    <path d="M-12 12 L-2 19 L8 11 L16 17" stroke="#082f49" stroke-width="3.8" fill="none" stroke-linecap="round" />
  </g>
</svg>`;
}
