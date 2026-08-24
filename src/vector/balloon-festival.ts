export interface BalloonFestivalOptions {
  colorA?: string;
  colorB?: string;
  colorC?: string;
}

const ENVELOPE =
  'M0 44 C -24 34 -34 10 -34 -6 C -34 -33 -19 -50 0 -50 C 19 -50 34 -33 34 -6 C 34 10 24 34 0 44 Z';

function balloon(
  x: number,
  y: number,
  s: number,
  c1: string,
  c2: string,
  dur: number,
  begin: number,
): string {
  return `  <g transform="translate(${x} ${y}) scale(${s})">
    <g>
      <animateTransform attributeName="transform" type="translate" values="0 0; 0 -12; 0 0" dur="${dur}s" begin="${begin}s" repeatCount="indefinite" />
      <path d="${ENVELOPE}" fill="${c1}" />
      <path d="${ENVELOPE}" fill="${c2}" transform="scale(0.62 1)" />
      <path d="${ENVELOPE}" fill="${c1}" transform="scale(0.28 1)" />
      <polygon points="-7,42 7,42 4,48 -4,48" fill="#8c5a33" />
      <path d="M-8 48 L-7 60 M8 48 L7 60" stroke="#7c5a3a" stroke-width="1.5" fill="none" />
      <rect x="-9" y="60" width="18" height="12" rx="2.5" fill="#a9743f" />
      <path d="M-9 63 L9 63" stroke="#8a5a2e" stroke-width="1.2" />
    </g>
  </g>`;
}

export function createBalloonFestival(options: BalloonFestivalOptions = {}): string {
  const { colorA = '#b7a6e3', colorB = '#ffd9b8', colorC = '#ffcf8a' } = options;
  return `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="blf-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${colorA}" />
      <stop offset="1" stop-color="${colorB}" />
    </linearGradient>
    <radialGradient id="blf-glow">
      <stop offset="0" stop-color="${colorC}" stop-opacity="0.95" />
      <stop offset="1" stop-color="${colorC}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="800" height="500" fill="url(#blf-sky)" />
  <circle cx="400" cy="468" r="150" fill="url(#blf-glow)" />
  <circle cx="400" cy="468" r="46" fill="#ffedd0" />
  <g fill="#fdf5ea" opacity="0.75">
    <g>
      <animateTransform attributeName="transform" type="translate" values="-160 0; 960 0" dur="58s" repeatCount="indefinite" />
      <ellipse cx="130" cy="86" rx="64" ry="16" />
      <ellipse cx="178" cy="72" rx="42" ry="13" />
    </g>
    <g>
      <animateTransform attributeName="transform" type="translate" values="960 30; -160 30" dur="70s" repeatCount="indefinite" />
      <ellipse cx="590" cy="120" rx="72" ry="17" />
      <ellipse cx="540" cy="107" rx="46" ry="13" />
    </g>
  </g>
${balloon(120, 200, 0.72, '#d95b43', '#f8ecd4', 6.4, -1)}
${balloon(268, 128, 1.0, '#2f8f83', '#f8ecd4', 7.8, -3.2)}
${balloon(452, 168, 1.2, '#e6a53c', '#f8ecd4', 8.5, -5)}
${balloon(618, 118, 0.85, '#9a5b9e', '#f8ecd4', 6.9, -2.1)}
${balloon(722, 236, 0.6, '#40699f', '#f8ecd4', 5.6, -4.4)}
  <path d="M0 436 Q 200 420 400 434 Q 600 448 800 430 L 800 500 L 0 500 Z" fill="#a08cc9" opacity="0.85" />
  <path d="M0 470 Q 220 458 460 470 Q 640 478 800 464 L 800 500 L 0 500 Z" fill="#8a76bd" />
</svg>`;
}
