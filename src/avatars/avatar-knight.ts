export interface AvatarKnightOptions {
  size?: number;
}

export function createAvatarKnight(options: AvatarKnightOptions = {}): string {
  const { size = 128 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Knight avatar">
  <rect width="128" height="128" rx="36" fill="#94a3b8" opacity="0.14"/>
  <g>
    <path d="M64 16 L98 30 L98 58 C98 82 82 96 64 102 C46 96 30 82 30 58 L30 30 Z" fill="#64748b"/>
    <path d="M64 22 L90 33 L90 57 C90 77 78 89 64 95 C50 89 38 77 38 57 L38 33 Z" fill="#cbd5e1"/>
    <rect x="42" y="56" width="44" height="12" rx="5" fill="#0f172a"/>
    <circle cx="54" cy="62" r="3.5" fill="#67e8f9"><animate attributeName="opacity" values="1;.35;1" dur="2s" repeatCount="indefinite"/></circle>
    <circle cx="74" cy="62" r="3.5" fill="#67e8f9"><animate attributeName="opacity" values=".35;1;.35" dur="2s" repeatCount="indefinite"/></circle>
    <rect x="52" y="76" width="24" height="7" rx="3.5" fill="#475569"/>
    <path d="M60 40 L68 40 M64 36 L64 44" stroke="#e2e8f0" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M30 34 L18 26 M98 34 L110 26" stroke="#f59e0b" stroke-width="4" stroke-linecap="round">
      <animate attributeName="opacity" values=".9;.4;.9" dur="1.6s" repeatCount="indefinite"/>
    </path>
  </g>
</svg>`;
}
