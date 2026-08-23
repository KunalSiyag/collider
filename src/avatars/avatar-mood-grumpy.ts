export interface AvatarMoodGrumpyOptions {
  body?: string;
  size?: number;
}

export function createAvatarMoodGrumpy(options: AvatarMoodGrumpyOptions = {}): string {
  const { body = '#84cc16', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Grumpy mood avatar">
  <rect width="128" height="128" rx="36" fill="#65a30d" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -1; 0 1; 0 -1" dur="3.4s" repeatCount="indefinite" />
    <circle cx="64" cy="72" r="38" fill="${body}" />
    <path d="M40 54 L56 62 M88 54 L72 62" stroke="#365314" stroke-width="5" stroke-linecap="round" />
    <ellipse cx="49" cy="68" rx="5.5" ry="6" fill="#1a2e05">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="79" cy="68" rx="5.5" ry="6" fill="#1a2e05">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.4s" begin="-0.4s" repeatCount="indefinite" />
    </ellipse>
    <path d="M50 92 Q64 82 78 92" stroke="#365314" stroke-width="4.5" fill="none" stroke-linecap="round" />
    <path d="M58 90 v-3 M70 90 v-3" stroke="#365314" stroke-width="2.5" stroke-linecap="round" />
    <path d="M28 34 q10 -8 20 0 M80 34 q10 -8 20 0" stroke="#3f6212" stroke-width="4.5" fill="none" stroke-linecap="round" />
    <path d="M104 96 q8 -4 6 -12 q10 2 6 12 q-2 8 -12 6 Z" fill="#f97316">
      <animate attributeName="opacity" values="1;0.4;1" dur="1.4s" repeatCount="indefinite" />
    </path>
    <ellipse cx="38" cy="82" rx="5" ry="3.5" fill="#d9f99d" opacity="0.7" />
    <ellipse cx="90" cy="82" rx="5" ry="3.5" fill="#d9f99d" opacity="0.7" />
  </g>
</svg>`;
}
