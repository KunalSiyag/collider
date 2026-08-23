export interface AvatarGoblinOptions {
  skin?: string;
  size?: number;
}

export function createAvatarGoblin(options: AvatarGoblinOptions = {}): string {
  const { skin = '#65a30d', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Goblin avatar">
  <rect width="128" height="128" rx="36" fill="#65a30d" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3.2s" repeatCount="indefinite" />
    <ellipse cx="26" cy="62" rx="12" ry="19" fill="${skin}" transform="rotate(24 26 62)">
      <animate attributeName="rx" values="12;13;12" dur="2.8s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="102" cy="62" rx="12" ry="19" fill="${skin}" transform="rotate(-24 102 62)">
      <animate attributeName="rx" values="12;13;12" dur="2.8s" begin="-1s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="64" cy="70" rx="32" ry="29" fill="${skin}" />
    <path d="M48 48 Q64 38 80 48 L76 54 Q64 46 52 54 Z" fill="#365314" />
    <circle cx="52" cy="66" r="6.5" fill="#fde047" />
    <circle cx="76" cy="66" r="6.5" fill="#fde047" />
    <circle cx="53" cy="67" r="2.8" fill="#111827">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="77" cy="67" r="2.8" fill="#111827">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.2s" begin="-0.5s" repeatCount="indefinite" />
    </circle>
    <path d="M58 76 h12" stroke="#365314" stroke-width="3" stroke-linecap="round" />
    <path d="M52 84 Q64 94 76 84 L73 90 Q64 96 55 90 Z" fill="#f8fafc" />
    <path d="M58 87 l2 4 M70 87 l-2 4" stroke="#334155" stroke-width="2" stroke-linecap="round" />
    <ellipse cx="42" cy="76" rx="4.5" ry="3" fill="#a3e635" opacity="0.7" />
    <ellipse cx="86" cy="76" rx="4.5" ry="3" fill="#a3e635" opacity="0.7" />
  </g>
</svg>`;
}
