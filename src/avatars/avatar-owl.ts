export interface AvatarOwlOptions {
  size?: number;
}

export function createAvatarOwl(options: AvatarOwlOptions = {}): string {
  const { size = 128 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Owl avatar">
  <rect width="128" height="128" rx="36" fill="#a16207" opacity="0.14"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.5s" repeatCount="indefinite"/>
    <path d="M30 34 L44 22 L52 38 Z" fill="#92400e"/><path d="M98 34 L84 22 L76 38 Z" fill="#92400e"/>
    <circle cx="64" cy="66" r="38" fill="#b45309"/>
    <circle cx="48" cy="58" r="15" fill="#fef3c7"/><circle cx="80" cy="58" r="15" fill="#fef3c7"/>
    <circle cx="50" cy="60" r="6.5" fill="#1c1917"/><circle cx="78" cy="60" r="6.5" fill="#1c1917"/>
    <circle cx="52" cy="57.5" r="2.2" fill="#fff"/><circle cx="80" cy="57.5" r="2.2" fill="#fff"/>
    <path d="M64 68 L59 76 L69 76 Z" fill="#f97316"/>
    <path d="M46 88 Q64 96 82 88" stroke="#92400e" stroke-width="4" fill="none" stroke-linecap="round"/>
    <g stroke="#78350f" stroke-width="3.5" stroke-linecap="round">
      <line x1="56" y1="100" x2="54" y2="110"/><line x1="64" y1="102" x2="64" y2="112"/><line x1="72" y1="100" x2="74" y2="110"/>
    </g>
    <ellipse cx="64" cy="86" rx="18" ry="12" fill="#d97706" opacity=".55"/>
  </g>
</svg>`;
}
