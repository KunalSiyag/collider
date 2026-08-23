export interface ElementalOptions {
  size?: number;
}

export function createElementalGlass(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 431; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const glints = Array.from({ length: 5 }, () => {
    const x = rand() * 320; const y = rand() * 320;
    return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z" fill="#e0f2fe"><animate attributeName="opacity" values="0;1;0" dur="${(2 + rand() * 2.5).toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /></path>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="glass-body" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e0f2fe" stop-opacity="0.85" /><stop offset="50%" stop-color="#38bdf8" stop-opacity="0.35" /><stop offset="100%" stop-color="#0ea5e9" stop-opacity="0.6" />
    </linearGradient>
    <filter id="glass-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" /></filter>
  </defs>
  ${glints}
  <ellipse cx="160" cy="290" rx="76" ry="9" fill="#38bdf8" opacity="0.15" />
  <g>
    <path d="M160 56 L236 128 L212 252 L108 252 L84 128 Z" fill="url(#glass-body)" stroke="#bae6fd" stroke-width="2">
      <animate attributeName="opacity" values="1;0.75;1" dur="3.4s" repeatCount="indefinite" />
    </path>
    <path d="M160 56 L160 252 M84 128 L236 128 M120 190 L204 176" stroke="#f0f9ff" stroke-width="1.4" opacity="0.7" />
    <polygon points="160,56 236,128 196,140 132,110" fill="#fff" opacity="0.35" />
    <circle cx="138" cy="168" r="8" fill="#0c4a6e" /><circle cx="184" cy="164" r="8" fill="#0c4a6e" />
    <circle cx="141" cy="165" r="2.6" fill="#fff" /><circle cx="187" cy="161" r="2.6" fill="#fff" />
    <path d="M146 198 L160 206 L174 194" stroke="#0c4a6e" stroke-width="4" fill="none" stroke-linecap="round" />
    <animateTransform attributeName="transform" type="rotate" values="-2 160 160;2 160 160;-2 160 160" dur="5.2s" repeatCount="indefinite" />
  </g>
  <path d="M96 262 Q160 246 224 262" stroke="#38bdf8" stroke-width="3" fill="none" opacity="0.5" filter="url(#glass-glow)" />
  <circle cx="72.1" cy="74.2" r="1.6" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.7s" begin="0.1s" repeatCount="indefinite" /></circle>
  <circle cx="273.9" cy="270.1" r="3.4" fill="none" stroke="#fb7185" stroke-width="1.4"><animate attributeName="r" values="3.4;8.4;3.4" dur="3.9s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.1s" repeatCount="indefinite" /></circle>
  <rect x="185.2" y="171.7" width="3.9" height="3.3" fill="#a78bfa" opacity="0.55" transform="rotate(35 185.2 171.7)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.2s" repeatCount="indefinite" /></rect>
  <circle cx="171" cy="241" r="2" fill="#4ade80" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
