export interface ElementalOptions {
  size?: number;
}

export function createElementalGlitch(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 443; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const bands = Array.from({ length: 5 }, () => {
    const y = 60 + rand() * 200; const h = 4 + rand() * 10;
    return `<rect x="0" y="${y.toFixed(1)}" width="320" height="${h.toFixed(1)}" fill="#22d3ee"><animate attributeName="x" values="0;${(rand() > 0.5 ? '' : '-')}${(20 + rand() * 40).toFixed(0)};-320;0" dur="${(1 + rand() * 2).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0;0.6;0" dur="${(1 + rand() * 2).toFixed(1)}s" repeatCount="indefinite" /></rect>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  ${bands}
  <g>
    <path d="M160 64 C216 68 248 114 244 172 C240 228 204 266 158 262 C112 258 76 220 80 166 C84 112 108 62 160 64 Z" fill="#a78bfa">
      <animate attributeName="fill" values="#a78bfa;#22d3ee;#f472b6;#a78bfa" dur="2.2s" repeatCount="indefinite" />
    </path>
    <g opacity="0.8">
      <rect x="80" y="120" width="160" height="12" fill="#f472b6">
        <animate attributeName="x" values="80;96;70;80" dur="0.9s" repeatCount="indefinite" />
      </rect>
      <rect x="90" y="190" width="140" height="8" fill="#22d3ee">
        <animate attributeName="x" values="90;74;104;90" dur="1.3s" repeatCount="indefinite" />
      </rect>
    </g>
    <circle cx="134" cy="150" r="9" fill="#111" />
    <circle cx="186" cy="150" r="9" fill="#111">
      <animate attributeName="cx" values="186;178;192;186" dur="0.7s" repeatCount="indefinite" />
    </circle>
    <path d="M142 184 L156 194 L170 182 L182 194" stroke="#111" stroke-width="4" fill="none" stroke-linecap="round">
      <animate attributeName="d" values="M142 184 L156 194 L170 182 L182 194;M142 192 L156 182 L170 194 L182 184;M142 184 L156 194 L170 182 L182 194" dur="0.8s" repeatCount="indefinite" />
    </path>
  </g>
  <text x="24" y="52" font-family="monospace" font-size="18" fill="#4ade80" opacity="0.85">01001<tspan><animate attributeName="opacity" values="0.85;0.2;0.85" dur="0.8s" repeatCount="indefinite" /></tspan></text>
  <text x="212" y="296" font-family="monospace" font-size="14" fill="#f472b6">10110</text>

</svg>`;
}
