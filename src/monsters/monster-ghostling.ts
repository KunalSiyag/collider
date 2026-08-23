export interface GhostlingOptions {
  size?: number;
}

export function createGhostling(options: GhostlingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="18" ry="3" fill="#8b5cf6" opacity=".3"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="2.5s" repeatCount="indefinite"/>
    <path d="M30 46 C30 28 66 28 66 46 L66 74 Q61 68 56 74 Q51 68 48 74 Q45 68 40 74 Q35 68 30 74 Z" fill="#f5f3ff" opacity=".92"/>
    <path d="M30 46 C30 28 66 28 66 46 L66 52 C60 48 36 48 30 52 Z" fill="#ede9fe"/>
    <ellipse cx="41" cy="45" rx="3.4" ry="4.4" fill="#312e81">
      <animate attributeName="ry" values="4.4;4.4;.4;4.4" keyTimes="0;.4;.5;.6" dur="4.2s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="55" cy="45" rx="3.4" ry="4.4" fill="#312e81">
      <animate attributeName="ry" values="4.4;4.4;.4;4.4" keyTimes="0;.4;.5;.6" dur="4.2s" repeatCount="indefinite"/>
    </ellipse>
    <circle cx="42" cy="43.5" r="1.1" fill="#fff"/>
    <circle cx="56" cy="43.5" r="1.1" fill="#fff"/>
    <ellipse cx="48" cy="53" rx="2.6" ry="3" fill="#312e81"/>
    <ellipse cx="33" cy="52" rx="3" ry="2" fill="#c4b5fd" opacity=".7"/>
    <ellipse cx="63" cy="52" rx="3" ry="2" fill="#c4b5fd" opacity=".7"/>
    <path d="M24 56 Q20 62 24 66" stroke="#ddd6fe" stroke-width="3" fill="none" stroke-linecap="round">
      <animateTransform attributeName="transform" type="rotate" values="0 24 60;-14 24 60;0 24 60" dur="2.5s" repeatCount="indefinite"/>
    </path>
  </g>
  <text x="72" y="30" font-size="10" fill="#c4b5fd">~</text>
  <text x="20" y="24" font-size="8" fill="#a78bfa" opacity=".7">~</text>
</svg>`;
}
