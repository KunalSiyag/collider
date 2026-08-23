export interface ElementalOptions {
  size?: number;
}

export function createElementalObsidian(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 877; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const glints = Array.from({ length: 4 }, () => {
    const x = 110 + rand() * 100; const y = 100 + rand() * 130;
    return `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + 10).toFixed(1)}" y2="${(y - 14).toFixed(1)}" stroke="#e9d5ff" stroke-width="2" stroke-linecap="round"><animate attributeName="opacity" values="0;1;0" dur="${(1.6 + rand() * 2).toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /></line>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="obs-body" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#312e81" /><stop offset="45%" stop-color="#111" /><stop offset="100%" stop-color="#000" />
    </linearGradient>
    <filter id="obs-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7" /></filter>
  </defs>
  <ellipse cx="160" cy="288" rx="82" ry="11" fill="#6d28d9" opacity="0.25" />
  <path d="M160 52 L250 128 L222 260 L98 260 L70 128 Z" fill="url(#obs-body)" stroke="#4c1d95" stroke-width="2.5">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="4.6s" repeatCount="indefinite" />
  </path>
  <path d="M160 52 L250 128 L160 176 L70 128 Z" fill="#1e1b4b" />
  <path d="M160 176 L250 128 L222 260 L160 260 Z" fill="#000" />
  <g stroke="#a78bfa" stroke-width="1.6" opacity="0.55"><line x1="160" y1="52" x2="160" y2="176" /><line x1="70" y1="128" x2="250" y2="128" /></g>
  ${glints}
  <circle cx="134" cy="180" r="9" fill="#c4b5fd"><animate attributeName="opacity" values="1;0.5;1" dur="2.4s" repeatCount="indefinite" /></circle>
  <circle cx="186" cy="180" r="9" fill="#c4b5fd"><animate attributeName="opacity" values="0.5;1;0.5" dur="2.4s" begin="0.6s" repeatCount="indefinite" /></circle>
  <circle cx="136.5" cy="177" r="3" fill="#fff" /><circle cx="188.5" cy="177" r="3" fill="#fff" />
  <path d="M146 208 L160 216 L174 206" stroke="#c4b5fd" stroke-width="4" fill="none" stroke-linecap="round" />
  <circle cx="45.6" cy="255.6" r="2.8" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.6s" begin="0.9s" repeatCount="indefinite" /></circle>
  <circle cx="54.9" cy="55.0" r="4.5" fill="none" stroke="#fde047" stroke-width="1.4"><animate attributeName="r" values="4.5;9.5;4.5" dur="2.9s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.5s" repeatCount="indefinite" /></circle>
  <rect x="115.8" y="122.3" width="3.2" height="4.4" fill="#67e8f9" opacity="0.55" transform="rotate(68 115.8 122.3)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.8s" repeatCount="indefinite" /></rect>
  <circle cx="240.2" cy="137.3" r="3.7" fill="#fde047" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.2s" begin="0.0s" repeatCount="indefinite" /></circle>
  <circle cx="136.1" cy="128.8" r="1.9" fill="none" stroke="#fde047" stroke-width="1.4"><animate attributeName="r" values="1.9;6.9;1.9" dur="4.1s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.2s" repeatCount="indefinite" /></circle>
  <circle cx="171" cy="141" r="2" fill="#22d3ee" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
