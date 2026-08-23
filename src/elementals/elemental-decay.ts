export interface ElementalOptions {
  size?: number;
}

export function createElementalDecay(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 167; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const motes = Array.from({ length: 7 }, () => {
    const x = 40 + rand() * 240; const y = 60 + rand() * 200;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.5 + rand() * 2.5).toFixed(1)}" fill="#84cc16" opacity="0.5"><animate attributeName="cy" values="${y.toFixed(1)};${(y + 26).toFixed(1)};${y.toFixed(1)}" dur="${(3 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0.1;0.6" dur="${(3 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="decay-body" cx="45%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#65a30d" /><stop offset="70%" stop-color="#3f6212" /><stop offset="100%" stop-color="#1a2e05" />
    </radialGradient>
    <filter id="decay-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" /></filter>
  </defs>
  <ellipse cx="160" cy="288" rx="82" ry="12" fill="#4d7c0f" opacity="0.18" />
  <path d="M160 58 C220 66 252 116 246 176 C240 234 204 274 158 270 C110 266 72 226 74 168 C76 112 106 52 160 58 Z" fill="url(#decay-body)" filter="url(#decay-glow)" opacity="0.5">
    <animate attributeName="d" dur="5.2s" repeatCount="indefinite"
      values="M160 58 C220 66 252 116 246 176 C240 234 204 274 158 270 C110 266 72 226 74 168 C76 112 106 52 160 58 Z;
              M162 64 C218 60 250 122 242 180 C236 232 198 280 154 268 C108 256 78 222 80 164 C82 108 108 68 162 64 Z;
              M160 58 C220 66 252 116 246 176 C240 234 204 274 158 270 C110 266 72 226 74 168 C76 112 106 52 160 58 Z" />
  </path>
  <path d="M160 66 C214 72 244 118 240 172 C236 228 202 264 158 260 C114 256 80 220 82 166 C84 114 110 62 160 66 Z" fill="#1a2e05" opacity="0.85" />
  <g stroke="#a3e635" stroke-width="2" fill="none" opacity="0.55">
    <path d="M110 130 Q126 142 118 160" />
    <path d="M206 120 Q192 138 202 152" />
    <path d="M150 210 Q164 220 178 208" />
  </g>
  <circle cx="132" cy="140" r="9" fill="#d9f99d" /><circle cx="188" cy="140" r="9" fill="#d9f99d" />
  <circle cx="134" cy="143" r="4" fill="#1a2e05" /><circle cx="186" cy="143" r="4" fill="#1a2e05" />
  <path d="M142 176 L152 184 L162 174 L174 182" stroke="#d9f99d" stroke-width="4" fill="none" stroke-linecap="round" stroke-dasharray="7 4" />
  ${motes}

</svg>`;
}
