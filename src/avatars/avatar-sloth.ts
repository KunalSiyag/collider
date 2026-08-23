export interface AvatarSlothOptions {
  fur?: string;
  patch?: string;
  size?: number;
}

export function createAvatarSloth(options: AvatarSlothOptions = {}): string {
  const { fur = '#b08968', patch = '#7f5539', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sloth avatar">
  <rect width="128" height="128" rx="36" fill="#4ade80" opacity="0.09" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -1.5; 0 0" dur="4.5s" repeatCount="indefinite" />
    <circle cx="30" cy="38" r="11" fill="${patch}" />
    <circle cx="98" cy="38" r="11" fill="${patch}" />
    <ellipse cx="64" cy="76" rx="37" ry="32" fill="${fur}" />
    <path d="M30 62 Q44 52 56 66 L52 84 Q42 90 34 80 Z" fill="${patch}" opacity="0.85" />
    <path d="M98 62 Q84 52 72 66 L76 84 Q86 90 94 80 Z" fill="${patch}" opacity="0.85" />
    <path d="M42 72 q3 -4 7 0 M79 72 q3 -4 7 0" stroke="#fefae0" stroke-width="3" fill="none" stroke-linecap="round" />
    <circle cx="45" cy="71" r="2.5" fill="#1c1917" />
    <circle cx="83" cy="71" r="2.5" fill="#1c1917" />
    <ellipse cx="64" cy="88" rx="6" ry="4.5" fill="#1c1917" />
    <path d="M58 95 Q64 99 70 95" stroke="#1c1917" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <ellipse cx="52" cy="86" rx="5" ry="3.5" fill="#dda15e" opacity="0.6" />
    <ellipse cx="76" cy="86" rx="5" ry="3.5" fill="#dda15e" opacity="0.6" />
    <path d="M20 106 h20 l-4 -6 m-12 0 l-4 6" stroke="#606c38" stroke-width="4" fill="none" stroke-linecap="round" />
  </g>
</svg>`;
}
