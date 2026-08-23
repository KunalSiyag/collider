export interface ElementalOptions {
  size?: number;
}

export function createElementalQuicksand(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1117; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const ripples = [0, 1, 2].map((i) => `<ellipse cx="160" cy="240" rx="${40 + i * 34}" ry="${12 + i * 10}" fill="none" stroke="#eab308" stroke-width="2.5" opacity="${(0.6 - i * 0.15).toFixed(2)}"><animate attributeName="rx" values="${30 + i * 30};${70 + i * 34}" dur="${(3 + i * 0.8).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="ry" values="${9 + i * 9};${22 + i * 10}" dur="${(3 + i * 0.8).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.7;0" dur="${(3 + i * 0.8).toFixed(1)}s" repeatCount="indefinite" /></ellipse>`).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="qs-pit" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#fde68a" /><stop offset="60%" stop-color="#ca8a04" /><stop offset="100%" stop-color="#713f12" />
    </radialGradient>
    <filter id="qs-soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="4" /></filter>
  </defs>
  <rect y="196" width="320" height="124" fill="#854d0e" />
  <ellipse cx="160" cy="242" rx="130" ry="52" fill="url(#qs-pit)" filter="url(#qs-soft)">
    <animate attributeName="ry" values="50;56;50" dur="4s" repeatCount="indefinite" />
  </ellipse>
  ${ripples}
  <g>
    <path d="M118 236 C122 214 138 202 158 204 C178 206 192 220 194 238 Z" fill="#fef08a">
      <animate attributeName="d" dur="2.6s" repeatCount="indefinite"
        values="M118 236 C122 214 138 202 158 204 C178 206 192 220 194 238 Z;
                M120 232 C126 210 140 198 160 200 C180 202 190 216 192 234 Z;
                M118 236 C122 214 138 202 158 204 C178 206 192 220 194 238 Z" />
      <animate attributeName="cy" values="0;6;0" dur="2.6s" repeatCount="indefinite" />
    </path>
    <circle cx="142" cy="222" r="7" fill="#78350f"><animate attributeName="cy" values="220;225;220" dur="2.6s" repeatCount="indefinite" /></circle>
    <circle cx="176" cy="222" r="7" fill="#78350f"><animate attributeName="cy" values="225;220;225" dur="2.6s" repeatCount="indefinite" /></circle>
    <path d="M148 236 Q159 241 170 235" stroke="#78350f" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <animateTransform attributeName="transform" type="translate" values="0 0;0 14;0 0" dur="4s" repeatCount="indefinite" />
  </g>
  <circle cx="131.9" cy="176.3" r="4.4" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.3s" begin="1.0s" repeatCount="indefinite" /></circle>
  <circle cx="194.9" cy="89.2" r="3.0" fill="none" stroke="#fb7185" stroke-width="1.4"><animate attributeName="r" values="3.0;8.0;3.0" dur="3.7s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.2s" repeatCount="indefinite" /></circle>
  <circle cx="247" cy="257" r="2" fill="#22d3ee" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
