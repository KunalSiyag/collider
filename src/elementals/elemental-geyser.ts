export interface ElementalOptions {
  size?: number;
}

export function createElementalGeyser(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1531; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const spray = Array.from({ length: 8 }, () => {
    const x0 = 150 + rand() * 20; const x2 = 100 + rand() * 120;
    return `<path d="M${x0.toFixed(1)} 220 Q${(x0 - (x2 - 160)).toFixed(1)} ${(90 + rand() * 40).toFixed(0)} ${x2.toFixed(1)} ${(50 + rand() * 50).toFixed(0)}" stroke="#a5f3fc" stroke-width="${(2.4 + rand() * 3).toFixed(1)}" fill="none" stroke-linecap="round"><animate attributeName="opacity" values="0;0.9;0" dur="${(1.8 + rand() * 1.6).toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /></path>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  ${spray}
  <defs>
    <linearGradient id="gys-col" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#0891b2" /><stop offset="100%" stop-color="#e0f2fe" />
    </linearGradient>
    <filter id="gys-soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5" /></filter>
  </defs>
  <ellipse cx="160" cy="292" rx="96" ry="14" fill="#155e75" opacity="0.6" />
  <path d="M92 262 L110 226 L210 226 L228 262 Z" fill="#0e7490" />
  <path d="M118 232 Q160 200 202 232 L196 226 L124 226 Z" fill="#67e8f9" />
  <path d="M138 224 C132 170 136 110 158 60 C180 108 186 172 182 224 Z" fill="url(#gys-col)" filter="url(#gys-soft)">
    <animate attributeName="d" dur="2.4s" repeatCount="indefinite"
      values="M138 224 C132 170 136 110 158 60 C180 108 186 172 182 224 Z;
              M134 224 C126 166 130 104 156 44 C184 102 190 168 186 224 Z;
              M138 224 C132 170 136 110 158 60 C180 108 186 172 182 224 Z" />
    <animate attributeName="opacity" values="0.95;0.55;0.95" dur="2.4s" repeatCount="indefinite" />
  </path>
  <circle cx="158" cy="70" r="12" fill="#fff" filter="url(#gys-soft)" opacity="0.8">
    <animate attributeName="cy" values="80;48;80" dur="2.4s" repeatCount="indefinite" />
  </circle>
  <circle cx="140" cy="248" r="7" fill="#164e63" /><circle cx="178" cy="248" r="7" fill="#164e63" />
  <circle cx="142" cy="245" r="2.4" fill="#a5f3fc" /><circle cx="180" cy="245" r="2.4" fill="#a5f3fc" />
  <circle cx="39.2" cy="289.3" r="3.7" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.5s" begin="1.0s" repeatCount="indefinite" /></circle>
  <circle cx="94" cy="224" r="2" fill="#a78bfa" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
