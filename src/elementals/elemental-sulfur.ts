export interface ElementalOptions {
  size?: number;
}

export function createElementalSulfur(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1399; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const fumes = Array.from({ length: 6 }, () => {
    const x = 100 + rand() * 120; const dur = 2.8 + rand() * 2.4;
    return `<circle cx="${x.toFixed(1)}" cy="240" r="${(5 + rand() * 9).toFixed(1)}" fill="#bef264" opacity="0.35"><animate attributeName="cy" values="240;${(60 + rand() * 60).toFixed(0)}" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.35;0" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="cx" values="${x.toFixed(1)};${(x + (rand() > 0.5 ? '' : '-') + (20 + rand() * 30).toFixed(0))}" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  ${fumes}
  <defs>
    <radialGradient id="sul-body" cx="44%" cy="38%" r="66%">
      <stop offset="0%" stop-color="#fef08a" /><stop offset="65%" stop-color="#eab308" /><stop offset="100%" stop-color="#a16207" />
    </radialGradient>
    <filter id="sul-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
  </defs>
  <ellipse cx="160" cy="290" rx="76" ry="10" fill="#eab308" opacity="0.2" />
  <path d="M160 64 C220 70 248 114 244 170 C240 226 202 262 156 258 C110 254 74 218 78 162 C82 106 104 58 160 64 Z" fill="url(#sul-body)">
    <animate attributeName="d" dur="3.8s" repeatCount="indefinite"
      values="M160 64 C220 70 248 114 244 170 C240 226 202 262 156 258 C110 254 74 218 78 162 C82 106 104 58 160 64 Z;
              M158 58 C222 62 250 110 246 168 C242 224 198 266 152 260 C106 254 80 216 84 160 C88 104 96 52 158 58 Z;
              M160 64 C220 70 248 114 244 170 C240 226 202 262 156 258 C110 254 74 218 78 162 C82 106 104 58 160 64 Z" />
  </path>
  <g stroke="#a16207" stroke-width="2.5" fill="none" opacity="0.7">
    <path d="M112 200 Q126 188 140 198" /><path d="M180 196 Q194 186 208 196" /><path d="M136 224 Q150 214 164 222 T196 220" />
  </g>
  <circle cx="138" cy="146" r="9" fill="#4d3c00"><animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" /></circle>
  <circle cx="184" cy="144" r="9" fill="#4d3c00"><animate attributeName="r" values="10;8;10" dur="2s" begin="0.5s" repeatCount="indefinite" /></circle>
  <path d="M148 176 Q153 182 160 177 T174 175" stroke="#4d3c00" stroke-width="4" fill="none" stroke-linecap="round" />
  <circle cx="45.8" cy="144.8" r="2.2" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.6s" begin="0.2s" repeatCount="indefinite" /></circle>
  <circle cx="258.5" cy="125.8" r="3.2" fill="none" stroke="#f472b6" stroke-width="1.4"><animate attributeName="r" values="3.2;8.2;3.2" dur="3.9s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="2.9s" repeatCount="indefinite" /></circle>
  <rect x="247.0" y="247.6" width="5.8" height="5.5" fill="#4ade80" opacity="0.55" transform="rotate(57 247.0 247.6)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.9s" repeatCount="indefinite" /></rect>
  <circle cx="194" cy="244" r="2" fill="#fbbf24" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
