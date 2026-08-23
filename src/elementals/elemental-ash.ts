export interface ElementalOptions {
  size?: number;
}

export function createElementalAsh(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1597; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const flakes = Array.from({ length: 16 }, () => {
    const x = rand() * 320; const y0 = rand() * 320; const dur = 4 + rand() * 5;
    return `<circle cx="${x.toFixed(1)}" cy="${y0.toFixed(1)}" r="${(1.2 + rand() * 2.4).toFixed(1)}" fill="#a3a3a3"><animate attributeName="cy" values="${y0.toFixed(1)};${(y0 + 40).toFixed(0)};${y0.toFixed(1)}" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="cx" values="${x.toFixed(1)};${(x + (rand() > 0.5 ? '' : '-') + (14 + rand() * 20).toFixed(0))};${x.toFixed(1)}" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.15;0.8;0.15" dur="${(3 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  ${flakes}
  <defs>
    <radialGradient id="ash-body" cx="44%" cy="38%" r="66%">
      <stop offset="0%" stop-color="#d4d4d4" /><stop offset="65%" stop-color="#525252" /><stop offset="100%" stop-color="#171717" />
    </radialGradient>
    <filter id="ash-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
  </defs>
  <ellipse cx="160" cy="288" rx="72" ry="10" fill="#737373" opacity="0.25" />
  <path d="M160 66 C218 70 246 112 242 168 C238 222 202 256 156 252 C110 248 76 214 80 160 C84 106 106 62 160 66 Z" fill="url(#ash-body)" filter="url(#ash-glow)">
    <animate attributeName="d" dur="4.6s" repeatCount="indefinite"
      values="M160 66 C218 70 246 112 242 168 C238 222 202 256 156 252 C110 248 76 214 80 160 C84 106 106 62 160 66 Z;
              M158 60 C220 64 250 108 246 166 C242 220 198 262 152 256 C106 250 82 212 86 158 C90 104 100 54 158 60 Z;
              M160 66 C218 70 246 112 242 168 C238 222 202 256 156 252 C110 248 76 214 80 160 C84 106 106 62 160 66 Z" />
  </path>
  <g stroke="#e5e5e5" stroke-width="2.4" fill="none" opacity="0.55">
    <path d="M116 196 Q134 186 150 194 M176 190 Q192 182 206 192" />
  </g>
  <circle cx="138" cy="148" r="9" fill="#fde047"><animate attributeName="opacity" values="1;0.35;1" dur="2.2s" repeatCount="indefinite" /></circle>
  <circle cx="184" cy="146" r="9" fill="#fde047"><animate attributeName="opacity" values="0.35;1;0.35" dur="2.2s" begin="0.6s" repeatCount="indefinite" /></circle>
  <circle cx="140.5" cy="145" r="3" fill="#171717" /><circle cx="186.5" cy="143" r="3" fill="#171717" />
  <path d="M148 178 L158 185 L168 177 L178 184" stroke="#fde047" stroke-width="4" fill="none" stroke-linecap="round" />
  <circle cx="160" cy="100" r="14" fill="#f97316" filter="url(#ash-glow)" opacity="0.35">
    <animate attributeName="r" values="12;17;12" dur="2.8s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.35;0.1;0.35" dur="2.8s" repeatCount="indefinite" />
  </circle>
</svg>`;
}
