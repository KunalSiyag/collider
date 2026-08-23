export interface ElementalOptions {
  size?: number;
}

export function createElementalFrost(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const arm = (angle: number, len: number): string =>
    `<g transform="rotate(${angle} 100 100)">${Array.from({ length: 3 }, (_, i) => {
      const t = 26 + i * 22;
      const spread = 30 - i * 6;
      return `<line x1="100" y1="${100 - t}" x2="${100 - Math.sin((spread * Math.PI) / 180) * (t - 14)}" y2="${100 - t - 12}" stroke="#bae6fd" stroke-width="4" stroke-linecap="round" />
    <line x1="100" y1="${100 - t}" x2="${100 + Math.sin((spread * Math.PI) / 180) * (t - 14)}" y2="${100 - t - 12}" stroke="#bae6fd" stroke-width="4" stroke-linecap="round" />`;
    }).join('')}<line x1="100" y1="${100 - 74}" x2="100" y2="100" stroke="#e0f2fe" stroke-width="5" stroke-linecap="round" /></g>`;

  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Frost elemental">
  <g transform="translate(0 10)">
    <g opacity="0.95">
      <animateTransform attributeName="transform" type="rotate" values="0 100 100;360 100 100" dur="24s" repeatCount="indefinite" />
      ${arm(0, 74)}${arm(60, 74)}${arm(120, 74)}${arm(180, 74)}${arm(240, 74)}${arm(300, 74)}
    </g>
    <circle cx="100" cy="100" r="34" fill="#e0f2fe">
      <animate attributeName="r" values="32;36;32" dur="2.8s" repeatCount="indefinite" />
    </circle>
    <circle cx="100" cy="100" r="34" fill="none" stroke="#7dd3fc" stroke-width="2.5" opacity="0.9" />
    <circle cx="90" cy="94" r="4.5" fill="#0369a1" />
    <circle cx="110" cy="94" r="4.5" fill="#0369a1" />
    <path d="M92 108 Q100 114 108 108" stroke="#0369a1" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <circle cx="86" cy="92" r="1.6" fill="#fff" />
    <circle cx="106" cy="92" r="1.6" fill="#fff" />
  </g>
  <g fill="#e0f2fe">
    <path d="M40 40 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z"><animate attributeName="opacity" values="0.9;0.2;0.9" dur="2.1s" repeatCount="indefinite" /></path>
    <path d="M162 56 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 Z"><animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.7s" repeatCount="indefinite" /></path>
    <path d="M170 160 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z"><animate attributeName="opacity" values="0.8;0.15;0.8" dur="2.5s" repeatCount="indefinite" /></path>
    <path d="M34 150 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 Z"><animate attributeName="opacity" values="0.4;1;0.4" dur="1.9s" repeatCount="indefinite" /></path>
  </g>
</svg>`;
}
