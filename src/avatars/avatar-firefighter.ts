export interface AvatarFirefighterOptions {
  helmet?: string;
  skin?: string;
  size?: number;
}

export function createAvatarFirefighter(options: AvatarFirefighterOptions = {}): string {
  const { helmet = '#dc2626', skin = '#fcd9b8', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Firefighter avatar">
  <rect width="128" height="128" rx="36" fill="#fbbf24" opacity="0.13" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="2.6s" repeatCount="indefinite" />
    <path d="M30 58 Q30 30 64 30 Q98 30 98 58 Z" fill="${helmet}" />
    <rect x="24" y="56" width="80" height="10" rx="5" fill="#b91c1c" />
    <path d="M64 18 v-8" stroke="${helmet}" stroke-width="5" stroke-linecap="round" />
    <circle cx="64" cy="8" r="4" fill="#fbbf24">
      <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
    </circle>
    <rect x="52" y="40" width="24" height="12" rx="3" fill="#fbbf24" />
    <ellipse cx="64" cy="86" rx="28" ry="24" fill="${skin}" />
    <circle cx="53" cy="82" r="4" fill="#18181b" />
    <circle cx="75" cy="82" r="4" fill="#18181b" />
    <path d="M55 95 Q64 101 73 95" stroke="#18181b" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M40 92 q-6 6 2 10 M88 92 q6 6 -2 10" stroke="#fbbf24" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.9" />
    <ellipse cx="44" cy="90" rx="5" ry="3.5" fill="#fb7185" opacity="0.4" />
    <ellipse cx="84" cy="90" rx="5" ry="3.5" fill="#fb7185" opacity="0.4" />
  </g>
</svg>`;
}
