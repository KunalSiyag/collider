export interface PlumplingOptions {
  size?: number;
}

export function createPlumpling(options: PlumplingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="18" ry="3" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2 48 88;2 48 88;-2 48 88" dur="2.9s" repeatCount="indefinite"/>
    <ellipse cx="48" cy="68" rx="19" ry="16" fill="#6b21a8"/>
    <ellipse cx="48" cy="42" rx="17" ry="14" fill="#9333ea"/>
    <ellipse cx="42" cy="37" rx="5" ry="3" fill="#c084fc" transform="rotate(-20 42 37)"/>
    <path d="M48 28 Q46 20 52 16" stroke="#166534" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M52 18 Q60 12 66 18 Q60 24 52 20 Z" fill="#22c55e">
      <animateTransform attributeName="transform" type="rotate" values="0 52 18;-8 52 18;0 52 18" dur="2.2s" repeatCount="indefinite"/>
    </path>
    <circle cx="43" cy="41" r="3.4" fill="#fff"/>
    <circle cx="54" cy="41" r="3.4" fill="#fff"/>
    <circle cx="44" cy="42" r="1.7" fill="#3b0764"/>
    <circle cx="55" cy="42" r="1.7" fill="#3b0764"/>
    <path d="M45 48 Q48 50.5 51 48" stroke="#4c1d95" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="42" cy="67" r="2.6" fill="#ddd6fe" opacity=".7"/>
    <circle cx="55" cy="69" r="2.2" fill="#ddd6fe" opacity=".7"/>
    <path d="M44 66 Q48 63 52 66" stroke="#3b0764" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  </g>
</svg>`;
}
