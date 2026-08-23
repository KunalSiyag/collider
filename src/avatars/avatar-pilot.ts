export interface AvatarPilotOptions {
  cap?: string;
  skin?: string;
  size?: number;
}

export function createAvatarPilot(options: AvatarPilotOptions = {}): string {
  const { cap = '#7c2d12', skin = '#fcd9b8', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pilot avatar">
  <rect width="128" height="128" rx="36" fill="#22d3ee" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="2.7s" repeatCount="indefinite" />
    <ellipse cx="64" cy="86" rx="29" ry="25" fill="${skin}" />
    <path d="M34 60 Q34 38 64 38 Q94 38 94 60 Z" fill="${cap}" />
    <ellipse cx="64" cy="61" rx="33" ry="7" fill="#451a03" />
    <circle cx="47" cy="72" r="9" fill="#bae6fd" stroke="#7c2d12" stroke-width="3.5" />
    <circle cx="81" cy="72" r="9" fill="#bae6fd" stroke="#7c2d12" stroke-width="3.5" />
    <path d="M56 72 h16" stroke="#7c2d12" stroke-width="3.5" />
    <circle cx="47" cy="72" r="3" fill="#ffffff" opacity="0.85" />
    <circle cx="81" cy="72" r="3" fill="#ffffff" opacity="0.85" />
    <path d="M57 98 Q64 103 71 98" stroke="#18181b" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M18 34 q8 -8 16 0 M94 30 q8 -8 16 0" stroke="#67e8f9" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="3.2s" repeatCount="indefinite" />
    </path>
  </g>
</svg>`;
}
