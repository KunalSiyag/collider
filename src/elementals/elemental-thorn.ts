export interface ElementalOptions {
  size?: number;
}

export function createElementalThorn(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Thorn elemental">
  <g stroke="#166534" fill="none" stroke-linecap="round">
    <path d="M100 190 C96 160 104 130 98 104 C94 84 84 72 70 64" stroke-width="7"/>
    <path d="M100 190 C106 156 116 140 132 128" stroke-width="6"/>
    <path d="M99 150 C88 142 82 132 80 122" stroke-width="5"/>
    <path d="M70 64 C62 56 60 46 64 38 C74 42 78 54 70 64 Z" fill="#22c55e" stroke="none"/>
    <path d="M132 128 C144 124 152 126 158 134 C148 140 136 138 132 128 Z" fill="#4ade80" stroke="none"/>
    <path d="M80 122 C70 118 66 110 68 102 C78 106 82 114 80 122 Z" fill="#22c55e" stroke="none"/>
    <g stroke="#15803d" stroke-width="4">
      <path d="M97 170 L86 164"><animate attributeName="opacity" values="1;.4;1" dur="2s" repeatCount="indefinite"/></path>
      <path d="M101 136 L112 132"><animate attributeName="opacity" values=".4;1;.4" dur="1.7s" repeatCount="indefinite"/></path>
    </g>
  </g>
  <circle cx="70" cy="52" r="7" fill="#f472b6"><animate attributeName="r" values="6;8;6" dur="1.9s" repeatCount="indefinite"/></circle>
  <circle cx="160" cy="138" r="6" fill="#fb7185"><animate attributeName="r" values="7;5;7" dur="2.3s" repeatCount="indefinite"/></circle>
  <circle cx="67" cy="100" r="5" fill="#a3e635"/>
</svg>`;
}
