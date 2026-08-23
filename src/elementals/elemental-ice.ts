export interface ElementalOptions {
  size?: number;
}

export function createElementalIce(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 577; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const flakes = Array.from({ length: 6 }, () => {
    const x = rand() * 320; const dur = 3 + rand() * 3;
    return `<g><path d="M${x.toFixed(1)} -10 l0 10 M${x.toFixed(1)} -10 l-5 8 M${x.toFixed(1)} -10 l5 8" stroke="#bae6fd" stroke-width="2" fill="none"><animate attributeName="transform" type="translate" values="0 0;0 ${320 + (rand() * 40).toFixed(0)}" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /></path></g>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="ice-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e0f2fe" /><stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
    <filter id="ice-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
  </defs>
  ${flakes}
  <ellipse cx="160" cy="290" rx="78" ry="10" fill="#38bdf8" opacity="0.2" />
  <g transform="translate(160 160)">
    <polygon points="0,-104 62,-52 62,52 0,104 -62,52 -62,-52" fill="url(#ice-body)">
      <animateTransform attributeName="transform" type="rotate" values="0;360" dur="30s" repeatCount="indefinite" />
    </polygon>
    <polygon points="0,-70 42,-36 42,36 0,70 -42,36 -42,-36" fill="#f0f9ff" opacity="0.85">
      <animateTransform attributeName="transform" type="rotate" values="360;0" dur="24s" repeatCount="indefinite" />
    </polygon>
  </g>
  <circle cx="140" cy="150" r="9" fill="#075985" /><circle cx="180" cy="150" r="9" fill="#075985" />
  <circle cx="142.5" cy="147" r="3" fill="#fff" /><circle cx="182.5" cy="147" r="3" fill="#fff" />
  <path d="M148 176 Q160 184 172 176" stroke="#075985" stroke-width="4.5" fill="none" stroke-linecap="round" />
  <circle cx="160" cy="96" r="18" fill="#e0f2fe" opacity="0.35" filter="url(#ice-glow)">
    <animate attributeName="r" values="16;21;16" dur="2.8s" repeatCount="indefinite" />
  </circle>
  <circle cx="24.6" cy="53.8" r="4.5" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="1.9s" begin="0.3s" repeatCount="indefinite" /></circle>
  <circle cx="102" cy="72" r="2" fill="#a78bfa" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
