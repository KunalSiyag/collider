export interface AvatarBalloonOptions {
  body?: string;
  knot?: string;
  size?: number;
}

export function createAvatarBalloon(options: AvatarBalloonOptions = {}): string {
  const { body = '#f43f5e', knot = '#be123c', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Balloon avatar">
  <rect width="128" height="128" rx="36" fill="#fb7185" opacity="0.11" />
  <path d="M64 106 q10 10 20 4 q-12 12 -20 6 q-8 6 -20 -6 q10 6 20 -4" stroke="#a16207" stroke-width="2.5" fill="none" />
  <path d="M64 102 q6 8 -2 16 M64 102 q-8 6 -4 14 M64 102 q10 4 8 12" stroke="#e11d48" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.7" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -3; 0 3; 0 -3" dur="3.4s" repeatCount="indefinite" />
    <ellipse cx="64" cy="56" rx="32" ry="37" fill="${body}" />
    <path d="M64 93 l-7 9 h14 Z" fill="${knot}" />
    <ellipse cx="50" cy="38" rx="8" ry="13" fill="#ffffff" opacity="0.35" transform="rotate(18 50 38)" />
    <ellipse cx="53" cy="56" rx="5.5" ry="6" fill="#450a0a">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="53" cy="57" rx="5.5" ry="6" fill="#450a0a" />
    <ellipse cx="77" cy="56" rx="5.5" ry="6" fill="#450a0a">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" begin="-0.4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="77" cy="57" rx="5.5" ry="6" fill="#450a0a" />
    <circle cx="54.5" cy="54.5" r="2" fill="#ffffff" /><circle cx="78.5" cy="54.5" r="2" fill="#ffffff" />
    <path d="M57 70 Q64 76 71 70" stroke="#450a0a" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <ellipse cx="44" cy="66" rx="4.5" ry="3.5" fill="#fecdd3" opacity="0.55" />
    <ellipse cx="86" cy="66" rx="4.5" ry="3.5" fill="#fecdd3" opacity="0.55" />
  </g>
</svg>`;
}
