export interface AvatarIcecreamOptions {
  scoop?: string;
  cone?: string;
  size?: number;
}

export function createAvatarIcecream(options: AvatarIcecreamOptions = {}): string {
  const { scoop = '#f9a8d4', cone = '#d97706', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ice cream avatar">
  <rect width="128" height="128" rx="36" fill="#f472b6" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2 64 100;2 64 100;-2 64 100" dur="3.6s" repeatCount="indefinite" />
    <circle cx="52" cy="34" r="12" fill="#a5f3fc" />
    <circle cx="76" cy="32" r="11" fill="#fef08a" />
    <path d="M38 58 Q36 40 56 42 Q60 30 72 34 Q88 32 90 48 Q96 62 82 66 H46 Q38 64 38 58 Z" fill="${scoop}" />
    <path d="M44 66 L64 118 L84 66 Z" fill="${cone}" />
    <g stroke="#b45309" stroke-width="2.5">
      <line x1="50" y1="78" x2="78" y2="78" /><line x1="54" y1="90" x2="74" y2="90" /><line x1="59" y1="102" x2="69" y2="102" />
    </g>
    <circle cx="54" cy="54" r="4.5" fill="#1c1917">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="54" cy="55" r="4.5" fill="#1c1917" />
    <circle cx="74" cy="54" r="4.5" fill="#1c1917">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.2s" begin="-0.4s" repeatCount="indefinite" />
    </circle>
    <circle cx="74" cy="55" r="4.5" fill="#1c1917" />
    <circle cx="55.5" cy="52.5" r="1.5" fill="#ffffff" /><circle cx="75.5" cy="52.5" r="1.5" fill="#ffffff" />
    <path d="M59 63 Q64 67 69 63" stroke="#9f1239" stroke-width="3" fill="none" stroke-linecap="round" />
    <ellipse cx="46" cy="61" rx="4" ry="3" fill="#fb7185" opacity="0.5" />
    <ellipse cx="82" cy="61" rx="4" ry="3" fill="#fb7185" opacity="0.5" />
    <path d="M64 22 q-2 -8 4 -10" stroke="#be185d" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.6" />
  </g>
</svg>`;
}
