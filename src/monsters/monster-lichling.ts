export interface LichlingOptions {
  size?: number;
}

export function createLichling(options: LichlingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3.5" fill="#000" opacity=".3"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2.5;0 0" dur="2.6s" repeatCount="indefinite"/>
    <path d="M26 78 Q22 34 48 30 Q74 34 70 78 Z" fill="#4c1d95"/>
    <path d="M26 78 Q48 70 70 78 L70 84 Q48 78 26 84 Z" fill="#312e81"/>
    <circle cx="48" cy="50" r="15" fill="#e5e7eb"/>
    <circle cx="42" cy="49" r="4" fill="#09090b"/>
    <circle cx="54" cy="49" r="4" fill="#09090b"/>
    <circle cx="42" cy="49" r="1.6" fill="#a3e635">
      <animate attributeName="fill" values="#a3e635;#22d3ee;#a3e635" dur="2.4s" repeatCount="indefinite"/>
    </circle>
    <circle cx="54" cy="49" r="1.6" fill="#a3e635">
      <animate attributeName="fill" values="#a3e635;#22d3ee;#a3e635" dur="2.4s" repeatCount="indefinite"/>
    </circle>
    <path d="M42 58 h12 M45 58 v3 M51 58 v3" stroke="#9ca3af" stroke-width="1.4"/>
    <path d="M48 30 L48 12" stroke="#6d28d9" stroke-width="3"/>
    <circle cx="48" cy="10" r="3.5" fill="#22d3ee">
      <animate attributeName="r" values="3.5;4.5;3.5" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <path d="M70 60 Q80 56 78 46" stroke="#6d28d9" stroke-width="5" fill="none" stroke-linecap="round"/>
  </g>
  <text x="16" y="26" font-size="9" fill="#8b5cf6" opacity=".8">✦</text>
  <text x="76" y="70" font-size="7" fill="#8b5cf6" opacity=".6">✦</text>
</svg>`;
}
