export interface AvatarGhostOptions {
  size?: number;
}

export function createAvatarGhost(options: AvatarGhostOptions = {}): string {
  const { size = 128 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ghost avatar">
  <rect width="128" height="128" rx="36" fill="#a78bfa" opacity="0.14" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="2.4s" repeatCount="indefinite" />
    <path d="M64 22 C88 22 102 40 102 64 L102 98 L92 90 L82 100 L72 90 L62 100 L52 90 L42 100 L32 92 L32 64 C32 40 44 22 64 22 Z" fill="#ede9fe"/>
    <circle cx="52" cy="60" r="6.5" fill="#1e1b2e"/><circle cx="76" cy="60" r="6.5" fill="#1e1b2e"/>
    <circle cx="54" cy="58" r="2.2" fill="#fff"/><circle cx="78" cy="58" r="2.2" fill="#fff"/>
    <ellipse cx="64" cy="74" rx="5" ry="7" fill="#1e1b2e"/>
    <circle cx="38" cy="74" r="5" fill="#f0abfc" opacity=".7"/><circle cx="90" cy="74" r="5" fill="#f0abfc" opacity=".7"/>
  </g>
</svg>`;
}
