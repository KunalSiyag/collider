export interface ElementalOptions {
  size?: number;
}

export function createElementalSteam(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1319; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const jets = Array.from({ length: 5 }, () => {
    const x = 110 + rand() * 100; const dur = 2.4 + rand() * 2.4;
    return `<path d="M${x.toFixed(1)} 250 q-14 -30 0 -60 q14 -30 0 -58" stroke="#e2e8f0" stroke-width="${(3 + rand() * 3).toFixed(1)}" fill="none" stroke-linecap="round"><animate attributeName="opacity" values="0;0.85;0" dur="${dur.toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /><animateTransform attributeName="transform" type="translate" values="0 20;0 -60" dur="${dur.toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /></path>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="stm-pot" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#94a3b8" /><stop offset="100%" stop-color="#334155" />
    </linearGradient>
    <filter id="stm-soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5" /></filter>
  </defs>
  ${jets}
  <ellipse cx="160" cy="288" rx="86" ry="12" fill="#f8fafc" opacity="0.08" />
  <path d="M84 246 L236 246 L222 292 L98 292 Z" fill="url(#stm-pot)" />
  <rect x="76" y="240" width="168" height="12" rx="6" fill="#cbd5e1" />
  <g transform="translate(160 196)">
    <circle r="34" fill="#f1f5f9">
      <animate attributeName="r" values="32;37;32" dur="2.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="-11" cy="-6" r="5.5" fill="#0f172a" /><circle cx="13" cy="-6" r="5.5" fill="#0f172a" />
    <circle cx="-9.5" cy="-7.5" r="1.8" fill="#fff" /><circle cx="14.5" cy="-7.5" r="1.8" fill="#fff" />
    <path d="M-7 10 Q0 15 9 9" stroke="#0f172a" stroke-width="3.4" fill="none" stroke-linecap="round" />
    <animate attributeName="cy" values="0;-8;0" dur="2.2s" repeatCount="indefinite" />
  </g>
  <circle cx="172.3" cy="225.9" r="4.3" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.2s" begin="0.7s" repeatCount="indefinite" /></circle>
  <circle cx="209.6" cy="41.3" r="3.4" fill="none" stroke="#fde047" stroke-width="1.4"><animate attributeName="r" values="3.4;8.4;3.4" dur="3.4s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.8s" repeatCount="indefinite" /></circle>
  <rect x="113.9" y="78.3" width="3.4" height="5.0" fill="#f472b6" opacity="0.55" transform="rotate(3 113.9 78.3)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.4s" repeatCount="indefinite" /></rect>
  <circle cx="146.6" cy="32.6" r="3.1" fill="#4ade80" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.3s" begin="1.0s" repeatCount="indefinite" /></circle>
  <circle cx="260" cy="190" r="2" fill="#f472b6" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
