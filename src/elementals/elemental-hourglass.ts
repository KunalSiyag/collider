export interface ElementalOptions {
  size?: number;
}

export function createElementalHourglass(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1583; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const grains = Array.from({ length: 6 }, () => {
    const x = 156 + rand() * 8;
    return `<circle cx="${x.toFixed(1)}" cy="160" r="2.4" fill="#fbbf24"><animate attributeName="cy" values="150;230" dur="${(1.1 + rand() * 0.9).toFixed(2)}s" begin="${rand().toFixed(2)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="1;1;0" dur="${(1.1 + rand() * 0.9).toFixed(2)}s" begin="${rand().toFixed(2)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="hrg-sand" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fde047" /><stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <filter id="hrg-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" /></filter>
  </defs>
  ${grains}
  <rect x="86" y="52" width="148" height="14" rx="7" fill="#78350f" />
  <rect x="86" y="254" width="148" height="14" rx="7" fill="#78350f" />
  <path d="M100 66 L220 66 C216 116 178 146 166 160 C178 174 216 204 220 254 L100 254 C104 204 142 174 154 160 C142 146 104 116 100 66 Z" fill="#fefce8" opacity="0.16">
    <animate attributeName="opacity" values="0.16;0.24;0.16" dur="4s" repeatCount="indefinite" />
  </path>
  <path d="M108 74 L212 74 C208 118 176 146 162 158 C148 146 112 118 108 74 Z" fill="none" stroke="#d6b68a" stroke-width="2.5" />
  <path d="M108 246 L212 246 C208 202 176 174 162 162 C148 174 112 202 108 246 Z" fill="none" stroke="#d6b68a" stroke-width="2.5" />
  <path d="M120 80 Q160 96 200 80 L196 92 Q160 106 124 92 Z" fill="url(#hrg-sand)" opacity="0.9" />
  <path d="M126 240 L194 240 Q188 214 160 206 Q132 214 126 240 Z" fill="url(#hrg-sand)">
    <animate attributeName="d" values="M126 240 L194 240 Q188 214 160 206 Q132 214 126 240 Z;M130 240 L190 240 Q184 210 160 198 Q136 210 130 240 Z;M126 240 L194 240 Q188 214 160 206 Q132 214 126 240 Z" dur="5s" repeatCount="indefinite" />
  </path>
  <g transform="translate(160 168)">
    <circle r="20" fill="url(#hrg-sand)" filter="url(#hrg-glow)" opacity="0.95">
      <animate attributeName="r" values="19;22;19" dur="2.6s" repeatCount="indefinite" />
    </circle>
    <circle cx="-7" cy="-3" r="3.6" fill="#451a03" /><circle cx="9" cy="-3" r="3.6" fill="#451a03" />
    <path d="M-5 8 Q1 12 7 7" stroke="#451a03" stroke-width="2.8" fill="none" stroke-linecap="round" />
  </g>
</svg>`;
}
