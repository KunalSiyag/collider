export interface AvatarEggOptions {
  shell?: string;
  pattern?: string;
  size?: number;
}

export function createAvatarEgg(options: AvatarEggOptions = {}): string {
  const { shell = '#fdf2f8', pattern = '#22d3ee', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Egg avatar">
  <rect width="128" height="128" rx="36" fill="#f472b6" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-3 64 70;3 64 70;-3 64 70" dur="4.2s" repeatCount="indefinite" />
    <path d="M64 14 C90 14 104 48 104 74 C104 100 86 114 64 114 C42 114 24 100 24 74 C24 48 38 14 64 14 Z" fill="${shell}" stroke="#e9d5ff" stroke-width="2" />
    <path d="M28 62 Q64 74 100 62" stroke="${pattern}" stroke-width="7" fill="none" stroke-linecap="round" />
    <path d="M34 88 Q64 98 94 88" stroke="#fbbf24" stroke-width="6" fill="none" stroke-linecap="round" />
    <circle cx="46" cy="40" r="4" fill="#f472b6" /><circle cx="82" cy="42" r="4" fill="#4ade80" /><circle cx="64" cy="30" r="3.5" fill="#fbbf24" />
    <ellipse cx="51" cy="70" rx="5" ry="6" fill="#1c1917" clip-path="url(#eggClip)">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="77" cy="70" rx="5" ry="6" fill="#1c1917" clip-path="url(#eggClip)">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" begin="-0.4s" repeatCount="indefinite" />
    </ellipse>
    <clipPath id="eggClip"><path d="M64 14 C90 14 104 48 104 74 C104 100 86 114 64 114 C42 114 24 100 24 74 C24 48 38 14 64 14 Z" /></clipPath>
    <path d="M57 84 Q64 89 71 84" stroke="#1c1917" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <ellipse cx="43" cy="79" rx="4.5" ry="3" fill="#fb7185" opacity="0.5" />
    <ellipse cx="85" cy="79" rx="4.5" ry="3" fill="#fb7185" opacity="0.5" />
  </g>
</svg>`;
}
