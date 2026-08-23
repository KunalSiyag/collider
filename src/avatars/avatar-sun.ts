export interface AvatarSunOptions {
  core?: string;
  ray?: string;
  size?: number;
}

export function createAvatarSun(options: AvatarSunOptions = {}): string {
  const { core = '#fbbf24', ray = '#f97316', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sun avatar">
  <rect width="128" height="128" rx="36" fill="#fbbf24" opacity="0.15" />
  <g>
    <animateTransform attributeName="transform" type="rotate" values="0 64 64;360 64 64" dur="24s" repeatCount="indefinite" />
    <g stroke="${ray}" stroke-width="6" stroke-linecap="round">
      <line x1="64" y1="6" x2="64" y2="20" /><line x1="64" y1="108" x2="64" y2="122" />
      <line x1="6" y1="64" x2="20" y2="64" /><line x1="108" y1="64" x2="122" y2="64" />
      <line x1="23" y1="23" x2="33" y2="33" /><line x1="95" y1="95" x2="105" y2="105" />
      <line x1="105" y1="23" x2="95" y2="33" /><line x1="33" y1="95" x2="23" y2="105" />
    </g>
  </g>
  <circle cx="64" cy="64" r="36" fill="${core}" />
  <circle cx="53" cy="60" r="5" fill="#7c2d12">
    <animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" />
  </circle>
  <circle cx="53" cy="60" r="5" fill="#7c2d12" />
  <circle cx="75" cy="60" r="5" fill="#7c2d12">
    <animate attributeName="ry" values="1;1;0;1;1" dur="4s" begin="-0.4s" repeatCount="indefinite" />
  </circle>
  <circle cx="75" cy="60" r="5" fill="#7c2d12" />
  <path d="M50 76 Q64 88 78 76" stroke="#7c2d12" stroke-width="4" fill="none" stroke-linecap="round" />
  <ellipse cx="44" cy="70" rx="5" ry="3.5" fill="#fb7185" opacity="0.45" />
  <ellipse cx="84" cy="70" rx="5" ry="3.5" fill="#fb7185" opacity="0.45" />
</svg>`;
}
