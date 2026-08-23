export interface AvatarJellyfishOptions {
  bell?: string;
  tentacle?: string;
  size?: number;
}

export function createAvatarJellyfish(options: AvatarJellyfishOptions = {}): string {
  const { bell = '#f472b6', tentacle = '#f9a8d4', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Jellyfish avatar">
  <rect width="128" height="128" rx="36" fill="#f472b6" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -4; 0 4; 0 -4" dur="4s" repeatCount="indefinite" />
    <g stroke="${tentacle}" stroke-width="5" fill="none" stroke-linecap="round">
      <path d="M36 78 q-6 14 2 26 q6 10 -2 16"><animate attributeName="d" values="M36 78 q-6 14 2 26 q6 10 -2 16;M36 78 q6 14 -2 26 q-6 10 2 16;M36 78 q-6 14 2 26 q6 10 -2 16" dur="3s" repeatCount="indefinite" /></path>
      <path d="M52 82 q-4 16 4 28"><animate attributeName="d" values="M52 82 q-4 16 4 28;M52 82 q6 14 -2 28;M52 82 q-4 16 4 28" dur="3s" begin="-1s" repeatCount="indefinite" /></path>
      <path d="M76 82 q4 16 -4 28"><animate attributeName="d" values="M76 82 q4 16 -4 28;M76 82 q-6 14 2 28;M76 82 q4 16 -4 28" dur="3s" begin="-2s" repeatCount="indefinite" /></path>
      <path d="M92 78 q6 14 -2 26 q-6 10 2 16"><animate attributeName="d" values="M92 78 q6 14 -2 26 q-6 10 2 16;M92 78 q-6 14 2 26 q6 10 -2 16;M92 78 q6 14 -2 26 q-6 10 2 16" dur="3s" begin="-1.5s" repeatCount="indefinite" /></path>
    </g>
    <path d="M26 66 Q26 26 64 26 Q102 26 102 66 Q84 76 64 76 Q44 76 26 66 Z" fill="${bell}" />
    <path d="M26 66 Q64 78 102 66 Q84 74 64 74 Q44 74 26 66 Z" fill="#db2777" opacity="0.45" />
    <circle cx="50" cy="54" r="6" fill="#ffffff">
      <animate attributeName="ry" values="1;1;0;1;1" dur="3.8s" repeatCount="indefinite" />
    </circle>
    <circle cx="78" cy="54" r="6" fill="#ffffff">
      <animate attributeName="ry" values="1;1;0;1;1" dur="3.8s" repeatCount="indefinite" />
    </circle>
    <circle cx="50" cy="55" r="2.5" fill="#500724" /><circle cx="78" cy="55" r="2.5" fill="#500724" />
    <path d="M58 64 Q64 69 70 64" stroke="#500724" stroke-width="3" fill="none" stroke-linecap="round" />
    <circle cx="40" cy="38" r="4" fill="#fce7f3" opacity="0.8" />
    <circle cx="88" cy="38" r="4" fill="#fce7f3" opacity="0.8" />
  </g>
</svg>`;
}
