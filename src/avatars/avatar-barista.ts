export interface AvatarBaristaOptions {
  apron?: string;
  skin?: string;
  size?: number;
}

export function createAvatarBarista(options: AvatarBaristaOptions = {}): string {
  const { apron = '#16a34a', skin = '#fcd9b8', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Barista avatar">
  <rect width="128" height="128" rx="36" fill="#4ade80" opacity="0.1" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="2.9s" repeatCount="indefinite" />
    <ellipse cx="64" cy="86" rx="28" ry="25" fill="${skin}" />
    <path d="M38 60 Q38 40 64 40 Q90 40 90 60 L88 64 Q64 56 40 64 Z" fill="#57534e" />
    <path d="M44 44 Q52 36 64 38 Q78 36 84 44 L82 50 Q64 44 46 50 Z" fill="${apron}" />
    <circle cx="53" cy="83" r="4" fill="#18181b" />
    <circle cx="75" cy="83" r="4" fill="#18181b" />
    <path d="M57 96 Q64 102 71 96" stroke="#18181b" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <g stroke="#94a3b8" stroke-width="3" fill="none" stroke-linecap="round">
      <path d="M98 92 q-4 -6 0 -12"><animate attributeName="opacity" values="0.9;0.2;0.9" dur="2.2s" repeatCount="indefinite" /></path>
      <path d="M106 96 q-4 -6 0 -12"><animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.2s" repeatCount="indefinite" /></path>
    </g>
    <rect x="100" y="98" width="20" height="14" rx="3" fill="#78716c" />
    <path d="M120 102 a5 5 0 0 1 0 8" stroke="#78716c" stroke-width="3.5" fill="none" />
    <ellipse cx="43" cy="91" rx="5" ry="3.5" fill="#fb7185" opacity="0.4" />
    <ellipse cx="85" cy="91" rx="5" ry="3.5" fill="#fb7185" opacity="0.4" />
  </g>
</svg>`;
}
