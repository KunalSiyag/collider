export interface AvatarPlanetOptions {
  body?: string;
  ring?: string;
  size?: number;
}

export function createAvatarPlanet(options: AvatarPlanetOptions = {}): string {
  const { body = '#a78bfa', ring = '#fbbf24', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Planet avatar">
  <rect width="128" height="128" rx="36" fill="#8b5cf6" opacity="0.12" />
  <g fill="#fef9c3">
    <circle cx="18" cy="24" r="1.8"><animate attributeName="opacity" values="1;0.2;1" dur="2.6s" repeatCount="indefinite" /></circle>
    <circle cx="112" cy="30" r="2"><animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" /></circle>
    <circle cx="106" cy="106" r="1.5"><animate attributeName="opacity" values="1;0.3;1" dur="2.2s" begin="-1s" repeatCount="indefinite" /></circle>
  </g>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="4s" repeatCount="indefinite" />
    <circle cx="64" cy="64" r="34" fill="${body}" />
    <path d="M40 52 q12 -10 26 -4 M46 82 q14 8 30 0" stroke="#7c3aed" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.55" />
    <circle cx="78" cy="48" r="6" fill="#ddd6fe" opacity="0.7" />
    <circle cx="50" cy="70" r="4.5" fill="#ddd6fe" opacity="0.5" />
    <ellipse cx="53" cy="62" rx="4.5" ry="5" fill="#2e1065">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="53" cy="63" rx="4.5" ry="5" fill="#2e1065" />
    <ellipse cx="76" cy="62" rx="4.5" ry="5" fill="#2e1065">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.4s" begin="-0.4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="76" cy="63" rx="4.5" ry="5" fill="#2e1065" />
    <path d="M57 76 Q64 82 71 76" stroke="#2e1065" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <g transform="rotate(-16 64 64)">
      <ellipse cx="64" cy="66" rx="52" ry="11" fill="none" stroke="${ring}" stroke-width="6" opacity="0.85" />
      <path d="M12 66 a52 11 0 0 1 104 0" fill="none" stroke="${ring}" stroke-width="6" opacity="0" />
    </g>
    <circle cx="20" cy="88" r="3" fill="#67e8f9"><animate attributeName="r" values="3;2;3" dur="2s" repeatCount="indefinite" /></circle>
  </g>
</svg>`;
}
