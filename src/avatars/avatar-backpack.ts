export interface AvatarBackpackOptions {
  body?: string;
  pocket?: string;
  size?: number;
}

export function createAvatarBackpack(options: AvatarBackpackOptions = {}): string {
  const { body = '#7c3aed', pocket = '#a78bfa', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Backpack avatar">
  <rect width="128" height="128" rx="36" fill="#8b5cf6" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3s" repeatCount="indefinite" />
    <path d="M40 34 Q40 18 64 18 Q88 18 88 34" stroke="#5b21b6" stroke-width="9" fill="none" stroke-linecap="round" />
    <rect x="26" y="30" width="76" height="82" rx="22" fill="${body}" />
    <rect x="38" y="70" width="52" height="36" rx="12" fill="${pocket}" />
    <path d="M38 84 h52" stroke="#6d28d9" stroke-width="3" opacity="0.6" />
    <rect x="56" y="80" width="16" height="12" rx="4" fill="#fde047" />
    <circle cx="53" cy="58" r="5.5" fill="#ffffff">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="53" cy="59" r="5.5" fill="#ffffff" />
    <circle cx="54.5" cy="57" r="1.8" fill="#312e81" />
    <circle cx="75" cy="58" r="5.5" fill="#ffffff">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.2s" begin="-0.4s" repeatCount="indefinite" />
    </circle>
    <circle cx="75" cy="59" r="5.5" fill="#ffffff" />
    <circle cx="76.5" cy="57" r="1.8" fill="#312e81" />
    <path d="M57 68 Q64 73 71 68" stroke="#312e81" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <rect x="20" y="52" width="10" height="26" rx="5" fill="#5b21b6" />
    <rect x="98" y="52" width="10" height="26" rx="5" fill="#5b21b6" />
    <circle cx="106" cy="26" r="3" fill="#fde047"><animate attributeName="r" values="3;2;3" dur="2.2s" repeatCount="indefinite" /></circle>
  </g>
</svg>`;
}
