export interface ElementalOptions {
  size?: number;
}

export function createElementalFern(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 269; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const fronds = Array.from({ length: 5 }, (_, i) => {
    const angle = -60 + i * 30;
    const leaflets = Array.from({ length: 6 }, (_, j) => {
      const t = 20 + j * 13;
      return `<ellipse cx="${t}" cy="0" rx="5" ry="${(10 - j * 1.2).toFixed(1)}" fill="#4ade80" transform="rotate(52)" />
      <ellipse cx="${t}" cy="0" rx="5" ry="${(10 - j * 1.2).toFixed(1)}" fill="#22c55e" transform="rotate(-52)" />`;
    }).join('');
    return `<g transform="rotate(${angle} 160 290)">
      <path d="M160 290 L160 ${290 - 110}" stroke="#16a34a" stroke-width="3" />
      <g transform="translate(160 ${290 - 108})">${leaflets}</g>
      <animateTransform attributeName="transform" type="rotate" values="${angle} 160 290;${angle + 3} 160 290;${angle} 160 290" dur="${(4 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" />
    </g>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="fern-face" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="#bbf7d0" /><stop offset="100%" stop-color="#15803d" />
    </radialGradient>
    <filter id="fern-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" /></filter>
  </defs>
  <ellipse cx="160" cy="296" rx="90" ry="10" fill="#166534" opacity="0.35" />
  ${fronds}
  <circle cx="160" cy="196" r="44" fill="url(#fern-face)">
    <animate attributeName="r" values="43;46;43" dur="3.2s" repeatCount="indefinite" />
  </circle>
  <circle cx="145" cy="188" r="6.5" fill="#052e16" /><circle cx="175" cy="188" r="6.5" fill="#052e16" />
  <circle cx="147" cy="186" r="2.2" fill="#fff" /><circle cx="177" cy="186" r="2.2" fill="#fff" />
  <path d="M150 208 Q160 214 170 208" stroke="#052e16" stroke-width="3.5" fill="none" stroke-linecap="round" />
  <g fill="#86efac">
    <circle cx="70" cy="120" r="3"><animate attributeName="cy" values="120;100;120" dur="3.4s" repeatCount="indefinite" /></circle>
    <circle cx="252" cy="160" r="2.5"><animate attributeName="cy" values="160;142;160" dur="4.1s" repeatCount="indefinite" /></circle>
  </g>
</svg>`;
}
