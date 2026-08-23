export interface ElementalOptions {
  size?: number;
}

export function createElementalDust(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 191; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const motes = Array.from({ length: 14 }, () => {
    const x = rand() * 320; const y = rand() * 320; const dur = 4 + rand() * 5;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1 + rand() * 2.6).toFixed(1)}" fill="#d6d3d1"><animate attributeName="cx" values="${x.toFixed(1)};${(x + 30 + rand() * 40).toFixed(0)};${x.toFixed(1)}" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="cy" values="${y.toFixed(1)};${(y - 20 - rand() * 20).toFixed(0)};${y.toFixed(1)}" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.2;0.8;0.2" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="dust-body" cx="50%" cy="42%" r="62%">
      <stop offset="0%" stop-color="#e7e5e4" /><stop offset="60%" stop-color="#a8a29e" /><stop offset="100%" stop-color="#57534e" />
    </radialGradient>
    <filter id="dust-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
  </defs>
  ${motes}
  <ellipse cx="160" cy="286" rx="72" ry="10" fill="#a8a29e" opacity="0.16" />
  <path d="M160 74 C214 78 246 122 240 176 C234 228 200 266 158 262 C114 258 76 224 80 170 C84 118 110 70 160 74 Z" fill="url(#dust-body)" filter="url(#dust-glow)" opacity="0.45">
    <animate attributeName="d" dur="4.8s" repeatCount="indefinite"
      values="M160 74 C214 78 246 122 240 176 C234 228 200 266 158 262 C114 258 76 224 80 170 C84 118 110 70 160 74 Z;
              M154 80 C210 70 250 126 242 180 C236 226 198 270 156 256 C112 242 82 218 88 166 C94 116 104 86 154 80 Z;
              M160 74 C214 78 246 122 240 176 C234 228 200 266 158 262 C114 258 76 224 80 170 C84 118 110 70 160 74 Z" />
  </path>
  <path d="M160 82 C208 86 238 124 232 172 C226 220 196 254 158 250 C120 246 86 216 90 168 C94 122 116 78 160 82 Z" fill="#44403c" opacity="0.9" />
  <circle cx="134" cy="146" r="9" fill="#fefce8" /><circle cx="186" cy="146" r="9" fill="#fefce8" />
  <circle cx="137" cy="149" r="4.2" fill="#1c1917" /><circle cx="183" cy="149" r="4.2" fill="#1c1917" />
  <path d="M144 178 Q152 184 160 178 T176 178" stroke="#d6d3d1" stroke-width="4" fill="none" stroke-linecap="round" />
  <circle cx="122.0" cy="224.6" r="2.2" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.7s" begin="0.5s" repeatCount="indefinite" /></circle>
  <circle cx="108.5" cy="177.8" r="2.2" fill="none" stroke="#4ade80" stroke-width="1.4"><animate attributeName="r" values="2.2;7.2;2.2" dur="3.1s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.5s" repeatCount="indefinite" /></circle>
  <rect x="289.6" y="283.7" width="5.0" height="5.3" fill="#4ade80" opacity="0.55" transform="rotate(40 289.6 283.7)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.3s" repeatCount="indefinite" /></rect>
  <circle cx="98.4" cy="34.6" r="2.4" fill="#a78bfa" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.3s" begin="0.9s" repeatCount="indefinite" /></circle>
  <circle cx="211.7" cy="241.3" r="1.7" fill="none" stroke="#22d3ee" stroke-width="1.4"><animate attributeName="r" values="1.7;6.7;1.7" dur="3.5s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.8s" repeatCount="indefinite" /></circle>
  <circle cx="177" cy="167" r="2" fill="#22d3ee" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
