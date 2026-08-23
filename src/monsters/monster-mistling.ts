export interface MistlingOptions {
  size?: number;
}

export function createMistling(options: MistlingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="88" rx="26" ry="3" fill="#94a3b8" opacity=".4"/>
  <g opacity=".9">
    <animateTransform attributeName="transform" type="translate" values="-3 0;3 0;-3 0" dur="3.6s" repeatCount="indefinite"/>
    <ellipse cx="34" cy="60" rx="16" ry="9" fill="#cbd5e1"/>
    <ellipse cx="52" cy="52" rx="18" ry="11" fill="#e2e8f0"/>
    <ellipse cx="68" cy="62" rx="14" ry="8" fill="#cbd5e1"/>
    <circle cx="46" cy="50" r="3.4" fill="#475569"/>
    <circle cx="58" cy="50" r="3.4" fill="#475569"/>
    <circle cx="47" cy="51" r="1.6" fill="#f8fafc"/>
    <circle cx="59" cy="51" r="1.6" fill="#f8fafc"/>
    <path d="M48 57 Q52 60 56 57" stroke="#64748b" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M24 70 Q34 66 44 70 Q54 74 64 70" stroke="#94a3b8" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".7">
      <animate attributeName="d" values="M24 70 Q34 66 44 70 Q54 74 64 70;M24 70 Q34 74 44 70 Q54 66 64 70;M24 70 Q34 66 44 70 Q54 74 64 70" dur="3s" repeatCount="indefinite"/>
    </path>
    <path d="M30 76 Q40 73 50 76" stroke="#cbd5e1" stroke-width="2" fill="none" stroke-linecap="round" opacity=".6">
      <animate attributeName="d" values="M30 76 Q40 79 50 76;M30 76 Q40 73 50 76;M30 76 Q40 79 50 76" dur="2.6s" repeatCount="indefinite"/>
    </path>
  </g>
  <circle cx="20" cy="30" r="1.4" fill="#e2e8f0"><animate attributeName="cx" values="16;26" dur="3.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.7;0" dur="3.4s" repeatCount="indefinite"/></circle>
</svg>`;
}
