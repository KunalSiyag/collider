export interface ElementalOptions {
  size?: number;
}

export function createElementalMirror(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 769; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const shards = Array.from({ length: 6 }, () => {
    const x = rand() * 320; const y = rand() * 320; const s2 = 8 + rand() * 14;
    return `<polygon points="${x.toFixed(1)},${y.toFixed(1)} ${(x + s2 * 0.6).toFixed(1)},${(y + s2).toFixed(1)} ${(x + s2).toFixed(1)},${y.toFixed(1)}" fill="#a5f3fc" opacity="0.4"><animate attributeName="opacity" values="0.4;0.05;0.4" dur="${(2 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></polygon>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="mir-face" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f0fdfa" /><stop offset="40%" stop-color="#99f6e4" /><stop offset="60%" stop-color="#5eead4" /><stop offset="100%" stop-color="#134e4a" />
    </linearGradient>
    <filter id="mir-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
  </defs>
  ${shards}
  <ellipse cx="160" cy="290" rx="72" ry="9" fill="#14b8a6" opacity="0.18" />
  <circle cx="160" cy="160" r="104" fill="#99f6e4" opacity="0.15" filter="url(#mir-glow)">
    <animate attributeName="r" values="100;110;100" dur="4s" repeatCount="indefinite" />
  </circle>
  <path d="M160 56 L244 116 L212 258 L108 258 L76 116 Z" fill="url(#mir-face)" stroke="#ccfbf1" stroke-width="2.5">
    <animate attributeName="opacity" values="1;0.82;1" dur="3.2s" repeatCount="indefinite" />
  </path>
  <path d="M96 130 L200 108 M120 250 L226 122" stroke="#fff" stroke-width="2" opacity="0.7" />
  <g>
    <circle cx="136" cy="164" r="9" fill="#134e4a" /><circle cx="186" cy="160" r="9" fill="#134e4a" />
    <animateTransform attributeName="transform" type="scale" values="1 1;-1 1;1 1" dur="6s" additive="sum" repeatCount="indefinite" />
  </g>
  <circle cx="139" cy="161" r="3" fill="#fff" /><circle cx="189" cy="157" r="3" fill="#fff" />
  <path d="M146 196 Q160 188 174 198" stroke="#134e4a" stroke-width="4" fill="none" stroke-linecap="round" />
  <circle cx="26.8" cy="130.8" r="4.3" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.1s" begin="0.6s" repeatCount="indefinite" /></circle>
  <circle cx="199.4" cy="140.2" r="4.4" fill="none" stroke="#f472b6" stroke-width="1.4"><animate attributeName="r" values="4.4;9.4;4.4" dur="3.9s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
  <circle cx="155" cy="265" r="2" fill="#fb7185" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
