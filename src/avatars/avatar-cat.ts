export interface AvatarCatOptions {
  fur?: string;
  inner?: string;
  size?: number;
}

export function createAvatarCat(options: AvatarCatOptions = {}): string {
  const { fur = '#f59e0b', inner = '#fde68a', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cat avatar">
  <rect width="128" height="128" rx="36" fill="${fur}" opacity="0.14" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="2.4s" repeatCount="indefinite" />
    <path d="M34 40 L28 14 L54 30 Z" fill="${fur}" />
    <path d="M94 40 L100 14 L74 30 Z" fill="${fur}" />
    <path d="M36 36 L33 22 L48 31 Z" fill="${inner}" />
    <path d="M92 36 L95 22 L80 31 Z" fill="${inner}" />
    <circle cx="64" cy="70" r="38" fill="${fur}" />
    <circle cx="50" cy="62" r="6" fill="#18181b" />
    <circle cx="78" cy="62" r="6" fill="#18181b" />
    <circle cx="52" cy="60" r="2" fill="#ffffff" />
    <circle cx="80" cy="60" r="2" fill="#ffffff" />
    <path d="M64 72 L60 77 L68 77 Z" fill="#fb7185" />
    <path d="M64 77 Q58 84 52 79 M64 77 Q70 84 76 79" stroke="#18181b" stroke-width="3" fill="none" stroke-linecap="round" />
    <g stroke="#18181b" stroke-width="2.5" stroke-linecap="round" opacity="0.75">
      <line x1="20" y1="66" x2="38" y2="69" />
      <line x1="20" y1="78" x2="38" y2="76" />
      <line x1="108" y1="66" x2="90" y2="69" />
      <line x1="108" y1="78" x2="90" y2="76" />
    </g>
    <ellipse cx="42" cy="82" rx="6" ry="4" fill="#fb7185" opacity="0.5" />
    <ellipse cx="86" cy="82" rx="6" ry="4" fill="#fb7185" opacity="0.5" />
  </g>
</svg>`;
}
