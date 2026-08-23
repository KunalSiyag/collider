export interface AvatarMoodShyOptions {
  body?: string;
  size?: number;
}

export function createAvatarMoodShy(options: AvatarMoodShyOptions = {}): string {
  const { body = '#fda4af', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Shy mood avatar">
  <rect width="128" height="128" rx="36" fill="#f472b6" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2 64 80;2 64 80;-2 64 80" dur="3.8s" repeatCount="indefinite" />
    <circle cx="64" cy="72" r="38" fill="${body}" />
    <ellipse cx="50" cy="66" rx="5" ry="6" fill="#881337">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="50" cy="67" rx="5" ry="6" fill="#881337" />
    <ellipse cx="78" cy="66" rx="5" ry="6" fill="#881337">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.4s" begin="-0.4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="78" cy="67" rx="5" ry="6" fill="#881337" />
    <path d="M58 84 Q64 89 70 84" stroke="#881337" stroke-width="4" fill="none" stroke-linecap="round" />
    <ellipse cx="34" cy="76" rx="9" ry="5.5" fill="#fb7185" opacity="0.75">
      <animate attributeName="opacity" values="0.75;0.45;0.75" dur="2s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="94" cy="76" rx="9" ry="5.5" fill="#fb7185" opacity="0.75">
      <animate attributeName="opacity" values="0.45;0.75;0.45" dur="2s" repeatCount="indefinite" />
    </ellipse>
    <path d="M30 52 q-6 -2 -8 -7 M98 52 q6 -2 8 -7" stroke="#be123c" stroke-width="3" fill="none" stroke-linecap="round">
      <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.8s" repeatCount="indefinite" />
    </path>
  </g>
</svg>`;
}
