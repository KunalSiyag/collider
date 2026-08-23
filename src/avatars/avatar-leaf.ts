export interface AvatarLeafOptions {
  leaf?: string;
  vein?: string;
  size?: number;
}

export function createAvatarLeaf(options: AvatarLeafOptions = {}): string {
  const { leaf = '#f59e0b', vein = '#b45309', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Leaf avatar">
  <rect width="128" height="128" rx="36" fill="#f97316" opacity="0.1" />
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-6 64 70;6 64 70;-6 64 70" dur="4.4s" repeatCount="indefinite" />
    <path d="M64 108 Q64 96 64 88 M64 92 q-14 -2 -18 -12 q14 2 18 12 M64 100 q14 -2 18 -12 q-14 2 -18 12" stroke="${vein}" stroke-width="5" fill="none" stroke-linecap="round" />
    <path d="M20 84 Q16 40 52 22 Q66 15 76 24 Q104 46 98 78 Q94 100 68 106 Q38 112 20 84 Z" fill="${leaf}" />
    <path d="M28 80 Q34 48 62 30" stroke="${vein}" stroke-width="5" fill="none" stroke-linecap="round" />
    <g stroke="${vein}" stroke-width="3.5" stroke-linecap="round" opacity="0.75">
      <line x1="42" y1="70" x2="58" y2="58" /><line x1="54" y1="86" x2="72" y2="72" />
      <line x1="60" y1="50" x2="74" y2="44" /><line x1="74" y1="90" x2="88" y2="76" />
    </g>
    <circle cx="49" cy="66" r="5" fill="#451a03">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle cx="49" cy="67" r="5" fill="#451a03" />
    <circle cx="77" cy="66" r="5" fill="#451a03">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" begin="-0.4s" repeatCount="indefinite" />
    </circle>
    <circle cx="77" cy="67" r="5" fill="#451a03" />
    <path d="M56 79 Q63 85 70 79" stroke="#451a03" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <ellipse cx="41" cy="77" rx="4.5" ry="3" fill="#fb7185" opacity="0.45" />
    <ellipse cx="85" cy="77" rx="4.5" ry="3" fill="#fb7185" opacity="0.45" />
    <g fill="#fb923c"><ellipse cx="16" cy="112" rx="6" ry="3" transform="rotate(-20 16 112)" /><ellipse cx="110" cy="116" rx="6" ry="3" transform="rotate(16 110 116)" /></g>
  </g>
</svg>`;
}
