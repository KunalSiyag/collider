export interface ElementalOptions {
  size?: number;
}

export function createElementalEther(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 251; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const wisps = Array.from({ length: 8 }, () => {
    const x = 40 + rand() * 240; const y = 40 + rand() * 240; const r = 3 + rand() * 6;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#c4b5fd" opacity="0.35"><animate attributeName="cx" values="${x.toFixed(1)};${(x + (rand() > 0.5 ? 24 : -24)).toFixed(0)};${x.toFixed(1)}" dur="${(4 + rand() * 4).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="cy" values="${y.toFixed(1)};${(y + (rand() > 0.5 ? -20 : 20)).toFixed(0)};${y.toFixed(1)}" dur="${(4 + rand() * 4).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="ether-veil" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#ede9fe" stop-opacity="0.9" /><stop offset="100%" stop-color="#7c3aed" stop-opacity="0.15" />
    </radialGradient>
    <filter id="ether-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9" /></filter>
  </defs>
  ${wisps}
  <ellipse cx="160" cy="160" rx="120" ry="96" fill="url(#ether-veil)" filter="url(#ether-blur)">
    <animate attributeName="rx" values="114;126;114" dur="6s" repeatCount="indefinite" />
    <animate attributeName="ry" values="90;102;90" dur="6s" repeatCount="indefinite" />
  </ellipse>
  <g stroke="#ddd6fe" stroke-width="2.4" fill="none" opacity="0.85">
    <path d="M70 200 Q130 130 160 170 T250 120">
      <animate attributeName="d" dur="5s" repeatCount="indefinite"
        values="M70 200 Q130 130 160 170 T250 120;
                M70 188 Q128 146 162 156 T250 132;
                M70 200 Q130 130 160 170 T250 120" />
    </path>
    <path d="M84 232 Q150 176 178 206 T262 168">
      <animate attributeName="d" dur="6.2s" repeatCount="indefinite"
        values="M84 232 Q150 176 178 206 T262 168;
                M84 220 Q152 192 182 194 T262 182;
                M84 232 Q150 176 178 206 T262 168" />
    </path>
  </g>
  <g>
    <circle cx="138" cy="150" r="8" fill="#4c1d95" /><circle cx="182" cy="150" r="8" fill="#4c1d95" />
    <circle cx="140" cy="147" r="2.6" fill="#fff" /><circle cx="184" cy="147" r="2.6" fill="#fff" />
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -10;0 0" dur="4s" repeatCount="indefinite" />
  </g>
  <path d="M146 176 Q160 184 174 176" stroke="#4c1d95" stroke-width="4" fill="none" stroke-linecap="round" />
</svg>`;
}
