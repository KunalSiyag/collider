export interface ElementalOptions {
  size?: number;
}

export function createElementalRipple(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1171; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const rings = [0, 1, 2, 3].map((i) => `<circle cx="160" cy="160" r="30" fill="none" stroke="#7dd3fc" stroke-width="3"><animate attributeName="r" values="28;140" dur="${(2.8 + i * 0.6).toFixed(1)}s" begin="${(i * 0.7).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.85;0" dur="${(2.8 + i * 0.6).toFixed(1)}s" begin="${(i * 0.7).toFixed(1)}s" repeatCount="indefinite" /></circle>`).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="rip-water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.5" /><stop offset="100%" stop-color="#082f49" />
    </linearGradient>
    <filter id="rip-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="4" /></filter>
  </defs>
  <rect width="320" height="320" fill="url(#rip-water)" />
  ${rings}
  <g transform="translate(160 160)">
    <path d="M-44 -6 Q-24 -26 0 -6 T44 -6 L44 20 Q22 34 0 20 T-44 20 Z" fill="#e0f2fe">
      <animate attributeName="d" dur="3s" repeatCount="indefinite"
        values="M-44 -6 Q-24 -26 0 -6 T44 -6 L44 20 Q22 34 0 20 T-44 20 Z;
                M-44 -10 Q-24 6 0 -12 T44 -8 L44 16 Q20 30 0 18 T-44 18 Z;
                M-44 -6 Q-24 -26 0 -6 T44 -6 L44 20 Q22 34 0 20 T-44 20 Z" />
    </path>
    <circle cx="-14" cy="-14" r="6.5" fill="#0369a1"><animate attributeName="cy" values="-15;-11;-15" dur="1.8s" repeatCount="indefinite" /></circle>
    <circle cx="16" cy="-14" r="6.5" fill="#0369a1"><animate attributeName="cy" values="-11;-15;-11" dur="1.8s" repeatCount="indefinite" /></circle>
    <path d="M-8 0 Q0 5 8 0" stroke="#0369a1" stroke-width="3.4" fill="none" stroke-linecap="round" />
    <animateTransform attributeName="transform" type="translate" values="160 160;160 148;160 160" dur="4.2s" additive="sum" repeatCount="indefinite" />
  </g>
  <circle cx="263.7" cy="112.8" r="3.1" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.0s" begin="0.6s" repeatCount="indefinite" /></circle>
  <circle cx="268.6" cy="67.3" r="2.5" fill="none" stroke="#67e8f9" stroke-width="1.4"><animate attributeName="r" values="2.5;7.5;2.5" dur="3.5s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.4s" repeatCount="indefinite" /></circle>
  <rect x="201.8" y="181.5" width="5.9" height="4.7" fill="#4ade80" opacity="0.55" transform="rotate(14 201.8 181.5)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.5s" repeatCount="indefinite" /></rect>
  <circle cx="208.8" cy="242.8" r="4.3" fill="#a78bfa" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.6s" begin="0.4s" repeatCount="indefinite" /></circle>
  <circle cx="96.1" cy="57.3" r="4.2" fill="none" stroke="#fbbf24" stroke-width="1.4"><animate attributeName="r" values="4.2;9.2;4.2" dur="3.2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="2.7s" repeatCount="indefinite" /></circle>
  <rect x="108.1" y="165.7" width="3.8" height="3.7" fill="#67e8f9" opacity="0.55" transform="rotate(60 108.1 165.7)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.9s" repeatCount="indefinite" /></rect>
  <circle cx="89" cy="239" r="2" fill="#4ade80" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
