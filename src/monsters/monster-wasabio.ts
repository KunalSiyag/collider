export interface WasabioOptions {
  size?: number;
}

export function createWasabio(options: WasabioOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="18" ry="3" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="1.8s" repeatCount="indefinite"/>
    <path d="M30 60 Q26 34 48 32 Q70 34 66 60 Q66 76 48 78 Q30 76 30 60 Z" fill="#4ade80"/>
    <path d="M34 44 Q40 38 50 38" stroke="#bbf7d0" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M36 30 L32 20 M48 28 L48 18 M60 30 L64 20" stroke="#166534" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M40 46 Q42 52 40 58 M56 46 Q54 52 56 58" stroke="#22c55e" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>
    <circle cx="41" cy="50" r="4.4" fill="#fff"/>
    <circle cx="55" cy="50" r="4.4" fill="#fff"/>
    <circle cx="42" cy="51" r="2.2" fill="#14532d"/>
    <circle cx="56" cy="51" r="2.2" fill="#14532d"/>
    <ellipse cx="48" cy="60" rx="2" ry="2.6" fill="#166534"/>
    <path d="M42 66 Q48 71 54 66" stroke="#15803d" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <ellipse cx="32" cy="56" rx="3" ry="2" fill="#86efac" opacity=".8"/>
    <ellipse cx="65" cy="56" rx="3" ry="2" fill="#86efac" opacity=".8"/>
    <path d="M30 68 q4 3 8 0" stroke="#f43f5e" stroke-width="1.8" fill="none" stroke-linecap="round">
      <animateTransform attributeName="transform" type="rotate" values="0 34 68;8 34 68;0 34 68" dur="1s" repeatCount="indefinite"/>
    </path>
  </g>
</svg>`;
}
