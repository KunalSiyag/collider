export interface ElementalOptions {
  size?: number;
}

export function createElementalFlame(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flame elemental">
  <ellipse cx="100" cy="202" rx="52" ry="10" fill="#f97316" opacity="0.25" />
  <g>
    <path d="M100 30 C118 58 150 74 150 118 C150 160 128 186 100 186 C72 186 50 160 50 118 C50 74 82 58 100 30 Z" fill="#f97316">
      <animate attributeName="d" dur="2.2s" repeatCount="indefinite"
        values="M100 30 C118 58 150 74 150 118 C150 160 128 186 100 186 C72 186 50 160 50 118 C50 74 82 58 100 30 Z;
                M100 24 C122 60 154 76 154 120 C154 162 130 190 100 190 C70 190 46 162 46 120 C46 76 78 58 100 24 Z;
                M100 30 C118 58 150 74 150 118 C150 160 128 186 100 186 C72 186 50 160 50 118 C50 74 82 58 100 30 Z" />
    </path>
    <path d="M100 66 C112 86 132 96 132 126 C132 152 117 168 100 168 C83 168 68 152 68 126 C68 96 88 86 100 66 Z" fill="#fbbf24">
      <animate attributeName="d" dur="1.7s" repeatCount="indefinite"
        values="M100 66 C112 86 132 96 132 126 C132 152 117 168 100 168 C83 168 68 152 68 126 C68 96 88 86 100 66 Z;
                M100 60 C114 84 136 98 136 128 C136 154 119 172 100 172 C81 172 64 154 64 128 C64 98 86 84 100 60 Z;
                M100 66 C112 86 132 96 132 126 C132 152 117 168 100 168 C83 168 68 152 68 126 C68 96 88 86 100 66 Z" />
    </path>
    <circle cx="84" cy="124" r="6" fill="#18181b" />
    <circle cx="116" cy="124" r="6" fill="#18181b" />
    <circle cx="86" cy="122" r="2" fill="#fff" />
    <circle cx="118" cy="122" r="2" fill="#fff" />
    <path d="M90 140 Q100 148 110 140" stroke="#7c2d12" stroke-width="4" fill="none" stroke-linecap="round" />
    <g fill="#fbbf24">
      <circle cx="42" cy="90" r="4"><animate attributeName="cy" values="90;40;90" dur="2.4s" repeatCount="indefinite" /><animate attributeName="opacity" values="1;0;1" dur="2.4s" repeatCount="indefinite" /></circle>
      <circle cx="158" cy="104" r="5"><animate attributeName="cy" values="104;48;104" dur="3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.9;0;0.9" dur="3s" repeatCount="indefinite" /></circle>
      <circle cx="52" cy="150" r="3.5"><animate attributeName="cy" values="150;96;150" dur="2.8s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.8;0;0.8" dur="2.8s" repeatCount="indefinite" /></circle>
    </g>
  </g>
</svg>`;
}
