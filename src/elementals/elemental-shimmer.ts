export interface ElementalOptions {
  size?: number;
}

export function createElementalShimmer(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1619; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const sparkles = Array.from({ length: 14 }, () => {
    const x = rand() * 320; const y = rand() * 320; const s2 = 3 + rand() * 6;
    return `<path d="M${x.toFixed(1)} ${(y - s2).toFixed(1)} L${(x + s2 * 0.3).toFixed(1)} ${y.toFixed(1)} L${x.toFixed(1)} ${(y + s2).toFixed(1)} L${(x - s2 * 0.3).toFixed(1)} ${y.toFixed(1)} Z M${(x - s2).toFixed(1)} ${y.toFixed(1)} L${x.toFixed(1)} ${(y - s2 * 0.3).toFixed(1)} L${(x + s2).toFixed(1)} ${y.toFixed(1)} L${x.toFixed(1)} ${(y + s2 * 0.3).toFixed(1)} Z" fill="#fef08a"><animate attributeName="opacity" values="0;1;0" dur="${(1.2 + rand() * 2).toFixed(1)}s" begin="${rand().toFixed(2)}s" repeatCount="indefinite" /></path>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  ${sparkles}
  <defs>
    <linearGradient id="shm-body" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff7ed"><animate attributeName="stop-color" values="#fff7ed;#a5f3fc;#fbcfe8;#fde68a;#fff7ed" dur="6s" repeatCount="indefinite" /></stop>
      <stop offset="100%" stop-color="#f59e0b"><animate attributeName="stop-color" values="#f59e0b;#0891b2;#db2777;#d97706;#f59e0b" dur="6s" repeatCount="indefinite" /></stop>
    </linearGradient>
    <filter id="shm-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8" /></filter>
  </defs>
  <ellipse cx="160" cy="290" rx="74" ry="9" fill="#fbbf24" opacity="0.15" />
  <circle cx="160" cy="160" r="88" fill="#fde68a" opacity="0.18" filter="url(#shm-glow)">
    <animate attributeName="r" values="84;94;84" dur="2.8s" repeatCount="indefinite" />
  </circle>
  <path d="M160 66 C220 70 250 114 246 170 C242 226 202 262 156 258 C110 254 74 218 78 162 C82 106 104 62 160 66 Z" fill="url(#shm-body)">
    <animateTransform attributeName="transform" type="rotate" values="-3 160 160;3 160 160;-3 160 160" dur="4.4s" repeatCount="indefinite" />
  </path>
  <ellipse cx="128" cy="112" rx="20" ry="10" fill="#fff" opacity="0.9" transform="rotate(-26 128 112)">
    <animate attributeName="rx" values="16;22;16" dur="1.8s" repeatCount="indefinite" />
  </ellipse>
  <circle cx="138" cy="154" r="9" fill="#78350f" /><circle cx="184" cy="152" r="9" fill="#78350f" />
  <circle cx="140.5" cy="151" r="3" fill="#fff" /><circle cx="186.5" cy="149" r="3" fill="#fff" />
  <path d="M148 184 Q161 191 174 183" stroke="#78350f" stroke-width="4" fill="none" stroke-linecap="round" />
  <circle cx="45.5" cy="147.0" r="3.3" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.1s" begin="0.8s" repeatCount="indefinite" /></circle>
  <circle cx="266.0" cy="73.8" r="1.6" fill="none" stroke="#4ade80" stroke-width="1.4"><animate attributeName="r" values="1.6;6.6;1.6" dur="3.4s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.1s" repeatCount="indefinite" /></circle>
  <circle cx="201" cy="231" r="2" fill="#4ade80" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
