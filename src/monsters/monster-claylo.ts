export interface ClayloOptions {
  size?: number;
}

export function createClaylo(options: ClayloOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="22" ry="3.5" fill="#000" opacity=".25"/>
  <g transform-origin="48px 88px">
    <animateTransform attributeName="transform" type="scale" values="1 1;1.08 .92;1 1" dur="2.6s" repeatCount="indefinite"/>
    <ellipse cx="48" cy="66" rx="20" ry="18" fill="#c2410c"/>
    <circle cx="48" cy="40" r="19" fill="#ea580c"/>
    <g fill="#9a3412" opacity=".7">
      <circle cx="38" cy="34" r="2"/><circle cx="58" cy="30" r="2"/><circle cx="62" cy="44" r="2"/><circle cx="34" cy="46" r="2"/>
    </g>
    <path d="M30 58 l6 3" stroke="#7c2d12" stroke-width="1.4" opacity=".6"/>
    <circle cx="42" cy="41" r="4.5" fill="#fff7ed"/>
    <circle cx="55" cy="41" r="4.5" fill="#fff7ed"/>
    <circle cx="43" cy="42" r="2.2" fill="#431407"/>
    <circle cx="56" cy="42" r="2.2" fill="#431407"/>
    <path d="M44 51 Q48 55 52 51" stroke="#431407" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="33" cy="49" rx="3" ry="2" fill="#fb923c" opacity=".6"/>
    <ellipse cx="63" cy="49" rx="3" ry="2" fill="#fb923c" opacity=".6"/>
    <path d="M36 84 h24 v4 h-24 Z" fill="#9a3412"/>
  </g>
</svg>`;
}
