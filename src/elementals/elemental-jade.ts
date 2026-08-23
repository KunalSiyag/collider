export interface ElementalOptions {
  size?: number;
}

export function createElementalJade(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 661; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const glints = Array.from({ length: 5 }, () => {
    const x = 100 + rand() * 120; const y = 90 + rand() * 140;
    return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 Z" fill="#d1fae5"><animate attributeName="opacity" values="0;0.95;0" dur="${(2.4 + rand() * 2).toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /></path>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="jade-body" cx="42%" cy="36%" r="72%">
      <stop offset="0%" stop-color="#a7f3d0" /><stop offset="55%" stop-color="#10b981" /><stop offset="100%" stop-color="#065f46" />
    </radialGradient>
    <filter id="jade-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
  </defs>
  <ellipse cx="160" cy="290" rx="78" ry="10" fill="#10b981" opacity="0.2" />
  <circle cx="160" cy="164" r="98" fill="#34d399" filter="url(#jade-glow)" opacity="0.22">
    <animate attributeName="r" values="94;104;94" dur="3.6s" repeatCount="indefinite" />
  </circle>
  <path d="M160 68 C220 74 250 120 246 176 C242 232 204 268 158 264 C112 260 76 224 80 168 C84 112 106 62 160 68 Z" fill="url(#jade-body)">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="4.4s" repeatCount="indefinite" />
  </path>
  <g stroke="#ecfdf5" stroke-width="2.4" fill="none" opacity="0.75">
    <path d="M96 196 Q128 172 160 194 T228 186" />
    <path d="M110 130 Q136 116 158 128 T212 122" />
  </g>
  ${glints}
  <circle cx="136" cy="156" r="9" fill="#064e3b" /><circle cx="184" cy="156" r="9" fill="#064e3b" />
  <circle cx="139" cy="153" r="3" fill="#fff" /><circle cx="187" cy="153" r="3" fill="#fff" />
  <path d="M148 182 L160 190 L172 182" stroke="#064e3b" stroke-width="4.5" fill="none" stroke-linecap="round" />
  <circle cx="265.6" cy="264.3" r="3.6" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.0s" begin="0.6s" repeatCount="indefinite" /></circle>
  <circle cx="210.2" cy="165.2" r="3.1" fill="none" stroke="#a78bfa" stroke-width="1.4"><animate attributeName="r" values="3.1;8.1;3.1" dur="4.1s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
  <circle cx="247" cy="277" r="2" fill="#fb7185" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
