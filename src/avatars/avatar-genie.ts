export interface AvatarGenieOptions {
  body?: string;
  smoke?: string;
  size?: number;
}

export function createAvatarGenie(options: AvatarGenieOptions = {}): string {
  const { body = '#22d3ee', smoke = '#a5f3fc', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Genie avatar">
  <rect width="128" height="128" rx="36" fill="#22d3ee" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -4; 0 0" dur="3.5s" repeatCount="indefinite" />
    <path d="M34 108 Q30 84 44 76 H84 Q98 84 94 108 Z" fill="${body}" opacity="0.85" />
    <ellipse cx="64" cy="58" rx="26" ry="24" fill="${body}" />
    <path d="M38 44 Q36 20 64 20 Q92 20 90 44 L86 48 Q64 40 42 48 Z" fill="#7c3aed" />
    <path d="M90 40 q16 4 12 20 q-4 14 -20 12" stroke="${smoke}" stroke-width="4" fill="none" stroke-linecap="round">
      <animate attributeName="d" values="M90 40 q16 4 12 20 q-4 14 -20 12;M92 38 q18 8 10 24 q-6 12 -18 8;M90 40 q16 4 12 20 q-4 14 -20 12" dur="3s" repeatCount="indefinite" />
    </path>
    <circle cx="55" cy="57" r="4" fill="#083344">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle cx="73" cy="57" r="4" fill="#083344">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" begin="-0.4s" repeatCount="indefinite" />
    </circle>
    <path d="M56 68 Q64 75 72 68" stroke="#083344" stroke-width="3" fill="none" stroke-linecap="round" />
    <ellipse cx="47" cy="65" rx="4" ry="3" fill="#fb7185" opacity="0.45" />
    <ellipse cx="81" cy="65" rx="4" ry="3" fill="#fb7185" opacity="0.45" />
    <circle cx="64" cy="112" r="4" fill="#fde047"><animate attributeName="r" values="4;5.5;4" dur="2s" repeatCount="indefinite" /></circle>
    <path d="M20 116 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 Z" fill="#fde047" opacity="0.7" transform="scale(0.8) translate(5 30)" />
  </g>
</svg>`;
}
