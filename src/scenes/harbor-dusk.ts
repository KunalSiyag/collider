/** Harbor Dusk — fishing boats and a lighthouse under a fading sky. */
export interface HarborDuskOptions {
  skyTop?: string;
  skyHorizon?: string;
  seaColor?: string;
  boatHull?: string;
  lampColor?: string;
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

export function createHarborDusk(options: HarborDuskOptions = {}): string {
  const {
    skyTop = '#2b2a4e', skyHorizon = '#f2a35c',
    seaColor = '#1d3a52', boatHull = '#35506b', lampColor = '#ffd98a', seed = 14,
  } = options;
  const rand = mulberry32(seed);

  const boat = (x: number, y: number, s: number, tone: string, dur: number, begin: number) =>
    `<g transform="translate(${x} ${y}) scale(${s})">
      <animateTransform attributeName="transform" type="rotate" values="-2.2;2.2;-2.2" dur="${dur}s" begin="${begin}s" repeatCount="indefinite" additive="sum"/>
      <path d="M-46 0 L46 0 L34 14 L-34 14 Z" fill="${tone}"/>
      <rect x="-20" y="-14" width="30" height="14" fill="#e8e0d0"/>
      <rect x="-14" y="-22" width="16" height="8" fill="${tone}"/>
      <rect x="18" y="-26" width="3" height="26" fill="#8a7a5e"/>
      <circle cx="19.5" cy="-28" r="3" fill="${lampColor}">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
      </circle>
    </g>`;

  const gull = (x: number, y: number, s: number, dur: number, begin: number) =>
    `<g transform="translate(${x} ${y}) scale(${s})" stroke="#2b2438" stroke-width="2" fill="none" stroke-linecap="round">
      <animateTransform attributeName="transform" type="translate" values="${x} ${y};${x + 70} ${y - 10};${x + 140} ${y}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
      <path d="M-8 0 Q -4 -5 0 0 Q 4 -5 8 0">
        <animate attributeName="d" values="M-8 0 Q -4 -5 0 0 Q 4 -5 8 0;M-8 -2 Q -4 3 0 -1 Q 4 3 8 -2;M-8 0 Q -4 -5 0 0 Q 4 -5 8 0" dur="0.8s" repeatCount="indefinite"/>
      </path>
    </g>`;

  const windowLights = Array.from({ length: 12 }, () => {
    const x = 40 + rand() * 1360;
    const y = 300 + rand() * 130;
    const w = 3 + rand() * 3;
    return `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(1)}" height="${(w * 1.3).toFixed(1)}" fill="${lampColor}" opacity="0.85">
      <animate attributeName="opacity" values="0.4;0.95;0.4" dur="${(3 + rand() * 4).toFixed(1)}s" begin="${(-rand() * 5).toFixed(1)}s" repeatCount="indefinite"/>
    </rect>`;
  }).join('');

  return `<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="hd-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyTop}"/><stop offset="0.65" stop-color="#7a4e63"/><stop offset="1" stop-color="${skyHorizon}"/>
    </linearGradient>
    <linearGradient id="hd-sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyHorizon}" stop-opacity="0.55"/><stop offset="0.25" stop-color="${seaColor}"/><stop offset="1" stop-color="#0d2233"/>
    </linearGradient>
    <filter id="hd-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7"/></filter>
  </defs>

  <rect width="1440" height="720" fill="url(#hd-sky)"/>

  <!-- setting sun sliver + glow -->
  <circle cx="980" cy="352" r="90" fill="#ffce8a" opacity="0.55" filter="url(#hd-blur)"/>
  <circle cx="980" cy="352" r="34" fill="#ffe4b0"/>

  <!-- far shore with lit windows -->
  <path d="M0 430 L120 400 L260 424 L420 396 L600 428 L780 402 L960 430 L1140 404 L1300 428 L1440 408 L1440 460 L0 460 Z" fill="#241f38"/>
  ${windowLights}

  <rect y="440" width="1440" height="280" fill="url(#hd-sea)"/>

  <!-- lighthouse with sweeping beam -->
  <g transform="translate(240 442)">
    <path d="M-14 0 L-9 -86 L9 -86 L14 0 Z" fill="#c9414b"/>
    <rect x="-11" y="-64" width="22" height="12" fill="#f2ead8"/>
    <rect x="-11" y="-38" width="22" height="12" fill="#f2ead8"/>
    <rect x="-10" y="-98" width="20" height="12" fill="#37304e"/>
    <circle cy="-92" r="5" fill="${lampColor}">
      <animate attributeName="opacity" values="1;0.4;1" dur="4s" repeatCount="indefinite"/>
    </circle>
    <path d="M0 -92 L340 -150 L340 -60 Z" fill="${lampColor}" opacity="0.14">
      <animate attributeName="opacity" values="0.05;0.2;0.05" dur="8s" repeatCount="indefinite"/>
    </path>
  </g>

  ${boat(560, 520, 1.1, boatHull, 6, -1)}
  ${boat(860, 560, 0.85, '#4a3550', 7, -3)}
  ${boat(1180, 540, 1, '#2f4a3e', 6.5, -5)}
  ${boat(320, 590, 1.25, boatHull, 5.5, -2)}

  <!-- moonlit ripple streaks -->
  <g stroke="#ffd9a0" stroke-linecap="round">
    <path d="M900 480 H1040" stroke-width="2" opacity="0.4"><animate attributeName="opacity" values="0.15;0.5;0.15" dur="5s" repeatCount="indefinite"/></path>
    <path d="M940 520 H1100" stroke-width="2.5" opacity="0.3"><animate attributeName="opacity" values="0.1;0.4;0.1" dur="6s" begin="-2s" repeatCount="indefinite"/></path>
    <path d="M860 570 H1010" stroke-width="3" opacity="0.25"><animate attributeName="opacity" values="0.1;0.35;0.1" dur="7s" begin="-4s" repeatCount="indefinite"/></path>
  </g>

  ${gull(620, 180, 1, 30, -4)}
  ${gull(700, 160, 0.75, 36, -14)}
  ${gull(560, 210, 0.6, 40, -24)}

  <!-- pier in the foreground -->
  <g>
    <rect x="0" y="640" width="440" height="14" fill="#4a3a2c"/>
    <rect x="40" y="654" width="10" height="66" fill="#3a2d22"/>
    <rect x="180" y="654" width="10" height="66" fill="#3a2d22"/>
    <rect x="330" y="654" width="10" height="66" fill="#3a2d22"/>
    <rect x="360" y="612" width="5" height="30" fill="#4a3a2c"/>
    <circle cx="362" cy="608" r="5" fill="${lampColor}"><animate attributeName="opacity" values="0.6;1;0.6" dur="3.4s" repeatCount="indefinite"/></circle>
    <ellipse cx="362" cy="608" rx="26" ry="16" fill="${lampColor}" opacity="0.15"/>
  </g>
</svg>`;
}
