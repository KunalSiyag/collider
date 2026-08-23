export interface AvatarFairyOptions {
  dress?: string;
  wing?: string;
  size?: number;
}

export function createAvatarFairy(options: AvatarFairyOptions = {}): string {
  const { dress = '#f472b6', wing = '#bae6fd', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fairy avatar">
  <rect width="128" height="128" rx="36" fill="#f472b6" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -3; 0 3; 0 -3" dur="2.4s" repeatCount="indefinite" />
    <path d="M40 62 Q10 44 14 76 Q17 96 42 88 Z" fill="${wing}" opacity="0.75">
      <animate attributeName="opacity" values="0.75;0.35;0.75" dur="0.5s" repeatCount="indefinite" />
    </path>
    <path d="M88 62 Q118 44 114 76 Q111 96 86 88 Z" fill="${wing}" opacity="0.75">
      <animate attributeName="opacity" values="0.35;0.75;0.35" dur="0.5s" repeatCount="indefinite" />
    </path>
    <path d="M46 92 Q64 84 82 92 L74 112 H54 Z" fill="${dress}" />
    <circle cx="64" cy="60" r="21" fill="#fcd9b8" />
    <path d="M44 56 Q42 34 64 34 Q86 34 84 56 Q78 42 64 42 Q50 42 44 56 Z" fill="#fbbf24" />
    <path d="M84 52 q12 6 8 18 l-10 -8" fill="#fbbf24" opacity="0.85" />
    <path d="M58 22 v-8 m-6 4 h12" stroke="#fde047" stroke-width="3" stroke-linecap="round" />
    <circle cx="57" cy="59" r="3.2" fill="#3b0764">
      <animate attributeName="ry" values="1;1;0;1;1" dur="3.9s" repeatCount="indefinite" />
    </circle>
    <circle cx="71" cy="59" r="3.2" fill="#3b0764">
      <animate attributeName="ry" values="1;1;0;1;1" dur="3.9s" repeatCount="indefinite" />
    </circle>
    <path d="M59 68 Q64 72 69 68" stroke="#be185d" stroke-width="2.8" fill="none" stroke-linecap="round" />
    <ellipse cx="51" cy="65" rx="3.5" ry="2.5" fill="#fb7185" opacity="0.45" />
    <ellipse cx="77" cy="65" rx="3.5" ry="2.5" fill="#fb7185" opacity="0.45" />
    <g fill="#fde047">
      <circle cx="108" cy="30" r="2"><animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite" /></circle>
      <circle cx="20" cy="104" r="2.5"><animate attributeName="opacity" values="0.2;1;0.2" dur="2.2s" repeatCount="indefinite" /></circle>
      <circle cx="112" cy="100" r="1.8"><animate attributeName="opacity" values="1;0.3;1" dur="2s" begin="-1s" repeatCount="indefinite" /></circle>
    </g>
  </g>
</svg>`;
}
