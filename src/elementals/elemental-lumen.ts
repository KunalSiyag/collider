export interface ElementalOptions {
  size?: number;
}

export function createElementalLumen(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Lumen elemental">
  <defs>
    <radialGradient id="lumen-core" cx="0.5" cy="0.45" r="0.6">
      <stop offset="0%" stop-color="#fffbeb" />
      <stop offset="55%" stop-color="#fde047" />
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.15" />
    </radialGradient>
  </defs>
  <g>
    <g opacity="0.9">
      <animateTransform attributeName="transform" type="rotate" values="0 100 104;360 100 104" dur="30s" repeatCount="indefinite" />
      ${Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const long = i % 2 === 0;
        const r1 = long ? 58 : 66;
        const r2 = long ? 92 : 84;
        return `<line x1="${(100 + Math.cos(a) * r1).toFixed(1)}" y1="${(104 + Math.sin(a) * r1).toFixed(1)}" x2="${(100 + Math.cos(a) * r2).toFixed(1)}" y2="${(104 + Math.sin(a) * r2).toFixed(1)}" stroke="#fde047" stroke-width="${long ? 4 : 2.5}" stroke-linecap="round" opacity="${long ? 0.85 : 0.5}" />`;
      }).join('')}
    </g>
    <circle cx="100" cy="104" r="46" fill="url(#lumen-core)">
      <animate attributeName="r" values="44;49;44" dur="3.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="86" cy="98" r="6" fill="#78350f" />
    <circle cx="114" cy="98" r="6" fill="#78350f" />
    <path d="M83 96 Q86 93 89 96 M111 96 Q114 93 117 96" stroke="#fffbeb" stroke-width="1.8" fill="none" stroke-linecap="round" />
    <path d="M88 114 Q100 122 112 114" stroke="#92400e" stroke-width="4" fill="none" stroke-linecap="round" />
    <ellipse cx="76" cy="110" rx="7" ry="4" fill="#fb923c" opacity="0.6" />
    <ellipse cx="124" cy="110" rx="7" ry="4" fill="#fb923c" opacity="0.6" />
    <g fill="#fef08a">
      <circle cx="34" cy="60" r="4"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="2s" repeatCount="indefinite" /></circle>
      <circle cx="168" cy="52" r="5"><animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.6s" repeatCount="indefinite" /></circle>
      <circle cx="176" cy="150" r="3.5"><animate attributeName="opacity" values="0.9;0.15;0.9" dur="1.8s" repeatCount="indefinite" /></circle>
    </g>
  </g>
</svg>`;
}
