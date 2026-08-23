export interface ElementalOptions {
  size?: number;
}

export function createElementalFirefly(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 281; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const flies = Array.from({ length: 7 }, () => {
    const x = 30 + rand() * 260; const y = 40 + rand() * 220; const dur = 2.5 + rand() * 3;
    return `<g><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8" fill="#fde047" opacity="0.25"><animate attributeName="opacity" values="0.05;0.5;0.05" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /></circle><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="#fef08a"><animate attributeName="opacity" values="0.15;1;0.15" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /></circle><animateTransform attributeName="transform" type="translate" values="0 0;${((rand() - 0.5) * 60).toFixed(0)} ${((rand() - 0.5) * 50).toFixed(0)};0 0" dur="${(dur * 2).toFixed(1)}s" repeatCount="indefinite" /></g>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="ff-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#65a30d" /><stop offset="70%" stop-color="#3f6212" /><stop offset="100%" stop-color="#fde047" />
    </linearGradient>
    <filter id="ff-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="7" /></filter>
  </defs>
  <path d="M0 268 Q80 252 160 264 T320 260 L320 320 L0 320 Z" fill="#052e16" />
  <path d="M40 280 Q160 262 280 276" stroke="#166534" stroke-width="2" fill="none" opacity="0.7" />
  ${flies}
  <ellipse cx="160" cy="236" rx="42" ry="14" fill="#fde047" filter="url(#ff-glow)" opacity="0.55">
    <animate attributeName="opacity" values="0.3;0.85;0.3" dur="1.6s" repeatCount="indefinite" />
  </ellipse>
  <g>
    <ellipse cx="160" cy="180" rx="26" ry="38" fill="url(#ff-body)" />
    <path d="M136 158 Q112 138 118 116 Q140 126 144 152 Z" fill="#bef264" opacity="0.75">
      <animateTransform attributeName="transform" type="rotate" values="0 160 180;-18 160 180;0 160 180" dur="0.24s" repeatCount="indefinite" />
    </path>
    <path d="M184 158 Q208 138 202 116 Q180 126 176 152 Z" fill="#bef264" opacity="0.75">
      <animateTransform attributeName="transform" type="rotate" values="0 160 180;18 160 180;0 160 180" dur="0.24s" repeatCount="indefinite" />
    </path>
    <circle cx="150" cy="164" r="5" fill="#111" /><circle cx="172" cy="164" r="5" fill="#111" />
    <circle cx="151.5" cy="162" r="1.8" fill="#fff" /><circle cx="173.5" cy="162" r="1.8" fill="#fff" />
    <line x1="152" y1="146" x2="144" y2="132" stroke="#a3e635" stroke-width="2.4" stroke-linecap="round" />
    <line x1="168" y1="146" x2="176" y2="132" stroke="#a3e635" stroke-width="2.4" stroke-linecap="round" />
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -12;0 0" dur="2.8s" repeatCount="indefinite" />
  </g>
</svg>`;
}
