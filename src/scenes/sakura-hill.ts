/**
 * Sakura Hill — cherry blossoms at first light
 * ============================================
 * A tranquil dawn scene: soft rose sky, a snow-capped mountain, a pagoda
 * silhouetted on a hill, cherry trees in full bloom and petals forever
 * drifting on the breeze over a calm river.
 *
 * Returns a standalone `<svg>` string (SMIL animation only, zero JS).
 *
 * MODIFY
 * ------
 *   - Palette options: sky stops, mountain, blossoms, petals, river.
 *   - `petalCount` controls the falling-petal density.
 *   - `seed` re-rolls every tree, petal path and ripple.
 */

export interface SakuraHillOptions {
  skyTop?: string;
  skyMid?: string;
  skyHorizon?: string;
  mountainColor?: string;
  blossomColor?: string;
  petalColor?: string;
  petalCount?: number;
  seed?: number;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createSakuraHill(options: SakuraHillOptions = {}): string {
  const {
    skyTop = '#f6c6d8',
    skyMid = '#fbe3ea',
    skyHorizon = '#fdf3e7',
    mountainColor = '#7a86a8',
    blossomColor = '#f6aecf',
    petalColor = '#f9c6dd',
    petalCount = 26,
    seed = 5,
  } = options;

  const rand = mulberry32(seed);

  /** Cherry tree: dark trunk with blossom cloud clusters on branch tips. */
  const cherryTree = (x: number, groundY: number, s: number) => {
    const trunk = `<path d="M${x} ${groundY} C ${x - 4} ${groundY - 26 * s} ${x + 6} ${groundY - 40 * s} ${x - 2} ${groundY - 58 * s}
        M${x - 1} ${groundY - 34 * s} C ${x - 18 * s} ${groundY - 44 * s} ${x - 26 * s} ${groundY - 50 * s} ${x - 34 * s} ${groundY - 52 * s}
        M${x} ${groundY - 44 * s} C ${x + 16 * s} ${groundY - 52 * s} ${x + 24 * s} ${groundY - 56 * s} ${x + 32 * s} ${groundY - 58 * s}"
      stroke="#5a4440" stroke-width="${5 * s}" fill="none" stroke-linecap="round"/>`;
    const puff = (cx: number, cy: number, r: number, tone: string) =>
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${tone}"/>`;
    const clusters = [
      puff(x - 2, groundY - 66 * s, 20 * s, blossomColor),
      puff(x - 20 * s, groundY - 58 * s, 14 * s, blossomColor),
      puff(x + 18 * s, groundY - 64 * s, 15 * s, blossomColor),
      puff(x - 34 * s, groundY - 56 * s, 10 * s, blossomColor),
      puff(x + 33 * s, groundY - 62 * s, 10 * s, blossomColor),
      puff(x + 4, groundY - 74 * s, 12 * s, '#fbc9e0'),
      puff(x - 10, groundY - 70 * s, 9 * s, '#fbc9e0'),
    ].join('');
    return trunk + clusters;
  };

  /** Falling petal: drifts down-left with a sway, rotating as it falls. */
  const petal = () => {
    const x0 = 100 + rand() * 1300;
    const y0 = -20 - rand() * 200;
    const fall = 9 + rand() * 8;
    const dur = fall.toFixed(1);
    const swayX = 30 + rand() * 50;
    const begin = (-rand() * fall).toFixed(1);
    const s = 0.7 + rand() * 0.8;
    return `<g transform="translate(${x0.toFixed(0)} ${y0.toFixed(0)}) scale(${s.toFixed(2)})">
      <animateTransform attributeName="transform" type="translate" values="${x0.toFixed(0)} ${y0.toFixed(0)};${(x0 - swayX).toFixed(0)} 380;${(x0 - swayX * 2).toFixed(0)} 760" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
      <path d="M0 0 C 5 -4 9 -2 8 3 C 7 7 2 8 0 5 C -2 8 -7 7 -8 3 C -9 -2 -5 -4 0 0 Z" fill="${petalColor}" opacity="0.9">
        <animateTransform attributeName="transform" type="rotate" values="0;360" dur="${(2 + rand() * 3).toFixed(1)}s" repeatCount="indefinite"/>
      </path>
    </g>`;
  };

  const petals = Array.from({ length: petalCount }, petal).join('');

  /** Pagoda silhouette: three stacked roofs with a spire. */
  const pagoda = (x: number, baseY: number, s: number) =>
    `<g transform="translate(${x} ${baseY}) scale(${s})" fill="#4a3f52">
      <rect x="-14" y="-30" width="28" height="30"/>
      <path d="M-30 -30 L0 -44 L30 -30 L24 -26 L-24 -26 Z"/>
      <rect x="-11" y="-52" width="22" height="14"/>
      <path d="M-24 -52 L0 -63 L24 -52 L19 -49 L-19 -49 Z"/>
      <rect x="-8" y="-70" width="16" height="12"/>
      <path d="M-18 -70 L0 -79 L18 -70 L14 -67 L-14 -67 Z"/>
      <rect x="-1.5" y="-88" width="3" height="18"/>
      <circle cy="-90" r="2.5"/>
    </g>`;

  return `<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="sh-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyTop}"/>
      <stop offset="0.55" stop-color="${skyMid}"/>
      <stop offset="1" stop-color="${skyHorizon}"/>
    </linearGradient>
    <linearGradient id="sh-mtn" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${mountainColor}"/>
      <stop offset="0.4" stop-color="#98a2c0"/>
      <stop offset="1" stop-color="#c3b8cd"/>
    </linearGradient>
    <linearGradient id="sh-river" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#cfd8e8"/>
      <stop offset="1" stop-color="#aebbe0"/>
    </linearGradient>
    <filter id="sh-soft" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="6"/>
    </filter>
  </defs>

  <rect width="1440" height="720" fill="url(#sh-sky)"/>

  <!-- pale morning sun -->
  <circle cx="1120" cy="180" r="120" fill="#fff4dd" opacity="0.8" filter="url(#sh-soft)">
    <animate attributeName="opacity" values="0.65;0.9;0.65" dur="10s" repeatCount="indefinite"/>
  </circle>

  <!-- snow-capped mountain -->
  <path d="M240 470 L560 170 L640 250 L700 210 L900 470 Z" fill="url(#sh-mtn)"/>
  <path d="M560 170 L610 218 L588 226 L620 262 L580 258 L560 236 L536 266 L508 240 L532 224 L516 210 Z" fill="#fbfdff"/>
  <path d="M700 210 L736 252 L712 250 L740 284 L700 470 L660 470 L676 300 L656 268 L678 248 Z" fill="#8d97b8" opacity="0.7"/>

  <!-- distant haze at the mountain foot -->
  <ellipse cx="560" cy="470" rx="520" ry="34" fill="#fdeee2" opacity="0.75" filter="url(#sh-soft)"/>

  <!-- hills -->
  <path d="M0 500 C200 460 420 492 640 474 C900 452 1180 490 1440 468 L1440 720 L0 720 Z" fill="#9db784"/>
  <path d="M0 556 C260 524 540 560 820 542 C1080 526 1280 554 1440 540 L1440 720 L0 720 Z" fill="#7fa065"/>

  <!-- pagoda on the hill crest -->
  ${pagoda(1010, 500, 1.15)}

  <!-- river with drifting ripple lines -->
  <path d="M0 620 C300 600 600 636 900 618 C1120 606 1300 626 1440 614 L1440 720 L0 720 Z" fill="url(#sh-river)"/>
  <g stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.5">
    <path d="M180 656 H330"><animate attributeName="opacity" values="0.15;0.55;0.15" dur="5s" begin="-1s" repeatCount="indefinite"/></path>
    <path d="M520 676 H700"><animate attributeName="opacity" values="0.15;0.5;0.15" dur="6s" begin="-3s" repeatCount="indefinite"/></path>
    <path d="M900 650 H1080"><animate attributeName="opacity" values="0.15;0.5;0.15" dur="5.4s" begin="-2s" repeatCount="indefinite"/></path>
    <path d="M1180 684 H1330"><animate attributeName="opacity" values="0.12;0.45;0.12" dur="6.6s" begin="-4s" repeatCount="indefinite"/></path>
  </g>

  <!-- cherry trees along the bank -->
  ${cherryTree(150, 560, 1.15)}
  ${cherryTree(360, 548, 0.9)}
  ${cherryTree(1240, 552, 1.25)}
  ${cherryTree(1420, 566, 1)}
  ${cherryTree(640, 540, 0.75)}

  ${petals}
</svg>`;
}
