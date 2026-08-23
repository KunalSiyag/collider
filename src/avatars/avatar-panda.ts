export interface AvatarPandaOptions {
  size?: number;
}

export function createAvatarPanda(options: AvatarPandaOptions = {}): string {
  const { size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Panda avatar">
  <rect width="128" height="128" rx="36" fill="#22d3ee" opacity="0.1" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="3s" repeatCount="indefinite" />
    <circle cx="34" cy="34" r="13" fill="#27272a" />
    <circle cx="94" cy="34" r="13" fill="#27272a" />
    <circle cx="36" cy="36" r="6" fill="#f4f4f5" />
    <circle cx="92" cy="36" r="6" fill="#f4f4f5" />
    <ellipse cx="64" cy="76" rx="38" ry="33" fill="#fafafa" />
    <ellipse cx="46" cy="68" rx="10" ry="12" fill="#27272a" transform="rotate(-14 46 68)" />
    <ellipse cx="82" cy="68" rx="10" ry="12" fill="#27272a" transform="rotate(14 82 68)" />
    <circle cx="48" cy="69" r="4" fill="#ffffff">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle cx="80" cy="69" r="4" fill="#ffffff">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" />
    </circle>
    <ellipse cx="64" cy="84" rx="7" ry="5.5" fill="#27272a" />
    <path d="M64 89 Q58 96 52 92 M64 89 Q70 96 76 92" stroke="#27272a" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <ellipse cx="64" cy="98" rx="14" ry="9" fill="#18181b" opacity="0.08" />
    <path d="M30 100 q-8 6 -4 14 M98 100 q8 6 4 14" stroke="#27272a" stroke-width="5" fill="none" stroke-linecap="round" />
  </g>
</svg>`;
}
