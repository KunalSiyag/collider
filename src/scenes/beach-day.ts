export interface BeachDayOptions {
  skyTop?: string;
  skyBottom?: string;
  seaColor?: string;
  sandColor?: string;
  palmTrunk?: string;
  frondColor?: string;
}

export function createBeachDay(options: BeachDayOptions = {}): string {
  const {
    skyTop = '#31b3f2',
    skyBottom = '#cdf1ff',
    seaColor = '#0aa2dd',
    sandColor = '#f6e3ae',
    palmTrunk = '#8a5a33',
    frondColor = '#1e8f4e',
  } = options;
  const foamPath = `M-120 0 q30 -7 60 0${' t60 0'.repeat(27)}`;
  return `<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="bch-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyTop}"/>
      <stop offset="0.6" stop-color="#7ccdf4"/>
      <stop offset="1" stop-color="${skyBottom}"/>
    </linearGradient>
    <linearGradient id="bch-sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#9adef2"/>
      <stop offset="1" stop-color="${seaColor}"/>
    </linearGradient>
    <linearGradient id="bch-sand" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#faecc4"/>
      <stop offset="1" stop-color="${sandColor}"/>
    </linearGradient>
    <linearGradient id="bch-trunk" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#9a6a3e"/>
      <stop offset="1" stop-color="${palmTrunk}"/>
    </linearGradient>
    <linearGradient id="bch-frond" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#33b06a"/>
      <stop offset="1" stop-color="${frondColor}"/>
    </linearGradient>
    <radialGradient id="bch-glow">
      <stop offset="0" stop-color="#fff8e1" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#fff8e1" stop-opacity="0"/>
    </radialGradient>
    <g id="bch-fronds">
      <path d="M0 0 C26 -20 62 -26 96 -12 C62 -16 30 -6 8 8 Z" fill="url(#bch-frond)"/>
      <path d="M0 0 C30 -4 66 8 88 34 C60 16 28 8 6 10 Z" fill="${frondColor}"/>
      <path d="M0 0 C-26 -20 -62 -26 -96 -12 C-62 -16 -30 -6 -8 8 Z" fill="url(#bch-frond)"/>
      <path d="M0 0 C-30 -4 -66 8 -88 34 C-60 16 -28 8 -6 10 Z" fill="${frondColor}"/>
      <path d="M0 0 C20 -12 52 -8 78 12 C50 2 22 4 4 8 Z" fill="url(#bch-frond)" opacity="0.9"/>
      <path d="M0 0 C-20 -12 -52 -8 -78 12 C-50 2 -22 4 -4 8 Z" fill="url(#bch-frond)" opacity="0.9"/>
      <path d="M0 0 C-6 -26 -2 -58 14 -82 C10 -52 8 -24 7 -2 Z" fill="${frondColor}"/>
      <circle cx="5" cy="5" r="5" fill="#5b3a1e"/>
      <circle cx="-6" cy="7" r="5" fill="#53341a"/>
    </g>
  </defs>
  <rect width="1440" height="720" fill="url(#bch-sky)"/>
  <circle cx="1160" cy="126" r="160" fill="url(#bch-glow)"/>
  <circle cx="1160" cy="126" r="44" fill="#fffdf2"/>
  <rect x="0" y="324" width="1440" height="300" fill="url(#bch-sea)"/>
  <rect x="0" y="323.5" width="1440" height="1.5" fill="#eaf9ff" opacity="0.6"/>
  <g transform="translate(452 344) scale(0.9)">
    <g>
      <animateTransform attributeName="transform" type="translate" values="0 0;0 2.8;0 0" dur="6s" repeatCount="indefinite"/>
      <path d="M-11 3 L11 3 L6 8 L-6 8 Z" fill="#8c3b16"/>
      <path d="M0 -18 L9 2 L0 2 Z" fill="#fbfdff"/>
      <path d="M-1 -14 L-9 2 L-1 2 Z" fill="#e2eef7"/>
    </g>
  </g>
  <g transform="translate(948 338) scale(0.62)">
    <g>
      <animateTransform attributeName="transform" type="translate" values="0 0;0 2.2;0 0" dur="7.5s" begin="-3s" repeatCount="indefinite"/>
      <path d="M-11 3 L11 3 L6 8 L-6 8 Z" fill="#8c3b16"/>
      <path d="M0 -18 L9 2 L0 2 Z" fill="#fbfdff"/>
      <path d="M-1 -14 L-9 2 L-1 2 Z" fill="#e2eef7"/>
    </g>
  </g>
  <g transform="translate(0 362)" opacity="0.55">
    <g>
      <animateTransform attributeName="transform" type="translate" values="-120 0;0 0" dur="11s" repeatCount="indefinite"/>
      <path d="${foamPath}" fill="none" stroke="#ffffff" stroke-width="2"/>
    </g>
  </g>
  <g transform="translate(0 402)" opacity="0.7">
    <g>
      <animateTransform attributeName="transform" type="translate" values="-120 0;0 0" dur="14s" begin="-4s" repeatCount="indefinite"/>
      <path d="${foamPath}" fill="none" stroke="#ffffff" stroke-width="2.6"/>
    </g>
  </g>
  <g transform="translate(0 452)" opacity="0.85">
    <g>
      <animateTransform attributeName="transform" type="translate" values="-120 0;0 0" dur="17s" begin="-9s" repeatCount="indefinite"/>
      <path d="${foamPath}" fill="none" stroke="#ffffff" stroke-width="3.2"/>
    </g>
  </g>
  <path d="M0 720 L0 612 Q700 508 1440 648 L1440 720 Z" fill="url(#bch-sand)"/>
  <path d="M0 612 Q700 508 1440 648 L1440 664 Q700 526 0 628 Z" fill="#dcbd82" opacity="0.55"/>
  <path d="M134 718 C136 650 150 586 196 538 L212 548 C174 594 160 654 160 718 Z" fill="url(#bch-trunk)"/>
  <path d="M1316 706 C1314 648 1300 594 1262 552 L1247 562 C1281 602 1294 652 1294 706 Z" fill="url(#bch-trunk)"/>
  <g transform="translate(204 543)">
    <g>
      <animateTransform attributeName="transform" type="rotate" values="-3;3;-3" dur="7s" repeatCount="indefinite"/>
      <use href="#bch-fronds"/>
    </g>
  </g>
  <g transform="translate(1254 557) scale(-0.9 0.9)">
    <g>
      <animateTransform attributeName="transform" type="rotate" values="2.5;-2.5;2.5" dur="8s" begin="-3.4s" repeatCount="indefinite"/>
      <use href="#bch-fronds"/>
    </g>
  </g>
</svg>`;
}
