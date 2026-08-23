export interface ElementalOptions {
  size?: number;
}

export function createElementalDew(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 179; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const drops = Array.from({ length: 9 }, () => {
    const x = 20 + rand() * 280; const y = 30 + rand() * 260; const r = 2 + rand() * 4.5;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#bae6fd"><animate attributeName="cy" values="${y.toFixed(1)};${(y + 14).toFixed(1)};${y.toFixed(1)}" dur="${(2.4 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.15;0.95;0.15" dur="${(2.4 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="dew-orb" cx="38%" cy="32%" r="75%">
      <stop offset="0%" stop-color="#f0f9ff" /><stop offset="45%" stop-color="#7dd3fc" stop-opacity="0.85" /><stop offset="100%" stop-color="#0369a1" />
    </radialGradient>
    <linearGradient id="dew-leaf" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#16a34a" /><stop offset="100%" stop-color="#14532d" />
    </linearGradient>
    <filter id="dew-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" /></filter>
  </defs>
  <path d="M40 292 Q160 236 284 284 Q170 306 40 292 Z" fill="url(#dew-leaf)" />
  <path d="M56 290 Q160 248 268 286" stroke="#4ade80" stroke-width="2" fill="none" opacity="0.6" />
  ${drops}
  <circle cx="150" cy="150" r="86" fill="url(#dew-orb)">
    <animate attributeName="r" values="84;89;84" dur="3.6s" repeatCount="indefinite" />
  </circle>
  <ellipse cx="118" cy="112" rx="22" ry="13" fill="#fff" opacity="0.8" transform="rotate(-26 118 112)" />
  <circle cx="128" cy="156" r="8" fill="#0c4a6e" /><circle cx="176" cy="156" r="8" fill="#0c4a6e" />
  <circle cx="130" cy="153" r="2.6" fill="#fff" /><circle cx="178" cy="153" r="2.6" fill="#fff" />
  <path d="M144 180 Q154 187 164 180 T182 180" stroke="#0c4a6e" stroke-width="4" fill="none" stroke-linecap="round" />
  <circle cx="150" cy="150" r="86" fill="none" stroke="#e0f2fe" stroke-width="1.6" opacity="0.5" filter="url(#dew-glow)" />
  <circle cx="265.9" cy="266.5" r="2.6" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.9s" begin="0.3s" repeatCount="indefinite" /></circle>
  <circle cx="127.8" cy="139.6" r="2.6" fill="none" stroke="#67e8f9" stroke-width="1.4"><animate attributeName="r" values="2.6;7.6;2.6" dur="3.6s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.6s" repeatCount="indefinite" /></circle>
  <rect x="262.6" y="211.2" width="5.8" height="5.9" fill="#22d3ee" opacity="0.55" transform="rotate(44 262.6 211.2)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.7s" repeatCount="indefinite" /></rect>
  <circle cx="61" cy="171" r="2" fill="#22d3ee" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
