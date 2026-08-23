export interface ElementalOptions {
  size?: number;
}

export function createElementalMoon(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 811; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const stars = Array.from({ length: 14 }, () => `<circle cx="${(rand() * 320).toFixed(1)}" cy="${(rand() * 320).toFixed(1)}" r="${(0.7 + rand() * 1.3).toFixed(1)}" fill="#e2e8f0"><animate attributeName="opacity" values="0.9;0.1;0.9" dur="${(1.4 + rand() * 2.6).toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /></circle>`).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="moon-body" cx="40%" cy="38%" r="70%">
      <stop offset="0%" stop-color="#f8fafc" /><stop offset="70%" stop-color="#cbd5e1" /><stop offset="100%" stop-color="#64748b" />
    </radialGradient>
    <filter id="moon-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="14" /></filter>
  </defs>
  ${stars}
  <circle cx="160" cy="160" r="112" fill="#cbd5e1" opacity="0.18" filter="url(#moon-glow)">
    <animate attributeName="r" values="108;118;108" dur="5s" repeatCount="indefinite" />
  </circle>
  <path d="M160 44 A116 116 0 1 0 160 276 A92 116 0 1 1 160 44 Z" fill="url(#moon-body)">
    <animate attributeName="opacity" values="1;0.85;1" dur="6s" repeatCount="indefinite" />
  </path>
  <circle cx="128" cy="120" r="14" fill="#94a3b8" opacity="0.7"><animate attributeName="r" values="14;12;14" dur="7s" repeatCount="indefinite" /></circle>
  <circle cx="150" cy="200" r="10" fill="#94a3b8" opacity="0.6" /><circle cx="112" cy="170" r="7" fill="#94a3b8" opacity="0.55" />
  <g>
    <circle cx="132" cy="152" r="8" fill="#334155" /><circle cx="172" cy="146" r="8" fill="#334155" />
    <circle cx="134.5" cy="149" r="2.6" fill="#f8fafc" /><circle cx="174.5" cy="143" r="2.6" fill="#f8fafc" />
    <path d="M140 178 Q156 187 172 177" stroke="#334155" stroke-width="4" fill="none" stroke-linecap="round" />
    <animateTransform attributeName="transform" type="translate" values="0 0;4 -4;0 0" dur="5s" repeatCount="indefinite" />
  </g>
  <circle cx="236.4" cy="149.4" r="3.9" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.8s" begin="0.3s" repeatCount="indefinite" /></circle>
  <circle cx="141.1" cy="197.6" r="1.6" fill="none" stroke="#fbbf24" stroke-width="1.4"><animate attributeName="r" values="1.6;6.6;1.6" dur="4.5s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="2.9s" repeatCount="indefinite" /></circle>
  <rect x="246.2" y="159.8" width="6.0" height="4.1" fill="#f472b6" opacity="0.55" transform="rotate(46 246.2 159.8)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.6s" repeatCount="indefinite" /></rect>
  <circle cx="181.1" cy="128.3" r="2.5" fill="#f472b6" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.4s" begin="0.3s" repeatCount="indefinite" /></circle>
  <circle cx="146.3" cy="175.4" r="3.6" fill="none" stroke="#67e8f9" stroke-width="1.4"><animate attributeName="r" values="3.6;8.6;3.6" dur="4.3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="2.9s" repeatCount="indefinite" /></circle>
  <circle cx="165" cy="55" r="2" fill="#22d3ee" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
