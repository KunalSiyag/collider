export interface AvatarMoodDizzyOptions {
  body?: string;
  size?: number;
}

export function createAvatarMoodDizzy(options: AvatarMoodDizzyOptions = {}): string {
  const { body = '#c084fc', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dizzy mood avatar">
  <rect width="128" height="128" rx="36" fill="#8b5cf6" opacity="0.13" />
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-4 64 74;4 64 74;-4 64 74" dur="2s" repeatCount="indefinite" />
    <circle cx="64" cy="72" r="38" fill="${body}" />
    <g stroke="#3b0764" stroke-width="4" stroke-linecap="round" fill="none">
      <path d="M40 58 l14 14 M54 58 l-14 14"><animateTransform attributeName="transform" type="rotate" values="0 47 65;360 47 65" dur="4s" repeatCount="indefinite" /></path>
      <path d="M74 58 l14 14 M88 58 l-14 14"><animateTransform attributeName="transform" type="rotate" values="0 81 65;360 81 65" dur="4s" begin="-2s" repeatCount="indefinite" /></path>
    </g>
    <ellipse cx="64" cy="90" rx="7" ry="6" fill="#3b0764" />
    <path d="M58 92 h12 M61 95 h6" stroke="#e9d5ff" stroke-width="2" stroke-linecap="round" />
    <g stroke="#fde047" stroke-width="3.5" fill="none" stroke-linecap="round">
      <path d="M18 30 a10 10 0 1 1 10 10"><animateTransform attributeName="transform" type="rotate" values="0 24 36;360 24 36" dur="3s" repeatCount="indefinite" /></path>
      <path d="M104 96 a9 9 0 1 0 -9 9"><animateTransform attributeName="transform" type="rotate" values="0 100 100;-360 100 100" dur="3s" begin="-1s" repeatCount="indefinite" /></path>
    </g>
    <g fill="#fbcfe8">
      <circle cx="32" cy="82" r="3" /><circle cx="96" cy="46" r="3" />
    </g>
  </g>
</svg>`;
}
