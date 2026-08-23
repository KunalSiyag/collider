export interface AvatarMoonOptions {
  body?: string;
  glow?: string;
  size?: number;
}

export function createAvatarMoon(options: AvatarMoonOptions = {}): string {
  const { body = '#c7d2fe', glow = '#fde68a', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Moon avatar">
  <rect width="128" height="128" rx="36" fill="#1e1b4b" opacity="0.35" />
  <g fill="#fef9c3">
    <circle cx="18" cy="20" r="1.8"><animate attributeName="opacity" values="1;0.2;1" dur="2.4s" repeatCount="indefinite" /></circle>
    <circle cx="110" cy="18" r="1.5"><animate attributeName="opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite" /></circle>
    <circle cx="116" cy="98" r="2"><animate attributeName="opacity" values="1;0.3;1" dur="2.8s" begin="-1s" repeatCount="indefinite" /></circle>
    <circle cx="14" cy="104" r="1.5"><animate attributeName="opacity" values="0.3;1;0.3" dur="2.2s" repeatCount="indefinite" /></circle>
  </g>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="4.4s" repeatCount="indefinite" />
    <circle cx="66" cy="64" r="36" fill="${body}" />
    <path d="M66 28 A36 36 0 0 1 66 100 A44 44 0 0 0 66 28 Z" fill="#a5b4fc" opacity="0.6" />
    <circle cx="54" cy="46" r="7" fill="#94a3b8" opacity="0.55" />
    <circle cx="74" cy="82" r="5.5" fill="#94a3b8" opacity="0.45" />
    <circle cx="80" cy="52" r="4" fill="#94a3b8" opacity="0.4" />
    <ellipse cx="52" cy="62" rx="4.5" ry="5" fill="#3730a3" transform="rotate(-12 52 62)">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.6s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="52" cy="63" rx="4.5" ry="5" fill="#3730a3" transform="rotate(-12 52 62)" />
    <path d="M48 78 Q56 85 64 79 Q60 88 50 85 Z" fill="#3730a3" />
    <path d="M96 40 l2.5 5 5 2.5 -5 2.5 -2.5 5 -2.5 -5 -5 -2.5 5 -2.5 Z" fill="${glow}">
      <animateTransform attributeName="transform" type="rotate" values="0 96 47;360 96 47" dur="10s" repeatCount="indefinite" />
    </path>
  </g>
</svg>`;
}
