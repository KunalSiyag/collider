export interface AvatarBlobOptions {
  variant?: number;
  color?: string;
  size?: number;
}

const PALETTES = [
  { body: '#8b5cf6', blush: '#f0abfc' },
  { body: '#22d3ee', blush: '#a5f3fc' },
  { body: '#fb7185', blush: '#fecdd3' },
  { body: '#34d399', blush: '#bbf7d0' },
  { body: '#f59e0b', blush: '#fde68a' },
];

export function createAvatarBlob(options: AvatarBlobOptions = {}): string {
  const { variant = 0, color, size = 128 } = options;

  const v = ((variant % PALETTES.length) + PALETTES.length) % PALETTES.length;
  const palette = PALETTES[v];
  const body = color ?? palette.body;

  const eyeStyle = v % 3;
  const mouthStyle = v % 4;

  let eyes = '';
  if (eyeStyle === 0) {
    eyes = `
  <circle cx="47" cy="58" r="9" fill="#18181b" />
  <circle cx="81" cy="58" r="9" fill="#18181b" />
  <circle cx="50" cy="55" r="3" fill="#ffffff" />
  <circle cx="84" cy="55" r="3" fill="#ffffff" />`;
  } else if (eyeStyle === 1) {
    eyes = `
  <path d="M39 60 Q47 52 55 60" stroke="#18181b" stroke-width="5" fill="none" stroke-linecap="round" />
  <path d="M73 60 Q81 52 89 60" stroke="#18181b" stroke-width="5" fill="none" stroke-linecap="round" />`;
  } else {
    eyes = `
  <rect x="41" y="51" width="12" height="14" rx="6" fill="#18181b" />
  <rect x="75" y="51" width="12" height="14" rx="6" fill="#18181b" />`;
  }

  let mouth = '';
  if (mouthStyle === 0) {
    mouth = `<path d="M54 80 Q64 90 74 80" stroke="#18181b" stroke-width="5" fill="none" stroke-linecap="round" />`;
  } else if (mouthStyle === 1) {
    mouth = `<circle cx="64" cy="82" r="6" fill="#18181b" />`;
  } else if (mouthStyle === 2) {
    mouth = `<path d="M52 78 L58 84 L64 78 L70 84 L76 78" stroke="#18181b" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />`;
  } else {
    mouth = `<path d="M56 80 Q64 76 72 80" stroke="#18181b" stroke-width="5" fill="none" stroke-linecap="round" />`;
  }

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Blob avatar ${variant}">
  <rect width="128" height="128" rx="36" fill="${body}" opacity="0.16" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -3; 0 0" dur="2.6s" repeatCount="indefinite" />
    <path d="M64 18 C96 18 112 42 110 68 C108 98 92 112 64 112 C36 112 20 98 18 68 C16 42 32 18 64 18 Z" fill="${body}" />
    ${eyes}
    ${mouth}
    <ellipse cx="34" cy="74" rx="8" ry="5" fill="${palette.blush}" opacity="0.8" />
    <ellipse cx="94" cy="74" rx="8" ry="5" fill="${palette.blush}" opacity="0.8" />
  </g>
</svg>`;
}
