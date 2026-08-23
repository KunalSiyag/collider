export interface AvatarBatteryOptions {
  body?: string;
  charge?: string;
  size?: number;
}

export function createAvatarBattery(options: AvatarBatteryOptions = {}): string {
  const { body = '#4ade80', charge = '#166534', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Battery avatar">
  <rect width="128" height="128" rx="36" fill="#4ade80" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3.1s" repeatCount="indefinite" />
    <rect x="20" y="38" width="80" height="54" rx="12" fill="#14532d" />
    <rect x="100" y="54" width="12" height="22" rx="5" fill="#14532d" />
    <rect x="26" y="44" width="68" height="42" rx="8" fill="${body}" />
    <g fill="${charge}">
      <rect x="34" y="52" width="9" height="26" rx="4"><animate attributeName="opacity" values="1;0.35;1" dur="1.4s" repeatCount="indefinite" /></rect>
      <rect x="47" y="52" width="9" height="26" rx="4"><animate attributeName="opacity" values="1;0.35;1" dur="1.4s" begin="-0.35s" repeatCount="indefinite" /></rect>
      <rect x="60" y="52" width="9" height="26" rx="4"><animate attributeName="opacity" values="1;0.35;1" dur="1.4s" begin="-0.7s" repeatCount="indefinite" /></rect>
      <rect x="73" y="52" width="9" height="26" rx="4"><animate attributeName="opacity" values="1;0.35;1" dur="1.4s" begin="-1.05s" repeatCount="indefinite" /></rect>
    </g>
    <circle cx="50" cy="72" r="5.5" fill="#052e16">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.3s" repeatCount="indefinite" />
    </circle>
    <circle cx="50" cy="73" r="5.5" fill="#052e16" />
    <circle cx="72" cy="72" r="5.5" fill="#052e16">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.3s" begin="-0.4s" repeatCount="indefinite" />
    </circle>
    <circle cx="72" cy="73" r="5.5" fill="#052e16" />
    <path d="M54 84 Q61 89 68 84" stroke="#052e16" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M110 30 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 Z" fill="#fde047" transform="scale(0.85) translate(19 5)">
      <animateTransform attributeName="transform" type="rotate" values="0 113 39;360 113 39" dur="9s" repeatCount="indefinite" additive="sum" />
    </path>
  </g>
</svg>`;
}
