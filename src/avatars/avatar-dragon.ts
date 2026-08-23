export interface AvatarDragonOptions {
  scale?: string;
  belly?: string;
  size?: number;
}

export function createAvatarDragon(options: AvatarDragonOptions = {}): string {
  const { scale = '#22c55e', belly = '#bbf7d0', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dragon avatar">
  <rect width="128" height="128" rx="36" fill="#f97316" opacity="0.1" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3.3s" repeatCount="indefinite" />
    <path d="M34 40 Q20 24 30 12 Q36 26 46 30 Z" fill="${scale}" />
    <path d="M94 40 Q108 24 98 12 Q92 26 82 30 Z" fill="${scale}" />
    <path d="M38 38 Q28 28 33 18 Q39 27 45 31 Z" fill="${belly}" opacity="0" />
    <ellipse cx="64" cy="76" rx="37" ry="32" fill="${scale}" />
    <ellipse cx="64" cy="90" rx="19" ry="14" fill="${belly}" />
    <circle cx="51" cy="70" r="5" fill="#052e16">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.4s" repeatCount="indefinite" />
    </circle>
    <circle cx="77" cy="70" r="5" fill="#052e16">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.4s" repeatCount="indefinite" />
    </circle>
    <path d="M60 78 h8 l-4 4 Z" fill="#166534" transform="rotate(90 64 80)" />
    <path d="M64 84 q-6 6 -12 3 M64 84 q6 6 12 3" stroke="#14532d" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <g stroke="#f97316" stroke-width="3" fill="none" stroke-linecap="round">
      <path d="M100 96 q10 -2 12 -10"><animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" /></path>
      <path d="M102 102 q14 -2 16 -14"><animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" /></path>
    </g>
    <g fill="#86efac"><circle cx="44" cy="52" r="2.5" /><circle cx="84" cy="52" r="2.5" /></g>
  </g>
</svg>`;
}
