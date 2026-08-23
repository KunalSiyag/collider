export interface AvatarClockOptions {
  face?: string;
  hand?: string;
  size?: number;
}

export function createAvatarClock(options: AvatarClockOptions = {}): string {
  const { face = '#fef9c3', hand = '#7c2d12', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Clock avatar">
  <rect width="128" height="128" rx="36" fill="#fbbf24" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3.2s" repeatCount="indefinite" />
    <circle cx="64" cy="66" r="42" fill="#a16207" />
    <circle cx="64" cy="66" r="35" fill="${face}" />
    <g stroke="#d6d3d1" stroke-width="4" stroke-linecap="round">
      <line x1="64" y1="34" x2="64" y2="40" /><line x1="64" y1="92" x2="64" y2="98" />
      <line x1="32" y1="66" x2="38" y2="66" /><line x1="90" y1="66" x2="96" y2="66" />
    </g>
    <line x1="64" y1="66" x2="64" y2="46" stroke="${hand}" stroke-width="5" stroke-linecap="round">
      <animateTransform attributeName="transform" type="rotate" values="60 64 66;420 64 66" dur="8s" repeatCount="indefinite" />
    </line>
    <line x1="64" y1="66" x2="80" y2="72" stroke="#292524" stroke-width="3.5" stroke-linecap="round">
      <animateTransform attributeName="transform" type="rotate" values="0 64 66;360 64 66" dur="24s" repeatCount="indefinite" />
    </line>
    <circle cx="64" cy="66" r="4" fill="${hand}" />
    <ellipse cx="52" cy="78" rx="5.5" ry="5.5" fill="#451a03">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="76" cy="78" rx="5.5" ry="5.5" fill="#451a03">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" begin="-0.4s" repeatCount="indefinite" />
    </ellipse>
    <path d="M56 88 Q64 93 72 88" stroke="#451a03" stroke-width="4" fill="none" stroke-linecap="round" />
    <path d="M104 20 l2.5 5 5 2.5 -5 2.5 -2.5 5 -2.5 -5 -5 -2.5 5 -2.5 Z" fill="#fde047" transform="scale(0.8) translate(26 5)">
      <animateTransform attributeName="transform" type="rotate" values="0 106 30;360 106 30" dur="10s" repeatCount="indefinite" additive="sum" />
    </path>
  </g>
</svg>`;
}
