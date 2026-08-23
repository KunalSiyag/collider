export interface AvatarCameraOptions {
  body?: string;
  lens?: string;
  size?: number;
}

export function createAvatarCamera(options: AvatarCameraOptions = {}): string {
  const { body = '#334155', lens = '#22d3ee', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Camera avatar">
  <rect width="128" height="128" rx="36" fill="#22d3ee" opacity="0.1" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3s" repeatCount="indefinite" />
    <rect x="18" y="40" width="92" height="60" rx="14" fill="${body}" />
    <path d="M46 40 L52 28 H76 L82 40 Z" fill="#475569" />
    <circle cx="100" cy="54" r="5" fill="#fbbf24">
      <animate attributeName="opacity" values="1;0.25;1" dur="1.6s" repeatCount="indefinite" />
    </circle>
    <circle cx="64" cy="72" r="21" fill="#0f172a" />
    <circle cx="64" cy="72" r="15" fill="${lens}" opacity="0.9" />
    <circle cx="64" cy="72" r="7" fill="#0f172a">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.4s" repeatCount="indefinite" />
    </circle>
    <circle cx="58" cy="66" r="4" fill="#ffffff" opacity="0.7" />
    <path d="M50 88 Q57 94 66 91" stroke="#f8fafc" stroke-width="3" fill="none" stroke-linecap="round" transform="translate(14 -8) scale(0.9)" />
    <circle cx="30" cy="88" r="4" fill="#f472b6"><animate attributeName="r" values="4;4.8;4" dur="2s" repeatCount="indefinite" /></circle>
    <g stroke="#64748b" stroke-width="3" stroke-linecap="round"><line x1="24" y1="48" x2="36" y2="48" /></g>
    <path d="M108 104 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 Z" fill="#fde047" transform="scale(0.75) translate(36 34)" opacity="0.85" />
  </g>
</svg>`;
}
