export interface AvatarWerewolfOptions {
  fur?: string;
  snout?: string;
  size?: number;
}

export function createAvatarWerewolf(options: AvatarWerewolfOptions = {}): string {
  const { fur = '#57534e', snout = '#a8a29e', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Werewolf avatar">
  <rect width="128" height="128" rx="36" fill="#fbbf24" opacity="0.09" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3.6s" repeatCount="indefinite" />
    <path d="M32 46 L24 16 L52 32 Z" fill="${fur}">
      <animateTransform attributeName="transform" type="rotate" values="0 38 32;-8 38 32;0 38 32" dur="3.8s" repeatCount="indefinite" additive="sum" />
    </path>
    <path d="M96 46 L104 16 L76 32 Z" fill="${fur}">
      <animateTransform attributeName="transform" type="rotate" values="0 90 32;8 90 32;0 90 32" dur="3.8s" begin="-1s" repeatCount="indefinite" additive="sum" />
    </path>
    <ellipse cx="64" cy="76" rx="37" ry="33" fill="${fur}" />
    <ellipse cx="64" cy="90" rx="17" ry="13" fill="${snout}" />
    <ellipse cx="51" cy="68" rx="5" ry="5.5" fill="#fef08a">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.6s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="77" cy="68" rx="5" ry="5.5" fill="#fef08a">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.6s" repeatCount="indefinite" />
    </ellipse>
    <circle cx="51" cy="68" r="2" fill="#111827" /><circle cx="77" cy="68" r="2" fill="#111827" />
    <ellipse cx="64" cy="87" rx="6" ry="4.5" fill="#1c1917" />
    <path d="M56 93 h16 l-8 6 Z" fill="#1c1917" opacity="0.15" />
    <path d="M59 94 l1.5 6 M69 94 l-1.5 6" stroke="#fafafa" stroke-width="2.5" stroke-linecap="round" />
    <path d="M64 97 q-4 4 -9 2 M64 97 q4 4 9 2" stroke="#1c1917" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <circle cx="108" cy="30" r="9" fill="#fde047" opacity="0.9">
      <animate attributeName="r" values="9;7.5;9" dur="3s" repeatCount="indefinite" />
    </circle>
  </g>
</svg>`;
}
