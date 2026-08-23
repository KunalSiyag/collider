export interface ElementalOptions {
  size?: number;
}

export function createElementalSnow(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1277; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const flakes = Array.from({ length: 14 }, () => {
    const x = rand() * 320; const r = 1.6 + rand() * 2.6; const dur = 3.5 + rand() * 4;
    return `<circle cx="${x.toFixed(1)}" cy="-8" r="${r.toFixed(1)}" fill="#f0f9ff"><animate attributeName="cy" values="-8;328" dur="${dur.toFixed(1)}s" begin="${(rand() * dur).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="cx" values="${x.toFixed(1)};${(x + (rand() > 0.5 ? '' : '-') + (10 + rand() * 20).toFixed(0))};${x.toFixed(1)}" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  const arm = (): string =>
    [0, 45, 90, 135, 180, 225, 270, 315].map((a) =>
      `<g transform="rotate(${a} 160 160)"><line x1="160" y1="96" x2="160" y2="160" stroke="#e0f2fe" stroke-width="4" stroke-linecap="round" /><line x1="160" y1="116" x2="148" y2="104" stroke="#bae6fd" stroke-width="3" stroke-linecap="round" /><line x1="160" y1="116" x2="172" y2="104" stroke="#bae6fd" stroke-width="3" stroke-linecap="round" /></g>`
    ).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  ${flakes}
  <g>
    ${arm()}
    <animateTransform attributeName="transform" type="rotate" values="0 160 160;360 160 160" dur="26s" repeatCount="indefinite" />
  </g>
  <circle cx="160" cy="160" r="40" fill="#eff6ff">
    <animate attributeName="r" values="38;43;38" dur="3s" repeatCount="indefinite" />
  </circle>
  <circle cx="146" cy="154" r="5.5" fill="#0369a1" /><circle cx="174" cy="154" r="5.5" fill="#0369a1" />
  <circle cx="147.5" cy="152" r="1.8" fill="#fff" /><circle cx="175.5" cy="152" r="1.8" fill="#fff" />
  <path d="M152 170 Q160 175 168 170" stroke="#0369a1" stroke-width="3.5" fill="none" stroke-linecap="round" />
  <circle cx="188.1" cy="184.4" r="1.6" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="1.9s" begin="0.3s" repeatCount="indefinite" /></circle>
  <circle cx="259.9" cy="60.3" r="1.9" fill="none" stroke="#f472b6" stroke-width="1.4"><animate attributeName="r" values="1.9;6.9;1.9" dur="2.8s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="2.7s" repeatCount="indefinite" /></circle>
  <rect x="264.1" y="284.9" width="3.5" height="5.8" fill="#fde047" opacity="0.55" transform="rotate(49 264.1 284.9)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.7s" repeatCount="indefinite" /></rect>
  <circle cx="102.0" cy="247.1" r="3.6" fill="#f472b6" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.2s" begin="0.4s" repeatCount="indefinite" /></circle>
  <circle cx="231.9" cy="220.5" r="3.1" fill="none" stroke="#f472b6" stroke-width="1.4"><animate attributeName="r" values="3.1;8.1;3.1" dur="4.4s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.5s" repeatCount="indefinite" /></circle>
  <rect x="105.7" y="254.4" width="4.6" height="3.7" fill="#4ade80" opacity="0.55" transform="rotate(59 105.7 254.4)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.0s" repeatCount="indefinite" /></rect>
  <circle cx="249.0" cy="211.9" r="3.0" fill="#22d3ee" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.6s" begin="0.4s" repeatCount="indefinite" /></circle>
  <circle cx="191.8" cy="186.0" r="4.3" fill="none" stroke="#fb7185" stroke-width="1.4"><animate attributeName="r" values="4.3;9.3;4.3" dur="2.8s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
  <circle cx="165" cy="55" r="2" fill="#fb7185" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
