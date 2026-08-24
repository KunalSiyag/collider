/** Iso Attic Room — cozy attic hideout with a skylight beam and reading nook. */
export interface IsoAtticRoomOptions {
  wallColor?: string;
  floorColor?: string;
  beamColor?: string;
}

const ISO = 'rotate(-30) skewX(30)';

export function createIsoAtticRoom(options: IsoAtticRoomOptions = {}): string {
  const { wallColor = '#8a6f5a', floorColor = '#b98d5e', beamColor = '#5d4630' } = options;

  const rug = `<ellipse cx="720" cy="520" rx="150" ry="75" fill="#c9414b" opacity="0.9" transform="${ISO}"/>
    <ellipse cx="720" cy="520" rx="110" ry="55" fill="none" stroke="#e8d8c0" stroke-width="4" transform="${ISO}"/>`;

  const armchair = `
    <g transform="translate(600 430)">
      <animateTransform attributeName="transform" type="translate" values="600 430;600 426;600 430" dur="6s" repeatCount="indefinite"/>
      <rect x="0" y="0" width="70" height="46" fill="#4a6b8a" transform="${ISO}"/>
      <rect x="0" y="-26" width="70" height="26" fill="#5f85a8" transform="${ISO}"/>
      <rect x="-12" y="-20" width="14" height="60" fill="#4a6b8a"/>
      <rect x="68" y="-20" width="14" height="60" fill="#4a6b8a"/>
    </g>`;

  const lamp = `
    <g transform="translate(850 470)">
      <rect x="-4" y="-46" width="8" height="46" fill="${beamColor}"/>
      <path d="M-20 -46 L20 -46 L12 -70 L-12 -70 Z" fill="#f2c14e"/>
      <ellipse cy="-40" rx="42" ry="20" fill="#f2c14e" opacity="0.18">
        <animate attributeName="opacity" values="0.1;0.26;0.1" dur="5s" repeatCount="indefinite"/>
      </ellipse>
    </g>`;

  const bookStack = (x: number, y: number, books: string[]) =>
    books
      .map(
        (tone, i) =>
          `<rect x="${x + i * 2}" y="${y - i * 9}" width="${46 - i * 4}" height="9" fill="${tone}" transform="${ISO}"/>`,
      )
      .join('');

  return `<svg viewBox="0 0 1440 720" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="ia-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#bfe3f2"/><stop offset="1" stop-color="#f2ead8"/>
    </linearGradient>
  </defs>
  <rect width="1440" height="720" fill="url(#ia-sky)"/>

  <!-- attic walls: sloped left + back -->
  <path d="M0 720 L0 200 L520 60 L520 720 Z" fill="${wallColor}"/>
  <path d="M0 200 L520 60 L520 120 L0 260 Z" fill="#6f5847"/>
  <rect x="520" y="60" width="920" height="660" fill="#9a7d64"/>
  <path d="M520 60 L1440 60 L1440 130 L520 130 Z" fill="#7d6350"/>

  <!-- floor -->
  <path d="M0 720 L520 560 L1440 720 Z" fill="${floorColor}"/>
  <g stroke="#a3794e" stroke-width="2" opacity="0.6">
    <path d="M120 690 L560 560 M300 706 L700 590 M520 720 L860 620 M760 730 L1020 652 M1010 736 L1180 684"/>
  </g>

  <!-- skylight + dust beam -->
  <rect x="820" y="130" width="220" height="120" fill="#e8f4fa" stroke="${beamColor}" stroke-width="8" transform="skewX(-8)"/>
  <path d="M830 250 L1040 250 L1240 720 L760 720 Z" fill="#fff6dc" opacity="0.22">
    <animate attributeName="opacity" values="0.14;0.3;0.14" dur="8s" repeatCount="indefinite"/>
  </path>
  ${Array.from({ length: 10 }, (_, i) => `<circle cx="${880 + i * 34}" cy="${300 + i * 34}" r="2.4" fill="#fff6dc" opacity="0.7"><animate attributeName="opacity" values="0.2;0.8;0.2" dur="${(3 + i * 0.4).toFixed(1)}s" repeatCount="indefinite"/></circle>`).join('')}

  ${rug}
  ${armchair}

  <!-- side table + book stack + mug -->
  <rect x="760" y="470" width="90" height="14" fill="${beamColor}" transform="${ISO}"/>
  <rect x="770" y="482" width="10" height="34" fill="#6f5236"/>
  <rect x="828" y="482" width="10" height="34" fill="#6f5236"/>
  ${bookStack(782, 468, ['#c9414b', '#3f7fbf', '#4a9e5c'])}

  ${lamp}

  <!-- plant in the corner -->
  <g transform="translate(1330 600)">
    <path d="M-16 0 h32 l-5 34 h-22 z" fill="#b8654a"/>
    <g fill="#4a7a3f">
      <path d="M0 0 C -4 -30 -22 -40 -30 -44 C -14 -46 -2 -34 0 -22 C 2 -38 12 -48 28 -50 C 14 -42 4 -28 0 0 Z">
        <animateTransform attributeName="transform" type="rotate" values="0;2.4;0;-2.4;0" dur="7s" repeatCount="indefinite"/>
      </path>
    </g>
  </g>

  <!-- string lights along the beam -->
  <path d="M540 140 Q 720 190 900 150 T 1420 160" stroke="#5d4630" stroke-width="2" fill="none"/>
  ${Array.from({ length: 9 }, (_, i) => {
    const x = 580 + i * 100;
    const y = 152 + Math.sin(i * 1.2) * 18;
    return `<circle cx="${x}" cy="${y}" r="5" fill="#ffd98a">
      <animate attributeName="opacity" values="0.4;1;0.4" dur="${(2 + (i % 4) * 0.7).toFixed(1)}s" begin="${(-i * 0.5).toFixed(1)}s" repeatCount="indefinite"/>
    </circle>`;
  }).join('')}
</svg>`;
}
