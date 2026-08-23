export interface ElementalOptions {
  size?: number;
}

export function createElementalLava(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 691; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const blobs = Array.from({ length: 6 }, () => {
    const x = 90 + rand() * 140; const y = 120 + rand() * 110; const r = 3 + rand() * 6;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#fde047"><animate attributeName="cy" values="${y.toFixed(1)};${(y - 40).toFixed(0)};${y.toFixed(1)}" dur="${(2 + rand() * 2.5).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0;1;0" dur="${(2 + rand() * 2.5).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="lava-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f97316" /><stop offset="60%" stop-color="#dc2626" /><stop offset="100%" stop-color="#7f1d1d" />
    </linearGradient>
    <filter id="lava-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="12" /></filter>
  </defs>
  <ellipse cx="160" cy="288" rx="86" ry="13" fill="#dc2626" opacity="0.25" />
  <path d="M160 58 C228 64 262 118 256 180 C250 240 206 280 156 274 C106 268 64 226 70 166 C76 108 98 52 160 58 Z" fill="#ea580c" filter="url(#lava-glow)" opacity="0.55">
    <animate attributeName="d" dur="3.6s" repeatCount="indefinite"
      values="M160 58 C228 64 262 118 256 180 C250 240 206 280 156 274 C106 268 64 226 70 166 C76 108 98 52 160 58 Z;
              M162 52 C232 56 264 122 254 184 C246 242 198 284 152 270 C102 256 68 222 74 162 C80 104 96 46 162 52 Z;
              M160 58 C228 64 262 118 256 180 C250 240 206 280 156 274 C106 268 64 226 70 166 C76 108 98 52 160 58 Z" />
  </path>
  <path d="M160 66 C222 72 254 120 248 178 C242 234 202 270 158 264 C114 258 78 220 84 164 C90 110 104 60 160 66 Z" fill="url(#lava-body)" />
  <path d="M112 130 Q136 150 124 176 Q150 168 154 194" stroke="#fde047" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.9">
    <animate attributeName="opacity" values="0.9;0.4;0.9" dur="1.8s" repeatCount="indefinite" />
  </path>
  <path d="M196 140 L186 170 L204 190" stroke="#fbbf24" stroke-width="4.5" fill="none" stroke-linecap="round" opacity="0.8">
    <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.3s" begin="0.5s" repeatCount="indefinite" />
  </path>
  ${blobs}
  <circle cx="134" cy="128" r="10" fill="#450a0a" /><circle cx="188" cy="128" r="10" fill="#450a0a" />
  <circle cx="137" cy="125" r="3" fill="#fef08a" /><circle cx="191" cy="125" r="3" fill="#fef08a" />
  <path d="M144 156 L156 164 L168 154 L180 164" stroke="#450a0a" stroke-width="4.5" fill="none" stroke-linecap="round" />
</svg>`;
}
