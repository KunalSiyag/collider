export interface AvatarBearOptions {
  fur?: string;
  muzzle?: string;
  size?: number;
}

export function createAvatarBear(options: AvatarBearOptions = {}): string {
  const { fur = '#a16207', muzzle = '#d6a35c', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bear avatar">
  <rect width="128" height="128" rx="36" fill="#a16207" opacity="0.13" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="3.1s" repeatCount="indefinite" />
    <circle cx="32" cy="32" r="15" fill="${fur}" />
    <circle cx="96" cy="32" r="15" fill="${fur}" />
    <circle cx="32" cy="32" r="7" fill="${muzzle}" />
    <circle cx="96" cy="32" r="7" fill="${muzzle}" />
    <ellipse cx="64" cy="78" rx="38" ry="33" fill="${fur}" />
    <ellipse cx="64" cy="90" rx="18" ry="13" fill="${muzzle}" />
    <ellipse cx="52" cy="72" rx="4.5" ry="5" fill="#1c1917">
      <animate attributeName="ry" values="5;5;0.5;5;5" dur="3.8s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="76" cy="72" rx="4.5" ry="5" fill="#1c1917">
      <animate attributeName="ry" values="5;5;0.5;5;5" dur="3.8s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="64" cy="86" rx="6" ry="4.5" fill="#1c1917" />
    <path d="M64 90 Q59 96 54 93 M64 90 Q69 96 74 93" stroke="#1c1917" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <path d="M42 60 q-6 4 -4 10 M86 60 q6 4 4 10" stroke="#7c4a04" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.6" />
  </g>
</svg>`;
}
