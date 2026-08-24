export interface SailboatRegattaOptions {
  skyHigh?: string;
  skyLow?: string;
  waveFar?: string;
  waveMid?: string;
  hull?: string;
}

function waveBand(y: number, amp: number, fill: string, dur: number, opacity: number): string {
  const d = `M0 ${y} Q 100 ${y - amp} 200 ${y} T 400 ${y} T 600 ${y} T 800 ${y} T 1000 ${y} T 1200 ${y} T 1400 ${y} T 1600 ${y} L 1600 500 L 0 500 Z`;
  return `  <path d="${d}" fill="${fill}" opacity="${opacity}">
    <animateTransform attributeName="transform" type="translate" values="-800 0; 0 0" dur="${dur}s" repeatCount="indefinite" />
  </path>`;
}

function sailboat(
  x: number,
  y: number,
  s: number,
  bobDur: number,
  bobBegin: number,
  rockDur: number,
  fill: string,
): string {
  return `  <g transform="translate(${x} ${y}) scale(${s})">
    <g fill="${fill}">
      <animateTransform attributeName="transform" type="translate" values="0 0; 0 -6; 0 0" dur="${bobDur}s" begin="${bobBegin}s" repeatCount="indefinite" />
      <g>
        <animateTransform attributeName="transform" type="rotate" values="-2.5; 2.5; -2.5" dur="${rockDur}s" repeatCount="indefinite" />
        <polygon points="2,-46 2,-4 30,-4" />
        <polygon points="-2,-40 -2,-4 -25,-4" />
        <polygon points="-34,0 34,0 25,12 -25,12" />
      </g>
    </g>
  </g>`;
}

export function createSailboatRegatta(options: SailboatRegattaOptions = {}): string {
  const {
    skyHigh = '#12264d',
    skyLow = '#f2a765',
    waveFar = '#274b7a',
    waveMid = '#1b3a63',
    hull = '#0c1c38',
  } = options;
  return `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="srg-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyHigh}" />
      <stop offset="0.72" stop-color="${skyLow}" />
      <stop offset="1" stop-color="${waveFar}" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#srg-sky)" />
  <circle cx="565" cy="320" r="42" fill="#ffe1ad" opacity="0.9" />
${sailboat(150, 352, 0.55, 4.6, -1.2, 5.4, hull)}
${waveBand(356, 9, waveFar, 15, 0.85)}
${sailboat(330, 378, 0.8, 3.9, -2.6, 4.6, hull)}
${waveBand(392, 12, waveMid, 11, 0.92)}
${sailboat(540, 404, 1.05, 3.2, -0.8, 3.8, hull)}
${waveBand(428, 14, hull, 8, 1)}
${sailboat(662, 438, 1.35, 2.7, -1.9, 3.2, hull)}
</svg>`;
}
