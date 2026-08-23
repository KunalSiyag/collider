export interface AvatarMushroomOptions {
  size?: number;
}

export function createAvatarMushroom(options: AvatarMushroomOptions = {}): string {
  const { size = 128 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mushroom avatar">
  <rect width="128" height="128" rx="36" fill="#ef4444" opacity="0.12"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2.5 64 96; 2.5 64 96; -2.5 64 96" dur="3s" repeatCount="indefinite"/>
    <rect x="46" y="62" width="36" height="42" rx="16" fill="#fef9f4"/>
    <path d="M64 18 C94 18 110 40 108 56 C106 66 92 70 64 70 C36 70 22 66 20 56 C18 40 34 18 64 18 Z" fill="#dc2626"/>
    <circle cx="44" cy="38" r="8" fill="#fecaca"/><circle cx="78" cy="32" r="6" fill="#fecaca"/><circle cx="90" cy="48" r="7" fill="#fecaca"/><circle cx="58" cy="54" r="4" fill="#fecaca"/>
    <circle cx="54" cy="80" r="6" fill="#1c1917"/><circle cx="74" cy="80" r="6" fill="#1c1917"/>
    <circle cx="56" cy="78" r="2" fill="#fff"/><circle cx="76" cy="78" r="2" fill="#fff"/>
    <path d="M58 92 Q64 97 70 92" stroke="#57534e" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="46" cy="88" rx="5" ry="3.5" fill="#fca5a5" opacity=".7"/><ellipse cx="82" cy="88" rx="5" ry="3.5" fill="#fca5a5" opacity=".7"/>
  </g>
</svg>`;
}
