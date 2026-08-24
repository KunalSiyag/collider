/** Frostling — an ice-type chibi with crystal shards and frozen breath. */
export interface FrostlingOptions {
  bodyColor?: string;
  crystalColor?: string;
  background?: string;
}

export function createFrostling(options: FrostlingOptions = {}): string {
  const { bodyColor = '#9fd4e8', crystalColor = '#d8f2fc', background = 'transparent' } = options;
  return `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="240" height="240" rx="48" fill="${background}"/>

  <!-- floating crystal shards -->
  <g fill="${crystalColor}" stroke="#7fb8d0" stroke-width="1.6">
    <path d="M52 70 l8 -18 8 18 -8 8 z"><animateTransform attributeName="transform" type="translate" values="0 0;0 -7;0 0" dur="3.4s" repeatCount="indefinite"/></path>
    <path d="M176 84 l7 -15 7 15 -7 7 z"><animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0" dur="4s" begin="-1s" repeatCount="indefinite"/></path>
    <path d="M60 170 l6 -13 6 13 -6 6 z"><animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="3s" begin="-2s" repeatCount="indefinite"/></path>
  </g>

  <!-- body -->
  <ellipse cx="120" cy="146" rx="50" ry="46" fill="${bodyColor}"/>
  <ellipse cx="120" cy="160" rx="32" ry="28" fill="${crystalColor}" opacity="0.85"/>
  <!-- ice crown -->
  <path d="M96 100 L104 76 L112 96 L120 70 L128 96 L136 76 L144 100" fill="${crystalColor}" stroke="#7fb8d0" stroke-width="2"/>

  <!-- face -->
  <g>
    <circle cx="102" cy="132" r="8" fill="#ffffff"/>
    <circle cx="138" cy="132" r="8" fill="#ffffff"/>
    <circle cx="103" cy="133" r="4" fill="#1d3a4a"/>
    <circle cx="137" cy="133" r="4" fill="#1d3a4a"/>
    <animate attributeName="opacity" values="1;1;0;1" keyTimes="0;0.44;0.5;0.56" dur="6s" repeatCount="indefinite"/>
  </g>
  <ellipse cx="88" cy="148" rx="7" ry="4.5" fill="#e8a8b8" opacity="0.7"/>
  <ellipse cx="152" cy="148" rx="7" ry="4.5" fill="#e8a8b8" opacity="0.7"/>
  <path d="M114 148 Q 120 153 126 148" stroke="#1d3a4a" stroke-width="2.2" fill="none" stroke-linecap="round"/>

  <!-- frozen breath -->
  <g fill="#ffffff" opacity="0.8">
    <circle cx="158" cy="152" r="3">
      <animate attributeName="cx" values="158;186" dur="2.8s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.8;0" dur="2.8s" repeatCount="indefinite"/>
    </circle>
    <circle cx="158" cy="158" r="2.2">
      <animate attributeName="cx" values="158;180" dur="3.4s" begin="-1.2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.7;0" dur="3.4s" begin="-1.2s" repeatCount="indefinite"/>
    </circle>
  </g>

  <!-- stubby arms -->
  <path d="M72 150 q -12 6 -14 18" stroke="${bodyColor}" stroke-width="12" fill="none" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" values="0 74 150;-6 74 150;0 74 150" dur="3.2s" repeatCount="indefinite"/>
  </path>
  <path d="M168 150 q 12 6 14 18" stroke="${bodyColor}" stroke-width="12" fill="none" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" values="0 166 150;6 166 150;0 166 150" dur="3.2s" begin="-1.6s" repeatCount="indefinite"/>
  </path>
</svg>`;
}
