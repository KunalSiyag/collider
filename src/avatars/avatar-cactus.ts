export interface AvatarCactusOptions {
  body?: string;
  pot?: string;
  size?: number;
}

export function createAvatarCactus(options: AvatarCactusOptions = {}): string {
  const { body = '#22c55e', pot = '#f97316', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cactus avatar">
  <rect width="128" height="128" rx="36" fill="#fbbf24" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-1.5 64 100;1.5 64 100;-1.5 64 100" dur="4s" repeatCount="indefinite" />
    <path d="M88 58 h10 q12 0 12 12 v18 q0 8 -8 8 h-14" stroke="${body}" stroke-width="12" fill="none" stroke-linecap="round" />
    <path d="M40 66 H30 q-12 0 -12 12 v8 q0 8 8 8 h14" stroke="${body}" stroke-width="12" fill="none" stroke-linecap="round" />
    <rect x="46" y="20" width="36" height="86" rx="17" fill="${body}" />
    <g stroke="#166534" stroke-width="2.5" stroke-linecap="round">
      <line x1="56" y1="34" x2="56" y2="42" /><line x1="72" y1="44" x2="72" y2="52" />
      <line x1="56" y1="60" x2="56" y2="68" /><line x1="72" y1="74" x2="72" y2="82" />
      <line x1="56" y1="88" x2="56" y2="96" />
    </g>
    <ellipse cx="56" cy="46" rx="4.5" ry="5" fill="#052e16">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="56" cy="47" rx="4.5" ry="5" fill="#052e16" />
    <ellipse cx="72" cy="46" rx="4.5" ry="5" fill="#052e16" />
    <ellipse cx="72" cy="47" rx="4.5" ry="5" fill="#052e16" />
    <path d="M59 60 Q64 65 69 60" stroke="#052e16" stroke-width="3" fill="none" stroke-linecap="round" />
    <ellipse cx="48" cy="56" rx="3.5" ry="2.5" fill="#fb7185" opacity="0.5" />
    <ellipse cx="80" cy="56" rx="3.5" ry="2.5" fill="#fb7185" opacity="0.5" />
    <path d="M38 106 L44 122 H84 L90 106 Z" fill="${pot}" />
    <rect x="35" y="100" width="58" height="10" rx="4" fill="#ea580c" />
  </g>
</svg>`;
}
