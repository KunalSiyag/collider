export interface AvatarSamuraiOptions {
  armor?: string;
  crest?: string;
  size?: number;
}

export function createAvatarSamurai(options: AvatarSamuraiOptions = {}): string {
  const { armor = '#334155', crest = '#fbbf24', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Samurai avatar">
  <rect width="128" height="128" rx="36" fill="#fb7185" opacity="0.1" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="3.1s" repeatCount="indefinite" />
    <path d="M32 58 Q32 36 64 36 Q96 36 96 58 Z" fill="${armor}" />
    <path d="M64 36 V24" stroke="${crest}" stroke-width="3" stroke-linecap="round" />
    <circle cx="64" cy="20" r="6" fill="${crest}" />
    <path d="M32 56 h64" stroke="${crest}" stroke-width="4" />
    <path d="M26 52 l-8 6 v-12 Z M102 52 l8 6 v-12 Z" fill="${crest}" />
    <path d="M40 46 l-4 -10 h8 Z M88 46 l4 -10 h-8 Z" fill="${crest}" opacity="0.85" />
    <ellipse cx="64" cy="84" rx="27" ry="23" fill="#fcd9b8" />
    <rect x="37" y="66" width="54" height="10" fill="${armor}" opacity="0" />
    <ellipse cx="53" cy="82" rx="4" ry="4.5" fill="#1c1917">
      <animate attributeName="ry" values="4.5;4.5;0.5;4.5;4.5" dur="4.3s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="75" cy="82" rx="4" ry="4.5" fill="#1c1917">
      <animate attributeName="ry" values="4.5;4.5;0.5;4.5;4.5" dur="4.3s" repeatCount="indefinite" />
    </ellipse>
    <path d="M57 95 Q64 99 71 95" stroke="#1c1917" stroke-width="3" fill="none" stroke-linecap="round" />
    <path d="M108 30 l4 8 8 4 -8 4 -4 8 -4 -8 -8 -4 8 -4 Z" fill="#e2e8f0" transform="scale(0.7) translate(46 13)">
      <animateTransform attributeName="transform" type="rotate" values="0;360" dur="8s" repeatCount="indefinite" additive="sum" />
    </path>
  </g>
</svg>`;
}
