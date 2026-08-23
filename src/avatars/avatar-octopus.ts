export interface AvatarOctopusOptions {
  body?: string;
  size?: number;
}

export function createAvatarOctopus(options: AvatarOctopusOptions = {}): string {
  const { body = '#c084fc', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Octopus avatar">
  <rect width="128" height="128" rx="36" fill="#8b5cf6" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3.8s" repeatCount="indefinite" />
    <g fill="${body}">
      <path d="M28 84 q-10 14 -22 10 q10 -4 12 -16 Z" />
      <path d="M44 96 q-6 16 -18 18 q8 -8 6 -20 Z" />
      <path d="M64 100 q0 16 -12 22 q6 -10 2 -22 Z" />
      <path d="M84 96 q6 16 18 18 q-8 -8 -6 -20 Z" />
      <path d="M100 84 q10 14 22 10 q-10 -4 -12 -16 Z" />
    </g>
    <ellipse cx="64" cy="62" rx="38" ry="34" fill="${body}" />
    <circle cx="50" cy="58" r="9" fill="#ffffff" />
    <circle cx="78" cy="58" r="9" fill="#ffffff" />
    <circle cx="52" cy="60" r="4.5" fill="#1c1917">
      <animate attributeName="ry" values="4.5;4.5;0.5;4.5;4.5" dur="3.7s" repeatCount="indefinite" />
    </circle>
    <circle cx="80" cy="60" r="4.5" fill="#1c1917">
      <animate attributeName="ry" values="4.5;4.5;0.5;4.5;4.5" dur="3.7s" repeatCount="indefinite" />
    </circle>
    <path d="M54 80 Q64 88 74 80" stroke="#4c1d95" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <ellipse cx="36" cy="72" rx="5.5" ry="4" fill="#f0abfc" opacity="0.7" />
    <ellipse cx="92" cy="72" rx="5.5" ry="4" fill="#f0abfc" opacity="0.7" />
    <g fill="#e9d5ff">
      <circle cx="46" cy="40" r="3" /><circle cx="82" cy="40" r="3" /><circle cx="64" cy="34" r="2.5" />
    </g>
  </g>
</svg>`;
}
