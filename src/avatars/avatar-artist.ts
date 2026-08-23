export interface AvatarArtistOptions {
  beret?: string;
  smock?: string;
  size?: number;
}

export function createAvatarArtist(options: AvatarArtistOptions = {}): string {
  const { beret = '#dc2626', smock = '#22d3ee', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Artist avatar">
  <rect width="128" height="128" rx="36" fill="#f472b6" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="2.8s" repeatCount="indefinite" />
    <ellipse cx="64" cy="86" rx="28" ry="25" fill="#fcd9b8" />
    <path d="M36 60 Q36 40 62 38 Q90 36 92 58 Q94 66 86 66 Q88 52 74 50 Q80 58 70 58 Q54 54 46 62 Z" fill="#a16207" />
    <path d="M30 52 Q44 26 78 32 Q96 36 92 54 Q72 42 46 50 Q34 54 30 52 Z" fill="${beret}" />
    <circle cx="82" cy="34" r="4" fill="${beret}" />
    <circle cx="53" cy="83" r="4" fill="#18181b" />
    <circle cx="75" cy="83" r="4" fill="#18181b" />
    <path d="M57 97 Q64 102 71 97" stroke="#18181b" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M100 100 l16 -16 M104 104 q8 -2 12 -12 l4 -6" stroke="#a16207" stroke-width="4" stroke-linecap="round" />
    <path d="M112 84 c6 -6 10 -4 8 2 c-2 5 -8 4 -8 2 Z" fill="#8b5cf6">
      <animate attributeName="fill" values="#8b5cf6;#f472b6;#fbbf24;#8b5cf6" dur="3.6s" repeatCount="indefinite" />
    </path>
    <path d="M20 106 a8 8 0 0 1 16 0" fill="#fbbf24" />
    <path d="M28 106 h16" stroke="#fb7185" stroke-width="4" stroke-linecap="round" />
  </g>
</svg>`;
}
