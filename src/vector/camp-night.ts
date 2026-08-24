export interface CampNightOptions {
  colorA?: string;
  colorB?: string;
  glow?: string;
}

function mulberry32(seed: number): () => number {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pine(x: number, y: number, s: number, fill: string): string {
  return `  <g transform="translate(${x} ${y}) scale(${s})">
    <polygon points="0,-104 -27,-56 27,-56" fill="${fill}" />
    <polygon points="0,-80 -34,-22 34,-22" fill="${fill}" />
    <polygon points="0,-56 -41,6 41,6" fill="${fill}" />
    <rect x="-4" y="4" width="8" height="12" fill="#241a12" />
  </g>`;
}

function tent(x: number, y: number, s: number, door: string, lit: boolean, glow: string): string {
  const inner = lit
    ? `    <polygon points="-16,0 0,-42 16,0" fill="${door}" />
    <ellipse cx="0" cy="8" rx="30" ry="6" fill="${glow}" opacity="0.35" />`
    : `    <polygon points="-16,0 0,-42 16,0" fill="${door}" />`;
  return `  <g transform="translate(${x} ${y}) scale(${s})">
    <polygon points="-54,0 0,-60 54,0" fill="#3f4a63" />
    <polygon points="-54,0 0,-60 0,0" fill="#333c52" />
${inner}
  </g>`;
}

export function createCampNight(options: CampNightOptions = {}): string {
  const { colorA = '#0a0f24', colorB = '#203a63', glow = '#ffb457' } = options;
  const rand = mulberry32(20260823);
  const stars: string[] = [];
  for (let i = 0; i < 60; i++) {
    const x = (rand() * 790 + 5).toFixed(1);
    const y = (rand() * 300 + 8).toFixed(1);
    const r = (0.8 + rand() * 1.2).toFixed(2);
    const dur = (2 + rand() * 3).toFixed(2);
    const begin = (rand() * 4).toFixed(2);
    stars.push(`    <circle cx="${x}" cy="${y}" r="${r}" fill="#e8ecff" opacity="0.8">
      <animate attributeName="opacity" values="0.15;0.9;0.15" dur="${dur}s" begin="${begin}s" repeatCount="indefinite" />
    </circle>`);
  }
  const flameA = 'M0 0 C 12 -8 16 -22 5 -38 C 3 -27 -3 -27 -2 -38 C -12 -24 -14 -9 0 0 Z';
  const flameB = 'M0 0 C 14 -5 18 -18 7 -32 C 3 -23 -3 -24 -4 -35 C -10 -27 -16 -10 0 0 Z';
  const innerA = 'M0 0 C 7 -5 9 -13 3 -21 C 2 -15 -2 -15 -1 -21 C -7 -13 -8 -5 0 0 Z';
  const innerB = 'M0 0 C 8 -3 10 -11 4 -18 C 2 -13 -2 -13 -2 -19 C -6 -15 -9 -6 0 0 Z';
  return `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="cpn-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${colorA}" />
      <stop offset="1" stop-color="${colorB}" />
    </linearGradient>
    <radialGradient id="cpn-moonhalo">
      <stop offset="0" stop-color="#fdf6d8" stop-opacity="0.85" />
      <stop offset="1" stop-color="#fdf6d8" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="cpn-fireglow">
      <stop offset="0" stop-color="${glow}" stop-opacity="0.85" />
      <stop offset="1" stop-color="${glow}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="800" height="500" fill="url(#cpn-sky)" />
${stars.join('\n')}
  <circle cx="648" cy="86" r="46" fill="url(#cpn-moonhalo)" />
  <circle cx="648" cy="86" r="24" fill="#f2eecb" />
  <circle cx="640" cy="78" r="4.5" fill="#ddd6a8" />
  <circle cx="656" cy="94" r="3" fill="#ddd6a8" />
  <circle cx="650" cy="74" r="2.5" fill="#ddd6a8" />
  <path d="M0 458 Q 200 446 420 458 Q 620 468 800 452 L 800 500 L 0 500 Z" fill="#15251c" />
${pine(-15, 505, 1.7, '#0d1c15')}
${pine(30, 478, 1.5, '#0f2018')}
${pine(105, 492, 1.05, '#143021')}
${pine(806, 500, 1.6, '#0d1c15')}
${pine(770, 476, 1.55, '#0f2018')}
${pine(700, 492, 1.05, '#143021')}
  <ellipse cx="400" cy="474" rx="130" ry="11" fill="#000000" opacity="0.28" />
${tent(262, 470, 1.02, '#ffd98a', true, glow)}
${tent(548, 474, 0.92, '#1f2940', false, glow)}
  <g transform="translate(402 464)">
    <rect x="-21" y="-7" width="42" height="7" rx="3.5" fill="#5a4030" transform="rotate(12)" />
    <rect x="-21" y="0" width="42" height="7" rx="3.5" fill="#4a3527" transform="rotate(-12)" />
  </g>
  <circle cx="402" cy="456" r="48" fill="url(#cpn-fireglow)">
    <animate attributeName="opacity" values="0.55;0.95;0.55" dur="2.2s" repeatCount="indefinite" />
    <animate attributeName="r" values="44;54;44" dur="2.2s" repeatCount="indefinite" />
  </circle>
  <g transform="translate(402 458)">
    <path d="${flameA}" fill="#ff9b3d">
      <animate attributeName="d" values="${flameA};${flameB};${flameA}" dur="0.9s" repeatCount="indefinite" />
    </path>
    <path d="${innerA}" fill="#ffd166">
      <animate attributeName="d" values="${innerA};${innerB};${innerA}" dur="0.7s" repeatCount="indefinite" />
    </path>
  </g>
  <g transform="translate(402 442)" fill="#ffd27a">
    <circle r="1.8">
      <animateTransform attributeName="transform" type="translate" values="0 0; 7 -30; -3 -58" dur="1.9s" begin="0s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0;1;0" dur="1.9s" begin="0s" repeatCount="indefinite" />
    </circle>
    <circle r="1.5">
      <animateTransform attributeName="transform" type="translate" values="0 0; -6 -34; 4 -62" dur="2.2s" begin="0.6s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0;1;0" dur="2.2s" begin="0.6s" repeatCount="indefinite" />
    </circle>
    <circle r="1.7">
      <animateTransform attributeName="transform" type="translate" values="0 0; 4 -38; -5 -66" dur="2.05s" begin="1.2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0;1;0" dur="2.05s" begin="1.2s" repeatCount="indefinite" />
    </circle>
  </g>
</svg>`;
}
