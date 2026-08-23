export interface ElementalOptions {
  size?: number;
}

export function createElementalInk(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 599; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const splats = Array.from({ length: 6 }, () => {
    const x = 40 + rand() * 240; const y = 40 + rand() * 240; const r = 3 + rand() * 9;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#312e81"><animate attributeName="r" values="0;${r.toFixed(1)};0" dur="${(2.4 + rand() * 2.6).toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="ink-body" cx="45%" cy="38%" r="70%">
      <stop offset="0%" stop-color="#4338ca" /><stop offset="70%" stop-color="#1e1b4b" /><stop offset="100%" stop-color="#020617" />
    </radialGradient>
    <filter id="ink-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" /></filter>
  </defs>
  ${splats}
  <path d="M160 56 C226 62 258 118 250 178 C242 236 202 274 154 268 C106 262 66 222 72 164 C78 108 100 50 160 56 Z" fill="url(#ink-body)" filter="url(#ink-soft)" opacity="0.7">
    <animate attributeName="d" dur="5s" repeatCount="indefinite"
      values="M160 56 C226 62 258 118 250 178 C242 236 202 274 154 268 C106 262 66 222 72 164 C78 108 100 50 160 56 Z;
              M158 64 C230 54 260 122 246 182 C236 238 196 280 152 262 C104 244 74 216 80 160 C86 106 96 72 158 64 Z;
              M160 56 C226 62 258 118 250 178 C242 236 202 274 154 268 C106 262 66 222 72 164 C78 108 100 50 160 56 Z" />
  </path>
  <path d="M112 210 Q140 190 168 208 T232 200" stroke="#818cf8" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.75">
    <animate attributeName="d" dur="3.6s" repeatCount="indefinite"
      values="M112 210 Q140 190 168 208 T232 200;
              M112 204 Q142 198 170 202 T232 206;
              M112 210 Q140 190 168 208 T232 200" />
  </path>
  <circle cx="132" cy="136" r="11" fill="#e0e7ff"><animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" /></circle>
  <circle cx="188" cy="136" r="11" fill="#e0e7ff"><animate attributeName="r" values="12;10;12" dur="2s" repeatCount="indefinite" /></circle>
  <circle cx="135" cy="139" r="5" fill="#020617" /><circle cx="185" cy="139" r="5" fill="#020617" />
  <circle cx="133" cy="134" r="2" fill="#fff" /><circle cx="183" cy="134" r="2" fill="#fff" />
  <path d="M146 166 L156 174 L166 164 L176 172" stroke="#a5b4fc" stroke-width="4" fill="none" stroke-linecap="round" />
</svg>`;
}
