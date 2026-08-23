export interface ElementalOptions {
  size?: number;
}

export function createElementalComet(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1601; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const dust = Array.from({ length: 10 }, () => {
    const t = rand(); const x0 = 250 - t * 200; const y0 = 60 + t * 140;
    return `<circle cx="${x0.toFixed(1)}" cy="${y0.toFixed(1)}" r="${(1.2 + rand() * 2).toFixed(1)}" fill="#e0f2fe"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="${(1.5 + rand() * 2).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="com-tail" x1="1" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#67e8f9" /><stop offset="100%" stop-color="#67e8f9" stop-opacity="0" />
    </linearGradient>
    <radialGradient id="com-head" cx="40%" cy="38%" r="68%">
      <stop offset="0%" stop-color="#fff" /><stop offset="70%" stop-color="#a5f3fc" /><stop offset="100%" stop-color="#0891b2" />
    </radialGradient>
    <filter id="com-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="9" /></filter>
  </defs>
  ${dust}
  <g transform="rotate(-24 90 240)">
    <path d="M96 232 Q210 190 300 130 Q230 210 110 244 Z" fill="url(#com-tail)" opacity="0.85">
      <animate attributeName="opacity" values="0.85;0.55;0.85" dur="2s" repeatCount="indefinite" />
    </path>
    <path d="M96 236 Q190 226 286 176 Q206 236 104 248 Z" fill="url(#com-tail)" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.85;0.5" dur="2.6s" repeatCount="indefinite" />
    </path>
    <circle cx="92" cy="240" r="34" fill="#67e8f9" filter="url(#com-glow)" opacity="0.5">
      <animate attributeName="r" values="32;38;32" dur="1.6s" repeatCount="indefinite" />
    </circle>
    <circle cx="92" cy="240" r="26" fill="url(#com-head)" />
    <circle cx="84" cy="232" r="6" fill="#155e75" /><circle cx="102" cy="246" r="6" fill="#155e75" />
    <circle cx="86" cy="230" r="2.2" fill="#fff" /><circle cx="104" cy="244" r="2.2" fill="#fff" />
    <path d="M88 250 L94 254 L100 248" stroke="#155e75" stroke-width="3" fill="none" stroke-linecap="round" transform="rotate(-20 94 251)" />
  </g>
</svg>`;
}
