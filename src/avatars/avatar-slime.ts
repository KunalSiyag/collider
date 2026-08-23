export interface AvatarSlimeOptions {
  size?: number;
}

export function createAvatarSlime(options: AvatarSlimeOptions = {}): string {
  const { size = 128 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Slime avatar">
  <rect width="128" height="128" rx="36" fill="#34d399" opacity="0.14" />
  <g>
    <animateTransform attributeName="transform" type="scale" additive="sum" values="1 1;1.04 .94;1 1" dur="2s" repeatCount="indefinite"/>
    <path d="M24 96 C20 62 38 40 64 40 C90 40 108 62 104 96 C102 106 92 108 64 108 C36 108 26 106 24 96 Z" fill="#4ade80"/>
    <circle cx="30" cy="52" r="7" fill="#4ade80"><animate attributeName="cy" values="52;44;52" dur="1.6s" repeatCount="indefinite"/></circle>
    <circle cx="98" cy="50" r="5.5" fill="#4ade80"><animate attributeName="cy" values="50;58;50" dur="2.1s" repeatCount="indefinite"/></circle>
    <ellipse cx="48" cy="72" rx="6.5" ry="9" fill="#14532d"/><ellipse cx="80" cy="72" rx="6.5" ry="9" fill="#14532d"/>
    <circle cx="46" cy="68" r="2.4" fill="#fff"/><circle cx="78" cy="68" r="2.4" fill="#fff"/>
    <path d="M54 88 Q64 96 74 88" stroke="#14532d" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M42 50 C48 42 56 40 60 41" stroke="#bbf7d0" stroke-width="4" stroke-linecap="round" fill="none" opacity=".8"/>
  </g>
</svg>`;
}
