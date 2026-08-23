export interface AvatarBookOptions {
  cover?: string;
  pages?: string;
  size?: number;
}

export function createAvatarBook(options: AvatarBookOptions = {}): string {
  const { cover = '#2563eb', pages = '#fefce8', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Book avatar">
  <rect width="128" height="128" rx="36" fill="#2563eb" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3.2s" repeatCount="indefinite" />
    <path d="M20 40 L62 30 V98 L20 108 Z" fill="${pages}" />
    <path d="M108 40 L66 30 V98 L108 108 Z" fill="#e7e5e4" />
    <path d="M20 40 L62 30 V98 L20 108 Z M108 40 L66 30 V98 L108 108 Z" stroke="#94a3b8" stroke-width="1.5" fill="none" />
    <g stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round">
      <line x1="28" y1="48" x2="54" y2="43" /><line x1="28" y1="58" x2="54" y2="53" /><line x1="28" y1="68" x2="54" y2="63" /><line x1="28" y1="78" x2="54" y2="73" />
      <line x1="74" y1="43" x2="100" y2="48" /><line x1="74" y1="53" x2="100" y2="58" /><line x1="74" y1="63" x2="100" y2="68" />
    </g>
    <path d="M14 36 L62 24 V104 L14 116 Z M114 36 L66 24 V104 L114 116 Z" fill="${cover}" />
    <rect x="60" y="24" width="8" height="80" fill="#1d4ed8" />
    <circle cx="39" cy="62" r="4.5" fill="#ffffff">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="39" cy="63" r="4.5" fill="#ffffff" />
    <circle cx="89" cy="62" r="4.5" fill="#ffffff">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.2s" begin="-0.4s" repeatCount="indefinite" />
    </circle>
    <circle cx="89" cy="63" r="4.5" fill="#ffffff" />
    <path d="M33 76 Q39 81 45 76" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round" transform="translate(0 -6)" />
    <path d="M83 70 Q89 75 95 70" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round" />
    <path d="M39 57 l1.5 -4 m-1.5 4 l-1.5 -4 m1.5 10 v4" stroke="#dbeafe" stroke-width="2" stroke-linecap="round" opacity="0" />
  </g>
</svg>`;
}
