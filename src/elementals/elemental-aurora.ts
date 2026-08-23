export interface ElementalOptions {
  size?: number;
}

export function createElementalAurora(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 31; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const stars = Array.from({ length: 10 }, () => {
    const x = rand() * 320; const y = rand() * 200;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1 + rand()).toFixed(1)}" fill="#e2e8f0"><animate attributeName="opacity" values="0.9;0.1;0.9" dur="${(1.5 + rand() * 2.5).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="aurora-a" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#34d399" /><stop offset="100%" stop-color="#0b0b10" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="aurora-b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#8b5cf6" /><stop offset="100%" stop-color="#0b0b10" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="aurora-c" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#22d3ee" /><stop offset="100%" stop-color="#0b0b10" stop-opacity="0" />
    </linearGradient>
    <filter id="aurora-blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6" /></filter>
  </defs>
  ${stars}
  <g filter="url(#aurora-blur)">
    <path d="M40 240 C70 150 90 90 110 60 C130 100 120 180 130 240 Z" fill="url(#aurora-a)" opacity="0.8">
      <animate attributeName="d" dur="7s" repeatCount="indefinite"
        values="M40 240 C70 150 90 90 110 60 C130 100 120 180 130 240 Z;
                M30 240 C60 140 100 80 124 56 C138 104 116 184 140 240 Z;
                M40 240 C70 150 90 90 110 60 C130 100 120 180 130 240 Z" />
    </path>
    <path d="M120 240 C150 130 175 80 195 58 C215 105 195 185 205 240 Z" fill="url(#aurora-b)" opacity="0.75">
      <animate attributeName="d" dur="8s" repeatCount="indefinite"
        values="M120 240 C150 130 175 80 195 58 C215 105 195 185 205 240 Z;
                M108 240 C146 120 186 84 206 64 C222 112 184 190 216 240 Z;
                M120 240 C150 130 175 80 195 58 C215 105 195 185 205 240 Z" />
    </path>
    <path d="M200 240 C225 160 245 110 262 84 C280 125 264 195 272 240 Z" fill="url(#aurora-c)" opacity="0.7">
      <animate attributeName="d" dur="6s" repeatCount="indefinite"
        values="M200 240 C225 160 245 110 262 84 C280 125 264 195 272 240 Z;
                M190 240 C220 150 252 106 270 80 C288 128 254 198 282 240 Z;
                M200 240 C225 160 245 110 262 84 C280 125 264 195 272 240 Z" />
    </path>
  </g>
  <rect y="252" width="320" height="68" fill="#020617" />
  <path d="M0 252 L60 236 L120 256 L190 234 L260 254 L320 238 L320 320 L0 320 Z" fill="#0f172a" />
  <circle cx="160" cy="236" r="7" fill="#a7f3d0"><animate attributeName="r" values="6;9;6" dur="3s" repeatCount="indefinite" /></circle>
</svg>`;
}
