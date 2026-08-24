export interface CountrysideNightOptions {
  nightTop?: string;
  nightBottom?: string;
  starCount?: number;
  windowGlow?: string;
  hillFar?: string;
  hillNear?: string;
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

export function createCountrysideNight(options: CountrysideNightOptions = {}): string {
  const {
    nightTop = '#0a1030',
    nightBottom = '#2c3d6b',
    starCount = 70,
    windowGlow = '#ffcf7d',
    hillFar = '#1a2450',
    hillNear = '#0b1130',
  } = options;
  const rand = mulberry32(424243);
  const stars = Array.from({ length: starCount }, () => {
    const cx = (rand() * 1440).toFixed(1);
    const cy = (rand() * 500).toFixed(1);
    const r = (0.4 + rand() * 0.9).toFixed(2);
    const dur = (2.2 + rand() * 3.2).toFixed(1);
    const begin = (-rand() * 5).toFixed(1);
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#e6edff"><animate attributeName="opacity" values="0.15;0.95;0.15" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/></circle>`;
  }).join('');
  const rand2 = mulberry32(909);
  const fence = Array.from({ length: 10 }, (_, i) => {
    const px = (70 + i * 86).toFixed(0);
    const py = (646 - i * 4.2 + (rand2() * 2 - 1)).toFixed(1);
    return `<rect x="${px}" y="${py}" width="6" height="26" fill="#0a0f26"/>`;
  }).join('');
  return `<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="cnn-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${nightTop}"/>
      <stop offset="0.7" stop-color="#1a2552"/>
      <stop offset="1" stop-color="${nightBottom}"/>
    </linearGradient>
    <linearGradient id="cnn-band" x1="0" y1="1" x2="0.9" y2="0.1">
      <stop offset="0" stop-color="#e6ecff" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#eef2ff" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#e6ecff" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="cnn-win">
      <stop offset="0" stop-color="${windowGlow}"/>
      <stop offset="0.6" stop-color="${windowGlow}" stop-opacity="0.8"/>
      <stop offset="1" stop-color="${windowGlow}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cnn-hill-far" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#27336b"/>
      <stop offset="1" stop-color="${hillFar}"/>
    </linearGradient>
    <linearGradient id="cnn-hill-near" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#151d44"/>
      <stop offset="1" stop-color="${hillNear}"/>
    </linearGradient>
    <filter id="cnn-blur-lg" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="24"/>
    </filter>
    <filter id="cnn-blur-sm" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="2.5"/>
    </filter>
  </defs>
  <rect width="1440" height="720" fill="url(#cnn-sky)"/>
  <path d="M-60 640 C320 500 640 320 920 40 L1120 40 C820 340 520 540 160 690 Z" fill="url(#cnn-band)" opacity="0.35" filter="url(#cnn-blur-lg)"/>
  <path d="M-40 600 C320 470 640 300 900 60 L990 60 C700 330 420 520 120 660 Z" fill="url(#cnn-band)" opacity="0.6" filter="url(#cnn-blur-lg)"/>
  ${stars}
  <g opacity="0">
    <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.02;0.055;0.1;1" dur="9s" repeatCount="indefinite"/>
    <animateMotion path="M170 84 L660 330" keyPoints="0;1;1" keyTimes="0;0.09;1" calcMode="linear" dur="9s" repeatCount="indefinite" rotate="auto"/>
    <polygon points="30,0 -52,2.6 -52,-2.6" fill="#e9f3ff"/>
    <circle cx="30" cy="0" r="2.4" fill="#ffffff"/>
  </g>
  <path d="M0 522 C220 492 430 542 660 514 C890 488 1090 544 1310 510 C1358 503 1402 507 1440 500 L1440 720 L0 720 Z" fill="url(#cnn-hill-far)"/>
  <path d="M0 614 C260 586 520 638 820 606 C1080 580 1270 632 1440 602 L1440 720 L0 720 Z" fill="url(#cnn-hill-near)"/>
  <path d="M70 626 L843 588" stroke="#0a0f26" stroke-width="3.5"/>
  <path d="M70 638 L843 600" stroke="#0a0f26" stroke-width="3.5"/>
  ${fence}
  <g>
    <rect x="1006" y="546" width="92" height="68" fill="#231740"/>
    <polygon points="996,548 1052,512 1108,548" fill="#161029"/>
    <rect x="1076" y="516" width="13" height="24" fill="#161029"/>
    <rect x="1043" y="588" width="15" height="26" fill="#100b22"/>
    <rect x="1020" y="564" width="15" height="17" fill="url(#cnn-win)">
      <animate attributeName="opacity" values="0.7;1;0.7" dur="6s" begin="-1s" repeatCount="indefinite"/>
    </rect>
    <rect x="1068" y="564" width="15" height="17" fill="url(#cnn-win)">
      <animate attributeName="opacity" values="0.7;1;0.7" dur="6s" begin="-3.4s" repeatCount="indefinite"/>
    </rect>
  </g>
  <g filter="url(#cnn-blur-sm)">
    <circle cx="1082" cy="514" r="4" fill="#a9b6da" opacity="0">
      <animateMotion path="M0 0 C8 -16 -8 -34 3 -58" dur="8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;10" dur="8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0.45;0" keyTimes="0;0.3;1" dur="8s" begin="0s" repeatCount="indefinite"/>
    </circle>
    <circle cx="1082" cy="514" r="4" fill="#a9b6da" opacity="0">
      <animateMotion path="M0 0 C8 -16 -8 -34 3 -58" dur="8s" begin="-2.7s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;10" dur="8s" begin="-2.7s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0.45;0" keyTimes="0;0.3;1" dur="8s" begin="-2.7s" repeatCount="indefinite"/>
    </circle>
    <circle cx="1082" cy="514" r="4" fill="#a9b6da" opacity="0">
      <animateMotion path="M0 0 C8 -16 -8 -34 3 -58" dur="8s" begin="-5.4s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;10" dur="8s" begin="-5.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0.45;0" keyTimes="0;0.3;1" dur="8s" begin="-5.4s" repeatCount="indefinite"/>
    </circle>
  </g>
</svg>`;
}
