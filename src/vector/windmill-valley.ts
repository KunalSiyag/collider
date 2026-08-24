/** Windmill Valley — Dutch windmills turning over tulip fields. */
export interface WindmillValleyOptions {
  skyTop?: string;
  skyHorizon?: string;
  fieldColors?: string[];
  millColor?: string;
  seed?: number;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createWindmillValley(options: WindmillValleyOptions = {}): string {
  const {
    skyTop = '#9cc3e8', skyHorizon = '#f3e2bd',
    fieldColors = ['#e2557b', '#f0a04b', '#d9486e', '#e8c15a'],
    millColor = '#7a5236', seed = 12,
  } = options;
  const rand = mulberry32(seed);

  const mill = (x: number, baseY: number, s: number, dur: number, begin: number) =>
    `<g transform="translate(${x} ${baseY}) scale(${s})">
      <path d="M-26 0 L-18 -84 L18 -84 L26 0 Z" fill="${millColor}"/>
      <path d="M-26 0 L-18 -84 L-8 -84 L-14 0 Z" fill="#8f6244"/>
      <path d="M-22 -84 L0 -104 L22 -84 Z" fill="#5d3e2a"/>
      <rect x="-7" y="-52" width="14" height="20" fill="#3a2a1c"/>
      <rect x="8" y="-70" width="9" height="11" fill="#f2e8d0"/>
      <g transform="translate(0 -92)">
        <animateTransform attributeName="transform" type="rotate" values="0;360" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
        ${[0, 90, 180, 270].map((a) => `<g transform="rotate(${a})"><rect x="-2.5" y="-58" width="5" height="52" fill="#5d3e2a"/><rect x="2.5" y="-58" width="16" height="14" fill="#f2e8d0"/></g>`).join('')}
        <circle r="5" fill="#3a2a1c"/>
      </g>
    </g>`;

  const tulipBands = fieldColors
    .map((tone, i) => {
      const y = 560 + i * 40;
      let flowers = '';
      for (let x = 10; x < 1440; x += 26) {
        const fx = x + rand() * 14;
        flowers += `<path d="M${fx.toFixed(0)} ${y} v-9 m-3.5 3 q-3 -6 3.5 -9 q6.5 3 3.5 9" stroke="${tone}" stroke-width="3.4" fill="${tone}" stroke-linecap="round"><animateTransform attributeName="transform" type="skewX" values="0;${(3 + rand() * 4).toFixed(1)};0" dur="${(2.6 + rand() * 2.4).toFixed(1)}s" begin="${(-rand() * 3).toFixed(1)}s" repeatCount="indefinite"/></path>`;
      }
      return flowers;
    })
    .join('');

  return `<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="wv-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyTop}"/><stop offset="1" stop-color="${skyHorizon}"/>
    </linearGradient>
    <linearGradient id="wv-grass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#8fb35f"/><stop offset="1" stop-color="#6d9440"/>
    </linearGradient>
    <filter id="wv-soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5"/></filter>
  </defs>

  <rect width="1440" height="720" fill="url(#wv-sky)"/>
  <circle cx="240" cy="130" r="54" fill="#fff3cf" filter="url(#wv-soft)" opacity="0.9"/>
  <g fill="#ffffff" opacity="0.85">
    <g><animateTransform attributeName="transform" type="translate" values="-160 90;1600 90" dur="70s" repeatCount="indefinite"/>
      <ellipse cx="0" cy="0" rx="70" ry="17"/><ellipse cx="44" cy="7" rx="46" ry="12"/></g>
    <g><animateTransform attributeName="transform" type="translate" values="1600 170;-160 170" dur="90s" begin="-30s" repeatCount="indefinite"/>
      <ellipse cx="0" cy="0" rx="60" ry="14"/><ellipse cx="-40" cy="6" rx="40" ry="10"/></g>
  </g>

  <path d="M0 470 C320 440 700 470 1000 452 C1200 440 1340 456 1440 448 L1440 720 L0 720 Z" fill="url(#wv-grass)"/>
  <path d="M0 520 C360 496 760 522 1100 506 L1440 494 L1440 720 L0 720 Z" fill="#7da84e"/>

  <!-- canal -->
  <path d="M0 545 C400 528 900 548 1440 532 L1440 566 C900 580 400 562 0 578 Z" fill="#5f8fae"/>
  <path d="M120 556 H320 M520 552 H700 M900 556 H1120" stroke="#bcd8e8" stroke-width="2.5" opacity="0.6">
    <animate attributeName="opacity" values="0.2;0.7;0.2" dur="5s" repeatCount="indefinite"/>
  </path>

  ${mill(300, 520, 1.15, 14, 0)}
  ${mill(1080, 508, 0.9, 18, -6)}

  ${tulipBands}
</svg>`;
}
