export interface AvatarFrogOptions {
  skin?: string;
  belly?: string;
  size?: number;
}

export function createAvatarFrog(options: AvatarFrogOptions = {}): string {
  const { skin = '#4ade80', belly = '#d9f99d', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Frog avatar">
  <rect width="128" height="128" rx="36" fill="#4ade80" opacity="0.13" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -3; 0 0" dur="2.2s" repeatCount="indefinite" />
    <circle cx="40" cy="34" r="14" fill="${skin}" />
    <circle cx="88" cy="34" r="14" fill="${skin}" />
    <ellipse cx="64" cy="80" rx="40" ry="30" fill="${skin}" />
    <ellipse cx="64" cy="94" rx="26" ry="14" fill="${belly}" />
    <circle cx="40" cy="34" r="7" fill="#ffffff" />
    <circle cx="88" cy="34" r="7" fill="#ffffff" />
    <circle cx="41" cy="35" r="3.5" fill="#18181b">
      <animate attributeName="ry" values="3.5;3.5;0.4;3.5;3.5" dur="4.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="89" cy="35" r="3.5" fill="#18181b">
      <animate attributeName="ry" values="3.5;3.5;0.4;3.5;3.5" dur="4.2s" repeatCount="indefinite" />
    </circle>
    <path d="M46 78 Q64 92 82 78" stroke="#14532d" stroke-width="4" fill="none" stroke-linecap="round" />
    <circle cx="46" cy="78" r="2" fill="#14532d" />
    <circle cx="82" cy="78" r="2" fill="#14532d" />
    <ellipse cx="30" cy="72" rx="5" ry="3.5" fill="#fda4af" opacity="0.5" />
    <ellipse cx="98" cy="72" rx="5" ry="3.5" fill="#fda4af" opacity="0.5" />
    <circle cx="112" cy="108" r="3" fill="#bbf7d0" />
  </g>
</svg>`;
}
