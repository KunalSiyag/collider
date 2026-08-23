export interface AvatarOgreOptions {
  skin?: string;
  club?: string;
  size?: number;
}

export function createAvatarOgre(options: AvatarOgreOptions = {}): string {
  const { skin = '#84cc16', club = '#a16207', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ogre avatar">
  <rect width="128" height="128" rx="36" fill="#65a30d" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3.3s" repeatCount="indefinite" />
    <ellipse cx="64" cy="74" rx="35" ry="32" fill="${skin}" />
    <path d="M30 56 Q28 40 42 40 L46 52 Z M98 56 Q100 40 86 40 L82 52 Z" fill="${skin}" />
    <circle cx="39" cy="47" r="4" fill="#f8fafc"><circle cx="39" cy="47" r="2" fill="#365314" /><animate attributeName="r" values="4;3.4;4" dur="2.4s" repeatCount="indefinite" /></circle>
    <circle cx="89" cy="47" r="4" fill="#f8fafc"><circle cx="89" cy="47" r="2" fill="#365314" /><animate attributeName="r" values="4;3.4;4" dur="2.4s" begin="-1s" repeatCount="indefinite" /></circle>
    <path d="M50 62 q6 -6 12 0 M66 62 q6 -6 12 0" stroke="#365314" stroke-width="4" fill="none" stroke-linecap="round" />
    <path d="M48 84 Q64 96 80 84 L78 92 Q64 102 50 92 Z" fill="#f8fafc" />
    <path d="M54 87 l2 6 m6 -5 l2 6 m6 -5 l2 6" stroke="#334155" stroke-width="2.5" stroke-linecap="round" />
    <path d="M106 108 l6 -30" stroke="${club}" stroke-width="9" stroke-linecap="round" />
    <circle cx="113" cy="70" r="13" fill="${club}" />
    <g fill="#78350f"><circle cx="108" cy="63" r="2" /><circle cx="118" cy="66" r="2" /><circle cx="112" cy="76" r="2" /></g>
    <ellipse cx="40" cy="80" rx="5" ry="3.5" fill="#ecfccb" opacity="0.7" />
  </g>
</svg>`;
}
