/** Storm Plains — thunderstorm rolling over grassland with lightning flashes. */
export interface StormPlainsOptions {
  skyTop?: string;
  skyHorizon?: string;
  fieldColor?: string;
  flashColor?: string;
  boltColor?: string;
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

export function createStormPlains(options: StormPlainsOptions = {}): string {
  const {
    skyTop = '#232c3d', skyHorizon = '#5a6b82',
    fieldColor = '#3c5233', flashColor = '#dfe9ff', boltColor = '#f4f8ff', seed = 4,
  } = options;
  const rand = mulberry32(seed);

  const grass = Array.from({ length: 90 }, () => {
    const x = rand() * 1460 - 10;
    const y = 520 + rand() * 190;
    const h = 12 + rand() * 26;
    const lean = rand() * 14 - 7;
    return `<path d="M${x.toFixed(0)} ${y.toFixed(0)} Q ${(x + lean).toFixed(0)} ${(y - h * 0.6).toFixed(0)} ${(x + lean * 2).toFixed(0)} ${(y - h).toFixed(0)}" stroke="${rand() > 0.5 ? '#4c6640' : '#324629'}" stroke-width="${(1.4 + rand()).toFixed(1)}" fill="none">
      <animateTransform attributeName="transform" type="skewX" values="0;${(4 + rand() * 5).toFixed(1)};0" dur="${(1.6 + rand() * 1.8).toFixed(2)}s" begin="${(-rand() * 3).toFixed(2)}s" repeatCount="indefinite"/>
    </path>`;
  }).join('');

  const cloudBank = (y: number, tone: string, op: number, dur: number, drift: number, begin: number) =>
    `<g fill="${tone}" opacity="${op}">
      <animateTransform attributeName="transform" type="translate" values="${-drift} 0;${drift} 0;${-drift} 0" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
      <ellipse cx="240" cy="${y}" rx="300" ry="52"/><ellipse cx="620" cy="${y - 16}" rx="340" ry="60"/>
      <ellipse cx="1010" cy="${y}" rx="320" ry="56"/><ellipse cx="1330" cy="${y + 8}" rx="260" ry="46"/>
    </g>`;

  return `<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="sp-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyTop}"/><stop offset="1" stop-color="${skyHorizon}"/>
    </linearGradient>
    <linearGradient id="sp-field" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${fieldColor}"/><stop offset="1" stop-color="#26361f"/>
    </linearGradient>
    <filter id="sp-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="12"/></filter>
  </defs>

  <rect width="1440" height="720" fill="url(#sp-sky)"/>

  <!-- whole-sky flash that precedes each bolt -->
  <rect width="1440" height="720" fill="${flashColor}" opacity="0">
    <animate attributeName="opacity" values="0;0;0.32;0;0.1;0;0" keyTimes="0;0.42;0.45;0.5;0.53;0.6;1" dur="7.5s" repeatCount="indefinite"/>
  </rect>

  ${cloudBank(120, '#39445c', 0.95, 60, 60, -10)}
  ${cloudBank(210, '#2b3550', 0.98, 48, -45, -26)}
  <ellipse cx="720" cy="300" rx="760" ry="70" fill="#1f2839" opacity="0.9" filter="url(#sp-blur)"/>

  <!-- forked lightning -->
  <g stroke="${boltColor}" stroke-width="3.4" fill="none" stroke-linecap="round" filter="url(#sp-blur)" opacity="0">
    <animate attributeName="opacity" values="0;0;1;0.2;1;0;0" keyTimes="0;0.45;0.47;0.5;0.53;0.58;1" dur="7.5s" repeatCount="indefinite"/>
    <path d="M520 250 L560 330 L528 336 L588 440 L556 444 L610 540"/>
    <path d="M560 330 L610 356 L580 366 L632 420" stroke-width="2"/>
  </g>
  <g stroke="${boltColor}" stroke-width="2.6" fill="none" stroke-linecap="round">
    <animate attributeName="opacity" values="0;0;1;0;1;0;0" keyTimes="0;0.45;0.47;0.51;0.53;0.57;1" dur="7.5s" repeatCount="indefinite"/>
    <path d="M520 250 L560 330 L528 336 L588 440 L556 444 L610 540"/>
  </g>

  <path d="M0 520 C260 496 540 530 820 512 C1080 498 1280 522 1440 508 L1440 720 L0 720 Z" fill="url(#sp-field)"/>
  ${grass}

  <!-- lone wind-bent tree silhouette -->
  <g transform="translate(1150 540)">
    <animateTransform attributeName="transform" type="skewX" values="0;5;0;8;0" dur="5s" repeatCount="indefinite"/>
    <path d="M0 0 L-4 -60 L-26 -92 M-4 -60 L14 -96 M-4 -44 L-38 -66" stroke="#141d12" stroke-width="9" fill="none" stroke-linecap="round"/>
    <ellipse cx="-8" cy="-104" rx="44" ry="20" fill="#18240f"/>
  </g>
</svg>`;
}
