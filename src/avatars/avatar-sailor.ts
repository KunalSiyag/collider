export interface AvatarSailorOptions {
  skin?: string;
  collar?: string;
  size?: number;
}

export function createAvatarSailor(options: AvatarSailorOptions = {}): string {
  const { skin = '#fcd9b8', collar = '#2563eb', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sailor avatar">
  <rect width="128" height="128" rx="36" fill="#2563eb" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="3s" repeatCount="indefinite" />
    <ellipse cx="64" cy="84" rx="28" ry="25" fill="${skin}" />
    <path d="M40 54 Q40 36 64 36 Q88 36 88 54 Z" fill="#ffffff" stroke="#d4d4d8" stroke-width="2" />
    <ellipse cx="64" cy="54" rx="34" ry="8" fill="#f8fafc" stroke="#d4d4d8" stroke-width="2" />
    <rect x="52" y="46" width="24" height="8" rx="3" fill="#2563eb" />
    <path d="M64 46 v8" stroke="#facc15" stroke-width="2" />
    <circle cx="53" cy="80" r="4" fill="#18181b" />
    <circle cx="75" cy="80" r="4" fill="#18181b" />
    <path d="M57 93 Q64 99 71 93" stroke="#18181b" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M36 104 L64 96 L92 104 L92 112 H36 Z" fill="${collar}" />
    <path d="M40 106 L64 99 L88 106" stroke="#ffffff" stroke-width="2" fill="none" />
    <path d="M14 40 q6 -6 12 0 M14 50 q6 -6 12 0" stroke="#93c5fd" stroke-width="2.5" fill="none" stroke-linecap="round" />
  </g>
</svg>`;
}
