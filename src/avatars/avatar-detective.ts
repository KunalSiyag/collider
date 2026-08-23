export interface AvatarDetectiveOptions {
  coat?: string;
  skin?: string;
  size?: number;
}

export function createAvatarDetective(options: AvatarDetectiveOptions = {}): string {
  const { coat = '#78350f', skin = '#fcd9b8', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Detective avatar">
  <rect width="128" height="128" rx="36" fill="#f59e0b" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="3.2s" repeatCount="indefinite" />
    <ellipse cx="64" cy="82" rx="29" ry="26" fill="${skin}" />
    <path d="M34 58 Q34 36 64 36 Q94 36 94 58 L100 62 L28 62 Z" fill="${coat}" />
    <path d="M34 56 H94 V64 Q64 56 34 64 Z" fill="${coat}" stroke="#5c2c06" stroke-width="2" />
    <ellipse cx="64" cy="60" rx="34" ry="6" fill="#5c2c06" />
    <circle cx="52" cy="80" r="4" fill="#18181b" />
    <circle cx="76" cy="80" r="4" fill="#18181b" />
    <path d="M44 74 h16 M68 74 h16" stroke="#5c2c06" stroke-width="4" stroke-linecap="round" opacity="0.7" />
    <path d="M57 95 Q64 100 71 95" stroke="#18181b" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <circle cx="96" cy="98" r="5" fill="#a16207" />
    <path d="M100 94 q8 -8 4 -16 q10 2 6 12" stroke="#d4d4d8" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.15;0.8" dur="2.4s" repeatCount="indefinite" />
    </path>
  </g>
</svg>`;
}
