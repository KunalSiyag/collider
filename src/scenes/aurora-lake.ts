export interface AuroraLakeOptions {
  starCount?: number;
  auroraGreen?: string;
  auroraTeal?: string;
  auroraViolet?: string;
  mountainColor?: string;
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

export function createAuroraLake(options: AuroraLakeOptions = {}): string {
  const {
    starCount = 90,
    auroraGreen = '#4ade80',
    auroraTeal = '#2dd4bf',
    auroraViolet = '#8b5cf6',
    mountainColor = '#0d1526',
  } = options;
  const rand = mulberry32(20260823);
  const stars = Array.from({ length: starCount }, () => {
    const cx = (rand() * 1440).toFixed(1);
    const cy = (rand() * 430).toFixed(1);
    const r = (0.5 + rand() * 1.1).toFixed(2);
    const dur = (2.4 + rand() * 3.6).toFixed(1);
    const begin = (-rand() * 6).toFixed(1);
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#dce8ff"><animate attributeName="opacity" values="0.15;0.9;0.15" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/></circle>`;
  }).join('');
  return `<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="alk-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#010309"/>
      <stop offset="1" stop-color="#08131f"/>
    </linearGradient>
    <linearGradient id="alk-water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0a1c2c"/>
      <stop offset="1" stop-color="#01050b"/>
    </linearGradient>
    <linearGradient id="alk-c1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${auroraGreen}" stop-opacity="0"/>
      <stop offset="0.7" stop-color="${auroraGreen}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${auroraGreen}" stop-opacity="0.85"/>
    </linearGradient>
    <linearGradient id="alk-c2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${auroraTeal}" stop-opacity="0"/>
      <stop offset="0.7" stop-color="${auroraTeal}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${auroraTeal}" stop-opacity="0.85"/>
    </linearGradient>
    <linearGradient id="alk-c3" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${auroraViolet}" stop-opacity="0"/>
      <stop offset="0.7" stop-color="${auroraViolet}" stop-opacity="0.3"/>
      <stop offset="1" stop-color="${auroraViolet}" stop-opacity="0.75"/>
    </linearGradient>
    <filter id="alk-blur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="16"/>
    </filter>
    <filter id="alk-blur-soft" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="10"/>
    </filter>
    <clipPath id="alk-lake">
      <rect x="0" y="460" width="1440" height="260"/>
    </clipPath>
  </defs>
  <rect width="1440" height="720" fill="url(#alk-sky)"/>
  ${stars}
  <g filter="url(#alk-blur)">
    <path d="M235 64 C196 168 300 258 252 404 L352 404 C312 252 402 158 348 64 Z" fill="url(#alk-c1)">
      <animateTransform attributeName="transform" type="skewX" values="0;-3.5;0;2.5;0" dur="16s" begin="-2s" repeatCount="indefinite"/>
    </path>
    <path d="M672 40 C640 160 736 268 690 406 L800 406 C756 262 846 154 792 40 Z" fill="url(#alk-c2)" opacity="0.9">
      <animateTransform attributeName="transform" type="skewX" values="0;3;0;-2.5;0" dur="19s" begin="-7s" repeatCount="indefinite"/>
    </path>
    <path d="M1088 84 C1052 178 1148 262 1104 400 L1196 400 C1158 258 1246 168 1196 84 Z" fill="url(#alk-c3)" opacity="0.85">
      <animateTransform attributeName="transform" type="skewX" values="0;-2.5;0;3;0" dur="23s" begin="-12s" repeatCount="indefinite"/>
    </path>
  </g>
  <path d="M0 460 L0 428 L96 390 L178 426 L268 368 L360 422 L472 378 L564 430 L682 394 L792 434 L902 382 L1012 428 L1112 396 L1214 432 L1322 388 L1420 426 L1440 418 L1440 460 Z" fill="${mountainColor}"/>
  <rect x="0" y="460" width="1440" height="260" fill="url(#alk-water)"/>
  <g clip-path="url(#alk-lake)" opacity="0.3" filter="url(#alk-blur-soft)">
    <g transform="translate(0 920) scale(1 -1)">
      <path d="M235 64 C196 168 300 258 252 404 L352 404 C312 252 402 158 348 64 Z" fill="url(#alk-c1)">
        <animateTransform attributeName="transform" type="skewX" values="0;-3.5;0;2.5;0" dur="16s" begin="-2s" repeatCount="indefinite"/>
      </path>
      <path d="M672 40 C640 160 736 268 690 406 L800 406 C756 262 846 154 792 40 Z" fill="url(#alk-c2)">
        <animateTransform attributeName="transform" type="skewX" values="0;3;0;-2.5;0" dur="19s" begin="-7s" repeatCount="indefinite"/>
      </path>
      <path d="M1088 84 C1052 178 1148 262 1104 400 L1196 400 C1158 258 1246 168 1196 84 Z" fill="url(#alk-c3)">
        <animateTransform attributeName="transform" type="skewX" values="0;-2.5;0;3;0" dur="23s" begin="-12s" repeatCount="indefinite"/>
      </path>
    </g>
  </g>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;18 0;0 0" dur="13s" repeatCount="indefinite"/>
    <path d="M150 486 H420" stroke="${auroraGreen}" stroke-width="2" stroke-linecap="round"><animate attributeName="opacity" values="0.06;0.38;0.06" dur="5.6s" begin="-1s" repeatCount="indefinite"/></path>
    <path d="M620 512 H820" stroke="${auroraTeal}" stroke-width="2" stroke-linecap="round"><animate attributeName="opacity" values="0.05;0.32;0.05" dur="7.2s" begin="-3s" repeatCount="indefinite"/></path>
    <path d="M980 494 H1280" stroke="${auroraViolet}" stroke-width="2" stroke-linecap="round"><animate attributeName="opacity" values="0.05;0.3;0.05" dur="6.4s" begin="-2s" repeatCount="indefinite"/></path>
    <path d="M340 562 H580" stroke="${auroraTeal}" stroke-width="2.4" stroke-linecap="round"><animate attributeName="opacity" values="0.07;0.36;0.07" dur="8s" begin="-5s" repeatCount="indefinite"/></path>
    <path d="M760 614 H1080" stroke="${auroraGreen}" stroke-width="2.4" stroke-linecap="round"><animate attributeName="opacity" values="0.06;0.34;0.06" dur="7.6s" begin="-4s" repeatCount="indefinite"/></path>
    <path d="M1120 658 H1340" stroke="${auroraViolet}" stroke-width="2.4" stroke-linecap="round"><animate attributeName="opacity" values="0.05;0.28;0.05" dur="5.2s" begin="-1.6s" repeatCount="indefinite"/></path>
    <path d="M70 642 H250" stroke="${auroraTeal}" stroke-width="2.4" stroke-linecap="round"><animate attributeName="opacity" values="0.05;0.3;0.05" dur="6.8s" begin="-2.4s" repeatCount="indefinite"/></path>
  </g>
  <rect x="0" y="458" width="1440" height="2.5" fill="${auroraTeal}" opacity="0.25"/>
</svg>`;
}
