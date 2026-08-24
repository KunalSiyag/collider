export interface WindFarmOptions {
  colorA?: string;
  colorB?: string;
  hillA?: string;
  hillB?: string;
}

const BLADE = 'M0 0 C 4 -12 3 -30 0 -46 C -3 -30 -4 -12 0 0 Z';

function turbine(x: number, y: number, s: number, dur: number): string {
  return `  <g transform="translate(${x} ${y}) scale(${s})">
    <polygon points="-5,0 5,0 3,-72 -3,-72" fill="#f6f9fa" />
    <rect x="-4" y="-81" width="17" height="9" rx="3" fill="#e3eaee" />
    <g transform="translate(0 -76)">
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="${dur}s" repeatCount="indefinite" />
        <path d="${BLADE}" fill="#f6f9fa" />
        <path d="${BLADE}" fill="#f6f9fa" transform="rotate(120)" />
        <path d="${BLADE}" fill="#f6f9fa" transform="rotate(240)" />
      </g>
      <circle r="4.5" fill="#dbe4e9" />
    </g>
  </g>`;
}

export function createWindFarm(options: WindFarmOptions = {}): string {
  const { colorA = '#a5ddf5', colorB = '#eaf8fd', hillA = '#9ccb7f', hillB = '#7db563' } = options;
  return `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="wfm-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${colorA}" />
      <stop offset="1" stop-color="${colorB}" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#wfm-sky)" />
  <circle cx="668" cy="86" r="58" fill="#fff2ae" opacity="0.35" />
  <circle cx="668" cy="86" r="38" fill="#fff2ae" />
${turbine(150, 318, 0.62, 16)}
${turbine(690, 304, 0.58, 19)}
  <path d="M0 322 Q 190 276 400 312 Q 600 344 800 296 L 800 500 L 0 500 Z" fill="${hillA}" />
${turbine(320, 372, 1.0, 11)}
${turbine(560, 392, 1.12, 13)}
  <path d="M0 396 Q 200 344 420 376 Q 560 402 800 364 L 800 500 L 0 500 Z" fill="${hillB}" />
  <path d="M0 456 Q 220 434 460 452 Q 640 464 800 442 L 800 500 L 0 500 Z" fill="#5d9a49" />
</svg>`;
}
