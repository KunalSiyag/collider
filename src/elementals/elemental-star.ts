export interface ElementalOptions {
  size?: number;
}

export function createElementalStar(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1307; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const twinkles = Array.from({ length: 12 }, () => `<circle cx="${(rand() * 320).toFixed(1)}" cy="${(rand() * 320).toFixed(1)}" r="${(0.8 + rand() * 1.6).toFixed(1)}" fill="#fefce8"><animate attributeName="opacity" values="0.9;0.05;0.9" dur="${(1.2 + rand() * 2.4).toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /></circle>`).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  ${twinkles}
  <defs>
    <radialGradient id="star-body" cx="44%" cy="40%" r="62%">
      <stop offset="0%" stop-color="#ffffff" /><stop offset="65%" stop-color="#fde047" /><stop offset="100%" stop-color="#f59e0b" />
    </radialGradient>
    <filter id="star-glow" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="10" /></filter>
    <path id="star-point" d="M160 160 L154 60 L166 60 Z" />
  </defs>
  ${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) =>
    `<use href="#star-point" fill="#fde047" opacity="0.85" transform="rotate(${a} 160 160)"><animate attributeName="opacity" values="0.85;0.25;0.85" dur="${(1.5 + i * 0.15).toFixed(1)}s" begin="${(i * 0.1).toFixed(1)}s" repeatCount="indefinite" /></use>`
  ).join('')}
  <circle cx="160" cy="160" r="58" fill="#fbbf24" filter="url(#star-glow)" opacity="0.45">
    <animate attributeName="r" values="54;64;54" dur="2.4s" repeatCount="indefinite" />
  </circle>
  <path d="M160 96 L178 142 L226 146 L190 176 L202 222 L160 196 L118 222 L130 176 L94 146 L142 142 Z" fill="url(#star-body)">
    <animateTransform attributeName="transform" type="rotate" values="0 160 160;360 160 160" dur="40s" repeatCount="indefinite" />
  </path>
  <circle cx="147" cy="152" r="6" fill="#713f12" /><circle cx="175" cy="152" r="6" fill="#713f12" />
  <circle cx="149" cy="150" r="2" fill="#fff" /><circle cx="177" cy="150" r="2" fill="#fff" />
  <path d="M152 168 Q161 174 170 168" stroke="#713f12" stroke-width="3.4" fill="none" stroke-linecap="round" />
  <circle cx="278.8" cy="199.0" r="3.8" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.0s" begin="0.1s" repeatCount="indefinite" /></circle>
  <circle cx="166.2" cy="228.8" r="2.4" fill="none" stroke="#4ade80" stroke-width="1.4"><animate attributeName="r" values="2.4;7.4;2.4" dur="4.3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="2.5s" repeatCount="indefinite" /></circle>
  <rect x="32.7" y="209.8" width="4.4" height="4.7" fill="#4ade80" opacity="0.55" transform="rotate(56 32.7 209.8)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.8s" repeatCount="indefinite" /></rect>
  <circle cx="21.4" cy="265.4" r="3.1" fill="#fde047" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.2s" begin="0.7s" repeatCount="indefinite" /></circle>
  <circle cx="241.7" cy="48.0" r="3.3" fill="none" stroke="#a78bfa" stroke-width="1.4"><animate attributeName="r" values="3.3;8.3;3.3" dur="3.5s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.9s" repeatCount="indefinite" /></circle>
  <rect x="150.9" y="171.1" width="4.0" height="5.5" fill="#fb7185" opacity="0.55" transform="rotate(17 150.9 171.1)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.7s" repeatCount="indefinite" /></rect>
  <circle cx="72" cy="142" r="2" fill="#fbbf24" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
