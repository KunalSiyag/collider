export interface AvatarAstronautOptions {
  suit?: string;
  visor?: string;
  size?: number;
}

export function createAvatarAstronaut(options: AvatarAstronautOptions = {}): string {
  const { suit = '#e4e4e7', visor = '#1e1b4b', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Astronaut avatar">
  <rect width="128" height="128" rx="36" fill="#8b5cf6" opacity="0.13" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3.6s" repeatCount="indefinite" />
    <circle cx="20" cy="26" r="2.5" fill="#ffffff" opacity="0.9" />
    <circle cx="110" cy="40" r="2" fill="#ffffff" opacity="0.7" />
    <circle cx="104" cy="18" r="1.5" fill="#ffffff" opacity="0.8" />
    <circle cx="64" cy="66" r="36" fill="${suit}" />
    <circle cx="64" cy="64" r="27" fill="${visor}" />
    <circle cx="55" cy="62" r="4.5" fill="#22d3ee">
      <animate attributeName="ry" values="4.5;4.5;0.5;4.5" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle cx="73" cy="62" r="4.5" fill="#22d3ee">
      <animate attributeName="ry" values="4.5;4.5;0.5;4.5" dur="4s" repeatCount="indefinite" />
    </circle>
    <path d="M58 74 Q64 79 70 74" stroke="#22d3ee" stroke-width="3" fill="none" stroke-linecap="round" />
    <path d="M44 50 A30 30 0 0 1 78 42" stroke="#a5b4fc" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.7" />
    <rect x="52" y="94" width="24" height="8" rx="4" fill="#c4b5fd" />
    <circle cx="64" cy="98" r="2.5" fill="#8b5cf6">
      <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
    </circle>
  </g>
</svg>`;
}
