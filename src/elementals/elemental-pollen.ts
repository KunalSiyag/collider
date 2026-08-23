export interface ElementalOptions {
  size?: number;
}

export function createElementalPollen(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1069; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const grains = Array.from({ length: 12 }, () => {
    const x = rand() * 320; const y = rand() * 320; const r = 2 + rand() * 4;
    return `<g><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#fde047"><animate attributeName="cx" values="${x.toFixed(1)};${(x + 40 + rand() * 40).toFixed(0)};${x.toFixed(1)}" dur="${(5 + rand() * 5).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="cy" values="${y.toFixed(1)};${(y + (rand() - 0.5) * 60).toFixed(0)};${y.toFixed(1)}" dur="${(5 + rand() * 5).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.3;0.95;0.3" dur="${(3 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></circle></g>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="pol-body" cx="44%" cy="38%" r="66%">
      <stop offset="0%" stop-color="#fef9c3" /><stop offset="65%" stop-color="#eab308" /><stop offset="100%" stop-color="#854d0e" />
    </radialGradient>
    <filter id="pol-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="8" /></filter>
  </defs>
  ${grains}
  <ellipse cx="160" cy="290" rx="74" ry="10" fill="#ca8a04" opacity="0.22" />
  <g>
    <path d="M160 70 C212 74 240 116 236 168 C232 218 198 252 158 248 C118 244 82 210 84 162 C86 112 110 66 160 70 Z" fill="#a16207">
      <animateTransform attributeName="transform" type="rotate" values="-2 160 160;2 160 160;-2 160 160" dur="6s" repeatCount="indefinite" />
    </path>
    <path d="M160 78 C206 82 230 120 226 166 C222 212 194 242 158 238 C122 234 92 204 94 160 C96 114 116 74 160 78 Z" fill="url(#pol-body)" />
    ${[0, 60, 120, 180, 240, 300].map((a, i) => `<circle cx="${(160 + Math.cos((a * Math.PI) / 180) * 52).toFixed(1)}" cy="${(158 + Math.sin((a * Math.PI) / 180) * 52).toFixed(1)}" r="7" fill="#facc15" opacity="0.75"><animate attributeName="r" values="6;8;6" dur="${(1.8 + i * 0.3).toFixed(1)}s" repeatCount="indefinite" /></circle>`).join('')}
    <circle cx="144" cy="150" r="7.5" fill="#422006" /><circle cx="178" cy="150" r="7.5" fill="#422006" />
    <circle cx="146.5" cy="147" r="2.5" fill="#fef9c3" /><circle cx="180.5" cy="147" r="2.5" fill="#fef9c3" />
    <path d="M152 172 Q161 178 170 172" stroke="#422006" stroke-width="3.6" fill="none" stroke-linecap="round" />
  </g>
  <circle cx="106.1" cy="61.5" r="3.7" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.5s" begin="0.8s" repeatCount="indefinite" /></circle>
  <circle cx="236.4" cy="253.4" r="4.3" fill="none" stroke="#4ade80" stroke-width="1.4"><animate attributeName="r" values="4.3;9.3;4.3" dur="4.3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="2.9s" repeatCount="indefinite" /></circle>
  <rect x="213.9" y="274.4" width="5.0" height="4.1" fill="#fde047" opacity="0.55" transform="rotate(45 213.9 274.4)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.4s" repeatCount="indefinite" /></rect>
  <circle cx="242.7" cy="52.7" r="2.2" fill="#f472b6" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.0s" begin="0.4s" repeatCount="indefinite" /></circle>
  <circle cx="76.0" cy="91.9" r="1.7" fill="none" stroke="#67e8f9" stroke-width="1.4"><animate attributeName="r" values="1.7;6.7;1.7" dur="3.5s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.5s" repeatCount="indefinite" /></circle>
  <circle cx="166" cy="116" r="2" fill="#f472b6" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
