export interface SlothoOptions {
  size?: number;
}

export function createSlotho(options: SlothoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3" fill="#000" opacity=".25"/>
  <line x1="10" y1="24" x2="86" y2="24" stroke="#92400e" stroke-width="5" stroke-linecap="round"/>
  <path d="M20 24 Q24 34 30 24 M60 24 Q64 34 70 24" stroke="#a16207" stroke-width="3.4" fill="none" stroke-linecap="round">
    <animateTransform attributeName="transform" type="scale" values="1 1;1 .9;1 1" additive="sum" dur="3s" repeatCount="indefinite"/>
  </path>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 2;0 0" dur="4s" repeatCount="indefinite"/>
    <path d="M30 26 Q28 60 40 74 Q48 80 56 74 Q68 60 66 26 Z" fill="#a3a3a3"/>
    <ellipse cx="48" cy="52" rx="14" ry="18" fill="#d4d4d4"/>
    <circle cx="40" cy="38" r="9" fill="#e5e5e5"/>
    <circle cx="56" cy="38" r="9" fill="#e5e5e5"/>
    <path d="M34 36 q4 -3 9 0" stroke="#404040" stroke-width="2.6" fill="none" stroke-linecap="round">
      <animate attributeName="stroke" values="#404040;#404040;#d4d4d4;#404040" keyTimes="0;.44;.5;.56" dur="6s" repeatCount="indefinite"/>
    </path>
    <path d="M53 36 q4 -3 9 0" stroke="#404040" stroke-width="2.6" fill="none" stroke-linecap="round">
      <animate attributeName="stroke" values="#404040;#404040;#d4d4d4;#404040" keyTimes="0;.44;.5;.56" dur="6s" repeatCount="indefinite"/>
    </path>
    <ellipse cx="48" cy="47" rx="2.6" ry="1.8" fill="#404040"/>
    <path d="M45 51 Q48 53.5 51 51" stroke="#525252" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <ellipse cx="36" cy="46" rx="2.4" ry="1.5" fill="#fb7185" opacity=".5"/>
    <ellipse cx="60" cy="46" rx="2.4" ry="1.5" fill="#fb7185" opacity=".5"/>
    <path d="M32 30 Q30 44 36 58" stroke="#8c8c8c" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M64 30 Q66 44 60 58" stroke="#8c8c8c" stroke-width="4" fill="none" stroke-linecap="round"/>
  </g>
</svg>`;
}
