export interface IsoRocketOptions {
  size?: number;
}

export function createIsoRocket(options: IsoRocketOptions = {}): string {
  const { size = 260 } = options;
  return `<svg width="${size}" viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <ellipse cx="130" cy="216" rx="80" ry="16" fill="#000" opacity=".3"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 6;0 -10;0 6" dur="3s" repeatCount="indefinite"/>
    <path d="M130 40 C150 66 156 96 154 128 L106 128 C104 96 110 66 130 40 Z" fill="#e2e8f0"/>
    <path d="M130 40 C142 56 148 76 149 100 L130 100 Z" fill="#94a3b8"/>
    <circle cx="130" cy="92" r="14" fill="#38bdf8" stroke="#0369a1" stroke-width="4"/>
    <path d="M106 118 L86 148 L108 138 Z" fill="#ef4444"/>
    <path d="M154 118 L174 148 L152 138 Z" fill="#dc2626"/>
    <rect x="120" y="128" width="20" height="26" rx="6" fill="#cbd5e1"/>
    <path d="M122 158 Q130 176 126 190 Q134 178 138 158 Z" fill="#fb923c">
      <animate attributeName="d" values="M122 158 Q130 176 126 190 Q134 178 138 158 Z;M124 158 Q136 184 132 202 Q138 186 140 158 Z;M122 158 Q130 176 126 190 Q134 178 138 158 Z" dur=".5s" repeatCount="indefinite"/>
    </path>
    <g fill="#fbbf24"><circle cx="112" cy="196" r="3"><animate attributeName="cy" values="196;212;196" dur=".8s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur=".8s" repeatCount="indefinite"/></circle>
    <circle cx="146" cy="200" r="2.5"><animate attributeName="cy" values="200;214;200" dur=".9s" begin=".3s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0;.9" dur=".9s" repeatCount="indefinite"/></circle></g>
  </g>
</svg>`;
}
