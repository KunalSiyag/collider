export interface ElementalOptions {
  size?: number;
}

export function createElementalSalt(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1213; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const grains = Array.from({ length: 16 }, () => {
    const x = rand() * 320; const y = rand() * 320; const s2 = 2 + rand() * 2.5;
    return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${s2.toFixed(1)}" height="${s2.toFixed(1)}" fill="#f8fafc" transform="rotate(${(rand() * 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"><animate attributeName="opacity" values="0.9;0.3;0.9" dur="${(1.8 + rand() * 2.6).toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /></rect>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="salt-body" cx="44%" cy="38%" r="66%">
      <stop offset="0%" stop-color="#ffffff" /><stop offset="70%" stop-color="#e2e8f0" /><stop offset="100%" stop-color="#94a3b8" />
    </radialGradient>
    <filter id="salt-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" /></filter>
  </defs>
  ${grains}
  <ellipse cx="160" cy="288" rx="76" ry="10" fill="#cbd5e1" opacity="0.25" />
  <g transform="translate(-6 6)">
    <path d="M166 62 C224 66 254 112 250 168 C246 224 208 260 162 256 C116 252 80 216 84 160 C88 106 110 58 166 62 Z" fill="url(#salt-body)" stroke="#fff" stroke-width="2">
      <animateTransform attributeName="transform" type="rotate" values="-3 166 160;3 166 160;-3 166 160" dur="7s" additive="sum" repeatCount="indefinite" />
    </path>
    ${[0, 60, 120, 180, 240, 300].map((a, i) => `<polygon points="166,96 172,110 158,110" fill="#94a3b8" opacity="0.7" transform="rotate(${a} 166 160)"><animate attributeName="opacity" values="0.7;0.25;0.7" dur="${(2 + i * 0.35).toFixed(1)}s" repeatCount="indefinite" /></polygon>`).join('')}
    <circle cx="150" cy="152" r="8" fill="#334155" /><circle cx="184" cy="150" r="8" fill="#334155" />
    <circle cx="152.5" cy="149" r="2.6" fill="#fff" /><circle cx="186.5" cy="147" r="2.6" fill="#fff" />
    <path d="M156 178 Q167 184 176 177" stroke="#334155" stroke-width="4" fill="none" stroke-linecap="round" />
  </g>
  <circle cx="160" cy="100" r="18" fill="#fff" opacity="0.4" filter="url(#salt-glow)">
    <animate attributeName="r" values="16;22;16" dur="2.6s" repeatCount="indefinite" />
  </circle>
  <circle cx="33.7" cy="116.2" r="3.3" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.9s" begin="0.4s" repeatCount="indefinite" /></circle>
  <circle cx="97.3" cy="138.8" r="2.1" fill="none" stroke="#4ade80" stroke-width="1.4"><animate attributeName="r" values="2.1;7.1;2.1" dur="3.3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
  <rect x="148.7" y="182.5" width="4.6" height="5.6" fill="#4ade80" opacity="0.55" transform="rotate(60 148.7 182.5)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.9s" repeatCount="indefinite" /></rect>
  <circle cx="186" cy="96" r="2" fill="#f472b6" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
