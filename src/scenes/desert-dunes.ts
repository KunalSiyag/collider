export interface DesertDunesOptions {
  skyTop?: string;
  skyBottom?: string;
  sunColor?: string;
  duneFar?: string;
  duneNear?: string;
  shimmer?: number;
}

export function createDesertDunes(options: DesertDunesOptions = {}): string {
  const {
    skyTop = '#b3410e',
    skyBottom = '#ffe9a8',
    sunColor = '#fff3d6',
    duneFar = '#e09a58',
    duneNear = '#6f2f0e',
    shimmer = 0.012,
  } = options;
  const sMin = (1 - shimmer).toFixed(4);
  const sMax = (1 + shimmer).toFixed(4);
  return `<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="ddn-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyTop}"/>
      <stop offset="0.55" stop-color="#f07422"/>
      <stop offset="1" stop-color="${skyBottom}"/>
    </linearGradient>
    <radialGradient id="ddn-sun-glow">
      <stop offset="0" stop-color="${sunColor}" stop-opacity="0.85"/>
      <stop offset="0.4" stop-color="${sunColor}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${sunColor}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ddn-d1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f4c98e"/>
      <stop offset="1" stop-color="${duneFar}"/>
    </linearGradient>
    <linearGradient id="ddn-d2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${duneFar}"/>
      <stop offset="1" stop-color="#bd6c2c"/>
    </linearGradient>
    <linearGradient id="ddn-d3" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#cd7c36"/>
      <stop offset="1" stop-color="#94481a"/>
    </linearGradient>
    <linearGradient id="ddn-d4" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#a4561e"/>
      <stop offset="1" stop-color="${duneNear}"/>
    </linearGradient>
    <filter id="ddn-haze" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
  </defs>
  <rect width="1440" height="720" fill="url(#ddn-sky)"/>
  <circle cx="720" cy="150" r="215" fill="url(#ddn-sun-glow)"/>
  <circle cx="720" cy="150" r="62" fill="${sunColor}" filter="url(#ddn-haze)"/>
  <g opacity="0.92">
    <animateTransform attributeName="transform" type="scale" values="1 ${sMin}; 1 ${sMax}; 1 ${sMin}" dur="11s" repeatCount="indefinite"/>
    <path d="M0 442 C200 408 420 452 660 424 C900 396 1120 446 1440 414 L1440 720 L0 720 Z" fill="url(#ddn-d1)"/>
    <path d="M0 442 C200 408 420 452 660 424 C900 396 1120 446 1440 414" fill="none" stroke="#ffdcae" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
  </g>
  <path d="M0 512 C260 478 520 532 800 502 C1060 476 1260 526 1440 498 L1440 720 L0 720 Z" fill="url(#ddn-d2)"/>
  <path d="M0 512 C260 478 520 532 800 502 C1060 476 1260 526 1440 498" fill="none" stroke="#ffd9a0" stroke-width="4" stroke-linecap="round" opacity="0.45"/>
  <path d="M0 592 C240 566 500 618 780 588 C1040 560 1250 612 1440 584 L1440 720 L0 720 Z" fill="url(#ddn-d3)"/>
  <path d="M0 592 C240 566 500 618 780 588 C1040 560 1250 612 1440 584" fill="none" stroke="#ffc98e" stroke-width="4" stroke-linecap="round" opacity="0.5"/>
  <path d="M0 672 C280 636 560 692 860 660 C1120 632 1300 686 1440 664 L1440 720 L0 720 Z" fill="url(#ddn-d4)"/>
  <path d="M0 672 C280 636 560 692 860 660 C1120 632 1300 686 1440 664" fill="none" stroke="#ffc188" stroke-width="5" stroke-linecap="round" opacity="0.55"/>
  <g fill="#3d1a08">
    <g transform="translate(300 602)">
      <rect x="-6" y="0" width="13" height="66" rx="6"/>
      <rect x="-24" y="18" width="10" height="30" rx="5"/>
      <rect x="-19" y="40" width="14" height="10" rx="4"/>
      <rect x="13" y="8" width="10" height="34" rx="5"/>
      <rect x="6" y="34" width="12" height="10" rx="4"/>
    </g>
    <g transform="translate(1146 610)">
      <rect x="-6" y="0" width="12" height="52" rx="6"/>
      <rect x="-22" y="14" width="9" height="24" rx="4.5"/>
      <rect x="-18" y="31" width="12" height="9" rx="4"/>
      <rect x="12" y="6" width="9" height="28" rx="4.5"/>
      <rect x="5" y="27" width="11" height="9" rx="4"/>
    </g>
  </g>
</svg>`;
}
