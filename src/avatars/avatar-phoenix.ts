export interface AvatarPhoenixOptions {
  body?: string;
  flame?: string;
  size?: number;
}

export function createAvatarPhoenix(options: AvatarPhoenixOptions = {}): string {
  const { body = '#f97316', flame = '#facc15', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Phoenix avatar">
  <rect width="128" height="128" rx="36" fill="#f97316" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -3; 0 3; 0 -3" dur="2.2s" repeatCount="indefinite" />
    <path d="M60 30 Q52 6 70 2 Q62 12 68 20 Q78 10 84 20 Q72 22 72 32 Z" fill="${flame}">
      <animate attributeName="d" values="M60 30 Q52 6 70 2 Q62 12 68 20 Q78 10 84 20 Q72 22 72 32 Z;M60 30 Q54 8 68 4 Q64 14 70 20 Q80 12 84 22 Q72 24 72 32 Z;M60 30 Q52 6 70 2 Q62 12 68 20 Q78 10 84 20 Q72 22 72 32 Z" dur="1.6s" repeatCount="indefinite" />
    </path>
    <path d="M28 66 Q6 52 16 34 Q22 52 40 54 Z M100 66 Q122 52 112 34 Q106 52 88 54 Z" fill="#fb923c">
      <animate attributeName="opacity" values="1;0.55;1" dur="1.2s" repeatCount="indefinite" />
    </path>
    <ellipse cx="64" cy="72" rx="32" ry="30" fill="${body}" />
    <path d="M40 92 Q64 104 88 92 Q80 102 64 102 Q48 102 40 92 Z" fill="${flame}" opacity="0.9" />
    <circle cx="53" cy="66" r="6" fill="#fff7ed" />
    <circle cx="75" cy="66" r="6" fill="#fff7ed" />
    <circle cx="54" cy="67" r="2.8" fill="#9a3412">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle cx="74" cy="67" r="2.8" fill="#9a3412">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" />
    </circle>
    <path d="M60 78 h8 l-4 4 Z" fill="#ea580c" />
    <path d="M58 84 q6 4 12 0" stroke="#c2410c" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <path d="M110 110 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 Z" fill="#fde047" transform="scale(0.8) translate(27 27)" />
  </g>
</svg>`;
}
