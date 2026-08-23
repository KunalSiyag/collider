export interface AvatarFarmerOptions {
  straw?: string;
  skin?: string;
  size?: number;
}

export function createAvatarFarmer(options: AvatarFarmerOptions = {}): string {
  const { straw = '#eab308', skin = '#fcd9b8', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Farmer avatar">
  <rect width="128" height="128" rx="36" fill="#4ade80" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="3.1s" repeatCount="indefinite" />
    <ellipse cx="64" cy="86" rx="29" ry="25" fill="${skin}" />
    <ellipse cx="64" cy="60" rx="46" ry="10" fill="${straw}" />
    <path d="M40 60 Q40 34 64 34 Q88 34 88 60 Z" fill="#facc15" />
    <path d="M40 52 h48 M42 45 h44 M46 39 h36" stroke="#ca8a04" stroke-width="2.5" />
    <circle cx="53" cy="83" r="4" fill="#18181b" />
    <circle cx="75" cy="83" r="4" fill="#18181b" />
    <path d="M57 96 Q64 101 71 96" stroke="#18181b" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <g fill="#fb7185" opacity="0.55">
      <circle cx="44" cy="90" r="1.6" /><circle cx="49" cy="93" r="1.6" /><circle cx="46" cy="96" r="1.6" />
      <circle cx="84" cy="90" r="1.6" /><circle cx="79" cy="93" r="1.6" /><circle cx="82" cy="96" r="1.6" />
    </g>
    <path d="M106 78 q6 8 0 16 M112 74 q8 10 0 22" stroke="#4ade80" stroke-width="3.5" fill="none" stroke-linecap="round">
      <animate attributeName="opacity" values="1;0.4;1" dur="3s" repeatCount="indefinite" />
    </path>
  </g>
</svg>`;
}
