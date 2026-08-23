export interface AvatarFlamingoOptions {
  body?: string;
  beak?: string;
  size?: number;
}

export function createAvatarFlamingo(options: AvatarFlamingoOptions = {}): string {
  const { body = '#fb7185', beak = '#1c1917', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flamingo avatar">
  <rect width="128" height="128" rx="36" fill="#f472b6" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3.4s" repeatCount="indefinite" />
    <ellipse cx="58" cy="80" rx="32" ry="26" fill="${body}" />
    <path d="M84 74 Q104 78 100 96 L86 90 Z" fill="#f43f5e" />
    <path d="M52 104 v14 M64 106 q-6 8 -14 10" stroke="#be123c" stroke-width="5" fill="none" stroke-linecap="round" />
    <path d="M46 120 h-12 M46 120 h8" stroke="#be123c" stroke-width="4" stroke-linecap="round" />
    <circle cx="44" cy="42" r="22" fill="${body}" />
    <path d="M30 34 Q20 40 24 50 L48 56 L44 40 Z" fill="#fecdd3" />
    <path d="M24 48 q-8 2 -10 8 q10 2 18 -2 Z" fill="${beak}" />
    <circle cx="46" cy="38" r="4.5" fill="#1c1917">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.4s" repeatCount="indefinite" />
    </circle>
    <circle cx="46" cy="38" r="4.5" fill="#1c1917" />
    <circle cx="47.5" cy="36.5" r="1.5" fill="#ffffff" />
    <path d="M36 60 q6 4 12 2" stroke="#e11d48" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.6" />
    <path d="M14 118 h100" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" opacity="0.45" />
    <path d="M108 108 q6 -8 12 0" stroke="#a5f3fc" stroke-width="3" fill="none" stroke-linecap="round">
      <animate attributeName="opacity" values="1;0.2;1" dur="2.8s" repeatCount="indefinite" />
    </path>
  </g>
</svg>`;
}
