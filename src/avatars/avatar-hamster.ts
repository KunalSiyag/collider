export interface AvatarHamsterOptions {
  fur?: string;
  inner?: string;
  size?: number;
}

export function createAvatarHamster(options: AvatarHamsterOptions = {}): string {
  const { fur = '#fbbf24', inner = '#fde68a', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hamster avatar">
  <rect width="128" height="128" rx="36" fill="#fbbf24" opacity="0.13" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="2.3s" repeatCount="indefinite" />
    <path d="M36 46 L30 24 L50 34 Z" fill="${fur}" />
    <path d="M92 46 L98 24 L78 34 Z" fill="${fur}" />
    <path d="M37 41 L34 29 L45 35 Z" fill="${inner}" />
    <path d="M91 41 L94 29 L83 35 Z" fill="${inner}" />
    <ellipse cx="64" cy="78" rx="38" ry="32" fill="${fur}" />
    <ellipse cx="30" cy="86" rx="12" ry="15" fill="${inner}" />
    <ellipse cx="98" cy="86" rx="12" ry="15" fill="${inner}" />
    <ellipse cx="64" cy="90" rx="17" ry="13" fill="#fffbeb" />
    <ellipse cx="51" cy="73" rx="4" ry="4.5" fill="#1c1917">
      <animate attributeName="ry" values="4.5;4.5;0.5;4.5;4.5" dur="3.5s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="77" cy="73" rx="4" ry="4.5" fill="#1c1917">
      <animate attributeName="ry" values="4.5;4.5;0.5;4.5;4.5" dur="3.5s" repeatCount="indefinite" />
    </ellipse>
    <path d="M61 82 h6 l-3 3 Z" fill="#f472b6" />
    <ellipse cx="56" cy="89" rx="3.5" ry="2.5" fill="#fda4af" />
    <ellipse cx="72" cy="89" rx="3.5" ry="2.5" fill="#fda4af" />
    <path d="M58 95 q-3 4 -7 2 M70 95 q3 4 7 2" stroke="#b45309" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <g stroke="#b45309" stroke-width="2" stroke-linecap="round" opacity="0.7">
      <line x1="24" y1="76" x2="36" y2="79" /><line x1="104" y1="76" x2="92" y2="79" />
    </g>
  </g>
</svg>`;
}
