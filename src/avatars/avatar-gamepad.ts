export interface AvatarGamepadOptions {
  body?: string;
  buttonA?: string;
  size?: number;
}

export function createAvatarGamepad(options: AvatarGamepadOptions = {}): string {
  const { body = '#7c3aed', buttonA = '#f472b6', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gamepad avatar">
  <rect width="128" height="128" rx="36" fill="#8b5cf6" opacity="0.13" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="2.5s" repeatCount="indefinite" />
    <path d="M28 42 H100 Q112 42 114 62 L118 86 Q118 98 106 98 Q96 98 92 88 H36 Q32 98 22 98 Q10 98 10 86 L14 62 Q16 42 28 42 Z" fill="${body}" />
    <rect x="30" y="50" width="68" height="30" rx="14" fill="#0f172a" opacity="0.25" />
    <circle cx="40" cy="65" r="5.5" fill="#ffffff">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle cx="40" cy="66" r="5.5" fill="#ffffff" />
    <circle cx="41.5" cy="64.5" r="1.8" fill="#111827" />
    <circle cx="88" cy="65" r="5.5" fill="#ffffff">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" begin="-0.4s" repeatCount="indefinite" />
    </circle>
    <circle cx="88" cy="66" r="5.5" fill="#ffffff" />
    <circle cx="89.5" cy="64.5" r="1.8" fill="#111827" />
    <path d="M57 72 Q64 77 71 72" stroke="#ffffff" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <circle cx="103" cy="58" r="5" fill="${buttonA}">
      <animate attributeName="opacity" values="1;0.4;1" dur="1.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="112" cy="68" r="5" fill="#22d3ee" opacity="0.85" />
    <g fill="#e2e8f0">
      <rect x="20" y="62" width="12" height="4" rx="2" /><rect x="24" y="58" width="4" height="12" rx="2" />
    </g>
  </g>
</svg>`;
}
