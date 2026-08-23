export interface ElementalOptions {
  size?: number;
}

export function createElementalMist(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1483; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const layers = Array.from({ length: 5 }, (_, i) => {
    const y0 = 90 + i * 40; const op = 0.35 - i * 0.04;
    return `<path d="M-20 ${y0} Q80 ${(y0 - 26).toFixed(1)} 160 ${y0} T340 ${(y0 - 10).toFixed(1)}" stroke="#cbd5e1" stroke-width="${(16 + rand() * 12).toFixed(1)}" fill="none" opacity="${op.toFixed(2)}" stroke-linecap="round">
      <animate attributeName="d" dur="${(6 + i * 1.5).toFixed(1)}s" repeatCount="indefinite"
        values="M-20 ${y0} Q80 ${(y0 - 26).toFixed(1)} 160 ${y0} T340 ${(y0 - 10).toFixed(1)};
                M-20 ${y0} Q80 ${(y0 + 22).toFixed(1)} 160 ${y0} T340 ${(y0 + 14).toFixed(1)};
                M-20 ${y0} Q80 ${(y0 - 26).toFixed(1)} 160 ${y0} T340 ${(y0 - 10).toFixed(1)}" />
    </path>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  ${layers}
  <g transform="translate(160 160)">
    <circle r="52" fill="#e2e8f0" opacity="0.55">
      <animate attributeName="r" values="50;56;50" dur="3.8s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.55;0.75;0.55" dur="3.8s" repeatCount="indefinite" />
    </circle>
    <circle r="40" fill="#f1f5f9" opacity="0.9" />
    <circle cx="-13" cy="-8" r="6" fill="#475569"><animate attributeName="cy" values="-9;-5;-9" dur="2.4s" repeatCount="indefinite" /></circle>
    <circle cx="15" cy="-8" r="6" fill="#475569"><animate attributeName="cy" values="-5;-9;-5" dur="2.4s" repeatCount="indefinite" /></circle>
    <circle cx="-11" cy="-10" r="2" fill="#fff" /><circle cx="17" cy="-10" r="2" fill="#fff" />
    <path d="M-7 12 Q1 17 9 11" stroke="#475569" stroke-width="3.4" fill="none" stroke-linecap="round" />
    <animateTransform attributeName="transform" type="translate" values="160 160;176 150;160 164;144 154;160 160" dur="14s" repeatCount="indefinite" />
  </g>
  <circle cx="139.2" cy="255.6" r="4.1" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.7s" begin="0.2s" repeatCount="indefinite" /></circle>
  <circle cx="118.2" cy="63.8" r="1.9" fill="none" stroke="#fde047" stroke-width="1.4"><animate attributeName="r" values="1.9;6.9;1.9" dur="3.6s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.3s" repeatCount="indefinite" /></circle>
  <rect x="159.5" y="58.3" width="3.2" height="5.0" fill="#4ade80" opacity="0.55" transform="rotate(51 159.5 58.3)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.5s" repeatCount="indefinite" /></rect>
  <circle cx="48.8" cy="143.8" r="2.5" fill="#a78bfa" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.1s" begin="1.0s" repeatCount="indefinite" /></circle>
  <circle cx="266.1" cy="198.7" r="1.9" fill="none" stroke="#f472b6" stroke-width="1.4"><animate attributeName="r" values="1.9;6.9;1.9" dur="4.0s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.8s" repeatCount="indefinite" /></circle>
  <circle cx="209" cy="159" r="2" fill="#22d3ee" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
