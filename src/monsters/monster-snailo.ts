export interface SnailoOptions {
  size?: number;
}

export function createSnailo(options: SnailoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="87" rx="26" ry="3.5" fill="#a3e635" opacity=".5"/>
  <path d="M18 82 Q28 74 40 80 Q54 86 68 80 Q76 77 82 81" stroke="#4ade80" stroke-width="3" fill="none" stroke-linecap="round"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;3 0;0 0" dur="4s" repeatCount="indefinite"/>
    <circle cx="58" cy="58" r="20" fill="#f97316"/>
    <path d="M58 58 m0 -13 a13 13 0 0 1 11 20 a10 10 0 0 1 -17 3 a7 7 0 0 1 5 -12 a4 4 0 0 1 4 6" fill="none" stroke="#fed7aa" stroke-width="3" stroke-linecap="round"/>
    <circle cx="30" cy="60" r="10" fill="#fdba74"/>
    <path d="M24 52 Q22 42 26 38 M32 52 Q34 42 30 36" stroke="#fdba74" stroke-width="3" fill="none" stroke-linecap="round">
      <animateTransform attributeName="transform" type="rotate" values="0 28 46;-8 28 46;0 28 46" dur="2.4s" repeatCount="indefinite"/>
    </path>
    <circle cx="26" cy="37" r="1.8" fill="#7c2d12"/>
    <circle cx="30" cy="35" r="1.8" fill="#7c2d12"/>
    <circle cx="27" cy="59" r="2.6" fill="#fff"/>
    <circle cx="33" cy="59" r="2.6" fill="#fff"/>
    <circle cx="27.6" cy="60" r="1.3" fill="#7c2d12"/>
    <circle cx="33.6" cy="60" r="1.3" fill="#7c2d12"/>
    <path d="M28 64 Q30 65.8 32 64" stroke="#9a3412" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  </g>
</svg>`;
}
