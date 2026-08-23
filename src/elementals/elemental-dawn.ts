export interface ElementalOptions {
  size?: number;
}

export function createElementalDawn(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 149; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const rays = Array.from({ length: 9 }, (_, i) => {
    const a = -180 + i * 22.5;
    return `<rect x="158" y="20" width="4" height="52" rx="2" fill="#fdba74" opacity="0.65" transform="rotate(${a.toFixed(1)} 160 150)">
      <animate attributeName="opacity" values="0.2;0.8;0.2" dur="${(2 + rand() * 2.5).toFixed(1)}s" begin="${(rand() * 2).toFixed(1)}s" repeatCount="indefinite" />
    </rect>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="dawn-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e1b4b" /><stop offset="55%" stop-color="#7c2d12" /><stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
    <radialGradient id="dawn-orb" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#fef3c7" /><stop offset="100%" stop-color="#fb923c" />
    </radialGradient>
    <filter id="dawn-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8" /></filter>
  </defs>
  <rect width="320" height="220" fill="url(#dawn-sky)" />
  ${rays}
  <path d="M0 236 Q60 218 120 232 T240 228 T320 236 L320 320 L0 320 Z" fill="#1c1917" />
  <circle cx="160" cy="150" r="62" fill="url(#dawn-orb)" filter="url(#dawn-glow)" opacity="0.55">
    <animate attributeName="r" values="58;68;58" dur="3.4s" repeatCount="indefinite" />
  </circle>
  <circle cx="160" cy="150" r="54" fill="url(#dawn-orb)" />
  <circle cx="140" cy="142" r="7" fill="#7c2d12" /><circle cx="180" cy="142" r="7" fill="#7c2d12" />
  <circle cx="142" cy="140" r="2.4" fill="#fff" /><circle cx="182" cy="140" r="2.4" fill="#fff" />
  <path d="M146 166 Q160 175 174 166" stroke="#7c2d12" stroke-width="4" fill="none" stroke-linecap="round" />
  <ellipse cx="66" cy="96" rx="34" ry="11" fill="#fde68a" opacity="0.35">
    <animate attributeName="cx" values="66;90;66" dur="9s" repeatCount="indefinite" />
  </ellipse>
  <ellipse cx="258" cy="70" rx="26" ry="9" fill="#fde68a" opacity="0.28">
    <animate attributeName="cx" values="258;236;258" dur="11s" repeatCount="indefinite" />
  </ellipse>
</svg>`;
}
