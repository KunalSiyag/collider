export interface AvatarCloudOptions {
  body?: string;
  cheek?: string;
  size?: number;
}

export function createAvatarCloud(options: AvatarCloudOptions = {}): string {
  const { body = '#e2e8f0', cheek = '#fda4af', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cloud avatar">
  <rect width="128" height="128" rx="36" fill="#38bdf8" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="-3 -1; 4 1; -3 -1" dur="5s" repeatCount="indefinite" />
    <path d="M30 92 Q14 92 14 78 Q14 64 30 64 Q32 42 54 40 Q74 36 82 52 Q98 50 102 66 Q116 68 114 80 Q112 92 98 92 Z" fill="${body}" />
    <ellipse cx="48" cy="72" rx="5" ry="5.5" fill="#334155">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.3s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="76" cy="72" rx="5" ry="5.5" fill="#334155">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.3s" begin="-0.5s" repeatCount="indefinite" />
    </ellipse>
    <circle cx="49.5" cy="70" r="1.6" fill="#ffffff" />
    <circle cx="77.5" cy="70" r="1.6" fill="#ffffff" />
    <path d="M55 84 Q62 90 69 84" stroke="#334155" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <ellipse cx="38" cy="81" rx="5" ry="3.5" fill="${cheek}" opacity="0.55" />
    <ellipse cx="86" cy="81" rx="5" ry="3.5" fill="${cheek}" opacity="0.55" />
    <g stroke="#93c5fd" stroke-width="4" stroke-linecap="round">
      <line x1="40" y1="104" x2="36" y2="114"><animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite" /></line>
      <line x1="60" y1="104" x2="56" y2="116"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.8s" begin="-0.6s" repeatCount="indefinite" /></line>
      <line x1="80" y1="104" x2="76" y2="113"><animate attributeName="opacity" values="1;0.2;1" dur="1.8s" begin="-1.2s" repeatCount="indefinite" /></line>
    </g>
  </g>
</svg>`;
}
