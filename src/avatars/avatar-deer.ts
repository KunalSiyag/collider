export interface AvatarDeerOptions {
  fur?: string;
  antler?: string;
  size?: number;
}

export function createAvatarDeer(options: AvatarDeerOptions = {}): string {
  const { fur = '#c08552', antler = '#78350f', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Deer avatar">
  <rect width="128" height="128" rx="36" fill="#4ade80" opacity="0.1" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="3.2s" repeatCount="indefinite" />
    <g stroke="${antler}" stroke-width="4.5" fill="none" stroke-linecap="round">
      <path d="M42 34 V16 M42 24 l-10 -8 M42 20 l8 -8 M40 12 q-6 -4 -4 -10" />
      <path d="M86 34 V16 M86 24 l10 -8 M86 20 l-8 -8 M88 12 q6 -4 4 -10" />
    </g>
    <path d="M30 52 Q28 38 40 38 L52 44 Z" fill="${fur}" />
    <path d="M98 52 Q100 38 88 38 L76 44 Z" fill="${fur}" />
    <ellipse cx="64" cy="80" rx="35" ry="31" fill="${fur}" />
    <ellipse cx="64" cy="92" rx="19" ry="15" fill="#f5deb3" />
    <ellipse cx="51" cy="73" rx="4.5" ry="5" fill="#1c1917">
      <animate attributeName="ry" values="5;5;0.5;5;5" dur="4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="77" cy="73" rx="4.5" ry="5" fill="#1c1917">
      <animate attributeName="ry" values="5;5;0.5;5;5" dur="4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="64" cy="87" rx="5.5" ry="4.5" fill="#1c1917" />
    <path d="M64 91 Q59 97 54 94 M64 91 Q69 97 74 94" stroke="#1c1917" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <g fill="#fefae0" opacity="0.9">
      <circle cx="38" cy="92" r="2.5" /><circle cx="33" cy="100" r="2" /><circle cx="90" cy="92" r="2.5" /><circle cx="95" cy="100" r="2" />
    </g>
  </g>
</svg>`;
}
