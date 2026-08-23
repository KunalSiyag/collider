export interface AvatarCyclopsOptions {
  body?: string;
  iris?: string;
  size?: number;
}

export function createAvatarCyclops(options: AvatarCyclopsOptions = {}): string {
  const { body = '#f472b6', iris = '#22d3ee', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cyclops avatar">
  <rect width="128" height="128" rx="36" fill="#f472b6" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3s" repeatCount="indefinite" />
    <path d="M64 26 q-16 -14 -30 -4 l14 10 Z M64 26 q16 -14 30 -4 l-14 10 Z" fill="#9d174d" opacity="0.85" />
    <path d="M64 20 C94 20 106 44 104 70 C102 98 88 110 64 110 C40 110 26 98 24 70 C22 44 34 20 64 20 Z" fill="${body}" />
    <circle cx="64" cy="62" r="19" fill="#ffffff" />
    <circle cx="64" cy="63" r="10" fill="${iris}">
      <animate attributeName="r" values="10;11;10" dur="2.6s" repeatCount="indefinite" />
    </circle>
    <circle cx="64" cy="64" r="4.5" fill="#111827">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.3s" repeatCount="indefinite" />
    </circle>
    <circle cx="60" cy="59" r="3" fill="#ffffff" opacity="0.9" />
    <path d="M52 90 Q64 98 76 90" stroke="#500724" stroke-width="4" fill="none" stroke-linecap="round" />
    <g fill="#fce7f3">
      <circle cx="36" cy="46" r="2.5" /><circle cx="92" cy="46" r="2.5" /><circle cx="34" cy="86" r="2" /><circle cx="94" cy="86" r="2" />
    </g>
    <path d="M50 32 q14 -8 28 0" stroke="#9d174d" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.5" />
  </g>
</svg>`;
}
