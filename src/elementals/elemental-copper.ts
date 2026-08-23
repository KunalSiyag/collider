export interface ElementalOptions {
  size?: number;
}

export function createElementalCopper(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 113; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const sparks = Array.from({ length: 6 }, () => {
    const a = rand() * Math.PI * 2; const r1 = 70 + rand() * 20; const r2 = r1 + 30 + rand() * 20;
    return `<line x1="${(160 + Math.cos(a) * r1).toFixed(1)}" y1="${(150 + Math.sin(a) * r1).toFixed(1)}" x2="${(160 + Math.cos(a) * r2).toFixed(1)}" y2="${(150 + Math.sin(a) * r2).toFixed(1)}" stroke="#fdba74" stroke-width="2.4" stroke-linecap="round"><animate attributeName="opacity" values="0;1;0" dur="${(1.2 + rand() * 1.8).toFixed(1)}s" repeatCount="indefinite" /></line>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="copper-skin" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fb923c" /><stop offset="50%" stop-color="#c2410c" /><stop offset="100%" stop-color="#7c2d12" />
    </linearGradient>
    <filter id="copper-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" /></filter>
  </defs>
  <ellipse cx="160" cy="286" rx="76" ry="11" fill="#ea580c" opacity="0.18" />
  <g>${sparks}</g>
  <path d="M160 64 L246 112 L246 208 L160 256 L74 208 L74 112 Z" fill="url(#copper-skin)">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="4.4s" repeatCount="indefinite" />
  </path>
  <path d="M160 64 L246 112 L160 158 L74 112 Z" fill="#fdba74" opacity="0.35" />
  <path d="M74 112 L160 158 L160 256 L74 208 Z" fill="#000" opacity="0.22" />
  <circle cx="132" cy="164" r="9" fill="#431407" /><circle cx="188" cy="164" r="9" fill="#431407" />
  <circle cx="134.5" cy="161" r="3" fill="#fed7aa" /><circle cx="190.5" cy="161" r="3" fill="#fed7aa" />
  <path d="M144 192 Q152 198 160 192 T176 192" stroke="#431407" stroke-width="4" fill="none" stroke-linecap="round" />
  <circle cx="160" cy="106" r="12" fill="#fdba74" filter="url(#copper-glow)">
    <animate attributeName="r" values="11;14;11" dur="2.2s" repeatCount="indefinite" />
  </circle>
  <circle cx="273.1" cy="177.4" r="3.9" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.0s" begin="0.4s" repeatCount="indefinite" /></circle>
  <circle cx="158.9" cy="115.9" r="3.0" fill="none" stroke="#fde047" stroke-width="1.4"><animate attributeName="r" values="3.0;8.0;3.0" dur="2.5s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
  <rect x="64.4" y="211.0" width="3.4" height="3.0" fill="#fde047" opacity="0.55" transform="rotate(81 64.4 211.0)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.9s" repeatCount="indefinite" /></rect>
  <circle cx="177.3" cy="140.4" r="2.6" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.6s" begin="0.8s" repeatCount="indefinite" /></circle>
  <circle cx="102" cy="212" r="2" fill="#f472b6" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
