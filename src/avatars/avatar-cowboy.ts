export interface AvatarCowboyOptions {
  hat?: string;
  bandit?: string;
  size?: number;
}

export function createAvatarCowboy(options: AvatarCowboyOptions = {}): string {
  const { hat = '#92400e', bandit = '#dc2626', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cowboy avatar">
  <rect width="128" height="128" rx="36" fill="#f59e0b" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="3.2s" repeatCount="indefinite" />
    <ellipse cx="64" cy="84" rx="28" ry="25" fill="#fcd9b8" />
    <path d="M40 56 Q40 36 64 36 Q88 36 88 56 L88 62 Q64 56 40 62 Z" fill="${hat}" />
    <ellipse cx="64" cy="62" rx="42" ry="8" fill="#78350f" />
    <rect x="40" y="52" width="48" height="7" rx="3" fill="${bandit}" />
    <circle cx="53" cy="80" r="4" fill="#18181b" />
    <circle cx="75" cy="80" r="4" fill="#18181b" />
    <path d="M42 74 h20 M66 74 h20" stroke="${bandit}" stroke-width="6" stroke-linecap="round" opacity="0.9" transform="rotate(-4 53 77) rotate(4 76 77)" />
    <path d="M56 95 Q64 100 72 95" stroke="#18181b" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M104 60 c8 0 8 12 0 12 c-6 0 -6 10 2 10" stroke="#a16207" stroke-width="4" fill="none" stroke-linecap="round" />
    <path d="M100 84 l6 6 m0 -6 l-6 6" stroke="#a16207" stroke-width="3" stroke-linecap="round" />
  </g>
</svg>`;
}
