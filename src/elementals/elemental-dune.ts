export interface ElementalOptions {
  size?: number;
}

export function createElementalDune(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1543; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const grains = Array.from({ length: 12 }, () => {
    const x = rand() * 320; const y = rand() * 320;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.2 + rand() * 2).toFixed(1)}" fill="#fcd34d"><animate attributeName="cx" values="${x.toFixed(1)};${(x + 60 + rand() * 40).toFixed(0)}" dur="${(3 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="cy" values="${y.toFixed(1)};${(y - (6 + rand() * 14)).toFixed(0)}" dur="${(3 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.2;0.9;0.2" dur="${(2 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  ${grains}
  <defs>
    <linearGradient id="dune-sand" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fde68a" /><stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <filter id="dune-soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="4" /></filter>
  </defs>
  <path d="M-10 210 Q90 150 190 196 T330 186 L330 320 L-10 320 Z" fill="url(#dune-sand)">
    <animate attributeName="d" dur="9s" repeatCount="indefinite"
      values="M-10 210 Q90 150 190 196 T330 186 L330 320 L-10 320 Z;
              M-10 204 Q92 158 192 192 T330 192 L330 320 L-10 320 Z;
              M-10 210 Q90 150 190 196 T330 186 L330 320 L-10 320 Z" />
  </path>
  <path d="M-10 250 Q120 214 240 248 T330 240 L330 320 L-10 320 Z" fill="#78350f" opacity="0.75" />
  <g transform="translate(160 130)">
    <ellipse cx="-26" cy="26" rx="20" ry="12" fill="#fde68a" opacity="0.5">
      <animate attributeName="rx" values="18;24;18" dur="3.4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="30" cy="30" rx="16" ry="10" fill="#fde68a" opacity="0.4" />
    <ellipse rx="46" ry="52" cy="6" fill="url(#dune-sand)" />
    <path d="M-40 -14 Q0 -38 42 -10" stroke="#fffbeb" stroke-width="5" fill="none" opacity="0.7" />
    <circle cx="-15" cy="-4" r="7.5" fill="#78350f" /><circle cx="17" cy="-4" r="7.5" fill="#78350f" />
    <circle cx="-12.5" cy="-6.5" r="2.4" fill="#fef9c3" /><circle cx="19.5" cy="-6.5" r="2.4" fill="#fef9c3" />
    <path d="M-9 16 Q0 22 11 15" stroke="#78350f" stroke-width="3.6" fill="none" stroke-linecap="round" />
    <animateTransform attributeName="transform" type="translate" values="160 130;166 126;160 130" dur="5.2s" repeatCount="indefinite" />
  </g>
</svg>`;
}
