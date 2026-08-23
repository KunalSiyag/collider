export interface ElementalOptions {
  size?: number;
}

export function createElementalHail(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1493; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const stones = Array.from({ length: 10 }, () => {
    const x = rand() * 320; const r = 3 + rand() * 5; const dur = 1 + rand() * 1.4;
    return `<circle cx="${x.toFixed(1)}" cy="-10" r="${r.toFixed(1)}" fill="#dbeafe" stroke="#93c5fd" stroke-width="1.2"><animate attributeName="cy" values="-10;330" dur="${dur.toFixed(1)}s" begin="${rand().toFixed(2)}s" repeatCount="indefinite" /><animate attributeName="cx" values="${x.toFixed(1)};${(x - 20).toFixed(0)}" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  ${stones}
  <defs>
    <linearGradient id="hail-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#eff6ff" /><stop offset="100%" stop-color="#60a5fa" />
    </linearGradient>
    <filter id="hail-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" /></filter>
  </defs>
  <ellipse cx="160" cy="290" rx="72" ry="9" fill="#60a5fa" opacity="0.18" />
  <g transform="translate(-8 8)">
    <path d="M168 66 C222 70 250 112 246 166 C242 220 206 254 162 250 C118 246 84 212 88 160 C92 108 116 62 168 66 Z" fill="#fff" stroke="#bfdbfe" stroke-width="2.5" filter="url(#hail-glow)" opacity="0.35">
      <animateTransform attributeName="transform" type="rotate" values="-4 168 158;4 168 158;-4 168 158" dur="3s" additive="sum" repeatCount="indefinite" />
    </path>
    <path d="M168 72 C218 76 242 114 238 164 C234 214 202 246 162 242 C122 238 92 208 96 158 C100 110 120 68 168 72 Z" fill="url(#hail-body)" stroke="#bfdbfe" stroke-width="2.5" />
    ${[[-30, -40, 12], [26, -52, 8], [34, 30, 14], [-40, 26, 9], [0, 58, 7]].map((p, i) => `<circle cx="${168 + p[0]}" cy="${158 + p[1]}" r="${p[2] * 0.6}" fill="#fff" opacity="0.75"><animate attributeName="opacity" values="0.75;0.25;0.75" dur="${(1.8 + i * 0.4).toFixed(1)}s" repeatCount="indefinite" /></circle>`).join('')}
    <circle cx="148" cy="146" r="8" fill="#1e3a8a"><animate attributeName="r" values="8;9.5;8" dur="1.9s" repeatCount="indefinite" /></circle>
    <circle cx="186" cy="144" r="8" fill="#1e3a8a"><animate attributeName="r" values="9.5;8;9.5" dur="1.9s" begin="0.5s" repeatCount="indefinite" /></circle>
    <path d="M152 172 Q163 179 174 171" stroke="#1e3a8a" stroke-width="4" fill="none" stroke-linecap="round" />
  </g>
  <circle cx="67.3" cy="69.6" r="3.6" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.0s" begin="0.6s" repeatCount="indefinite" /></circle>
  <circle cx="137.8" cy="163.1" r="3.5" fill="none" stroke="#fde047" stroke-width="1.4"><animate attributeName="r" values="3.5;8.5;3.5" dur="2.6s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="2.9s" repeatCount="indefinite" /></circle>
  <rect x="291.1" y="255.6" width="3.8" height="5.4" fill="#4ade80" opacity="0.55" transform="rotate(27 291.1 255.6)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.7s" repeatCount="indefinite" /></rect>
  <circle cx="20.8" cy="38.9" r="4.0" fill="#fb7185" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.1s" begin="0.5s" repeatCount="indefinite" /></circle>
  <circle cx="48.2" cy="177.5" r="3.3" fill="none" stroke="#a78bfa" stroke-width="1.4"><animate attributeName="r" values="3.3;8.3;3.3" dur="3.1s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.3s" repeatCount="indefinite" /></circle>
  <circle cx="256" cy="226" r="2" fill="#a78bfa" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
