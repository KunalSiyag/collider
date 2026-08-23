export interface AvatarAcornOptions {
  cap?: string;
  nut?: string;
  size?: number;
}

export function createAvatarAcorn(options: AvatarAcornOptions = {}): string {
  const { cap = '#78350f', nut = '#d9a066', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Acorn avatar">
  <rect width="128" height="128" rx="36" fill="#f59e0b" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-4 64 40;4 64 40;-4 64 40" dur="3.8s" repeatCount="indefinite" />
    <line x1="64" y1="10" x2="64" y2="24" stroke="${cap}" stroke-width="5" stroke-linecap="round" />
    <path d="M64 14 q-14 -8 -26 0 q12 -2 16 4 Z M64 14 q14 -8 26 0 q-12 -2 -16 4 Z" fill="#4ade80">
      <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite" />
    </path>
    <path d="M28 44 Q28 26 64 26 Q100 26 100 44 Q100 50 92 50 H36 Q28 50 28 44 Z" fill="${cap}" />
    <g fill="#92400e"><ellipse cx="44" cy="38" rx="4" ry="6" /><ellipse cx="64" cy="37" rx="4" ry="7" /><ellipse cx="84" cy="38" rx="4" ry="6" /></g>
    <path d="M36 50 Q36 86 64 102 Q92 86 92 50 Z" fill="${nut}" />
    <ellipse cx="53" cy="68" rx="5" ry="5.5" fill="#3b2314" transform="rotate(-10 53 68)">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.1s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="53" cy="69" rx="5" ry="5.5" fill="#3b2314" transform="rotate(-10 53 68)" />
    <ellipse cx="75" cy="68" rx="5" ry="5.5" fill="#3b2314" transform="rotate(10 75 68)">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.1s" begin="-0.4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="75" cy="69" rx="5" ry="5.5" fill="#3b2314" transform="rotate(10 75 68)" />
    <path d="M57 82 Q64 88 71 82" stroke="#3b2314" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <ellipse cx="45" cy="79" rx="4.5" ry="3" fill="#b45309" opacity="0.55" />
    <ellipse cx="83" cy="79" rx="4.5" ry="3" fill="#b45309" opacity="0.55" />
  </g>
</svg>`;
}
