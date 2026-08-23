export interface ElementalOptions {
  size?: number;
}

export function createElementalWisp(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1459; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const trail = Array.from({ length: 5 }, (_, i) => `<circle cx="0" cy="0" r="${(14 - i * 2.4).toFixed(1)}" fill="#99f6e4" opacity="${(0.5 - i * 0.09).toFixed(2)}"><animate attributeName="cx" values="${(-i * 22).toFixed(0)};${(-i * 22 - 16).toFixed(0)};${(-i * 22).toFixed(0)}" dur="3.6s" repeatCount="indefinite" /><animate attributeName="cy" values="${(i * 8).toFixed(0)};${(i * 8 - 10).toFixed(0)};${(i * 8).toFixed(0)}" dur="3.6s" begin="${(i * 0.15).toFixed(2)}s" repeatCount="indefinite" /></circle>`).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="wisp-core" cx="46%" cy="42%" r="60%">
      <stop offset="0%" stop-color="#f0fdfa" /><stop offset="65%" stop-color="#5eead4" /><stop offset="100%" stop-color="#134e4a" />
    </radialGradient>
    <filter id="wisp-glow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="12" /></filter>
  </defs>
  <g transform="translate(170 150)">
    ${trail}
    <animateTransform attributeName="transform" type="translate" values="170 150;210 110;160 180;230 190;170 150" dur="11s" repeatCount="indefinite" />
  </g>
  <g filter="url(#wisp-glow)">
    <circle cx="170" cy="150" r="26" fill="#5eead4" opacity="0.4">
      <animate attributeName="r" values="24;32;24" dur="2.8s" repeatCount="indefinite" />
    </circle>
  </g>
  <circle cx="170" cy="150" r="18" fill="url(#wisp-core)">
    <animate attributeName="r" values="17;20;17" dur="2.8s" repeatCount="indefinite" />
  </circle>
  <circle cx="164" cy="146" r="3.6" fill="#042f2e"><animate attributeName="cy" values="145;148;145" dur="1.9s" repeatCount="indefinite" /></circle>
  <circle cx="177" cy="146" r="3.6" fill="#042f2e"><animate attributeName="cy" values="148;145;148" dur="1.9s" repeatCount="indefinite" /></circle>
  <circle cx="121.8" cy="207.7" r="4.4" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.9s" begin="0.3s" repeatCount="indefinite" /></circle>
  <circle cx="147.5" cy="198.3" r="3.9" fill="none" stroke="#67e8f9" stroke-width="1.4"><animate attributeName="r" values="3.9;8.9;3.9" dur="2.6s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.5s" repeatCount="indefinite" /></circle>
  <rect x="66.5" y="268.8" width="4.0" height="3.3" fill="#fb7185" opacity="0.55" transform="rotate(19 66.5 268.8)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.1s" repeatCount="indefinite" /></rect>
  <circle cx="174.6" cy="151.9" r="1.9" fill="#22d3ee" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="1.8s" begin="0.1s" repeatCount="indefinite" /></circle>
  <circle cx="235.5" cy="98.1" r="1.9" fill="none" stroke="#22d3ee" stroke-width="1.4"><animate attributeName="r" values="1.9;6.9;1.9" dur="3.9s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.4s" repeatCount="indefinite" /></circle>
  <rect x="155.1" y="173.8" width="5.4" height="6.0" fill="#fbbf24" opacity="0.55" transform="rotate(49 155.1 173.8)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.7s" repeatCount="indefinite" /></rect>
  <circle cx="242" cy="272" r="2" fill="#fbbf24" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
