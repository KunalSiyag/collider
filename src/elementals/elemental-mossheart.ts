/** Mossheart Elemental — a forest spirit with blooming moss and fireflies. */
export interface MossheartOptions {
  bodyColor?: string;
  mossColor?: string;
  bloomColor?: string;
  background?: string;
}

export function createMossheart(options: MossheartOptions = {}): string {
  const { bodyColor = '#7a9e6a', mossColor = '#4f7a44', bloomColor = '#f2b8cf', background = 'transparent' } = options;

  const fireflies = Array.from({ length: 6 }, (_, i) => {
    const x = 60 + ((i * 41) % 130);
    const dur = (4 + (i % 3)).toFixed(1);
    const begin = (-i * 1.3).toFixed(1);
    return `<circle cx="${x}" cy="${140 + (i % 3) * 20}" r="2.6" fill="#fff3a8">
      <animate attributeName="cy" values="${140 + (i % 3) * 20};${90 + (i % 4) * 14};${140 + (i % 3) * 20}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.2;1;0.2" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
    </circle>`;
  }).join('');

  return `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="240" height="240" rx="48" fill="${background}"/>

  <!-- golem body of living wood -->
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="5s" repeatCount="indefinite"/>
    <path d="M78 196 C 70 150 82 108 120 96 C 158 108 170 150 162 196 Z" fill="${bodyColor}"/>
    <path d="M92 190 C 88 156 96 128 120 118" stroke="#5d7a50" stroke-width="3" fill="none" opacity="0.7"/>
    <!-- moss cap -->
    <path d="M84 116 C 92 92 148 92 156 116 C 140 106 100 106 84 116 Z" fill="${mossColor}"/>
    <circle cx="100" cy="104" r="5" fill="${mossColor}"/>
    <circle cx="140" cy="104" r="6" fill="${mossColor}"/>
    <!-- blooms -->
    ${[[96, 100], [126, 92], [148, 106]].map(([x, y], i) => `<g transform="translate(${x} ${y})">
      <circle r="3.4" fill="${bloomColor}"/><circle r="6.4" fill="none" stroke="${bloomColor}" stroke-width="1.8"/>
      <animateTransform attributeName="transform" type="rotate" values="0;360" dur="${(9 + i * 3).toFixed(0)}s" repeatCount="indefinite"/>
    </g>`).join('')}
    <!-- glowing heart crack -->
    <path d="M120 150 l-7 10 7 8 7 -8 z" fill="#ffe9a8">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
    </path>
    <!-- eyes -->
    <circle cx="104" cy="134" r="5" fill="#ffe9a8"/>
    <circle cx="136" cy="134" r="5" fill="#ffe9a8">
      <animate attributeName="opacity" values="1;1;0.2;1" keyTimes="0;0.46;0.52;0.58" dur="5.6s" repeatCount="indefinite"/>
    </circle>
  </g>

  <!-- sprout arms -->
  <path d="M80 150 q -20 -4 -26 -22" stroke="${bodyColor}" stroke-width="10" fill="none" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" values="0 80 150;-5 80 150;0 80 150" dur="4.2s" repeatCount="indefinite"/>
  </path>
  <path d="M160 150 q 20 -4 26 -22" stroke="${bodyColor}" stroke-width="10" fill="none" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" values="0 160 150;5 160 150;0 160 150" dur="4.2s" begin="-2s" repeatCount="indefinite"/>
  </path>

  ${fireflies}
</svg>`;
}
