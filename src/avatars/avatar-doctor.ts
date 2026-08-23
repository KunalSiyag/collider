export interface AvatarDoctorOptions {
  cap?: string;
  skin?: string;
  size?: number;
}

export function createAvatarDoctor(options: AvatarDoctorOptions = {}): string {
  const { cap = '#ffffff', skin = '#fcd9b8', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Doctor avatar">
  <rect width="128" height="128" rx="36" fill="#22d3ee" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="3s" repeatCount="indefinite" />
    <path d="M40 52 Q40 30 64 30 Q88 30 88 52 Z" fill="${cap}" stroke="#d4d4d8" stroke-width="2.5" />
    <circle cx="64" cy="41" r="7" fill="#22d3ee" />
    <path d="M61 41 h6 M64 38 v6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
    <ellipse cx="64" cy="84" rx="29" ry="26" fill="${skin}" />
    <circle cx="53" cy="80" r="4" fill="#18181b" />
    <circle cx="75" cy="80" r="4" fill="#18181b" />
    <path d="M56 94 Q64 100 72 94" stroke="#18181b" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M40 96 Q34 110 46 114 M88 96 Q94 110 82 114" stroke="#334155" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <circle cx="46" cy="115" r="5" fill="#334155" />
    <circle cx="82" cy="115" r="5" fill="#334155" />
    <ellipse cx="44" cy="88" rx="5" ry="3.5" fill="#fb7185" opacity="0.4" />
    <ellipse cx="84" cy="88" rx="5" ry="3.5" fill="#fb7185" opacity="0.4" />
  </g>
</svg>`;
}
