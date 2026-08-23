export interface ElementalOptions {
  size?: number;
}

export function createElementalGeode(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 419; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const spikes = Array.from({ length: 7 }, (_, i) => {
    const x = 96 + i * 21; const h = 26 + rand() * 40;
    return `<polygon points="${x - 8},186 ${x},${(186 - h).toFixed(1)} ${x + 8},186" fill="${i % 2 ? '#67e8f9' : '#a5f3fc'}"><animate attributeName="opacity" values="0.85;0.4;0.85" dur="${(2 + rand() * 2.5).toFixed(1)}s" begin="${(rand() * 1.5).toFixed(1)}s" repeatCount="indefinite" /></polygon>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="geo-shell" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#57534e" /><stop offset="100%" stop-color="#292524" />
    </linearGradient>
    <filter id="geo-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
  </defs>
  <ellipse cx="160" cy="290" rx="88" ry="11" fill="#0891b2" opacity="0.2" />
  <path d="M160 58 L262 132 L236 258 L84 258 L58 132 Z" fill="url(#geo-shell)">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="5s" repeatCount="indefinite" />
  </path>
  <path d="M160 58 L262 132 L160 190 L58 132 Z" fill="#44403c" />
  <path d="M92 140 L228 140 L216 240 L104 240 Z" fill="#1c1917" />
  ${spikes}
  <g transform="translate(0 -20)">
    <circle cx="138" cy="196" r="8" fill="#155e75" /><circle cx="182" cy="196" r="8" fill="#155e75" />
    <circle cx="140" cy="193" r="2.6" fill="#cffafe" /><circle cx="184" cy="193" r="2.6" fill="#cffafe" />
    <path d="M148 214 L161 222 L172 214" stroke="#155e75" stroke-width="4" fill="none" stroke-linecap="round" />
  </g>
  <circle cx="160" cy="150" r="20" fill="#22d3ee" opacity="0.35" filter="url(#geo-glow)">
    <animate attributeName="r" values="18;24;18" dur="2.8s" repeatCount="indefinite" />
  </circle>
  <circle cx="180.4" cy="158.2" r="1.6" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.0s" begin="0.2s" repeatCount="indefinite" /></circle>
  <circle cx="37.1" cy="205.9" r="4.1" fill="none" stroke="#fbbf24" stroke-width="1.4"><animate attributeName="r" values="4.1;9.1;4.1" dur="3.9s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.4s" repeatCount="indefinite" /></circle>
  <circle cx="291" cy="61" r="2" fill="#4ade80" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
