export interface ElementalOptions {
  size?: number;
}

export function createElementalPlasma(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1481; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const filaments = Array.from({ length: 5 }, () => {
    const y0 = 70 + rand() * 180;
    return `<path d="M20 ${y0.toFixed(1)} Q160 ${(y0 + (rand() - 0.5) * 120).toFixed(1)} 300 ${(y0 + (rand() - 0.5) * 60).toFixed(1)}" stroke="#e879f9" stroke-width="${(1.6 + rand() * 2).toFixed(1)}" fill="none"><animate attributeName="d" dur="${(2 + rand() * 3).toFixed(1)}s" repeatCount="indefinite"
      values="M20 ${y0.toFixed(1)} Q160 ${(y0 + (rand() - 0.5) * 120).toFixed(1)} 300 ${(y0 + (rand() - 0.5) * 60).toFixed(1)};
              M20 ${y0.toFixed(1)} Q160 ${(y0 + (rand() - 0.5) * 120).toFixed(1)} 300 ${(y0 + (rand() - 0.5) * 60).toFixed(1)}" /></path>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  ${filaments}
  <defs>
    <radialGradient id="plm-body" cx="46%" cy="42%" r="62%">
      <stop offset="0%" stop-color="#fdf4ff" /><stop offset="55%" stop-color="#e879f9" /><stop offset="100%" stop-color="#701a75" />
    </radialGradient>
    <filter id="plm-glow" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="12" /></filter>
  </defs>
  <circle cx="160" cy="160" r="88" fill="#d946ef" opacity="0.4" filter="url(#plm-glow)">
    <animate attributeName="r" values="84;96;84" dur="1.4s" repeatCount="indefinite" />
  </circle>
  <path d="M160 68 C220 72 248 116 244 170 C240 224 204 258 158 254 C112 250 76 216 80 162 C84 108 106 64 160 68 Z" fill="url(#plm-body)">
    <animate attributeName="fill" values="url(#plm-body);#a855f7;url(#plm-body)" dur="3s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="1;0.85;1" dur="0.7s" repeatCount="indefinite" />
  </path>
  <circle cx="140" cy="150" r="8" fill="#3b0764"><animate attributeName="cy" values="148;153;148" dur="0.8s" repeatCount="indefinite" /></circle>
  <circle cx="182" cy="150" r="8" fill="#3b0764"><animate attributeName="cy" values="153;148;153" dur="0.8s" begin="0.3s" repeatCount="indefinite" /></circle>
  <circle cx="142" cy="147" r="2.6" fill="#fdf4ff" /><circle cx="184" cy="147" r="2.6" fill="#fdf4ff" />
  <path d="M148 180 L158 187 L168 178 L178 186" stroke="#3b0764" stroke-width="3.6" fill="none" stroke-linecap="round">
    <animate attributeName="d" values="M148 180 L158 187 L168 178 L178 186;M148 185 L158 179 L168 188 L178 181;M148 180 L158 187 L168 178 L178 186" dur="0.9s" repeatCount="indefinite" />
  </path>
  <circle cx="138.5" cy="127.8" r="1.7" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.5s" begin="0.3s" repeatCount="indefinite" /></circle>
  <circle cx="290" cy="220" r="2" fill="#f472b6" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
