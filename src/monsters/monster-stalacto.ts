export interface StalactoOptions {
  size?: number;
}

export function createStalacto(options: StalactoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <rect x="0" y="0" width="96" height="10" fill="#44403c"/>
  <path d="M34 10 Q36 26 42 30 L54 30 Q60 26 62 10 Z" fill="#57534e"/>
  <g transform="rotate(180 48 58)">
    <animateTransform attributeName="transform" type="translate" values="0 2;0 -1;0 2" additive="sum" dur="2.8s" repeatCount="indefinite"/>
    <path d="M38 40 Q36 70 46 84 L50 84 Q60 70 58 40 Z" fill="#a78bfa"/>
    <path d="M42 44 Q41 64 47 78" stroke="#c4b5fd" stroke-width="2" fill="none" opacity=".7"/>
    <g fill="#8b5cf6"><circle cx="43" cy="56" r="1.6"/><circle cx="53" cy="66" r="1.6"/><circle cx="45" cy="72" r="1.4"/></g>
    <circle cx="43" cy="52" r="3.4" fill="#fff"/>
    <circle cx="53" cy="52" r="3.4" fill="#fff"/>
    <circle cx="43.8" cy="53" r="1.7" fill="#3b0764"/>
    <circle cx="53.8" cy="53" r="1.7" fill="#3b0764"/>
    <path d="M45 60 Q48 57 51 60" stroke="#4c1d95" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <ellipse cx="37" cy="57" rx="2.4" ry="1.6" fill="#ddd6fe" opacity=".8"/>
    <ellipse cx="59" cy="57" rx="2.4" ry="1.6" fill="#ddd6fe" opacity=".8"/>
  </g>
  <ellipse cx="48" cy="88" rx="14" ry="2.5" fill="#22d3ee" opacity=".5">
    <animate attributeName="rx" values="1;4;1" dur="2s" repeatCount="indefinite"/>
  </ellipse>
  <circle cx="48" cy="82" r="1.4" fill="#67e8f9">
    <animate attributeName="cy" values="32;80" dur="2s" repeatCount="indefinite"/>
  </circle>
</svg>`;
}
