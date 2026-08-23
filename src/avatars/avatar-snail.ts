export interface AvatarSnailOptions {
  shell?: string;
  body?: string;
  size?: number;
}

export function createAvatarSnail(options: AvatarSnailOptions = {}): string {
  const { shell = '#f59e0b', body = '#a3e635', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Snail avatar">
  <rect width="128" height="128" rx="36" fill="#4ade80" opacity="0.1" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="-3 0; 3 0; -3 0" dur="5s" repeatCount="indefinite" />
    <path d="M14 100 Q14 70 40 66 L88 66 Q106 70 106 88 Q106 100 90 100 Z" fill="${body}" />
    <path d="M96 68 L104 44 M104 68 L116 48" stroke="${body}" stroke-width="5" stroke-linecap="round" />
    <circle cx="103" cy="41" r="4.5" fill="#1c1917">
      <animate attributeName="ry" values="1;1;0;1;1" dur="3.6s" repeatCount="indefinite" />
    </circle>
    <circle cx="117" cy="45" r="4.5" fill="#1c1917">
      <animate attributeName="ry" values="1;1;0;1;1" dur="3.6s" begin="0.15s" repeatCount="indefinite" />
    </circle>
    <circle cx="86" cy="60" r="30" fill="${shell}" />
    <path d="M86 60 m-20 0 a20 20 0 1 1 40 0 a13 13 0 1 0 -26 0 a6 6 0 1 1 12 0" fill="none" stroke="#b45309" stroke-width="4" stroke-linecap="round" />
    <circle cx="34" cy="82" r="4" fill="#1c1917" />
    <path d="M26 92 Q34 97 42 93" stroke="#1c1917" stroke-width="3" fill="none" stroke-linecap="round" />
    <path d="M10 102 h108" stroke="#65a30d" stroke-width="5" stroke-linecap="round" opacity="0.5" />
  </g>
</svg>`;
}
