export interface AvatarMoodLoveOptions {
  body?: string;
  size?: number;
}

export function createAvatarMoodLove(options: AvatarMoodLoveOptions = {}): string {
  const { body = '#fb7185', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="In love mood avatar">
  <rect width="128" height="128" rx="36" fill="#f472b6" opacity="0.13" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -1; 0 -4; 0 -1" dur="1.6s" repeatCount="indefinite" />
    <circle cx="64" cy="72" r="38" fill="${body}" />
    <path d="M42 58 q-8 -10 2 -14 q6 -2 8 6 q2 -8 8 -6 q10 4 2 14 l-10 10 Z" fill="#e11d48" />
    <path d="M66 58 q-8 -10 2 -14 q6 -2 8 6 q2 -8 8 -6 q10 4 2 14 l-10 10 Z" fill="#e11d48" />
    <path d="M52 88 Q64 96 76 88" stroke="#9f1239" stroke-width="4.5" fill="none" stroke-linecap="round" />
    <ellipse cx="38" cy="80" rx="6" ry="4" fill="#fecdd3" opacity="0.85" />
    <ellipse cx="90" cy="80" rx="6" ry="4" fill="#fecdd3" opacity="0.85" />
    <path d="M104 34 q-5 -7 1 -11 q4 -2 5 3 q1 -5 5 -3 q6 4 1 11 l-6 6 Z" fill="#f472b6">
      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
    </path>
    <path d="M20 40 q-4 -6 1 -9 q3 -2 4 3 q1 -5 4 -3 q5 3 1 9 l-5 5 Z" fill="#fda4af" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" begin="-1s" repeatCount="indefinite" />
    </path>
  </g>
</svg>`;
}
