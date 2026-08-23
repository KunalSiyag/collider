export interface ElementalOptions {
  size?: number;
}

export function createElementalSpore(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1301; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const spores = Array.from({ length: 10 }, () => {
    const x = rand() * 320; const y = rand() * 320;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(2 + rand() * 3).toFixed(1)}" fill="#c084fc"><animate attributeName="cx" values="${x.toFixed(1)};${(x + (rand() - 0.5) * 80).toFixed(0)};${x.toFixed(1)}" dur="${(4 + rand() * 4).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="cy" values="${y.toFixed(1)};${(y - 30 - rand() * 30).toFixed(0)};${y.toFixed(1)}" dur="${(4 + rand() * 4).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.15;0.85;0.15" dur="${(2.5 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="spo-body" cx="44%" cy="38%" r="66%">
      <stop offset="0%" stop-color="#e9d5ff" /><stop offset="60%" stop-color="#9333ea" /><stop offset="100%" stop-color="#3b0764" />
    </radialGradient>
    <filter id="spo-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7" /></filter>
  </defs>
  ${spores}
  <ellipse cx="160" cy="288" rx="72" ry="10" fill="#9333ea" opacity="0.22" />
  <path d="M160 64 C218 68 246 112 242 168 C238 222 202 258 156 254 C110 250 76 214 80 160 C84 106 108 60 160 64 Z" fill="url(#spo-body)">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="4.4s" repeatCount="indefinite" />
  </path>
  ${[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => `<line x1="160" y1="70" x2="160" y2="46" stroke="#d8b4fe" stroke-width="2.4" stroke-linecap="round" transform="rotate(${a} 160 162)" opacity="${i % 2 ? 0.5 : 0.85}"><animate attributeName="opacity" values="0.85;0.3;0.85" dur="${(1.6 + i * 0.2).toFixed(1)}s" repeatCount="indefinite" /></line>`).join('')}
  <circle cx="140" cy="150" r="9" fill="#f5f3ff"><animate attributeName="r" values="8;10;8" dur="2.1s" repeatCount="indefinite" /></circle>
  <circle cx="182" cy="150" r="9" fill="#f5f3ff"><animate attributeName="r" values="10;8;10" dur="2.1s" repeatCount="indefinite" /></circle>
  <circle cx="142" cy="152" r="4" fill="#3b0764" /><circle cx="180" cy="152" r="4" fill="#3b0764" />
  <path d="M148 176 Q161 184 174 175" stroke="#f5f3ff" stroke-width="4" fill="none" stroke-linecap="round" stroke-dasharray="6 4" />
  <circle cx="153.8" cy="267.2" r="3.1" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.5s" begin="1.0s" repeatCount="indefinite" /></circle>
  <circle cx="238.9" cy="176.7" r="3.3" fill="none" stroke="#f472b6" stroke-width="1.4"><animate attributeName="r" values="3.3;8.3;3.3" dur="3.9s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.6s" repeatCount="indefinite" /></circle>
  <rect x="279.3" y="120.1" width="3.4" height="3.6" fill="#fb7185" opacity="0.55" transform="rotate(81 279.3 120.1)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.7s" repeatCount="indefinite" /></rect>
  <circle cx="248.1" cy="259.2" r="1.8" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.8s" begin="0.7s" repeatCount="indefinite" /></circle>
  <circle cx="77.9" cy="97.2" r="2.7" fill="none" stroke="#a78bfa" stroke-width="1.4"><animate attributeName="r" values="2.7;7.7;2.7" dur="4.2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="2.6s" repeatCount="indefinite" /></circle>
  <rect x="44.8" y="283.2" width="4.1" height="5.6" fill="#a78bfa" opacity="0.55" transform="rotate(33 44.8 283.2)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.1s" repeatCount="indefinite" /></rect>
  <circle cx="253.6" cy="82.8" r="3.8" fill="#22d3ee" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.3s" begin="1.0s" repeatCount="indefinite" /></circle>
  <circle cx="146" cy="116" r="2" fill="#a78bfa" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
