export interface AvatarNinjaOptions {
  hood?: string;
  skin?: string;
  size?: number;
}

export function createAvatarNinja(options: AvatarNinjaOptions = {}): string {
  const { hood = '#27272a', skin = '#fcd9b8', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ninja avatar">
  <rect width="128" height="128" rx="36" fill="#27272a" opacity="0.16" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="2.5s" repeatCount="indefinite" />
    <circle cx="64" cy="70" r="34" fill="${hood}" />
    <path d="M34 66 H94 V88 Q64 96 34 88 Z" fill="${skin}" />
    <path d="M34 66 H94 V76 Q64 84 34 76 Z" fill="${hood}" />
    <ellipse cx="51" cy="81" rx="4.5" ry="4" fill="#18181b">
      <animate attributeName="ry" values="4;4;0.5;4;4" dur="3.4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="77" cy="81" rx="4.5" ry="4" fill="#18181b">
      <animate attributeName="ry" values="4;4;0.5;4;4" dur="3.4s" repeatCount="indefinite" />
    </ellipse>
    <path d="M56 92 Q64 96 72 92" stroke="#18181b" stroke-width="3" fill="none" stroke-linecap="round" />
    <rect x="56" y="99" width="16" height="9" rx="4" fill="${hood}" />
    <g transform="rotate(0)">
      <path d="M108 24 l4 8 8 4 -8 4 -4 8 -4 -8 -8 -4 8 -4 Z" fill="#a1a1aa">
        <animateTransform attributeName="transform" type="rotate" values="0 112 36;360 112 36" dur="6s" repeatCount="indefinite" />
      </path>
    </g>
    <path d="M22 40 a8 8 0 0 1 8 8 M14 48 a8 8 0 0 1 8 8" stroke="#52525b" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.7" />
  </g>
</svg>`;
}
