export interface BrambletOptions {
  size?: number;
}

export function createBramblet(options: BrambletOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="22" ry="3.5" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2 48 88;2 48 88;-2 48 88" dur="3.2s" repeatCount="indefinite"/>
    <circle cx="48" cy="52" r="27" fill="#4d7c0f"/>
    <g stroke="#365314" stroke-width="3" fill="none" stroke-linecap="round">
      <path d="M24 44 Q48 30 72 46"/>
      <path d="M23 60 Q48 48 73 58"/>
      <path d="M30 74 Q50 64 68 72"/>
      <path d="M36 28 Q44 52 34 74"/>
      <path d="M62 27 Q54 52 64 75"/>
    </g>
    <g fill="#a3e635">
      <path d="M30 40 l4 -6 l2 6 Z"/><path d="M62 38 l4 -6 l2 6 Z"/>
      <path d="M24 58 l-6 -3 l6 -3 Z"/><path d="M70 56 l6 -3 l-6 -3 Z"/>
      <path d="M44 78 l-2 6 l4 0 Z"/><path d="M56 26 l-2 -6 l4 0 Z"/>
    </g>
    <circle cx="38" cy="50" r="3" fill="#e11d48"/>
    <circle cx="60" cy="62" r="3" fill="#e11d48"/>
    <circle cx="52" cy="34" r="2.5" fill="#e11d48"/>
    <path d="M40 56 l4 4 l-4 1 Z" fill="#1a2e05"/>
    <path d="M56 52 l-4 4 l4 1 Z" fill="#1a2e05"/>
    <path d="M45 66 Q48 69 51 66" stroke="#1a2e05" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>
</svg>`;
}
