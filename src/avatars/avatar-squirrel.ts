export interface AvatarSquirrelOptions {
  fur?: string;
  belly?: string;
  size?: number;
}

export function createAvatarSquirrel(options: AvatarSquirrelOptions = {}): string {
  const { fur = '#d97706', belly = '#fde68a', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Squirrel avatar">
  <rect width="128" height="128" rx="36" fill="#f59e0b" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="2.8s" repeatCount="indefinite" />
    <path d="M96 100 q26 -6 22 -34 q-3 -20 -20 -24 q10 12 4 24 q-5 10 -16 10 Z" fill="#b45309">
      <animateTransform attributeName="transform" type="rotate" values="0 104 70;8 104 70;0 104 70" dur="2s" repeatCount="indefinite" />
    </path>
    <path d="M38 44 L32 22 L52 32 Z" fill="${fur}" />
    <path d="M90 44 L96 22 L76 32 Z" fill="${fur}" />
    <ellipse cx="64" cy="76" rx="35" ry="31" fill="${fur}" />
    <ellipse cx="64" cy="88" rx="17" ry="13" fill="${belly}" />
    <ellipse cx="51" cy="70" rx="4.5" ry="5" fill="#1c1917">
      <animate attributeName="ry" values="5;5;0.5;5;5" dur="3.9s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="77" cy="70" rx="4.5" ry="5" fill="#1c1917">
      <animate attributeName="ry" values="5;5;0.5;5;5" dur="3.9s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="64" cy="84" rx="5" ry="4" fill="#78350f" />
    <path d="M58 92 h12 l-6 5 Z" fill="${belly}" />
    <ellipse cx="40" cy="82" rx="5" ry="3.5" fill="#fb7185" opacity="0.45" />
    <ellipse cx="88" cy="82" rx="5" ry="3.5" fill="#fb7185" opacity="0.45" />
    <g transform="translate(18 96)">
      <ellipse cx="0" cy="4" rx="9" ry="11" fill="#92400e" /><path d="M-9 2 q9 -14 18 0" stroke="#78350f" stroke-width="2" fill="none" />
    </g>
  </g>
</svg>`;
}
