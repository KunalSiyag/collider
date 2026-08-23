export interface AvatarHedgehogOptions {
  spike?: string;
  face?: string;
  size?: number;
}

export function createAvatarHedgehog(options: AvatarHedgehogOptions = {}): string {
  const { spike = '#78350f', face = '#fcd9b8', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hedgehog avatar">
  <rect width="128" height="128" rx="36" fill="#fbbf24" opacity="0.1" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="3s" repeatCount="indefinite" />
    <g fill="${spike}">
      <path d="M64 14 L74 34 H54 Z" /><path d="M36 22 L52 38 L34 44 Z" /><path d="M92 22 L76 38 L94 44 Z" />
      <path d="M18 46 L40 48 L26 62 Z" /><path d="M110 46 L88 48 L102 62 Z" />
      <path d="M14 72 L36 66 L30 82 Z" /><path d="M114 72 L92 66 L98 82 Z" />
      <path d="M22 96 L42 84 L42 100 Z" /><path d="M106 96 L86 84 L86 100 Z" />
    </g>
    <ellipse cx="64" cy="76" rx="38" ry="30" fill="${spike}" />
    <ellipse cx="70" cy="84" rx="27" ry="23" fill="${face}" />
    <circle cx="63" cy="80" r="4" fill="#1c1917">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.1s" repeatCount="indefinite" />
    </circle>
    <circle cx="85" cy="80" r="4" fill="#1c1917">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.1s" repeatCount="indefinite" />
    </circle>
    <ellipse cx="74" cy="90" rx="5.5" ry="4.5" fill="#1c1917" />
    <path d="M74 94 Q70 99 65 96 M74 94 Q78 99 83 96" stroke="#1c1917" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <ellipse cx="55" cy="90" rx="5" ry="3.5" fill="#fb7185" opacity="0.45" />
    <ellipse cx="93" cy="90" rx="5" ry="3.5" fill="#fb7185" opacity="0.45" />
  </g>
</svg>`;
}
