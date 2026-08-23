export interface ElementalOptions {
  size?: number;
}

export function createElementalNova(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 853; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = i * 45;
    return `<polygon points="160,150 156,40 164,40" fill="#fbbf24" transform="rotate(${a} 160 160)"><animate attributeName="opacity" values="1;0.2;1" dur="${(1 + rand() * 1.4).toFixed(1)}s" begin="${(rand()).toFixed(1)}s" repeatCount="indefinite" /></polygon>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="nova-core" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#ffffff" /><stop offset="55%" stop-color="#fde047" /><stop offset="100%" stop-color="#f97316" />
    </radialGradient>
    <filter id="nova-glow" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="14" /></filter>
  </defs>
  ${rays}
  <circle cx="160" cy="160" r="90" fill="#fbbf24" filter="url(#nova-glow)" opacity="0.5">
    <animate attributeName="r" values="84;100;84" dur="2s" repeatCount="indefinite" />
  </circle>
  <circle cx="160" cy="160" r="62" fill="url(#nova-core)">
    <animate attributeName="r" values="60;68;60" dur="2s" repeatCount="indefinite" />
  </circle>
  <g stroke="#b45309" stroke-width="3" fill="none" opacity="0.6">
    <circle cx="160" cy="160" r="44"><animate attributeName="r" values="42;48;42" dur="2.6s" repeatCount="indefinite" /></circle>
  </g>
  <circle cx="144" cy="152" r="8" fill="#7c2d12" /><circle cx="176" cy="152" r="8" fill="#7c2d12" />
  <circle cx="146.5" cy="149" r="2.8" fill="#fff" /><circle cx="178.5" cy="149" r="2.8" fill="#fff" />
  <path d="M148 174 L158 182 L166 172 L176 180" stroke="#7c2d12" stroke-width="4" fill="none" stroke-linecap="round">
    <animate attributeName="d" values="M148 174 L158 182 L166 172 L176 180;M148 180 L158 172 L166 182 L176 174;M148 174 L158 182 L166 172 L176 180" dur="1.2s" repeatCount="indefinite" />
  </path>
  <circle cx="52.2" cy="207.1" r="3.1" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.8s" begin="0.2s" repeatCount="indefinite" /></circle>
  <circle cx="30.6" cy="94.5" r="2.6" fill="none" stroke="#67e8f9" stroke-width="1.4"><animate attributeName="r" values="2.6;7.6;2.6" dur="3.3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="2.6s" repeatCount="indefinite" /></circle>
  <circle cx="200" cy="70" r="2" fill="#fbbf24" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
