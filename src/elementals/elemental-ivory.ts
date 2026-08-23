export interface ElementalOptions {
  size?: number;
}

export function createElementalIvory(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 643; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const motes = Array.from({ length: 6 }, () => {
    const x = 50 + rand() * 220; const y = 60 + rand() * 180;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.5 + rand() * 2).toFixed(1)}" fill="#fef3c7"><animate attributeName="cy" values="${y.toFixed(1)};${(y - 24).toFixed(0)};${y.toFixed(1)}" dur="${(4 + rand() * 4).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.2;0.9;0.2" dur="${(4 + rand() * 4).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="ivo-body" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fffbeb" /><stop offset="55%" stop-color="#fde68a" /><stop offset="100%" stop-color="#d6b68a" />
    </linearGradient>
    <filter id="ivo-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5" /></filter>
  </defs>
  ${motes}
  <ellipse cx="160" cy="290" rx="74" ry="10" fill="#fde68a" opacity="0.18" />
  <path d="M160 64 C216 70 246 116 242 172 C238 228 202 264 158 260 C114 256 78 222 80 166 C82 110 108 58 160 64 Z" fill="url(#ivo-body)">
    <animate attributeName="d" dur="4.8s" repeatCount="indefinite"
      values="M160 64 C216 70 246 116 242 172 C238 228 202 264 158 260 C114 256 78 222 80 166 C82 110 108 58 160 64 Z;
              M156 70 C214 62 250 120 246 176 C242 230 200 268 154 254 C112 242 84 218 86 164 C88 110 100 76 156 70 Z;
              M160 64 C216 70 246 116 242 172 C238 228 202 264 158 260 C114 256 78 222 80 166 C82 110 108 58 160 64 Z" />
  </path>
  <path d="M104 118 Q134 96 164 112" stroke="#fff" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.9" />
  <g stroke="#d6b68a" stroke-width="1.4" opacity="0.5">
    <path d="M120 210 Q160 224 200 208" fill="none" /><path d="M126 224 Q160 236 194 222" fill="none" />
  </g>
  <circle cx="136" cy="158" r="9" fill="#78350f"><animate attributeName="r" values="8;10;8" dur="2.2s" repeatCount="indefinite" /></circle>
  <circle cx="186" cy="158" r="9" fill="#78350f"><animate attributeName="r" values="10;8;10" dur="2.2s" repeatCount="indefinite" /></circle>
  <circle cx="139" cy="155" r="3" fill="#fff" /><circle cx="189" cy="155" r="3" fill="#fff" />
  <path d="M148 184 Q160 192 172 184" stroke="#78350f" stroke-width="4" fill="none" stroke-linecap="round" />
  <circle cx="83.4" cy="249.7" r="3.0" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.1s" begin="0.6s" repeatCount="indefinite" /></circle>
  <circle cx="85" cy="115" r="2" fill="#4ade80" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
