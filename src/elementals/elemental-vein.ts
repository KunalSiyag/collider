export interface ElementalOptions {
  size?: number;
}

export function createElementalVein(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1439; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const veins = Array.from({ length: 6 }, (_, i) => {
    const y0 = 80 + i * 30;
    return `<path d="M40 ${y0} Q${(90 + rand() * 40).toFixed(0)} ${(y0 + (rand() - 0.5) * 40).toFixed(1)} ${(150 + rand() * 20).toFixed(0)} ${y0} T280 ${y0}" stroke="#fb7185" stroke-width="${(2 + rand() * 3).toFixed(1)}" fill="none" stroke-linecap="round" opacity="0.8"><animate attributeName="stroke-dashoffset" values="240;0" dur="${(2.4 + rand() * 2.4).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.8;0.35;0.8" dur="${(2.4 + rand() * 2).toFixed(1)}s" repeatCount="indefinite" /></path>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="vein-body" cx="46%" cy="42%" r="64%">
      <stop offset="0%" stop-color="#fda4af" /><stop offset="65%" stop-color="#e11d48" /><stop offset="100%" stop-color="#4c0519" />
    </radialGradient>
    <filter id="vein-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7" /></filter>
  </defs>
  <ellipse cx="160" cy="290" rx="76" ry="10" fill="#be123c" opacity="0.22" />
  <path d="M160 62 C222 66 252 110 248 168 C244 226 204 264 156 260 C108 256 70 218 74 162 C78 106 102 58 160 62 Z" fill="url(#vein-body)">
    <animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="1.6s" additive="sum" repeatCount="indefinite" />
  </path>
  <g transform="translate(-160 -162)">
    ${veins}
  </g>
  <circle cx="136" cy="152" r="9" fill="#450a0a"><animate attributeName="r" values="9;11;9" dur="1.6s" repeatCount="indefinite" /></circle>
  <circle cx="186" cy="150" r="9" fill="#450a0a"><animate attributeName="r" values="11;9;11" dur="1.6s" begin="0.8s" repeatCount="indefinite" /></circle>
  <circle cx="138.5" cy="149" r="3" fill="#fecdd3" /><circle cx="188.5" cy="147" r="3" fill="#fecdd3" />
  <path d="M148 184 L159 191 L169 183 L179 190" stroke="#450a0a" stroke-width="4" fill="none" stroke-linecap="round">
    <animate attributeName="d" values="M148 184 L159 191 L169 183 L179 190;M148 189 L159 182 L169 191 L179 183;M148 184 L159 191 L169 183 L179 190" dur="1.6s" repeatCount="indefinite" />
  </path>
  <circle cx="71.5" cy="110.4" r="3.5" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.4s" begin="0.1s" repeatCount="indefinite" /></circle>
  <circle cx="293.3" cy="150.8" r="3.2" fill="none" stroke="#22d3ee" stroke-width="1.4"><animate attributeName="r" values="3.2;8.2;3.2" dur="4.3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.9s" repeatCount="indefinite" /></circle>
  <rect x="62.8" y="79.9" width="3.0" height="3.8" fill="#f472b6" opacity="0.55" transform="rotate(35 62.8 79.9)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.9s" repeatCount="indefinite" /></rect>
  <circle cx="261.2" cy="39.3" r="2.4" fill="#a78bfa" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.5s" begin="0.1s" repeatCount="indefinite" /></circle>
  <circle cx="217" cy="207" r="2" fill="#22d3ee" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
