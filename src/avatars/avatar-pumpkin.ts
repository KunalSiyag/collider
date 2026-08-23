export interface AvatarPumpkinOptions {
  skin?: string;
  leaf?: string;
  size?: number;
}

export function createAvatarPumpkin(options: AvatarPumpkinOptions = {}): string {
  const { skin = '#f97316', leaf = '#4d7c0f', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pumpkin avatar">
  <rect width="128" height="128" rx="36" fill="#f97316" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3.2s" repeatCount="indefinite" />
    <path d="M64 28 q-2 -12 8 -16 M64 28 q-10 -10 -22 -6 q12 2 14 8" stroke="${leaf}" stroke-width="6" fill="none" stroke-linecap="round" />
    <ellipse cx="64" cy="74" rx="42" ry="36" fill="${skin}" />
    <ellipse cx="64" cy="74" rx="24" ry="35" fill="#ea580c" opacity="0.55" />
    <path d="M32 52 Q26 74 32 96 M96 52 Q102 74 96 96" stroke="#ea580c" stroke-width="3" fill="none" opacity="0.6" />
    <path d="M42 62 l14 8 l-14 8 Z M86 62 l-14 8 l14 8 Z" fill="#fef08a">
      <animate attributeName="opacity" values="1;0.75;1" dur="2.2s" repeatCount="indefinite" />
    </path>
    <path d="M50 84 L56 94 L62 87 L68 94 L74 87 L80 94 L78 84 Z" fill="#fef08a" />
    <path d="M50 84 L78 84" stroke="#ea580c" stroke-width="2" opacity="0.6" />
  </g>
</svg>`;
}
