export interface AvatarMouseOptions {
  fur?: string;
  inner?: string;
  size?: number;
}

export function createAvatarMouse(options: AvatarMouseOptions = {}): string {
  const { fur = '#a8a29e', inner = '#fda4af', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mouse avatar">
  <rect width="128" height="128" rx="36" fill="#a8a29e" opacity="0.14" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="2.4s" repeatCount="indefinite" />
    <circle cx="34" cy="38" r="15" fill="${fur}" />
    <circle cx="94" cy="38" r="15" fill="${fur}" />
    <circle cx="35" cy="39" r="8" fill="${inner}" opacity="0.75" />
    <circle cx="93" cy="39" r="8" fill="${inner}" opacity="0.75" />
    <ellipse cx="64" cy="78" rx="35" ry="30" fill="${fur}" />
    <ellipse cx="64" cy="88" rx="15" ry="11" fill="#e7e5e4" />
    <ellipse cx="51" cy="72" rx="4" ry="4.5" fill="#1c1917">
      <animate attributeName="ry" values="4.5;4.5;0.5;4.5;4.5" dur="3.3s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="77" cy="72" rx="4" ry="4.5" fill="#1c1917">
      <animate attributeName="ry" values="4.5;4.5;0.5;4.5;4.5" dur="3.3s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="64" cy="85" rx="4.5" ry="3.5" fill="#f472b6" />
    <path d="M64 88 Q59 95 53 92 M64 88 Q69 95 75 92 M57 93 v4 M71 93 v4" stroke="#78716c" stroke-width="2" fill="none" stroke-linecap="round" />
    <g stroke="#78716c" stroke-width="2" stroke-linecap="round" opacity="0.8">
      <line x1="22" y1="82" x2="38" y2="85" /><line x1="22" y1="94" x2="38" y2="91" />
      <line x1="106" y1="82" x2="90" y2="85" /><line x1="106" y1="94" x2="90" y2="91" />
    </g>
    <path d="M104 108 q14 2 12 -12" stroke="#d6d3d1" stroke-width="5" fill="none" stroke-linecap="round">
      <animateTransform attributeName="transform" type="rotate" values="0 110 104;12 110 104;0 110 104" dur="1.8s" repeatCount="indefinite" />
    </path>
  </g>
</svg>`;
}
