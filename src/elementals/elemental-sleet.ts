export interface ElementalOptions {
  size?: number;
}

export function createElementalSleet(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1499; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const pellets = Array.from({ length: 14 }, () => {
    const x = rand() * 320; const dur = 1.1 + rand() * 0.9;
    return `<line x1="${x.toFixed(1)}" y1="-12" x2="${(x - 4).toFixed(1)}" y2="0" stroke="#a5f3fc" stroke-width="2"><animate attributeName="transform" type="translate" values="0 -20;${((rand() * 40) - 20).toFixed(0)} 340" dur="${dur.toFixed(2)}s" begin="${rand().toFixed(2)}s" repeatCount="indefinite" /></line>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  ${pellets}
  <defs>
    <linearGradient id="sleet-body" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#cffafe" /><stop offset="55%" stop-color="#22d3ee" /><stop offset="100%" stop-color="#155e75" />
    </linearGradient>
    <filter id="sleet-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
  </defs>
  <path d="M160 64 C220 68 250 112 246 168 C242 224 204 260 158 256 C112 252 76 216 80 160 C84 104 106 60 160 64 Z" fill="#164e63" opacity="0.5">
    <animateTransform attributeName="transform" type="skewX" values="-3;3;-3" dur="2.8s" repeatCount="indefinite" />
  </path>
  <g transform="translate(-10 10)">
    <path d="M170 62 C226 66 254 110 250 166 C246 222 208 258 162 254 C116 250 80 214 84 158 C88 102 114 58 170 62 Z" fill="url(#sleet-body)">
      <animateTransform attributeName="transform" type="translate" values="0 0;-8 -4;0 0;8 4;0 0" dur="2.8s" repeatCount="indefinite" />
    </path>
    <path d="M108 130 Q136 118 164 130 T232 126" stroke="#fff" stroke-width="4.5" fill="none" opacity="0.7" stroke-dasharray="14 8">
      <animate attributeName="stroke-dashoffset" values="44;-44" dur="1.6s" repeatCount="indefinite" />
    </path>
    <circle cx="148" cy="152" r="8" fill="#083344" /><circle cx="186" cy="150" r="8" fill="#083344" />
    <circle cx="150.5" cy="149" r="2.6" fill="#fff" /><circle cx="188.5" cy="147" r="2.6" fill="#fff" />
    <path d="M154 178 Q165 184 176 176" stroke="#083344" stroke-width="4" fill="none" stroke-linecap="round" />
  </g>
  <circle cx="217.9" cy="58.5" r="4.1" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.9s" begin="0.5s" repeatCount="indefinite" /></circle>
  <circle cx="207.7" cy="241.8" r="4.1" fill="none" stroke="#fb7185" stroke-width="1.4"><animate attributeName="r" values="4.1;9.1;4.1" dur="4.4s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.3s" repeatCount="indefinite" /></circle>
  <circle cx="276" cy="66" r="2" fill="#fbbf24" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
