export interface AvatarMoodCoolOptions {
  body?: string;
  shades?: string;
  size?: number;
}

export function createAvatarMoodCool(options: AvatarMoodCoolOptions = {}): string {
  const { body = '#22d3ee', shades = '#0f172a', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cool mood avatar">
  <rect width="128" height="128" rx="36" fill="#22d3ee" opacity="0.13" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3s" repeatCount="indefinite" />
    <circle cx="64" cy="70" r="38" fill="${body}" />
    <rect x="30" y="54" width="26" height="17" rx="6" fill="${shades}" />
    <rect x="72" y="54" width="26" height="17" rx="6" fill="${shades}" />
    <path d="M56 60 h16" stroke="${shades}" stroke-width="5" />
    <path d="M30 58 l-10 -4 M98 58 l10 -4" stroke="${shades}" stroke-width="4.5" stroke-linecap="round" />
    <path d="M46 62 h-6 M82 62 h6" stroke="#38bdf8" stroke-width="2.5" opacity="0.8" />
    <path d="M52 88 Q64 94 76 88" stroke="#155e75" stroke-width="4.5" fill="none" stroke-linecap="round" />
    <ellipse cx="40" cy="84" rx="5" ry="3.5" fill="#a5f3fc" opacity="0.7" />
    <ellipse cx="88" cy="84" rx="5" ry="3.5" fill="#a5f3fc" opacity="0.7" />
    <g transform="translate(96 24) rotate(12)">
      <rect x="-14" y="-9" width="28" height="18" rx="4" fill="#fbbf24" />
      <text x="0" y="5" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#7c2d12">8)</text>
    </g>
  </g>
</svg>`;
}
