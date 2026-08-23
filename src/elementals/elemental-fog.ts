export interface ElementalOptions {
  size?: number;
}

export function createElementalFog(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1489; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const banks = Array.from({ length: 3 }, (_, i) => {
    const y0 = 120 + i * 46;
    return `<ellipse cx="${(80 + rand() * 160).toFixed(0)}" cy="${y0}" rx="${(90 + rand() * 50).toFixed(0)}" ry="24" fill="#94a3b8" opacity="${(0.3 - i * 0.06).toFixed(2)}">
      <animate attributeName="cx" values="${(60 + i * 40).toFixed(0)};${(240 - i * 40).toFixed(0)};${(60 + i * 40).toFixed(0)}" dur="${(12 + i * 4).toFixed(0)}s" repeatCount="indefinite" />
    </ellipse>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <filter id="fog-soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="10" /></filter>
    <radialGradient id="fog-glowc" cx="46%" cy="42%" r="62%">
      <stop offset="0%" stop-color="#f1f5f9" /><stop offset="100%" stop-color="#64748b" />
    </radialGradient>
  </defs>
  ${banks}
  <g filter="url(#fog-soft)">
    <circle cx="160" cy="164" r="66" fill="#cbd5e1" opacity="0.35">
      <animate attributeName="r" values="62;72;62" dur="5s" repeatCount="indefinite" />
    </circle>
  </g>
  <g transform="translate(160 164)">
    <circle r="42" fill="url(#fog-glowc)" opacity="0.92" />
    <path d="M-38 -10 Q0 -34 38 -8" stroke="#fff" stroke-width="6" fill="none" opacity="0.6" />
    <circle cx="-14" cy="-2" r="6.5" fill="#334155"><animate attributeName="cy" values="-3;1;-3" dur="3s" repeatCount="indefinite" /></circle>
    <circle cx="16" cy="-2" r="6.5" fill="#334155"><animate attributeName="cy" values="1;-3;1" dur="3s" repeatCount="indefinite" /></circle>
    <path d="M-7 18 L-2 23 L4 17 L9 22" stroke="#334155" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-dasharray="5 4" />
    <animateTransform attributeName="transform" type="translate" values="160 164;150 156;162 168;160 164" dur="16s" repeatCount="indefinite" additive="sum" />
  </g>
  <circle cx="296.7" cy="102.3" r="2.2" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.7s" begin="0.9s" repeatCount="indefinite" /></circle>
  <circle cx="33" cy="63" r="2" fill="#4ade80" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
