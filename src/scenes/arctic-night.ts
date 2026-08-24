/**
 * Arctic Night — snowbound village under the aurora
 * =================================================
 * A cozy winter night: green-violet aurora curtains over a starfield,
 * snow falling in slow parallax layers, white-tipped pines and cabins with
 * warm glowing windows sending up chimney smoke.
 *
 * Returns a standalone `<svg>` string (SMIL animation only, zero JS).
 *
 * MODIFY
 * ------
 *   - Palette options: night sky, aurora tones, snow, cabin wood, window.
 *   - `flakeCount` controls snow density; `seed` re-rolls the scatter.
 *   - Aurora ribbons are blurred paths with skew animations — edit their
 *     `d` attributes to reshape the curtains.
 */

export interface ArcticNightOptions {
  skyTop?: string;
  skyBottom?: string;
  auroraGreen?: string;
  auroraViolet?: string;
  snowColor?: string;
  cabinWood?: string;
  windowGlow?: string;
  flakeCount?: number;
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

export function createArcticNight(options: ArcticNightOptions = {}): string {
  const {
    skyTop = '#030614',
    skyBottom = '#0d1b33',
    auroraGreen = '#4ade80',
    auroraViolet = '#8b5cf6',
    snowColor = '#eef4fb',
    cabinWood = '#4a3527',
    windowGlow = '#ffc86e',
    flakeCount = 90,
    seed = 3,
  } = options;

  const rand = mulberry32(seed);

  const stars = Array.from({ length: 70 }, () => {
    const cx = (rand() * 1440).toFixed(0);
    const cy = (rand() * 380).toFixed(0);
    const r = (0.5 + rand() * 1.2).toFixed(2);
    const dur = (2.5 + rand() * 4).toFixed(1);
    const begin = (-rand() * 6).toFixed(1);
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#dce8ff"><animate attributeName="opacity" values="0.15;0.9;0.15" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/></circle>`;
  }).join('');

  /** Snow layer: flakes fall and loop; deeper layers are bigger + faster. */
  const snowLayer = (count: number, size: number, speed: number, opacity: number) =>
    Array.from({ length: count }, () => {
      const x = rand() * 1460 - 10;
      const fall = speed * (0.8 + rand() * 0.5);
      const begin = (-rand() * fall).toFixed(1);
      const drift = 20 + rand() * 26;
      const r = (size * (0.7 + rand() * 0.6)).toFixed(2);
      return `<circle cx="${x.toFixed(0)}" cy="-10" r="${r}" fill="${snowColor}" opacity="${opacity}">
        <animateTransform attributeName="transform" type="translate" values="0 0;${(-drift).toFixed(0)} 380;${(-drift * 2).toFixed(0)} 760" dur="${fall.toFixed(1)}s" begin="${begin}s" repeatCount="indefinite"/>
      </circle>`;
    }).join('');

  /** Snowy pine: dark cone tiers with white snow caps on each tier. */
  const pine = (x: number, groundY: number, h: number) => {
    const tier = (cy: number, w: number, th: number) =>
      `<path d="M${x - w / 2} ${cy} L${x} ${cy - th} L${x + w / 2} ${cy} Z" fill="#1d3040"/>
       <path d="M${x - w / 2} ${cy} L${x} ${cy - th} L${x + w / 2} ${cy} L${x + w / 3.2} ${cy} L${x} ${cy - th * 0.55} L${x - w / 3.2} ${cy} Z" fill="${snowColor}" opacity="0.9"/>`;
    return (
      `<rect x="${x - 3}" y="${groundY - 8}" width="6" height="10" fill="#16222e"/>` +
      tier(groundY - 6, h * 0.62, h * 0.42) +
      tier(groundY - h * 0.32, h * 0.5, h * 0.38) +
      tier(groundY - h * 0.58, h * 0.36, h * 0.34)
    );
  };

  /** Cabin with glowing windows and chimney smoke. */
  const cabin = (x: number, groundY: number, s: number) =>
    `<g transform="translate(${x} ${groundY}) scale(${s})">
      <rect x="-46" y="-34" width="92" height="34" fill="${cabinWood}"/>
      <rect x="-46" y="-34" width="92" height="5" fill="#5d4534"/>
      <rect x="-46" y="-20" width="92" height="2.5" fill="#3a2a1e"/>
      <path d="M-56 -32 L0 -64 L56 -32 L48 -26 L0 -52 L-48 -26 Z" fill="#d8e2ee"/>
      <path d="M-56 -32 L0 -64 L56 -32" fill="none" stroke="#f4f9ff" stroke-width="3" stroke-linecap="round"/>
      <rect x="18" y="-58" width="10" height="16" fill="#6b7c8c"/>
      <ellipse cx="23" cy="-66" rx="8" ry="4.5" fill="#cfd8e2" opacity="0.6">
        <animate attributeName="opacity" values="0.25;0.6;0.25" dur="5s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="27" cy="-76" rx="11" ry="6" fill="#dfe7ef" opacity="0.4">
        <animate attributeName="opacity" values="0.15;0.45;0.15" dur="7s" begin="-2s" repeatCount="indefinite"/>
      </ellipse>
      <g>
        <ellipse cx="-20" cy="-16" rx="11" ry="11" fill="${windowGlow}" opacity="0.28"/>
        <rect x="-27" y="-23" width="14" height="13" fill="${windowGlow}"/>
        <line x1="-20" y1="-23" x2="-20" y2="-10" stroke="${cabinWood}" stroke-width="2"/>
        <line x1="-27" y1="-16.5" x2="-13" y2="-16.5" stroke="${cabinWood}" stroke-width="2"/>
        <animate attributeName="opacity" values="1;0.82;1" dur="4s" repeatCount="indefinite"/>
      </g>
      <rect x="14" y="-18" width="12" height="18" fill="#33241a"/>
    </g>`;

  return `<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="an-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyTop}"/>
      <stop offset="1" stop-color="${skyBottom}"/>
    </linearGradient>
    <linearGradient id="an-aur1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${auroraGreen}" stop-opacity="0"/>
      <stop offset="0.7" stop-color="${auroraGreen}" stop-opacity="0.4"/>
      <stop offset="1" stop-color="${auroraGreen}" stop-opacity="0.85"/>
    </linearGradient>
    <linearGradient id="an-aur2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${auroraViolet}" stop-opacity="0"/>
      <stop offset="0.7" stop-color="${auroraViolet}" stop-opacity="0.32"/>
      <stop offset="1" stop-color="${auroraViolet}" stop-opacity="0.75"/>
    </linearGradient>
    <linearGradient id="an-ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#dfe9f4"/>
      <stop offset="1" stop-color="#b9c9dc"/>
    </linearGradient>
    <filter id="an-blur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
    <filter id="an-blur-soft" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8"/>
    </filter>
  </defs>

  <rect width="1440" height="720" fill="url(#an-sky)"/>
  ${stars}

  <!-- moon -->
  <circle cx="1210" cy="110" r="46" fill="#eef3fb"/>
  <circle cx="1196" cy="100" r="9" fill="#d7e0ee"/>
  <circle cx="1224" cy="122" r="6" fill="#d7e0ee"/>
  <circle cx="1210" cy="110" r="70" fill="#eef3fb" opacity="0.14" filter="url(#an-blur-soft)"/>

  <!-- aurora curtains, swaying slowly -->
  <g filter="url(#an-blur)">
    <path d="M180 60 C140 170 260 260 210 400 L320 400 C270 250 380 160 320 60 Z" fill="url(#an-aur1)">
      <animateTransform attributeName="transform" type="skewX" values="0;-4;0;3;0" dur="17s" begin="-3s" repeatCount="indefinite"/>
    </path>
    <path d="M620 30 C585 150 690 250 640 390 L760 390 C710 240 820 140 760 30 Z" fill="url(#an-aur2)" opacity="0.9">
      <animateTransform attributeName="transform" type="skewX" values="0;3.5;0;-3;0" dur="21s" begin="-9s" repeatCount="indefinite"/>
    </path>
    <path d="M1010 70 C975 170 1080 260 1030 390 L1140 390 C1090 250 1190 160 1130 70 Z" fill="url(#an-aur1)" opacity="0.85">
      <animateTransform attributeName="transform" type="skewX" values="0;-3;0;4;0" dur="24s" begin="-14s" repeatCount="indefinite"/>
    </path>
  </g>

  <!-- snowy ground with soft drifts -->
  <path d="M0 520 C240 496 480 528 720 510 C960 492 1200 524 1440 506 L1440 720 L0 720 Z" fill="url(#an-ground)"/>
  <path d="M0 590 C300 566 620 600 940 582 C1160 570 1320 590 1440 580 L1440 720 L0 720 Z" fill="#cfdcec"/>

  <!-- pines and cabins -->
  ${pine(90, 540, 120)}
  ${pine(170, 532, 88)}
  ${pine(1310, 536, 130)}
  ${pine(1395, 548, 92)}
  ${cabin(300, 548, 1.05)}
  ${cabin(560, 536, 0.85)}
  ${cabin(1080, 544, 1)}
  ${pine(760, 528, 70)}
  ${pine(880, 534, 84)}

  <!-- distant treeline -->
  <path d="M0 512 L40 486 L80 512 L120 480 L160 512 L200 490 L240 512 L280 484 L320 512 L1440 512 L1440 522 L0 522 Z" fill="#22374a" opacity="0.8"/>

  <!-- snowfall: far (small, slow), near (big, fast) -->
  <g>${snowLayer(Math.floor(flakeCount * 0.6), 1.6, 13, 0.55)}</g>
  <g filter="url(#an-blur-soft)">${snowLayer(Math.floor(flakeCount * 0.2), 3.4, 11, 0.5)}</g>
  <g>${snowLayer(Math.floor(flakeCount * 0.2), 2.6, 17, 0.85)}</g>
</svg>`;
}
