/** Koi Pond — top-down koi gliding over ripples and lily pads. */
export interface KoiPondOptions {
  waterDeep?: string;
  waterLight?: string;
  koiWhite?: string;
  koiOrange?: string;
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

export function createKoiPond(options: KoiPondOptions = {}): string {
  const {
    waterDeep = '#1d5a6e', waterLight = '#2f7d8f',
    koiWhite = '#f5efe2', koiOrange = '#e8703a', seed = 6,
  } = options;
  const rand = mulberry32(seed);

  /** Koi: teardrop body + flowing tail, swimming a slow loop. */
  const koi = (cx: number, cy: number, s: number, tone: string, patch: string | null, dur: number, begin: number) => {
    const patches = patch
      ? `<ellipse cx="6" cy="-4" rx="9" ry="5.5" fill="${patch}" transform="rotate(-14)"/>
         <ellipse cx="-2" cy="6" rx="7" ry="4.5" fill="${patch}" transform="rotate(20)"/>`
      : '';
    return `<g>
      <animateTransform attributeName="transform" type="rotate" values="0 ${cx} ${cy};360 ${cx} ${cy}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
      <g transform="translate(${cx + 90 * s} ${cy}) scale(${s})">
        <path d="M-26 0 C -18 -10 10 -11 20 0 C 10 11 -18 10 -26 0 Z" fill="${tone}"/>
        ${patches}
        <path d="M-26 0 C -34 -8 -44 -9 -52 -5 C -44 -1 -40 2 -34 3 C -40 4 -44 7 -50 10 C -42 10 -32 6 -26 0 Z" fill="${tone}" opacity="0.85">
          <animateTransform attributeName="transform" type="skewX" values="0;7;0;-7;0" dur="2.2s" repeatCount="indefinite"/>
        </path>
        <circle cx="14" cy="-3" r="1.6" fill="#1a1a1a"/>
      </g>
    </g>`;
  };

  const lily = (x: number, y: number, s: number) =>
    `<g transform="translate(${x} ${y}) scale(${s})">
      <circle r="34" fill="#3f7a4a"/>
      <path d="M0 0 L34 -6 A34 34 0 0 0 24 -24 Z" fill="#2f6b3a"/>
      <path d="M-30 -12 A34 34 0 0 1 -6 -33 L0 0 Z" fill="#4f8f58"/>
      <circle r="34" fill="none" stroke="#2f6b3a" stroke-width="2"/>
      <circle cx="6" cy="-4" r="5" fill="#f2b8cf"/>
      <circle cx="15" cy="3" r="4" fill="#f2b8cf"/>
    </g>`;

  return `<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="kp-water" cx="0.4" cy="0.35" r="0.9">
      <stop offset="0" stop-color="${waterLight}"/><stop offset="1" stop-color="${waterDeep}"/>
    </radialGradient>
  </defs>
  <rect width="1440" height="720" fill="url(#kp-water)"/>

  <!-- caustic light ripples -->
  <g stroke="#8fd0d8" fill="none" opacity="0.3">
    ${Array.from({ length: 9 }, () => {
      const x = rand() * 1440, y = rand() * 720, r = 30 + rand() * 70;
      return `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${r.toFixed(0)}" ry="${(r * 0.36).toFixed(0)}" stroke-width="2">
        <animate attributeName="rx" values="${r.toFixed(0)};${(r * 1.5).toFixed(0)}" dur="${(5 + rand() * 4).toFixed(1)}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.35;0;0.35" dur="${(5 + rand() * 4).toFixed(1)}s" repeatCount="indefinite"/>
      </ellipse>`;
    }).join('')}
  </g>

  ${koi(560, 300, 1.15, koiWhite, koiOrange, 26, -4)}
  ${koi(820, 420, 0.95, koiOrange, null, 30, -12)}
  ${koi(400, 480, 0.8, koiWhite, koiOrange, 34, -20)}
  ${koi(1020, 260, 0.7, koiWhite, null, 38, -8)}

  ${lily(240, 160, 1.1)}
  ${lily(1180, 560, 1.25)}
  ${lily(920, 620, 0.85)}

  <!-- drifting petals -->
  ${Array.from({ length: 8 }, () => {
    const x = rand() * 1400, y = rand() * 700;
    return `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="5" ry="3" fill="#f2b8cf" opacity="0.85">
      <animateTransform attributeName="transform" type="translate" values="0 0;${(20 + rand() * 30).toFixed(0)} ${(10 + rand() * 20).toFixed(0)};0 0" dur="${(8 + rand() * 6).toFixed(1)}s" repeatCount="indefinite"/>
    </ellipse>`;
  }).join('')}
</svg>`;
}
