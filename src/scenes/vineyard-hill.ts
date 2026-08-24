/** Vineyard Hill — Tuscan afternoon with rolling vine rows and a villa. */
export interface VineyardHillOptions {
  skyTop?: string;
  skyHorizon?: string;
  hillA?: string;
  hillB?: string;
  villaColor?: string;
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

export function createVineyardHill(options: VineyardHillOptions = {}): string {
  const {
    skyTop = '#a8c8e8', skyHorizon = '#f6e3bd',
    hillA = '#8fae5a', hillB = '#6d8f42', villaColor = '#f0e4cc', seed = 21,
  } = options;
  const rand = mulberry32(seed);

  /** Curved vine rows that follow a hill band: posts + green canopy dashes. */
  const vineRows = (pathY: (t: number) => number, count: number, tone: string) => {
    let out = '';
    for (let r = 0; r < count; r++) {
      const off = r * 14;
      let posts = '';
      let canopy = '';
      for (let x = 40; x < 1400; x += 34) {
        const y = pathY(x) + off;
        posts += `<rect x="${x}" y="${y.toFixed(0)}" width="2.5" height="9" fill="#7a5c38"/>`;
        canopy += `<ellipse cx="${x + 1}" cy="${(y - 3).toFixed(0)}" rx="12" ry="5.5" fill="${tone}" opacity="${(0.75 + rand() * 0.25).toFixed(2)}"/>`;
      }
      out += posts + canopy;
    }
    return out;
  };

  const cypress = (x: number, y: number, h: number) =>
    `<g transform="translate(${x} ${y})">
      <rect x="-2" y="-4" width="4" height="8" fill="#5d4630"/>
      <path d="M0 ${-h} C ${h * 0.16} ${-h * 0.72} ${h * 0.18} ${-h * 0.3} ${h * 0.12} 0 L ${-h * 0.12} 0 C ${-h * 0.18} ${-h * 0.3} ${-h * 0.16} ${-h * 0.72} 0 ${-h} Z" fill="#3d5c33">
        <animateTransform attributeName="transform" type="skewX" values="0;2.4;0;-2.4;0" dur="${(6 + rand() * 4).toFixed(1)}s" repeatCount="indefinite"/>
      </path>
    </g>`;

  const cloud = (x: number, y: number, s: number, dur: number, drift: number, begin: number) =>
    `<g transform="translate(${x} ${y}) scale(${s})" fill="#ffffff" opacity="0.85">
      <animateTransform attributeName="transform" type="translate" values="${x} ${y};${x + drift} ${y};${x} ${y}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
      <ellipse cx="0" cy="0" rx="64" ry="16"/><ellipse cx="40" cy="6" rx="44" ry="12"/><ellipse cx="-40" cy="7" rx="40" ry="11"/>
    </g>`;

  return `<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="vh-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyTop}"/><stop offset="1" stop-color="${skyHorizon}"/>
    </linearGradient>
    <linearGradient id="vh-h1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${hillA}"/><stop offset="1" stop-color="#7d9c4c"/>
    </linearGradient>
    <linearGradient id="vh-h2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${hillB}"/><stop offset="1" stop-color="#557634"/>
    </linearGradient>
    <filter id="vh-soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5"/></filter>
  </defs>

  <rect width="1440" height="720" fill="url(#vh-sky)"/>
  <circle cx="1180" cy="140" r="70" fill="#fff3cf" filter="url(#vh-soft)" opacity="0.9"/>
  ${cloud(200, 110, 1.1, 48, 65, -8)}
  ${cloud(760, 70, 0.85, 56, -60, -20)}
  ${cloud(1080, 180, 0.7, 44, 45, -30)}

  <path d="M0 420 C300 360 620 400 900 372 C1120 352 1300 380 1440 366 L1440 720 L0 720 Z" fill="url(#vh-h1)" opacity="0.95"/>
  <path d="M0 500 C280 448 560 496 860 470 C1120 448 1300 484 1440 466 L1440 720 L0 720 Z" fill="url(#vh-h2)"/>

  <!-- villa on the far hill -->
  <g transform="translate(1010 396)">
    <rect x="-38" y="-26" width="76" height="26" fill="${villaColor}"/>
    <path d="M-44 -26 L0 -44 L44 -26 Z" fill="#b5533c"/>
    <rect x="-8" y="-16" width="12" height="16" fill="#8a6a4a"/>
    <rect x="14" y="-18" width="10" height="10" fill="#7a9cb8"/>
    <rect x="-26" y="-18" width="10" height="10" fill="#7a9cb8"/>
    ${cypress(52, 0, 34)}
    ${cypress(-54, 2, 28)}
  </g>

  <!-- vine rows on the near hill, following its curve -->
  <g>${vineRows((x) => 500 + Math.sin(x / 260) * 14 - x * 0.012, 4, '#4f7030')}</g>

  <!-- gravel road winding to the villa -->
  <path d="M620 720 C700 640 860 560 1000 512 L1030 522 C900 572 760 650 700 720 Z" fill="#d9c9a8" opacity="0.9"/>

  ${cypress(90, 560, 60)}
  ${cypress(140, 572, 44)}
  ${cypress(1350, 566, 66)}
</svg>`;
}
