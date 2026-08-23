export interface AvatarToucanOptions {
  body?: string;
  bill?: string;
  size?: number;
}

export function createAvatarToucan(options: AvatarToucanOptions = {}): string {
  const { body = '#1e293b', bill = '#fbbf24', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Toucan avatar">
  <rect width="128" height="128" rx="36" fill="#4ade80" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="3s" repeatCount="indefinite" />
    <path d="M44 92 q-16 10 -30 6 q12 -4 16 -16 Z" fill="${body}" />
    <ellipse cx="62" cy="82" rx="28" ry="24" fill="${body}" />
    <path d="M54 104 l-4 14 m14 -12 l0 14" stroke="#facc15" stroke-width="4" stroke-linecap="round" />
    <circle cx="54" cy="46" r="24" fill="${body}" />
    <ellipse cx="52" cy="44" rx="15" ry="17" fill="#fef9c3" />
    <path d="M76 38 q30 -8 40 6 q-6 18 -38 14 Z" fill="${bill}">
      <animate attributeName="d" values="M76 38 q30 -8 40 6 q-6 18 -38 14 Z;M76 36 q30 -8 40 6 q-6 18 -38 14 Z;M76 38 q30 -8 40 6 q-6 18 -38 14 Z" dur="3s" repeatCount="indefinite" />
    </path>
    <path d="M112 44 q4 2 4 6" stroke="#b45309" stroke-width="3" fill="none" stroke-linecap="round" />
    <path d="M76 44 q14 -2 24 2" stroke="#dc2626" stroke-width="4" fill="none" opacity="0.85" />
    <circle cx="55" cy="43" r="4.5" fill="#0ea5e9">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.1s" repeatCount="indefinite" />
    </circle>
    <circle cx="55" cy="43" r="4.5" fill="#0ea5e9" />
    <circle cx="56.5" cy="41.5" r="1.5" fill="#ffffff" />
    <path d="M40 66 q10 6 20 0" stroke="#334155" stroke-width="3" fill="none" stroke-linecap="round" opacity="0" />
    <path d="M20 30 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 Z" fill="#4ade80" opacity="0.7" />
  </g>
</svg>`;
}
