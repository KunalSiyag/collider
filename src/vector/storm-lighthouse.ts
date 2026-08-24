/** Storm Lighthouse — a lighthouse holding against crashing waves at night. */
export interface StormLighthouseOptions {
  skyTop?: string;
  skyHorizon?: string;
  towerColor?: string;
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

export function createStormLighthouse(options: StormLighthouseOptions = {}): string {
  const {
    skyTop = '#0c1226', skyHorizon = '#28405e',
    towerColor = '#e8e2d4', lampColor = '#ffe9a8', seed = 3,
  } = options;
  const rand = mulberry32(seed);

  const rain = Array.from({ length: 60 }, () => {
    const x = rand() * 1500 - 30;
    const dur = (0.7 + rand() * 0.5).toFixed(2);
    const begin = (-rand()).toFixed(2);
    return `<line x1="${x.toFixed(0)}" y1="-20" x2="${(x - 10).toFixed(0)}" y2="26" stroke="#9db8d8" stroke-width="1.4" opacity="0.4">
      <animateTransform attributeName="transform" type="translate" values="0 0;-60 760" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
    </line>`;
  }).join('');

  const wave = (y: number, tone: string, dur: number, begin: number, amp: number) =>
    `<path d="M-80 ${y} Q 100 ${y - amp} 300 ${y} T 700 ${y} T 1100 ${y} T 1500 ${y}" fill="none" stroke="${tone}" stroke-width="5" stroke-linecap="round">
      <animateTransform attributeName="transform" type="translate" values="-140 0;140 0;-140 0" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
    </path>`;

  return `<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="sl-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyTop}"/><stop offset="1" stop-color="${skyHorizon}"/>
    </linearGradient>
    <linearGradient id="sl-sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#16324e"/><stop offset="1" stop-color="#081a2c"/>
    </linearGradient>
    <filter id="sl-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="9"/></filter>
  </defs>

  <rect width="1440" height="720" fill="url(#sl-sky)"/>

  <!-- storm clouds -->
  <g fill="#1a2338" opacity="0.95">
    <animateTransform attributeName="transform" type="translate" values="-60 0;60 0;-60 0" dur="40s" repeatCount="indefinite"/>
    <ellipse cx="260" cy="110" rx="320" ry="58"/><ellipse cx="700" cy="90" rx="360" ry="64"/>
    <ellipse cx="1140" cy="120" rx="330" ry="56"/>
  </g>

  <!-- lighthouse on its rock -->
  <g transform="translate(720 470)">
    <path d="M-90 30 C -60 -6 60 -6 96 26 L 80 44 L -80 44 Z" fill="#1c2836"/>
    <path d="M-26 24 L-16 -96 L16 -96 L26 24 Z" fill="${towerColor}"/>
    <rect x="-19" y="-72" width="38" height="14" fill="#c9414b"/>
    <rect x="-18" y="-42" width="36" height="13" fill="#c9414b"/>
    <rect x="-14" y="-116" width="28" height="20" fill="#37304e"/>
    <g>
      <circle cy="-106" r="8" fill="${lampColor}"/>
      <animate attributeName="opacity" values="1;0.35;1" dur="3.4s" repeatCount="indefinite"/>
    </g>
    <path d="M0 -106 L-380 -170 L-380 -40 Z" fill="${lampColor}" opacity="0.12">
      <animate attributeName="opacity" values="0.04;0.18;0.04" dur="6.8s" repeatCount="indefinite"/>
    </path>
    <path d="M0 -106 L380 -170 L380 -40 Z" fill="${lampColor}" opacity="0.12">
      <animate attributeName="opacity" values="0.18;0.04;0.18" dur="6.8s" repeatCount="indefinite"/>
    </path>
    <path d="M-30 -96 L0 -128 L30 -96 Z" fill="#2b2438"/>
  </g>

  <rect y="470" width="1440" height="250" fill="url(#sl-sea)"/>

  <!-- crashing waves -->
  ${wave(500, '#3f6b8f', 7, -2, 16)}
  ${wave(540, '#2c5170', 6, -4, 20)}
  ${wave(590, '#1d3c58', 5.4, -1, 24)}
  <g fill="#cfe8f4" opacity="0.7">
    <circle cx="300" cy="560" r="4"><animate attributeName="cy" values="560;540;560" dur="3s" repeatCount="indefinite"/></circle>
    <circle cx="1100" cy="580" r="5"><animate attributeName="cy" values="580;556;580" dur="3.6s" begin="-1s" repeatCount="indefinite"/></circle>
    <circle cx="520" cy="610" r="4"><animate attributeName="cy" values="610;588;610" dur="3.2s" begin="-2s" repeatCount="indefinite"/></circle>
  </g>

  ${rain}
</svg>`;
}
