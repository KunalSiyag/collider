export interface ElementalOptions {
  size?: number;
}

export function createElementalOzone(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1031; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const molecules = Array.from({ length: 6 }, () => {
    const x = 30 + rand() * 260; const y = 30 + rand() * 240;
    return `<g><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="#5eead4" /><circle cx="${(x + 9).toFixed(1)}" cy="${(y + 3).toFixed(1)}" r="4" fill="#99f6e4" /><circle cx="${(x + 3).toFixed(1)}" cy="${(y - 7).toFixed(1)}" r="4" fill="#2dd4bf" /><line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + 9).toFixed(1)}" y2="${(y + 3).toFixed(1)}" stroke="#5eead4" stroke-width="1.6" opacity="0.8" /><animateTransform attributeName="transform" type="translate" values="0 0;${((rand() - 0.5) * 40).toFixed(0)} ${((rand() - 0.5) * 40).toFixed(0)};0 0" dur="${(4 + rand() * 4).toFixed(1)}s" repeatCount="indefinite" /></g>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="oz-body" cx="46%" cy="40%" r="64%">
      <stop offset="0%" stop-color="#ccfbf1" /><stop offset="65%" stop-color="#14b8a6" /><stop offset="100%" stop-color="#134e4a" />
    </radialGradient>
    <filter id="oz-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="10" /></filter>
  </defs>
  ${molecules}
  <ellipse cx="160" cy="288" rx="74" ry="10" fill="#14b8a6" opacity="0.22" />
  <path d="M160 62 C222 68 252 114 248 172 C244 228 204 264 156 260 C108 256 72 218 78 162 C84 108 104 56 160 62 Z" fill="url(#oz-body)">
    <animate attributeName="opacity" values="1;0.85;1" dur="2.8s" repeatCount="indefinite" />
  </path>
  <g stroke="#99f6e4" stroke-width="2" fill="none" opacity="0.7">
    <path d="M100 190 Q130 170 158 186 T222 178"><animate attributeName="d" dur="3.4s" repeatCount="indefinite" values="M100 190 Q130 170 158 186 T222 178;M100 184 Q132 176 160 180 T222 184;M100 190 Q130 170 158 186 T222 178" /></path>
  </g>
  <circle cx="138" cy="140" r="9" fill="#042f2e" /><circle cx="184" cy="140" r="9" fill="#042f2e" />
  <circle cx="141" cy="137" r="3" fill="#fff" /><circle cx="187" cy="137" r="3" fill="#fff" />
  <path d="M146 166 Q153 172 160 167 T174 166" stroke="#042f2e" stroke-width="4" fill="none" stroke-linecap="round" />
  <circle cx="160" cy="94" r="20" fill="#5eead4" opacity="0.4" filter="url(#oz-glow)">
    <animate attributeName="r" values="18;24;18" dur="2.4s" repeatCount="indefinite" />
  </circle>
  <circle cx="140.7" cy="72.5" r="2.9" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.4s" begin="0.6s" repeatCount="indefinite" /></circle>
  <circle cx="282.9" cy="113.1" r="4.0" fill="none" stroke="#4ade80" stroke-width="1.4"><animate attributeName="r" values="4.0;9.0;4.0" dur="3.7s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
  <rect x="255.5" y="107.1" width="4.6" height="4.9" fill="#fb7185" opacity="0.55" transform="rotate(39 255.5 107.1)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.2s" repeatCount="indefinite" /></rect>
  <circle cx="184" cy="194" r="2" fill="#fbbf24" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
