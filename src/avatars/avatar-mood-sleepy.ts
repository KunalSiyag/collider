export interface AvatarMoodSleepyOptions {
  body?: string;
  size?: number;
}

export function createAvatarMoodSleepy(options: AvatarMoodSleepyOptions = {}): string {
  const { body = '#a5b4fc', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sleepy mood avatar">
  <rect width="128" height="128" rx="36" fill="#8b5cf6" opacity="0.13" />
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-3 64 80;3 64 80;-3 64 80" dur="4s" repeatCount="indefinite" />
    <circle cx="64" cy="72" r="38" fill="${body}" />
    <path d="M42 66 q6 6 12 0 M74 66 q6 6 12 0" stroke="#3730a3" stroke-width="4.5" fill="none" stroke-linecap="round" />
    <path d="M54 84 Q64 92 74 84" stroke="#3730a3" stroke-width="4" fill="none" stroke-linecap="round" />
    <ellipse cx="36" cy="80" rx="5.5" ry="4" fill="#c7d2fe" opacity="0.8" />
    <ellipse cx="92" cy="80" rx="5.5" ry="4" fill="#c7d2fe" opacity="0.8" />
    <g fill="#e0e7ff" font-family="sans-serif" font-size="16" font-weight="bold">
      <text x="94" y="34">z</text>
      <text x="102" y="22" font-size="13"><animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />z</text>
      <text x="110" y="12" font-size="10"><animate attributeName="opacity" values="0.2;1;0.2" dur="2s" begin="-1s" repeatCount="indefinite" />z</text>
    </g>
  </g>
</svg>`;
}
