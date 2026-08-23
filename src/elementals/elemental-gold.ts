export interface ElementalOptions {
  size?: number;
}

export function createElementalGold(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 449; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const coins = Array.from({ length: 6 }, () => {
    const x = 40 + rand() * 240; const dur = 2.6 + rand() * 3;
    return `<circle cx="${x.toFixed(1)}" cy="60" r="${(5 + rand() * 5).toFixed(1)}" fill="#fbbf24" stroke="#b45309" stroke-width="1.5"><animate attributeName="cy" values="60;300" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0;1;0" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="gold-skin" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fef08a" /><stop offset="45%" stop-color="#f59e0b" /><stop offset="100%" stop-color="#92400e" />
    </linearGradient>
    <filter id="gold-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8" /></filter>
  </defs>
  ${coins}
  <ellipse cx="160" cy="288" rx="78" ry="11" fill="#f59e0b" opacity="0.22" />
  <circle cx="160" cy="164" r="96" fill="#fbbf24" filter="url(#gold-glow)" opacity="0.28">
    <animate attributeName="r" values="92;102;92" dur="3s" repeatCount="indefinite" />
  </circle>
  <path d="M160 70 C218 74 250 118 246 174 C242 230 204 268 158 264 C112 260 74 222 78 168 C82 114 108 66 160 70 Z" fill="url(#gold-skin)">
    <animateTransform attributeName="transform" type="translate" values="0 0;-3 -3;0 0;3 -3;0 0" dur="4.6s" repeatCount="indefinite" />
  </path>
  <path d="M104 120 Q130 100 156 116" stroke="#fef9c3" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.85" />
  <circle cx="136" cy="162" r="10" fill="#451a03" /><circle cx="188" cy="162" r="10" fill="#451a03" />
  <circle cx="139" cy="159" r="3.2" fill="#fefce8" /><circle cx="191" cy="159" r="3.2" fill="#fefce8" />
  <path d="M144 190 Q152 198 160 192 T178 194" stroke="#451a03" stroke-width="4" fill="none" stroke-linecap="round" />
  <circle cx="68.3" cy="71.8" r="3.7" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.4s" begin="0.3s" repeatCount="indefinite" /></circle>
  <circle cx="245.6" cy="163.8" r="4.1" fill="none" stroke="#22d3ee" stroke-width="1.4"><animate attributeName="r" values="4.1;9.1;4.1" dur="4.2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.8s" repeatCount="indefinite" /></circle>
  <rect x="115.9" y="77.9" width="3.9" height="3.9" fill="#fbbf24" opacity="0.55" transform="rotate(4 115.9 77.9)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.2s" repeatCount="indefinite" /></rect>
  <circle cx="156.4" cy="110.7" r="2.3" fill="#67e8f9" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.9s" begin="0.2s" repeatCount="indefinite" /></circle>
  <circle cx="94.6" cy="193.7" r="2.9" fill="none" stroke="#4ade80" stroke-width="1.4"><animate attributeName="r" values="2.9;7.9;2.9" dur="4.5s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.1s" repeatCount="indefinite" /></circle>
  <circle cx="96" cy="166" r="2" fill="#f472b6" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
