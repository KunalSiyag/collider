export interface AvatarCrabOptions {
  shell?: string;
  claw?: string;
  size?: number;
}

export function createAvatarCrab(options: AvatarCrabOptions = {}): string {
  const { shell = '#f87171', claw = '#ef4444', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Crab avatar">
  <rect width="128" height="128" rx="36" fill="#22d3ee" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="2.4s" repeatCount="indefinite" />
    <g stroke="${claw}" stroke-width="5" fill="none" stroke-linecap="round">
      <path d="M30 92 l-10 10 M42 98 l-6 12 M86 98 l6 12 M98 92 l10 10">
        <animate attributeName="opacity" values="1;0.6;1" dur="1.6s" repeatCount="indefinite" />
      </path>
    </g>
    <path d="M24 58 L10 48 M104 58 L118 48" stroke="${claw}" stroke-width="6" stroke-linecap="round" />
    <circle cx="9" cy="45" r="8" fill="${claw}">
      <animate attributeName="r" values="8;6;8" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="119" cy="45" r="8" fill="${claw}">
      <animate attributeName="r" values="8;6;8" dur="2s" begin="-1s" repeatCount="indefinite" />
    </circle>
    <ellipse cx="64" cy="76" rx="37" ry="28" fill="${shell}" />
    <path d="M40 62 Q64 54 88 62" stroke="#fca5a5" stroke-width="3" fill="none" stroke-linecap="round" />
    <circle cx="50" cy="74" r="8" fill="#ffffff" />
    <circle cx="78" cy="74" r="8" fill="#ffffff" />
    <circle cx="51" cy="75" r="4" fill="#111827">
      <animate attributeName="ry" values="1;1;0;1;1" dur="3.6s" repeatCount="indefinite" />
    </circle>
    <circle cx="77" cy="75" r="4" fill="#111827">
      <animate attributeName="ry" values="1;1;0;1;1" dur="3.6s" repeatCount="indefinite" />
    </circle>
    <path d="M56 88 Q64 93 72 88" stroke="#7f1d1d" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <ellipse cx="36" cy="80" rx="4.5" ry="3" fill="#fecaca" opacity="0.6" />
    <ellipse cx="92" cy="80" rx="4.5" ry="3" fill="#fecaca" opacity="0.6" />
  </g>
</svg>`;
}
