export interface AvatarFoxOptions {
  fur?: string;
  inner?: string;
  size?: number;
}

export function createAvatarFox(options: AvatarFoxOptions = {}): string {
  const { fur = '#f97316', inner = '#fed7aa', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fox avatar">
  <rect width="128" height="128" rx="36" fill="#f97316" opacity="0.13" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="2.7s" repeatCount="indefinite" />
    <path d="M30 46 L22 14 L52 32 Z" fill="${fur}">
      <animateTransform attributeName="transform" type="rotate" values="0 37 30;-6 37 30;0 37 30" dur="3.4s" repeatCount="indefinite" />
    </path>
    <path d="M98 46 L106 14 L76 32 Z" fill="${fur}">
      <animateTransform attributeName="transform" type="rotate" values="0 91 30;6 91 30;0 91 30" dur="3.4s" repeatCount="indefinite" />
    </path>
    <path d="M31 40 L27 22 L45 33 Z" fill="${inner}" />
    <path d="M97 40 L101 22 L83 33 Z" fill="${inner}" />
    <ellipse cx="64" cy="76" rx="36" ry="32" fill="${fur}" />
    <path d="M40 70 Q50 66 58 72 M88 70 Q78 66 70 72" stroke="${inner}" stroke-width="7" fill="none" stroke-linecap="round" />
    <ellipse cx="64" cy="88" rx="15" ry="11" fill="${inner}" />
    <ellipse cx="51" cy="70" rx="4.5" ry="5" fill="#18181b">
      <animate attributeName="ry" values="5;5;0.5;5;5" dur="4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="77" cy="70" rx="4.5" ry="5" fill="#18181b">
      <animate attributeName="ry" values="5;5;0.5;5;5" dur="4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="64" cy="84" rx="5" ry="4" fill="#1c1917" />
    <path d="M64 88 Q58 95 52 91 M64 88 Q70 95 76 91" stroke="#1c1917" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <ellipse cx="38" cy="86" rx="5.5" ry="4" fill="#fbbf24" opacity="0.55" />
    <ellipse cx="90" cy="86" rx="5.5" ry="4" fill="#fbbf24" opacity="0.55" />
  </g>
</svg>`;
}
