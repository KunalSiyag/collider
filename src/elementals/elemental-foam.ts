export interface ElementalOptions {
  size?: number;
}

export function createElementalFoam(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 311; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const bubbles = Array.from({ length: 10 }, () => {
    const x = 60 + rand() * 200; const y = 90 + rand() * 160; const r = 4 + rand() * 14;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#fff" opacity="${(0.15 + rand() * 0.3).toFixed(2)}"><animate attributeName="r" values="${r.toFixed(1)};${(r * 1.35).toFixed(1)};${r.toFixed(1)}" dur="${(2 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="foam-sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38bdf8" /><stop offset="100%" stop-color="#075985" />
    </linearGradient>
    <filter id="foam-soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="3" /></filter>
  </defs>
  <path d="M20 190 Q70 150 120 186 T220 184 T300 188 L300 320 L20 320 Z" fill="url(#foam-sea)" />
  <path d="M20 196 Q80 168 140 194 T300 192 L300 226 Q220 240 150 224 T20 230 Z" fill="#fff" filter="url(#foam-soft)" opacity="0.85">
    <animate attributeName="d" dur="4s" repeatCount="indefinite"
      values="M20 196 Q80 168 140 194 T300 192 L300 226 Q220 240 150 224 T20 230 Z;
              M20 204 Q84 182 146 202 T300 198 L300 232 Q218 246 148 228 T20 236 Z;
              M20 196 Q80 168 140 194 T300 192 L300 226 Q220 240 150 224 T20 230 Z" />
  </path>
  ${bubbles}
  <g transform="translate(0 -46)">
    <circle cx="160" cy="120" r="52" fill="#f0f9ff" opacity="0.95">
      <animate attributeName="r" values="50;55;50" dur="3s" repeatCount="indefinite" />
    </circle>
    <g fill="#fff">${bubbles ? '' : ''}</g>
    <circle cx="142" cy="112" r="7" fill="#0369a1" /><circle cx="178" cy="112" r="7" fill="#0369a1" />
    <circle cx="144" cy="110" r="2.4" fill="#fff" /><circle cx="180" cy="110" r="2.4" fill="#fff" />
    <path d="M148 132 Q160 139 172 132" stroke="#0369a1" stroke-width="3.5" fill="none" stroke-linecap="round" />
  </g>

</svg>`;
}
