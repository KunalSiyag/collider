export interface AvatarRobotOptions {
  body?: string;
  accent?: string;
  size?: number;
}

export function createAvatarRobot(options: AvatarRobotOptions = {}): string {
  const { body = '#a1a1aa', accent = '#22d3ee', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Robot avatar">
  <rect width="128" height="128" rx="36" fill="${accent}" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="2.8s" repeatCount="indefinite" />
    <line x1="64" y1="26" x2="64" y2="14" stroke="${body}" stroke-width="4" />
    <circle cx="64" cy="12" r="5" fill="${accent}">
      <animate attributeName="opacity" values="1;0.35;1" dur="1.6s" repeatCount="indefinite" />
    </circle>
    <rect x="26" y="26" width="76" height="72" rx="16" fill="${body}" />
    <rect x="36" y="40" width="56" height="30" rx="10" fill="#09090b" />
    <circle cx="51" cy="55" r="7" fill="${accent}" />
    <circle cx="77" cy="55" r="7" fill="${accent}" />
    <rect x="44" y="82" width="40" height="7" rx="3.5" fill="#09090b" />
    <rect x="18" y="54" width="8" height="18" rx="4" fill="${body}" />
    <rect x="102" y="54" width="8" height="18" rx="4" fill="${body}" />
  </g>
</svg>`;
}
