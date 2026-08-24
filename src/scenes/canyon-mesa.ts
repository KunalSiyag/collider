/** Canyon Mesa — monument-valley mesas under a golden-hour sky. */
export interface CanyonMesaOptions {
  skyTop?: string;
  skyHorizon?: string;
  mesaFar?: string;
  mesaNear?: string;
  sandColor?: string;
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

export function createCanyonMesa(options: CanyonMesaOptions = {}): string {
  const {
    skyTop = '#f2b56b', skyHorizon = '#f8dfae',
    mesaFar = '#c47a4e', mesaNear = '#8e4a34', sandColor = '#e0a866', seed = 17,
  } = options;
  const rand = mulberry32(seed);

  /** Flat-topped mesa with stratified rock bands and talus slope. */
  const mesa = (x: number, baseY: number, w: number, h: number, tone: string) => {
    const capH = h * 0.12;
    return `<g>
      <path d="M${x} ${baseY} L${x + w * 0.06} ${baseY - h * 0.3} L${x + w * 0.1} ${baseY - h + capH}
               L${x + w * 0.9} ${baseY - h + capH} L${x + w * 0.94} ${baseY - h * 0.3} L${x + w} ${baseY} Z" fill="${tone}"/>
      <rect x="${x + w * 0.1}" y="${baseY - h}" width="${w * 0.8}" height="${capH}" fill="#a35a3c"/>
      <rect x="${x + w * 0.1}" y="${baseY - h}" width="${w * 0.8}" height="${capH * 0.35}" fill="#c98a5a"/>
      ${Array.from({ length: 3 }, (_, i) => {
        const by = baseY - h * 0.28 - i * h * 0.18;
        return `<path d="M${x + w * 0.08} ${by.toFixed(0)} L${x + w * 0.92} ${(by - 4).toFixed(0)}" stroke="#6e3a2a" stroke-width="${(2 + rand() * 2).toFixed(1)}" opacity="0.5"/>`;
      }).join('')}
      <path d="M${x + w * 0.55} ${baseY - h + capH} L${x + w * 0.6} ${baseY - h * 0.4} L${x + w * 0.66} ${baseY - h * 0.42} L${x + w * 0.68} ${baseY - h + capH} Z" fill="#6e3a2a" opacity="0.55"/>
    </g>`;
  };

  const cactus = (x: number, y: number, h: number) =>
    `<g transform="translate(${x} ${y})" fill="#3f6b3a">
      <rect x="-4" y="${-h}" width="9" height="${h}" rx="4.5"/>
      <rect x="${-16}" y="${-h * 0.72}" width="12" height="7" rx="3.5"/>
      <rect x="${-16}" y="${-h * 0.72 - 12}" width="7" height="14" rx="3.5"/>
      <rect x="7" y="${-h * 0.55}" width="12" height="7" rx="3.5"/>
      <rect x="12" y="${-h * 0.55 - 10}" width="7" height="12" rx="3.5"/>
    </g>`;

  return `<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="cm-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyTop}"/><stop offset="1" stop-color="${skyHorizon}"/>
    </linearGradient>
    <linearGradient id="cm-sand" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${sandColor}"/><stop offset="1" stop-color="#b97e42"/>
    </linearGradient>
    <radialGradient id="cm-sun" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#fff3d0" stop-opacity="0.95"/><stop offset="1" stop-color="#fff3d0" stop-opacity="0"/>
    </radialGradient>
    <filter id="cm-soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="6"/></filter>
  </defs>

  <rect width="1440" height="720" fill="url(#cm-sky)"/>
  <circle cx="1060" cy="240" r="230" fill="url(#cm-sun)">
    <animate attributeName="opacity" values="0.8;1;0.8" dur="9s" repeatCount="indefinite"/>
  </circle>
  <circle cx="1060" cy="240" r="46" fill="#fff3d0" filter="url(#cm-soft)"/>

  <!-- distant buttes in atmospheric haze -->
  ${mesa(60, 470, 200, 150, '#d9a071')}
  ${mesa(1180, 470, 190, 170, '#d9a071')}
  ${mesa(860, 466, 130, 110, '#e0b183')}

  <!-- mid mesas -->
  ${mesa(300, 500, 300, 240, mesaFar)}
  ${mesa(950, 505, 260, 210, mesaFar)}

  <!-- hero mesa, left-anchored -->
  ${mesa(-60, 540, 420, 330, mesaNear)}

  <!-- sandy floor with ripple lines -->
  <path d="M0 540 C280 516 560 548 860 532 C1120 520 1300 540 1440 528 L1440 720 L0 720 Z" fill="url(#cm-sand)"/>
  <g stroke="#c98f52" stroke-width="2" opacity="0.5" fill="none">
    <path d="M100 600 C300 588 520 606 740 596"/>
    <path d="M240 650 C460 638 700 656 940 644"/>
    <path d="M520 692 C760 680 1020 698 1260 686"/>
  </g>

  ${cactus(760, 560, 52)}
  ${cactus(1180, 580, 64)}
  ${cactus(620, 640, 44)}

  <!-- ravens circling -->
  <g stroke="#3a2a24" stroke-width="2.2" fill="none" stroke-linecap="round">
    <g transform="translate(500 160)"><animateTransform attributeName="transform" type="translate" values="500 160;580 146;660 160" dur="26s" repeatCount="indefinite"/><path d="M-8 0 Q -4 -5 0 0 Q 4 -5 8 0"/></g>
    <g transform="translate(560 190)"><animateTransform attributeName="transform" type="translate" values="560 190;630 178;700 190" dur="32s" begin="-8s" repeatCount="indefinite"/><path d="M-6 0 Q -3 -4 0 0 Q 3 -4 6 0"/></g>
  </g>
</svg>`;
}
