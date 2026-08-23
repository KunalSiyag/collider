export interface AvatarTelevisionOptions {
  frame?: string;
  screen?: string;
  size?: number;
}

export function createAvatarTelevision(options: AvatarTelevisionOptions = {}): string {
  const { frame = '#57534e', screen = '#164e63', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Television avatar">
  <rect width="128" height="128" rx="36" fill="#22d3ee" opacity="0.09" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3.3s" repeatCount="indefinite" />
    <line x1="40" y1="18" x2="56" y2="36" stroke="#a8a29e" stroke-width="4" stroke-linecap="round" />
    <line x1="88" y1="18" x2="72" y2="36" stroke="#a8a29e" stroke-width="4" stroke-linecap="round" />
    <circle cx="39" cy="16" r="3" fill="#a8a29e" /><circle cx="89" cy="16" r="3" fill="#a8a29e" />
    <rect x="18" y="34" width="92" height="68" rx="14" fill="${frame}" />
    <rect x="28" y="44" width="60" height="48" rx="8" fill="${screen}">
      <animate attributeName="opacity" values="1;0.75;1" dur="2.4s" repeatCount="indefinite" />
    </rect>
    <circle cx="47" cy="66" r="5" fill="#67e8f9">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.1s" repeatCount="indefinite" />
    </circle>
    <circle cx="47" cy="67" r="5" fill="#67e8f9" />
    <circle cx="69" cy="66" r="5" fill="#67e8f9">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.1s" begin="-0.4s" repeatCount="indefinite" />
    </circle>
    <circle cx="69" cy="67" r="5" fill="#67e8f9" />
    <path d="M51 78 Q58 83 65 78" stroke="#67e8f9" stroke-width="3" fill="none" stroke-linecap="round" />
    <line x1="96" y1="52" x2="102" y2="52" stroke="#d6d3d1" stroke-width="4" stroke-linecap="round" />
    <line x1="96" y1="64" x2="102" y2="64" stroke="#a8a29e" stroke-width="4" stroke-linecap="round" />
    <circle cx="99" cy="80" r="4" fill="#fb7185"><animate attributeName="opacity" values="1;0.2;1" dur="1.4s" repeatCount="indefinite" /></circle>
    <line x1="42" y1="110" x2="86" y2="110" stroke="#78716c" stroke-width="6" stroke-linecap="round" />
    <line x1="64" y1="104" x2="64" y2="108" stroke="#78716c" stroke-width="6" />
  </g>
</svg>`;
}
