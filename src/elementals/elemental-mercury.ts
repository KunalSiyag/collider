export interface ElementalOptions {
  size?: number;
}

export function createElementalMercury(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 733; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const beads = Array.from({ length: 7 }, () => {
    const x = 40 + rand() * 240; const y = 60 + rand() * 200; const r = 3 + rand() * 8;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#cbd5e1"><animate attributeName="cy" values="${y.toFixed(1)};${(y + (rand() > 0.5 ? 30 : -30)).toFixed(0)};${y.toFixed(1)}" dur="${(2.6 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="hg-body" cx="38%" cy="32%" r="72%">
      <stop offset="0%" stop-color="#f8fafc" /><stop offset="45%" stop-color="#94a3b8" /><stop offset="100%" stop-color="#334155" />
    </radialGradient>
    <filter id="hg-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" /></filter>
  </defs>
  ${beads}
  <ellipse cx="160" cy="290" rx="70" ry="9" fill="#94a3b8" opacity="0.25" />
  <path d="M160 62 C222 66 252 112 248 170 C244 226 204 262 156 260 C108 258 72 220 76 164 C80 108 104 58 160 62 Z" fill="url(#hg-body)">
    <animate attributeName="d" dur="3s" repeatCount="indefinite"
      values="M160 62 C222 66 252 112 248 170 C244 226 204 262 156 260 C108 258 72 220 76 164 C80 108 104 58 160 62 Z;
              M158 68 C226 58 254 116 244 174 C238 228 198 268 154 254 C110 242 82 216 86 162 C90 106 96 74 158 68 Z;
              M160 62 C222 66 252 112 248 170 C244 226 204 262 156 260 C108 258 72 220 76 164 C80 108 104 58 160 62 Z" />
  </path>
  <ellipse cx="126" cy="108" rx="24" ry="13" fill="#fff" opacity="0.95" transform="rotate(-24 126 108)" />
  <ellipse cx="196" cy="212" rx="12" ry="7" fill="#fff" opacity="0.5" transform="rotate(-24 196 212)" />
  <circle cx="138" cy="152" r="10" fill="#0f172a"><animate attributeName="cy" values="150;155;150" dur="1.6s" repeatCount="indefinite" /></circle>
  <circle cx="184" cy="152" r="10" fill="#0f172a"><animate attributeName="cy" values="155;150;155" dur="1.6s" begin="0.4s" repeatCount="indefinite" /></circle>
  <circle cx="141" cy="149" r="3.2" fill="#e2e8f0" /><circle cx="187" cy="149" r="3.2" fill="#e2e8f0" />
  <circle cx="160" cy="216" r="16" fill="url(#hg-body)" filter="url(#hg-glow)">
    <animate attributeName="cy" values="216;206;216" dur="2.2s" repeatCount="indefinite" />
  </circle>
  <circle cx="89.6" cy="30.5" r="2.8" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="1.9s" begin="0.1s" repeatCount="indefinite" /></circle>
  <circle cx="221" cy="131" r="2" fill="#4ade80" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
