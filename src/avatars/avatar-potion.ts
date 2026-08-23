export interface AvatarPotionOptions {
  brew?: string;
  glass?: string;
  size?: number;
}

export function createAvatarPotion(options: AvatarPotionOptions = {}): string {
  const { brew = '#22c55e', glass = '#a5f3fc', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Potion avatar">
  <rect width="128" height="128" rx="36" fill="#4ade80" opacity="0.1" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3s" repeatCount="indefinite" />
    <rect x="52" y="14" width="24" height="26" rx="4" fill="#d6d3d1" />
    <path d="M52 40 Q30 56 28 78 Q26 106 64 108 Q102 106 100 78 Q98 56 76 40 Z" fill="${glass}" opacity="0.35" stroke="#67e8f9" stroke-width="3" />
    <path d="M34 72 Q64 62 94 74 Q96 104 64 106 Q32 104 34 72 Z" fill="${brew}">
      <animate attributeName="d" values="M34 72 Q64 62 94 74 Q96 104 64 106 Q32 104 34 72 Z;M34 70 Q64 66 94 72 Q96 104 64 106 Q32 104 34 70 Z;M34 72 Q64 62 94 74 Q96 104 64 106 Q32 104 34 72 Z" dur="3s" repeatCount="indefinite" />
    </path>
    <circle cx="52" cy="86" r="3" fill="#bbf7d0"><animate attributeName="cy" values="88;80;88" dur="2.6s" repeatCount="indefinite" /></circle>
    <circle cx="76" cy="90" r="2.5" fill="#bbf7d0"><animate attributeName="cy" values="92;82;92" dur="2.6s" begin="-1s" repeatCount="indefinite" /></circle>
    <ellipse cx="53" cy="84" rx="5.5" ry="5.5" fill="#052e16">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.2s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="53" cy="85" rx="5.5" ry="5.5" fill="#052e16" />
    <ellipse cx="75" cy="84" rx="5.5" ry="5.5" fill="#052e16">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.2s" begin="-0.4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="75" cy="85" rx="5.5" ry="5.5" fill="#052e16" />
    <path d="M57 95 Q64 100 71 95" stroke="#052e16" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M20 112 l2.5 5 5 2.5 -5 2.5 -2.5 5 -2.5 -5 -5 -2.5 5 -2.5 Z" fill="#fde047" transform="scale(0.8) translate(5 28)">
      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
    </path>
  </g>
</svg>`;
}
