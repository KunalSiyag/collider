/** Coral Reef — underwater scene with light shafts, fish schools and bubbles. */
export interface CoralReefOptions {
  waterTop?: string;
  waterDeep?: string;
  coralWarm?: string;
  fishA?: string;
  fishB?: string;
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

export function createCoralReef(options: CoralReefOptions = {}): string {
  const {
    waterTop = '#2aa4c9', waterDeep = '#063a5c',
    coralWarm = '#ff7f66', fishA = '#ffb347', fishB = '#5fd0e8', seed = 9,
  } = options;
  const rand = mulberry32(seed);

  const fish = (x: number, y: number, s: number, tone: string, dur: number, begin: number, flip: boolean) =>
    `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
      <animateTransform attributeName="transform" type="translate" values="${x} ${y};${x + (flip ? -160 : 160)} ${y - 14};${x + (flip ? -320 : 320)} ${y}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
      <path d="M-14 0 C -6 -8 8 -8 14 0 C 8 8 -6 8 -14 0 Z" fill="${tone}"/>
      <path d="M-14 0 L-22 -7 L-22 7 Z" fill="${tone}" opacity="0.85"/>
      <circle cx="8" cy="-1.5" r="1.6" fill="#0b2a3a"/>
    </g>`;

  const coralFan = (x: number, y: number, s: number, tone: string) => {
    let arms = '';
    for (let i = -3; i <= 3; i++) {
      const a = i * 14 + rand() * 6;
      const len = (34 + rand() * 22) * s;
      arms += `<path d="M0 0 Q ${(Math.sin((a * Math.PI) / 180) * len * 0.5).toFixed(1)} ${(-len * 0.6).toFixed(1)} ${(Math.sin((a * Math.PI) / 180) * len).toFixed(1)} ${(-len).toFixed(1)}" stroke="${tone}" stroke-width="${(3.4 * s).toFixed(1)}" fill="none" stroke-linecap="round"/>`;
    }
    return `<g transform="translate(${x} ${y})">${arms}</g>`;
  };

  const bubbles = Array.from({ length: 26 }, () => {
    const x = rand() * 1440;
    const dur = (6 + rand() * 8).toFixed(1);
    const begin = (-rand() * 12).toFixed(1);
    const r = (2 + rand() * 4).toFixed(1);
    return `<circle cx="${x.toFixed(0)}" cy="730" r="${r}" fill="#cfeffb" opacity="0.55">
      <animateTransform attributeName="transform" type="translate" values="0 0;${(rand() * 40 - 20).toFixed(0)} -380;0 -760" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
    </circle>`;
  }).join('');

  return `<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="cr-water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${waterTop}"/><stop offset="1" stop-color="${waterDeep}"/>
    </linearGradient>
    <linearGradient id="cr-ray" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#bfeaff" stop-opacity="0.5"/><stop offset="1" stop-color="#bfeaff" stop-opacity="0"/>
    </linearGradient>
    <filter id="cr-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="8"/></filter>
  </defs>
  <rect width="1440" height="720" fill="url(#cr-water)"/>

  <g filter="url(#cr-blur)">
    <path d="M300 0 L380 0 L520 720 L360 720 Z" fill="url(#cr-ray)"><animate attributeName="opacity" values="0.5;0.9;0.5" dur="9s" repeatCount="indefinite"/></path>
    <path d="M700 0 L760 0 L920 720 L780 720 Z" fill="url(#cr-ray)"><animate attributeName="opacity" values="0.4;0.8;0.4" dur="11s" begin="-4s" repeatCount="indefinite"/></path>
    <path d="M1080 0 L1150 0 L1320 720 L1170 720 Z" fill="url(#cr-ray)"><animate attributeName="opacity" values="0.45;0.85;0.45" dur="10s" begin="-7s" repeatCount="indefinite"/></path>
  </g>

  <path d="M0 600 C240 570 480 620 760 596 C1020 574 1240 614 1440 592 L1440 720 L0 720 Z" fill="#0a2e46"/>
  <path d="M0 640 C300 616 620 654 940 636 C1160 624 1320 646 1440 634 L1440 720 L0 720 Z" fill="#07223a"/>

  ${coralFan(160, 640, 1.2, coralWarm)}
  ${coralFan(340, 660, 0.9, '#c96fb6')}
  ${coralFan(1120, 650, 1.3, coralWarm)}
  ${coralFan(1330, 668, 1, '#7fd08a')}
  <g fill="#e8b04b">
    <path d="M560 660 q10 -34 22 0 z M600 668 q10 -28 20 0 z M980 664 q10 -30 20 0 z"/>
  </g>

  ${fish(180, 220, 1.1, fishA, 22, -4, false)}
  ${fish(240, 260, 0.8, fishB, 26, -12, false)}
  ${fish(1300, 190, 1, fishB, 24, -8, true)}
  ${fish(1240, 300, 0.7, fishA, 28, -18, true)}
  ${fish(700, 150, 0.9, fishA, 30, -2, false)}
  ${fish(760, 340, 1.2, fishB, 25, -20, true)}

  ${bubbles}
</svg>`;
}
