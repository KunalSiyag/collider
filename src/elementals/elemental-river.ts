export interface ElementalOptions {
  size?: number;
}

export function createElementalRiver(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1181; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const leaves = Array.from({ length: 4 }, () => {
    const y0 = 120 + rand() * 60; const dur = 5 + rand() * 4;
    return `<path d="M-20 ${y0.toFixed(0)} q6 -5 12 0 q-6 5 -12 0" fill="#84cc16"><animate attributeName="transform" type="translate" values="-30 0;350 ${(rand() * 40 - 20).toFixed(0)}" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /></path>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="rv-water" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#22c55e" /><stop offset="100%" stop-color="#0e7490" />
    </linearGradient>
    <filter id="rv-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="3" /></filter>
  </defs>
  ${leaves}
  <path d="M-10 110 C80 90 240 130 330 104 L330 216 C240 242 80 202 -10 226 Z" fill="url(#rv-water)">
    <animate attributeName="d" dur="5s" repeatCount="indefinite"
      values="M-10 110 C80 90 240 130 330 104 L330 216 C240 242 80 202 -10 226 Z;
              M-10 116 C82 98 238 122 330 112 L330 212 C238 234 78 210 -10 220 Z;
              M-10 110 C80 90 240 130 330 104 L330 216 C240 242 80 202 -10 226 Z" />
  </path>
  <g stroke="#a7f3d0" stroke-width="3.5" fill="none" stroke-linecap="round">
    <path d="M40 140 Q80 132 120 142 T200 138"><animate attributeName="stroke-dashoffset" values="0;-160" dur="2.6s" repeatCount="indefinite" /><animate attributeName="d" dur="3.4s" repeatCount="indefinite" values="M40 140 Q80 132 120 142 T200 138;M40 146 Q80 138 120 148 T200 144;M40 140 Q80 132 120 142 T200 138" /></path>
    <path d="M120 180 Q160 172 200 182 T280 176" opacity="0.8"><animate attributeName="stroke-dashoffset" values="0;-180" dur="2.2s" repeatCount="indefinite" /></path>
    <path d="M20 196 Q60 190 100 198" opacity="0.6"><animate attributeName="stroke-dashoffset" values="0;-120" dur="2.9s" repeatCount="indefinite" /></path>
  </g>
  <circle cx="160" cy="164" r="42" fill="#065f46">
    <animate attributeName="cy" values="162;168;162" dur="3.2s" repeatCount="indefinite" />
  </circle>
  <circle cx="145" cy="158" r="7" fill="#fff" /><circle cx="177" cy="158" r="7" fill="#fff" />
  <circle cx="147" cy="160" r="3.4" fill="#052e16" /><circle cx="175" cy="160" r="3.4" fill="#052e16" />
  <path d="M150 176 Q161 182 172 176" stroke="#a7f3d0" stroke-width="3.6" fill="none" stroke-linecap="round" />
</svg>`;
}
