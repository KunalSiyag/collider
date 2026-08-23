export interface AvatarPirateOptions {
  bandana?: string;
  skin?: string;
  size?: number;
}

export function createAvatarPirate(options: AvatarPirateOptions = {}): string {
  const { bandana = '#dc2626', skin = '#fcd9b8', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pirate avatar">
  <rect width="128" height="128" rx="36" fill="#dc2626" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="3s" repeatCount="indefinite" />
    <ellipse cx="64" cy="80" rx="31" ry="29" fill="${skin}" />
    <path d="M33 62 Q35 34 64 33 Q93 34 95 62 L94 68 Q64 58 34 68 Z" fill="${bandana}" />
    <path d="M94 60 L112 70 L96 74 Z" fill="${bandana}" />
    <circle cx="51" cy="79" r="4.5" fill="#18181b" />
    <path d="M67 77 L89 77 M69 83 L87 83" stroke="#18181b" stroke-width="3.5" stroke-linecap="round" />
    <path d="M55 94 Q64 101 73 94" stroke="#18181b" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <circle cx="97" cy="88" r="3.5" fill="#fbbf24" stroke="#a16207" stroke-width="1.5" />
    <path d="M42 92 Q47 97 45 102 M49 95 Q53 100 52 104" stroke="#57534e" stroke-width="2" fill="none" stroke-linecap="round" />
    <path d="M82 92 Q87 96 86 101" stroke="#57534e" stroke-width="2" fill="none" stroke-linecap="round" />
  </g>
</svg>`;
}
