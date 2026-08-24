export interface PaperBoatsOptions {
  colorA?: string;
  colorB?: string;
  accent?: string;
}

function rainTile(): string {
  const drops: string[] = [];
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 9; col++) {
      const x = col * 92 + ((row * 53) % 41) + (row % 3) * 26 - 30;
      const y = row * 43 + ((col * 29) % 19);
      drops.push(`<line x1="${x}" y1="${y}" x2="${x - 13}" y2="${y + 34}" />`);
    }
  }
  return drops.join('');
}

function ripple(cx: number, cy: number, dur: number, begin: number): string {
  return `  <ellipse cx="${cx}" cy="${cy}" rx="9" ry="2.6" fill="none" stroke="#eaf3fa" stroke-width="1.5">
    <animate attributeName="rx" values="7;30" dur="${dur}s" begin="${begin}s" repeatCount="indefinite" />
    <animate attributeName="ry" values="2;8" dur="${dur}s" begin="${begin}s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.8;0" dur="${dur}s" begin="${begin}s" repeatCount="indefinite" />
  </ellipse>`;
}

function paperBoat(
  x: number,
  y: number,
  s: number,
  amp: number,
  drift: number,
  rock: number,
  begin: number,
): string {
  return `  <g transform="translate(${x} ${y}) scale(${s})">
    <g>
      <animateTransform attributeName="transform" type="translate" values="0 0; ${amp} 0; 0 0" dur="${drift}s" begin="${begin}s" repeatCount="indefinite" />
      <g>
        <animateTransform attributeName="transform" type="rotate" values="-4; 4; -4" dur="${rock}s" begin="${begin}s" repeatCount="indefinite" />
        <polygon points="-30,0 30,0 19,13 -19,13" fill="#ffffff" />
        <polygon points="-27,-2 0,-27 27,-2" fill="#ffffff" />
        <polygon points="0,-27 13,-2 0,-2" fill="#dde7f0" />
        <path d="M0 -27 L0 -2" stroke="#b9c7d4" stroke-width="1.5" />
      </g>
    </g>
  </g>`;
}

export function createPaperBoats(options: PaperBoatsOptions = {}): string {
  const { colorA = '#7d93ab', colorB = '#c6d2de', accent = '#eaf3fa' } = options;
  const tile = rainTile();
  const rainLayer = [-1040, -520, 0, 520]
    .map((ty) => `<g transform="translate(0 ${ty})">${tile}</g>`)
    .join('');
  return `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="pbm-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${colorA}" />
      <stop offset="1" stop-color="${colorB}" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#pbm-sky)" />
  <g fill="#f2f6fa" opacity="0.6">
    <g>
      <animateTransform attributeName="transform" type="translate" values="-180 0; 980 0" dur="52s" repeatCount="indefinite" />
      <ellipse cx="150" cy="84" rx="72" ry="17" />
      <ellipse cx="200" cy="70" rx="46" ry="13" />
    </g>
    <g>
      <animateTransform attributeName="transform" type="translate" values="980 40; -180 40" dur="66s" repeatCount="indefinite" />
      <ellipse cx="590" cy="140" rx="80" ry="19" />
      <ellipse cx="538" cy="126" rx="50" ry="14" />
    </g>
  </g>
  <path d="M0 376 Q 100 366 200 376 T 400 376 T 600 376 T 800 376 L 800 500 L 0 500 Z" fill="#9db4c8" />
  <path d="M0 452 Q 200 442 400 452 T 800 452 L 800 500 L 0 500 Z" fill="#87a2b9" />
${ripple(170, 408, 3.4, 0)}
${ripple(430, 441, 4.1, -1.4)}
${ripple(650, 472, 3.8, -2.6)}
${paperBoat(170, 402, 0.7, 18, 7.2, 3.4, 0)}
${paperBoat(430, 430, 0.95, -14, 9.1, 4.2, -2)}
${paperBoat(650, 458, 1.2, 22, 11, 2.9, -4)}
  <g opacity="0.45" stroke="${accent}" stroke-width="2" stroke-linecap="round">
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 520" dur="1.3s" repeatCount="indefinite" />
    ${rainLayer}
  </g>
</svg>`;
}
