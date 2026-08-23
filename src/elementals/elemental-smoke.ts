export interface ElementalOptions {
  size?: number;
}

export function createElementalSmoke(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1249; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const puffs = Array.from({ length: 7 }, () => {
    const x = 120 + rand() * 80; const dur = 3 + rand() * 3; const r = 10 + rand() * 16;
    return `<circle cx="${x.toFixed(1)}" cy="270" r="${r.toFixed(1)}" fill="#94a3b8" opacity="0.4"><animate attributeName="cy" values="270;${(40 + rand() * 60).toFixed(0)}" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="cx" values="${x.toFixed(1)};${(x + (rand() > 0.5 ? 50 : -50)).toFixed(0)}" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.45;0" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="r" values="${r.toFixed(1)};${(r * 2).toFixed(0)}" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <filter id="smoke-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8" /></filter>
    <linearGradient id="smoke-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#cbd5e1" /><stop offset="100%" stop-color="#475569" />
    </linearGradient>
  </defs>
  ${puffs}
  <g filter="url(#smoke-blur)">
    <path d="M160 120 C204 122 226 152 222 190 C218 228 192 252 158 250 C124 248 98 224 96 188 C94 150 118 118 160 120 Z" fill="url(#smoke-body)" opacity="0.9">
      <animate attributeName="d" dur="4.2s" repeatCount="indefinite"
        values="M160 120 C204 122 226 152 222 190 C218 228 192 252 158 250 C124 248 98 224 96 188 C94 150 118 118 160 120 Z;
                M156 116 C202 112 230 148 226 186 C224 224 194 256 154 254 C116 252 94 220 100 184 C106 148 114 120 156 116 Z;
                M160 120 C204 122 226 152 222 190 C218 228 192 252 158 250 C124 248 98 224 96 188 C94 150 118 118 160 120 Z" />
      <animate attributeName="cx" values="0;0" dur="1ms" repeatCount="indefinite" />
    </path>
  </g>
  <circle cx="142" cy="172" r="8" fill="#0f172a"><animate attributeName="r" values="7;9;7" dur="2s" repeatCount="indefinite" /></circle>
  <circle cx="180" cy="170" r="8" fill="#0f172a"><animate attributeName="r" values="9;7;9" dur="2s" repeatCount="indefinite" /></circle>
  <circle cx="144" cy="169" r="2.6" fill="#e2e8f0" /><circle cx="182" cy="167" r="2.6" fill="#e2e8f0" />
  <path d="M150 196 Q161 203 172 195" stroke="#0f172a" stroke-width="4" fill="none" stroke-linecap="round" />
  <circle cx="134.4" cy="214.8" r="3.2" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.8s" begin="0.7s" repeatCount="indefinite" /></circle>
  <circle cx="52.6" cy="49.7" r="4.0" fill="none" stroke="#a78bfa" stroke-width="1.4"><animate attributeName="r" values="4.0;9.0;4.0" dur="3.8s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
  <rect x="256.7" y="166.1" width="4.0" height="4.8" fill="#67e8f9" opacity="0.55" transform="rotate(6 256.7 166.1)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.1s" repeatCount="indefinite" /></rect>
  <circle cx="215" cy="125" r="2" fill="#fb7185" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
