export interface AvatarBunnyOptions {
  size?: number;
}

export function createAvatarBunny(options: AvatarBunnyOptions = {}): string {
  const { size = 128 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bunny avatar">
  <rect width="128" height="128" rx="36" fill="#f472b6" opacity="0.12"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="1.9s" repeatCount="indefinite"/>
    <ellipse cx="46" cy="26" rx="9" ry="22" fill="#e5e7eb" transform="rotate(-8 46 26)"/>
    <ellipse cx="82" cy="26" rx="9" ry="22" fill="#e5e7eb" transform="rotate(8 82 26)"/>
    <ellipse cx="47" cy="28" rx="4.5" ry="16" fill="#fbcfe8" transform="rotate(-8 47 28)"/>
    <ellipse cx="81" cy="28" rx="4.5" ry="16" fill="#fbcfe8" transform="rotate(8 81 28)"/>
    <circle cx="64" cy="76" r="34" fill="#f3f4f6"/>
    <circle cx="50" cy="70" r="6.5" fill="#374151"/><circle cx="78" cy="70" r="6.5" fill="#374151"/>
    <circle cx="52" cy="68" r="2.2" fill="#fff"/><circle cx="80" cy="68" r="2.2" fill="#fff"/>
    <path d="M61 84 L64 87 L67 84 M64 87 L64 91 M58 93 Q64 97 70 93" stroke="#6b7280" stroke-width="3" fill="none" stroke-linecap="round"/>
    <g stroke="#9ca3af" stroke-width="2.5" stroke-linecap="round">
      <line x1="30" y1="86" x2="44" y2="88"/><line x1="98" y1="86" x2="84" y2="88"/>
      <line x1="32" y1="94" x2="44" y2="92"/><line x1="96" y1="94" x2="84" y2="92"/>
    </g>
    <ellipse cx="42" cy="80" rx="5.5" ry="4" fill="#f9a8d4" opacity=".75"/>
    <ellipse cx="86" cy="80" rx="5.5" ry="4" fill="#f9a8d4" opacity=".75"/>
  </g>
</svg>`;
}
