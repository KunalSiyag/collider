export interface ElementalOptions {
  size?: number;
}

export function createElementalMonsoon(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1523; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const sheets = Array.from({ length: 3 }, (_, i) => {
    const y0 = 70 + i * 70;
    return `<path d="M-20 ${y0} L340 ${(y0 - 40).toFixed(1)}" stroke="#38bdf8" stroke-width="26" opacity="${(0.14 + i * 0.05).toFixed(2)}">
      <animate attributeName="transform" type="translate" values="-60 0;60 ${i * 10};-60 0" dur="${(4 + i).toFixed(0)}s" repeatCount="indefinite" />
    </path>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  ${sheets}
  <defs>
    <linearGradient id="mon-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#67e8f9" /><stop offset="100%" stop-color="#155e75" />
    </linearGradient>
    <filter id="mon-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
  </defs>
  <g>
    <path d="M160 66 C222 70 252 114 248 170 C244 226 204 262 156 258 C108 254 72 216 76 160 C80 104 104 62 160 66 Z" fill="url(#mon-body)">
      <animateTransform attributeName="transform" type="translate" values="0 0;-10 -5;0 0;10 5;0 0" dur="3.4s" repeatCount="indefinite" />
    </path>
    <path d="M100 150 Q130 136 158 148 T220 142" stroke="#e0f2fe" stroke-width="4.5" fill="none" opacity="0.8">
      <animate attributeName="d" dur="2.6s" repeatCount="indefinite"
        values="M100 150 Q130 136 158 148 T220 142;
                M100 144 Q132 154 160 144 T220 148;
                M100 150 Q130 136 158 148 T220 142" />
    </path>
    <circle cx="138" cy="120" r="9" fill="#083344"><animate attributeName="cy" values="118;123;118" dur="2s" repeatCount="indefinite" /></circle>
    <circle cx="184" cy="118" r="9" fill="#083344"><animate attributeName="cy" values="123;118;123" dur="2s" begin="0.5s" repeatCount="indefinite" /></circle>
    <circle cx="141" cy="117" r="3" fill="#fff" /><circle cx="187" cy="115" r="3" fill="#fff" />
    <path d="M146 190 Q161 199 176 189" stroke="#083344" stroke-width="4.5" fill="none" stroke-linecap="round" />
  </g>
  <g stroke="#a5f3fc" stroke-width="2.4" stroke-linecap="round" opacity="0.85">
    <line x1="40" y1="40" x2="20" y2="80"><animate attributeName="opacity" values="0.85;0.2;0.85" dur="1.4s" repeatCount="indefinite" /></line>
    <line x1="284" y1="56" x2="264" y2="96"><animate attributeName="opacity" values="0.2;0.85;0.2" dur="1.7s" repeatCount="indefinite" /></line>
    <line x1="60" y1="250" x2="42" y2="288"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="1.9s" repeatCount="indefinite" /></line>
  </g>
</svg>`;
}
