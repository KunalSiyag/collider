/** Emberwing Elemental — a phoenix-like fire spirit shedding rising embers. */
export interface EmberwingOptions {
  flameColor?: string;
  flameDeep?: string;
  background?: string;
}

export function createEmberwing(options: EmberwingOptions = {}): string {
  const { flameColor = '#ffb347', flameDeep = '#e8582a', background = 'transparent' } = options;

  const embers = Array.from({ length: 10 }, (_, i) => {
    const x = 70 + ((i * 37) % 110);
    const dur = (2.6 + (i % 4) * 0.7).toFixed(1);
    const begin = (-(i * 0.7)).toFixed(1);
    return `<circle cx="${x}" cy="150" r="${(2 + (i % 3)).toFixed(1)}" fill="${flameColor}">
      <animate attributeName="cy" values="150;60" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.9;0" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
      <animate attributeName="cx" values="${x};${x + (i % 2 ? 12 : -12)}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
    </circle>`;
  }).join('');

  return `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="240" height="240" rx="48" fill="${background}"/>

  <!-- flame body, flickering -->
  <g>
    <animateTransform attributeName="transform" type="scale" values="1 1;1 1.05;1 0.97;1 1" dur="2.2s" repeatCount="indefinite" additive="sum"/>
    <path d="M120 42 C 148 76 168 96 168 132 A 48 52 0 0 1 72 132 C 72 96 92 76 120 42 Z" fill="${flameDeep}"/>
    <path d="M120 74 C 138 96 150 110 150 134 A 30 34 0 0 1 90 134 C 90 110 102 96 120 74 Z" fill="${flameColor}"/>
    <path d="M120 104 C 130 118 136 126 136 138 A 16 18 0 0 1 104 138 C 104 126 110 118 120 104 Z" fill="#fff3c9"/>
  </g>

  <!-- wings of fire -->
  <path d="M74 110 C 44 96 30 70 38 48 C 58 58 74 80 80 104 Z" fill="${flameColor}" opacity="0.9">
    <animateTransform attributeName="transform" type="rotate" values="0 76 106;-12 76 106;0 76 106" dur="1.8s" repeatCount="indefinite"/>
  </path>
  <path d="M166 110 C 196 96 210 70 202 48 C 182 58 166 80 160 104 Z" fill="${flameColor}" opacity="0.9">
    <animateTransform attributeName="transform" type="rotate" values="0 164 106;12 164 106;0 164 106" dur="1.8s" repeatCount="indefinite"/>
  </path>

  <!-- face in the flame -->
  <g>
    <path d="M104 128 l6 8 6 -8 M124 128 l6 8 6 -8" stroke="#7a2a10" stroke-width="3" fill="none" stroke-linecap="round">
      <animate attributeName="opacity" values="1;1;0;1" keyTimes="0;0.46;0.52;0.58" dur="4.6s" repeatCount="indefinite"/>
    </path>
  </g>

  ${embers}
</svg>`;
}
