export interface AvatarChefOptions {
  toque?: string;
  skin?: string;
  size?: number;
}

export function createAvatarChef(options: AvatarChefOptions = {}): string {
  const { toque = '#ffffff', skin = '#fcd9b8', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Chef avatar">
  <rect width="128" height="128" rx="36" fill="#fbbf24" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="2.9s" repeatCount="indefinite" />
    <ellipse cx="64" cy="88" rx="28" ry="24" fill="${skin}" />
    <path d="M38 62 Q30 46 42 40 Q40 26 56 28 Q60 16 72 22 Q88 18 88 34 Q100 40 92 54 L90 62 Z" fill="${toque}" stroke="#d4d4d8" stroke-width="2.5" />
    <rect x="38" y="60" width="54" height="12" rx="5" fill="#e4e4e7" stroke="#a1a1aa" stroke-width="1.5" />
    <circle cx="53" cy="85" r="4" fill="#18181b" />
    <circle cx="75" cy="85" r="4" fill="#18181b" />
    <path d="M50 96 q7 6 14 0 q7 6 14 0" stroke="#52525b" stroke-width="4" fill="none" stroke-linecap="round" />
    <path d="M57 104 Q64 108 71 104" stroke="#18181b" stroke-width="3" fill="none" stroke-linecap="round" />
    <ellipse cx="43" cy="93" rx="5" ry="3.5" fill="#fb7185" opacity="0.4" />
    <ellipse cx="85" cy="93" rx="5" ry="3.5" fill="#fb7185" opacity="0.4" />
  </g>
</svg>`;
}
