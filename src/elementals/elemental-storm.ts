export interface ElementalOptions {
  size?: number;
}

export function createElementalStorm(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1381; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const drops = Array.from({ length: 12 }, () => {
    const x = rand() * 320; const dur = 0.9 + rand() * 0.8;
    return `<line x1="${x.toFixed(1)}" y1="-10" x2="${(x - 5).toFixed(1)}" y2="2" stroke="#7dd3fc" stroke-width="2.4" stroke-linecap="round"><animate attributeName="transform" type="translate" values="0 -20;${((rand() * 60) - 30).toFixed(0)} 340" dur="${dur.toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0;1;0" dur="${dur.toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /></line>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  ${drops}
  <defs>
    <linearGradient id="storm-cloud" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#64748b" /><stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
    <filter id="storm-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8" /></filter>
  </defs>
  <g>
    <path d="M70 150 C70 118 96 100 122 104 C130 76 168 66 192 82 C222 68 254 88 254 120 C254 148 232 162 204 160 L96 160 C80 160 70 158 70 150 Z" fill="url(#storm-cloud)">
      <animateTransform attributeName="transform" type="translate" values="0 0;-14 4;0 0;10 -3;0 0" dur="7s" repeatCount="indefinite" />
    </path>
    <circle cx="128" cy="128" r="8" fill="#facc15"><animate attributeName="opacity" values="1;0.3;1" dur="1.7s" repeatCount="indefinite" /></circle>
    <circle cx="196" cy="124" r="8" fill="#facc15"><animate attributeName="opacity" values="0.3;1;0.3" dur="1.7s" begin="0.6s" repeatCount="indefinite" /></circle>
    <circle cx="131" cy="125" r="2.6" fill="#fff" /><circle cx="199" cy="121" r="2.6" fill="#fff" />
    <path d="M152 142 Q162 149 172 141" stroke="#facc15" stroke-width="4" fill="none" stroke-linecap="round" />
  </g>
  <path d="M170 164 L140 216 L162 212 L136 268 L186 208 L164 212 L190 164 Z" fill="#fde047" filter="url(#storm-glow)">
    <animate attributeName="opacity" values="0.2;1;0.2;0.6;0.2" dur="2.2s" repeatCount="indefinite" />
  </path>
  <circle cx="178.1" cy="100.5" r="3.8" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.1s" begin="0.7s" repeatCount="indefinite" /></circle>
  <circle cx="210.9" cy="57.8" r="3.5" fill="none" stroke="#f472b6" stroke-width="1.4"><animate attributeName="r" values="3.5;8.5;3.5" dur="3.8s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.5s" repeatCount="indefinite" /></circle>
  <rect x="204.7" y="226.2" width="5.0" height="5.5" fill="#fbbf24" opacity="0.55" transform="rotate(20 204.7 226.2)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.5s" repeatCount="indefinite" /></rect>
  <circle cx="59.8" cy="154.8" r="2.9" fill="#4ade80" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="1.9s" begin="0.6s" repeatCount="indefinite" /></circle>
  <circle cx="231" cy="201" r="2" fill="#fb7185" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
