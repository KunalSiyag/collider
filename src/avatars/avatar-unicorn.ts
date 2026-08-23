export interface AvatarUnicornOptions {
  mane?: string;
  horn?: string;
  size?: number;
}

export function createAvatarUnicorn(options: AvatarUnicornOptions = {}): string {
  const { mane = '#a855f7', horn = '#fbbf24', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Unicorn avatar">
  <rect width="128" height="128" rx="36" fill="#8b5cf6" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="2.7s" repeatCount="indefinite" />
    <path d="M40 52 L30 30 L50 40 Z" fill="#f5d0fe" />
    <path d="M88 52 L98 30 L78 40 Z" fill="#f5d0fe" />
    <path d="M64 34 L58 8 L70 8 Z" fill="${horn}" />
    <path d="M61 22 h8 M60 15 h8" stroke="#b45309" stroke-width="1.8" />
    <path d="M52 40 Q40 30 34 44 Q28 60 40 66 Z" fill="#e879f9">
      <animate attributeName="fill" values="#e879f9;#67e8f9;#fbbf24;#e879f9" dur="4s" repeatCount="indefinite" />
    </path>
    <path d="M76 40 Q88 30 94 44 Q100 60 88 66 Z" fill="#c084fc">
      <animate attributeName="fill" values="#c084fc;#4ade80;#f472b6;#c084fc" dur="4s" begin="-2s" repeatCount="indefinite" />
    </path>
    <ellipse cx="64" cy="76" rx="35" ry="31" fill="#faf5ff" />
    <ellipse cx="51" cy="70" rx="4.5" ry="5" fill="#3b0764">
      <animate attributeName="ry" values="5;5;0.5;5;5" dur="4.2s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="77" cy="70" rx="4.5" ry="5" fill="#3b0764">
      <animate attributeName="ry" values="5;5;0.5;5;5" dur="4.2s" repeatCount="indefinite" />
    </ellipse>
    <path d="M62 78 l2 3 l2 -3" stroke="#c084fc" stroke-width="2.5" fill="none" stroke-linecap="round" transform="rotate(180 64 79)" />
    <ellipse cx="64" cy="86" rx="4" ry="3" fill="#e879f9" />
    <path d="M64 89 Q59 95 54 92 M64 89 Q69 95 74 92" stroke="#d8b4fe" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <ellipse cx="40" cy="80" rx="5.5" ry="4" fill="#f0abfc" opacity="0.6" />
    <ellipse cx="88" cy="80" rx="5.5" ry="4" fill="#f0abfc" opacity="0.6" />
    <path d="M14 108 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 Z" fill="#67e8f9" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.6s" repeatCount="indefinite" />
    </path>
  </g>
</svg>`;
}
