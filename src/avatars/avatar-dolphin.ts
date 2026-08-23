export interface AvatarDolphinOptions {
  body?: string;
  belly?: string;
  size?: number;
}

export function createAvatarDolphin(options: AvatarDolphinOptions = {}): string {
  const { body = '#38bdf8', belly = '#e0f2fe', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dolphin avatar">
  <rect width="128" height="128" rx="36" fill="#22d3ee" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 3; 0 -2" dur="3s" repeatCount="indefinite" />
    <path d="M60 26 Q56 12 70 14 Q66 18 70 24 Z" fill="${body}" />
    <path d="M20 74 Q20 40 62 38 Q102 40 106 68 L118 84 L98 82 Q92 100 66 102 Q30 102 20 74 Z" fill="${body}" />
    <path d="M30 94 Q54 102 92 88 Q80 100 62 101 Q40 100 30 94 Z" fill="${belly}" opacity="0.9" />
    <circle cx="46" cy="66" r="5" fill="#082f49">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle cx="46" cy="66" r="5" fill="#082f49" />
    <path d="M30 80 q6 6 16 3" stroke="#082f49" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M58 84 q-8 8 -18 6 l8 10 Z" fill="#0ea5e9" />
    <path d="M88 56 q8 8 4 18" stroke="#0369a1" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.6" />
    <g stroke="#a5f3fc" stroke-width="3" fill="none" stroke-linecap="round">
      <path d="M14 108 q6 -8 12 0"><animate attributeName="opacity" values="1;0.3;1" dur="2.4s" repeatCount="indefinite" /></path>
      <path d="M104 110 q6 -8 12 0"><animate attributeName="opacity" values="0.3;1;0.3" dur="2.4s" repeatCount="indefinite" /></path>
    </g>
  </g>
</svg>`;
}
