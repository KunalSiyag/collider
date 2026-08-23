export interface AvatarSnowflakeOptions {
  color?: string;
  size?: number;
}

export function createAvatarSnowflake(options: AvatarSnowflakeOptions = {}): string {
  const { color = '#7dd3fc', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Snowflake avatar">
  <rect width="128" height="128" rx="36" fill="#22d3ee" opacity="0.1" />
  <g stroke="${color}" stroke-width="6" stroke-linecap="round">
    <g>
      <animateTransform attributeName="transform" type="rotate" values="0 64 64;360 64 64" dur="18s" repeatCount="indefinite" />
      <line x1="64" y1="14" x2="64" y2="114" />
      <line x1="19" y1="39" x2="109" y2="89" />
      <line x1="19" y1="89" x2="109" y2="39" />
      <g stroke-width="4.5">
        <path d="M64 26 l-10 -10 m10 10 l10 -10 M64 102 l-10 10 m10 -10 l10 10" fill="none" />
        <path d="M30 48 l-13 -5 m13 5 l-3 -14 M98 80 l13 5 m-13 -5 l3 14" fill="none" />
        <path d="M30 80 l-13 5 m13 -5 l-3 14 M98 48 l13 -5 m-13 5 l3 -14" fill="none" />
      </g>
    </g>
  </g>
  <circle cx="64" cy="64" r="17" fill="#f0f9ff" stroke="#bae6fd" stroke-width="4" />
  <circle cx="59" cy="61" r="2.8" fill="#0369a1">
    <animate attributeName="ry" values="1;1;0;1;1" dur="4.2s" repeatCount="indefinite" />
  </circle>
  <circle cx="59" cy="62" r="2.8" fill="#0369a1" />
  <circle cx="69" cy="61" r="2.8" fill="#0369a1">
    <animate attributeName="ry" values="1;1;0;1;1" dur="4.2s" begin="-0.4s" repeatCount="indefinite" />
  </circle>
  <circle cx="69" cy="62" r="2.8" fill="#0369a1" />
  <path d="M59 70 Q64 74 69 70" stroke="#0369a1" stroke-width="2.8" fill="none" stroke-linecap="round" />
</svg>`;
}
