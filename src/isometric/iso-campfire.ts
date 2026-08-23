export interface IsoCampfireOptions {
  size?: number;
}

export function createIsoCampfire(options: IsoCampfireOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <ellipse cx="120" cy="196" rx="70" ry="14" fill="#000" opacity=".3"/>
  <g>
    <polygon points="70,168 150,148 170,162 90,182" fill="#713f12"/>
    <polygon points="80,178 160,158 172,168 92,188" fill="#5c3517" transform="rotate(8 120 170)"/>
    <path d="M120 76 C138 96 152 112 148 134 C145 154 132 164 120 164 C108 164 95 154 92 134 C88 112 102 96 120 76 Z" fill="#f97316">
      <animate attributeName="d" values="M120 76 C138 96 152 112 148 134 C145 154 132 164 120 164 C108 164 95 154 92 134 C88 112 102 96 120 76 Z;M120 68 C142 94 156 114 151 136 C147 156 133 166 120 166 C107 166 93 156 89 136 C84 114 98 94 120 68 Z;M120 76 C138 96 152 112 148 134 C145 154 132 164 120 164 C108 164 95 154 92 134 C88 112 102 96 120 76 Z" dur="1.6s" repeatCount="indefinite"/>
    </path>
    <path d="M120 104 C130 118 138 128 135 142 C133 154 126 160 120 160 C114 160 107 154 105 142 C102 128 110 118 120 104 Z" fill="#fbbf24"/>
    <circle cx="52" cy="120" r="3.5" fill="#fbbf24"><animate attributeName="cy" values="120;86;120" dur="1.9s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0;.9" dur="1.9s" repeatCount="indefinite"/></circle>
    <circle cx="186" cy="106" r="2.5" fill="#fb923c"><animate attributeName="cy" values="106;74;106" dur="1.5s" begin=".4s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0;.8" dur="1.5s" repeatCount="indefinite"/></circle>
    <ellipse cx="120" cy="60" rx="16" ry="9" fill="#94a3b8" opacity=".5">
      <animate attributeName="cy" values="60;30;60" dur="3.2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".55;0;.55" dur="3.2s" repeatCount="indefinite"/>
    </ellipse>
  </g>
</svg>`;
}
