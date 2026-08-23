export interface AvatarMoodWinkOptions {
  body?: string;
  size?: number;
}

export function createAvatarMoodWink(options: AvatarMoodWinkOptions = {}): string {
  const { body = '#fbbf24', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Winking mood avatar">
  <rect width="128" height="128" rx="36" fill="#fbbf24" opacity="0.13" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="2.7s" repeatCount="indefinite" />
    <circle cx="64" cy="70" r="38" fill="${body}" />
    <ellipse cx="48" cy="64" rx="6" ry="7" fill="#451a03">
      <animate attributeName="ry" values="7;7;0.6;7;7;7;7;7" dur="3.2s" repeatCount="indefinite" />
    </ellipse>
    <path d="M74 66 q6 -7 12 0" stroke="#451a03" stroke-width="4.5" fill="none" stroke-linecap="round" />
    <circle cx="46" cy="61" r="2" fill="#ffffff" />
    <path d="M52 84 Q60 91 70 86 Q76 83 78 78" stroke="#451a03" stroke-width="4.5" fill="none" stroke-linecap="round" />
    <ellipse cx="36" cy="76" rx="5.5" ry="4" fill="#fde047" opacity="0.9" />
    <ellipse cx="92" cy="74" rx="5.5" ry="4" fill="#fde047" opacity="0.9" />
    <path d="M100 44 a8 8 0 0 1 10 4 M108 32 a12 12 0 0 1 12 6" stroke="#d97706" stroke-width="3.5" fill="none" stroke-linecap="round">
      <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
    </path>
  </g>
</svg>`;
}
