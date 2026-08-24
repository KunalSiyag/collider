/** Iso Ferry Dock — isometric ferry moored at a wooden dock with passengers. */
export interface IsoFerryDockOptions {
  hullColor?: string;
  waterColor?: string;
  dockColor?: string;
}

const ISO = 'rotate(-30) skewX(30)';

export function createIsoFerryDock(options: IsoFerryDockOptions = {}): string {
  const { hullColor = '#3f7fbf', waterColor = '#2a6a9e', dockColor = '#a8794e' } = options;

  /** Iso tile helper: a diamond "floor" at (x,y) with size s. */
  const tile = (x: number, y: number, s: number, tone: string) =>
    `<rect x="${x - s}" y="${y - s / 2}" width="${s * 2}" height="${s}" fill="${tone}" transform="${ISO}"/>`;

  let dock = '';
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      dock += tile(560 + i * 52 - j * 30, 470 + i * 30 + j * 52, 26, j % 2 ? dockColor : '#97693f');
    }
  }

  const ferry = `
    <g>
      <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="5s" repeatCount="indefinite"/>
      <path d="M300 420 L560 420 L530 470 L330 470 Z" fill="${hullColor}"/>
      <path d="M300 420 L560 420 L552 434 L308 434 Z" fill="#5f9fdf"/>
      <rect x="340" y="380" width="180" height="40" fill="#e8eef4"/>
      <rect x="340" y="380" width="180" height="8" fill="#c9d6e2"/>
      ${[0, 1, 2, 3, 4].map((i) => `<rect x="${356 + i * 32}" y="394" width="16" height="12" fill="#7fb2d9"/>`).join('')}
      <rect x="400" y="352" width="60" height="28" fill="#f2f6fa"/>
      <rect x="418" y="330" width="14" height="22" fill="#c9414b"/>
      <ellipse cx="425" cy="326" rx="10" ry="5" fill="#e8eef4" opacity="0.7">
        <animate attributeName="opacity" values="0.2;0.7;0.2" dur="4s" repeatCount="indefinite"/>
      </ellipse>
      <rect x="330" y="466" width="200" height="8" fill="#1d4a73"/>
    </g>`;

  const passenger = (x: number, y: number, tone: string) =>
    `<g transform="translate(${x} ${y})">
      <circle cy="-16" r="5" fill="#e8b88a"/>
      <rect x="-4" y="-11" width="8" height="14" rx="3" fill="${tone}"/>
      <animateTransform attributeName="transform" type="translate" values="${x} ${y};${x} ${y - 2};${x} ${y}" dur="${(2 + Math.random() * 2).toFixed(1)}s" repeatCount="indefinite"/>
    </g>`;

  return `<svg viewBox="0 0 1440 720" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="1440" height="720" fill="#dfeef7"/>
  <rect y="430" width="1440" height="290" fill="${waterColor}"/>
  <g stroke="#5f9fdf" stroke-width="2" opacity="0.5">
    <path d="M80 520 h90 M240 570 h110 M1050 540 h100 M1200 600 h90">
      <animate attributeName="opacity" values="0.2;0.7;0.2" dur="4s" repeatCount="indefinite"/>
    </path>
  </g>

  ${ferry}
  ${dock}

  <!-- mooring posts -->
  <g fill="#6f4e30">
    <rect x="548" y="452" width="12" height="26" rx="3"/>
    <rect x="760" y="530" width="12" height="26" rx="3"/>
  </g>
  <path d="M560 460 Q 640 500 766 540" stroke="#3a3a3a" stroke-width="3" fill="none" opacity="0.7"/>

  ${passenger(620, 470, '#c9414b')}
  ${passenger(680, 500, '#3f7fbf')}
  ${passenger(730, 545, '#4a9e5c')}
</svg>`;
}
