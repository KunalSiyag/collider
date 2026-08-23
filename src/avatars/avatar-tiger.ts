export interface AvatarTigerOptions {
  size?: number;
}

export function createAvatarTiger(options: AvatarTigerOptions = {}): string {
  const { size = 128 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tiger avatar">
  <rect width="128" height="128" rx="36" fill="#f97316" opacity="0.13"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.3s" repeatCount="indefinite"/>
    <path d="M30 40 L26 20 L48 32 Z" fill="#ea580c"/><path d="M98 40 L102 20 L80 32 Z" fill="#ea580c"/>
    <circle cx="64" cy="70" r="36" fill="#f59e0b"/>
    <g fill="#7c2d12">
      <path d="M42 50 l10 -3 l-4 8 Z"/><path d="M86 50 l-10 -3 l4 8 Z"/>
      <path d="M34 72 l9 1 l-5 6 Z"/><path d="M94 72 l-9 1 l5 6 Z"/>
      <path d="M52 96 l7 -4 v8 Z"/><path d="M76 96 l-7 -4 v8 Z"/>
      <path d="M60 44 h8 l-4 6 Z"/>
    </g>
    <ellipse cx="64" cy="82" rx="17" ry="13" fill="#fef3c7"/>
    <circle cx="51" cy="66" r="6" fill="#1c1917"/><circle cx="77" cy="66" r="6" fill="#1c1917"/>
    <circle cx="53" cy="64" r="2" fill="#fff"/><circle cx="79" cy="64" r="2" fill="#fff"/>
    <path d="M64 78 L60 83 L68 83 Z" fill="#7c2d12"/>
    <path d="M64 83 Q59 89 54 85 M64 83 Q69 89 74 85" stroke="#7c2d12" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>
</svg>`;
}
