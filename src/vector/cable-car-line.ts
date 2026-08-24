export interface CableCarLineOptions {
  skyHigh?: string;
  skyLow?: string;
  peak?: string;
  car?: string;
}

function gondola(carColor: string, dur: number, begin: number): string {
  return `    <g>
      <animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear">
        <mpath xlink:href="#ccl-cable" />
      </animateMotion>
      <circle cx="0" cy="2" r="3.5" fill="#2c313a" />
      <rect x="-2" y="4" width="4" height="13" fill="${carColor}" />
      <rect x="-15" y="16" width="30" height="22" rx="6" fill="${carColor}" />
      <rect x="-10" y="21" width="20" height="11" rx="3" fill="#d8edf8" />
    </g>`;
}

export function createCableCarLine(options: CableCarLineOptions = {}): string {
  const { skyHigh = '#aedcf4', skyLow = '#eef8ff', peak = '#3d4d5f', car = '#d94f43' } = options;
  return `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true">
  <defs>
    <linearGradient id="ccl-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyHigh}" />
      <stop offset="1" stop-color="${skyLow}" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#ccl-sky)" />
  <path d="M0 330 Q 190 262 400 316 Q 600 366 800 300 L 800 500 L 0 500 Z" fill="#8facbe" opacity="0.55" />
  <path d="M0 368 Q 220 316 430 362 Q 620 402 800 356 L 800 500 L 0 500 Z" fill="#7c9dae" opacity="0.5" />
  <path d="M0 500 L0 238 L44 186 L94 152 L150 196 L206 258 L262 330 L318 500 Z" fill="${peak}" />
  <path d="M64 176 L94 152 L126 180 L111 171 L95 183 L80 169 Z" fill="#f4fafd" opacity="0.9" />
  <path d="M800 500 L800 226 L754 170 L702 144 L648 192 L590 260 L542 342 L498 500 Z" fill="${peak}" />
  <path d="M736 172 L702 144 L672 176 L688 167 L704 179 L721 166 Z" fill="#f4fafd" opacity="0.9" />
  <rect x="88" y="146" width="12" height="14" rx="2" fill="#39404b" />
  <rect x="696" y="138" width="12" height="14" rx="2" fill="#39404b" />
  <path d="M94 152 Q 400 292 702 144" fill="none" stroke="#39404b" stroke-width="3" id="ccl-cable" />
${gondola(car, 30, -2)}
${gondola(car, 24, -10)}
${gondola(car, 36, -18)}
  <path d="M0 468 Q 200 448 420 466 Q 620 480 800 458 L 800 500 L 0 500 Z" fill="#7fae6a" />
</svg>`;
}
