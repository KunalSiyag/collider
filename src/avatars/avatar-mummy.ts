export interface AvatarMummyOptions {
  wrap?: string;
  bandage?: string;
  size?: number;
}

export function createAvatarMummy(options: AvatarMummyOptions = {}): string {
  const { wrap = '#e7e5e4', bandage = '#a8a29e', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mummy avatar">
  <rect width="128" height="128" rx="36" fill="#fbbf24" opacity="0.09" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="3.9s" repeatCount="indefinite" />
    <ellipse cx="64" cy="72" rx="35" ry="36" fill="${wrap}" />
    <g stroke="${bandage}" stroke-width="3.5" fill="none">
      <path d="M32 56 Q64 66 97 50" /><path d="M30 70 Q64 80 99 66" />
      <path d="M33 86 Q64 92 97 82" /><path d="M40 100 Q64 106 91 98" />
      <path d="M46 40 Q52 58 44 76 M84 38 Q76 56 86 74" />
      <path d="M64 37 Q58 55 66 72 Q60 90 68 107" />
    </g>
    <rect x="40" y="60" width="20" height="13" rx="4" fill="#292524" transform="rotate(-4 50 66)" />
    <rect x="70" y="63" width="19" height="12" rx="4" fill="#292524" transform="rotate(3 79 69)" />
    <circle cx="49" cy="67" r="3.5" fill="#22d3ee">
      <animate attributeName="opacity" values="1;0.2;1" dur="2.6s" repeatCount="indefinite" />
    </circle>
    <circle cx="80" cy="70" r="3.5" fill="#22d3ee">
      <animate attributeName="opacity" values="1;0.2;1" dur="2.6s" begin="-1.3s" repeatCount="indefinite" />
    </circle>
    <path d="M56 90 q8 -4 16 0" stroke="#57534e" stroke-width="3" fill="none" stroke-linecap="round" />
    <path d="M104 108 q10 -18 -4 -28" stroke="${wrap}" stroke-width="6" fill="none" stroke-linecap="round" />
    <path d="M100 96 l-8 4 M103 103 l-9 2" stroke="${bandage}" stroke-width="3" stroke-linecap="round" />
  </g>
</svg>`;
}
