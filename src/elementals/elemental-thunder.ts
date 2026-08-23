export interface ElementalOptions {
  size?: number;
}

export function createElementalThunder(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1423; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const arcs = Array.from({ length: 4 }, () => {
    const y0 = rand() * 280; const x0 = rand() * 320;
    return `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)} q${(10 + rand() * 20).toFixed(0)} ${(rand() * 30).toFixed(0)} ${(20 + rand() * 40).toFixed(0)} ${(rand() * 20 - 10).toFixed(0)}" stroke="#fef08a" stroke-width="2.4" fill="none" stroke-linecap="round"><animate attributeName="opacity" values="0;1;0" dur="${(1.2 + rand() * 1.6).toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /></path>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  ${arcs}
  <defs>
    <linearGradient id="thu-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e2e8f0" /><stop offset="100%" stop-color="#64748b" />
    </linearGradient>
    <filter id="thu-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="9" /></filter>
  </defs>
  <circle cx="160" cy="164" r="94" fill="#a78bfa" opacity="0.25" filter="url(#thu-glow)">
    <animate attributeName="r" values="90;102;90" dur="1.6s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.15;0.35;0.15" dur="1.6s" repeatCount="indefinite" />
  </circle>
  <g>
    <path d="M160 70 C222 74 252 118 248 174 C244 230 206 266 158 262 C110 258 72 220 76 164 C80 108 104 66 160 70 Z" fill="url(#thu-body)">
      <animate attributeName="opacity" values="1;0.75;1" dur="1.6s" repeatCount="indefinite" />
    </path>
    <path d="M150 96 L172 140 L156 144 L184 196 L166 198 L188 246 L138 200 L158 194 L128 152 L148 148 L132 106 Z" fill="#fde047">
      <animate attributeName="opacity" values="1;0.5;1" dur="1.1s" repeatCount="indefinite" />
    </path>
    <circle cx="130" cy="120" r="9" fill="#111" /><circle cx="190" cy="116" r="9" fill="#111" />
    <circle cx="133" cy="117" r="3" fill="#fde047" /><circle cx="193" cy="113" r="3" fill="#fde047" />
    <path d="M146 236 Q161 245 176 235" stroke="#111" stroke-width="4.5" fill="none" stroke-linecap="round" />
  </g>
  <circle cx="116.0" cy="109.2" r="1.7" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.1s" begin="0.3s" repeatCount="indefinite" /></circle>
  <circle cx="40" cy="270" r="2" fill="#a78bfa" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
