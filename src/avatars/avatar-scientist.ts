export interface AvatarScientistOptions {
  hair?: string;
  goggles?: string;
  size?: number;
}

export function createAvatarScientist(options: AvatarScientistOptions = {}): string {
  const { hair = '#a1a1aa', goggles = '#22d3ee', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scientist avatar">
  <rect width="128" height="128" rx="36" fill="#4ade80" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="2.9s" repeatCount="indefinite" />
    <ellipse cx="64" cy="86" rx="28" ry="25" fill="#fcd9b8" />
    <path d="M36 62 Q38 38 64 38 Q90 38 92 62 L88 66 Q64 58 40 66 Z" fill="${hair}" />
    <path d="M92 60 q10 -14 4 -24 q12 6 6 22 Z" fill="${hair}" />
    <circle cx="51" cy="80" r="9.5" fill="#e0f2fe" stroke="${goggles}" stroke-width="3" />
    <circle cx="79" cy="80" r="9.5" fill="#e0f2fe" stroke="${goggles}" stroke-width="3" />
    <path d="M60 79 h10" stroke="${goggles}" stroke-width="3.5" />
    <circle cx="48" cy="77" r="2.5" fill="#ffffff" />
    <circle cx="76" cy="77" r="2.5" fill="#ffffff" />
    <path d="M57 98 Q64 104 71 98" stroke="#18181b" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M28 108 h16 M36 104 v8 M32 112 v-8" stroke="${goggles}" stroke-width="3" stroke-linecap="round">
      <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
    </path>
  </g>
</svg>`;
}
