export interface AvatarToasterOptions {
  body?: string;
  glow?: string;
  size?: number;
}

export function createAvatarToaster(options: AvatarToasterOptions = {}): string {
  const { body = '#94a3b8', glow = '#fb923c', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Toaster avatar">
  <rect width="128" height="128" rx="36" fill="#fbbf24" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="2.8s" repeatCount="indefinite" />
    <rect x="62" y="18" width="22" height="30" rx="5" fill="#c98a4b" transform="rotate(8 73 33)">
    </rect>
    <g stroke="#e2c39c" stroke-width="2"><line x1="68" y1="22" x2="72" y2="44" /><line x1="75" y1="21" x2="79" y2="43" /></g>
    <rect x="20" y="46" width="84" height="54" rx="16" fill="${body}" />
    <rect x="30" y="40" width="64" height="12" rx="6" fill="#64748b" />
    <circle cx="45" cy="76" r="6" fill="#0f172a" />
    <circle cx="47" cy="74" r="1.8" fill="#ffffff">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.1s" repeatCount="indefinite" />
    </circle>
    <circle cx="79" cy="76" r="6" fill="#0f172a" />
    <circle cx="81" cy="74" r="1.8" fill="#ffffff">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.1s" begin="-0.3s" repeatCount="indefinite" />
    </circle>
    <path d="M55 90 Q64 97 73 90" stroke="#0f172a" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <rect x="98" y="62" width="10" height="18" rx="4" fill="#64748b" />
    <circle cx="103" cy="58" r="3" fill="${glow}">
      <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />
    </circle>
    <g stroke="${glow}" stroke-width="3" fill="none" stroke-linecap="round">
      <path d="M40 30 q-3 -6 0 -10"><animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.6s" repeatCount="indefinite" /></path>
      <path d="M50 28 q-3 -6 0 -10"><animate attributeName="opacity" values="0.2;0.9;0.2" dur="1.6s" repeatCount="indefinite" /></path>
    </g>
  </g>
</svg>`;
}
