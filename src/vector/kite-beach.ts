export interface KiteBeachOptions {
  skyTop?: string;
  skyBottom?: string;
  sand?: string;
  kiteA?: string;
  kiteB?: string;
}

function kite(
  x: number,
  y: number,
  s: number,
  c1: string,
  c2: string,
  sway: number,
  begin: number,
): string {
  const tailA = 'M0 34 q 7 9 0 18 q -7 9 0 18 q 7 9 0 18 q -7 9 0 18 q 7 9 0 18';
  const tailB = 'M0 34 q -7 9 0 18 q 7 9 0 18 q -7 9 0 18 q 7 9 0 18 q -7 9 0 18';
  return `  <g transform="translate(${x} ${y}) scale(${s})">
    <g>
      <animateTransform attributeName="transform" type="rotate" values="-3; 3; -3" dur="${sway}s" begin="${begin}s" repeatCount="indefinite" />
      <path d="M0 6 Q -70 220 -150 470" stroke="#ffffff" stroke-width="2" fill="none" opacity="0.8" />
      <polygon points="0,-30 20,0 0,34 -20,0" fill="${c1}" />
      <polygon points="0,-30 20,0 0,34" fill="${c2}" />
      <path d="M-20 0 Q 0 -7 20 0" stroke="#ffffff" stroke-width="2" fill="none" />
      <path d="M0 -30 Q 7 2 0 34" stroke="#ffffff" stroke-width="2" fill="none" />
      <path d="${tailA}" fill="none" stroke="${c1}" stroke-width="2.5" stroke-linecap="round">
        <animate attributeName="d" values="${tailA};${tailB};${tailA}" dur="1.15s" begin="${begin}s" repeatCount="indefinite" />
      </path>
    </g>
  </g>`;
}

export function createKiteBeach(options: KiteBeachOptions = {}): string {
  const {
    skyTop = '#6ec3f0',
    skyBottom = '#e6f6ff',
    sand = '#efd9a7',
    kiteA = '#e2574b',
    kiteB = '#2f7fd1',
  } = options;
  return `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="ktb-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyTop}" />
      <stop offset="1" stop-color="${skyBottom}" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#ktb-sky)" />
  <circle cx="92" cy="72" r="46" fill="#fff4b8" opacity="0.4" />
  <circle cx="92" cy="72" r="32" fill="#fff4b8" />
  <g fill="#ffffff" opacity="0.85">
    <g>
      <animateTransform attributeName="transform" type="translate" values="-170 0; 970 0" dur="55s" repeatCount="indefinite" />
      <ellipse cx="300" cy="70" rx="60" ry="14" />
      <ellipse cx="344" cy="58" rx="38" ry="11" />
    </g>
    <g>
      <animateTransform attributeName="transform" type="translate" values="970 20; -170 20" dur="68s" repeatCount="indefinite" />
      <ellipse cx="600" cy="110" rx="66" ry="15" />
      <ellipse cx="556" cy="98" rx="42" ry="12" />
    </g>
  </g>
${kite(175, 128, 1.0, kiteA, '#f6d34f', 5.2, 0)}
${kite(445, 92, 1.25, kiteB, '#7fd1e8', 6.1, -1.5)}
${kite(672, 158, 0.85, '#2aa198', '#f6d34f', 4.6, -3)}
  <path d="M0 402 Q 180 382 360 400 Q 580 416 800 394 L 800 500 L 0 500 Z" fill="${sand}" />
  <path d="M0 446 Q 200 428 430 448 Q 620 462 800 438 L 800 500 L 0 500 Z" fill="#e3c684" />
  <g stroke="#c9a75f" stroke-width="2.5" stroke-linecap="round" fill="none">
    <path d="M120 452 q 3 -10 8 -13 M128 452 q 1 -8 5 -11" />
    <path d="M520 470 q 3 -10 8 -13 M528 470 q 1 -8 5 -11" />
    <path d="M700 452 q 3 -10 8 -13 M708 452 q 1 -8 5 -11" />
  </g>
</svg>`;
}
