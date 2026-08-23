export interface AvatarRainbowOptions {
  colors?: string[];
  size?: number;
}

export function createAvatarRainbow(options: AvatarRainbowOptions = {}): string {
  const { colors = ['#fb7185', '#fbbf24', '#4ade80', '#22d3ee'], size = 128 } = options;

  const bands = colors
    .map((c, i) => `<path d="M${20 + i * 9} 104 A${44 - i * 9} ${44 - i * 9} 0 0 1 ${108 - i * 9} 104" stroke="${c}" stroke-width="9" fill="none" />`)
    .join('\n  ');

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rainbow avatar">
  <rect width="128" height="128" rx="36" fill="#38bdf8" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3.8s" repeatCount="indefinite" />
  ${bands}
  </g>
  <g>
    <ellipse cx="36" cy="106" rx="17" ry="10" fill="#f8fafc">
      <animate attributeName="cy" values="106;103;106" dur="3s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="94" cy="106" rx="17" ry="10" fill="#f8fafc">
      <animate attributeName="cy" values="106;103;106" dur="3s" begin="-1.5s" repeatCount="indefinite" />
    </ellipse>
    <circle cx="31" cy="105" r="2.5" fill="#334155"><animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" /></circle>
    <circle cx="31" cy="106" r="2.5" fill="#334155" />
    <circle cx="41" cy="105" r="2.5" fill="#334155"><animate attributeName="ry" values="1;1;0;1;1" dur="4s" begin="-0.4s" repeatCount="indefinite" /></circle>
    <circle cx="41" cy="106" r="2.5" fill="#334155" />
    <circle cx="89" cy="105" r="2.5" fill="#334155" />
    <circle cx="99" cy="105" r="2.5" fill="#334155" />
    <path d="M35 109 q3 3 6 0 M95 109 q3 3 6 0" stroke="#334155" stroke-width="2" fill="none" stroke-linecap="round" />
    <circle cx="64" cy="30" r="9" fill="#fde047" opacity="0.85">
      <animate attributeName="opacity" values="0.85;0.4;0.85" dur="2.6s" repeatCount="indefinite" />
    </circle>
  </g>
</svg>`;
}
