export interface AvatarOrbitOptions {
  initials?: string;
  color?: string;
  orbitColor?: string;
  size?: number;
}

export function createAvatarOrbit(options: AvatarOrbitOptions = {}): string {
  const {
    initials = 'AK',
    color = '#8b5cf6',
    orbitColor = '#22d3ee',
    size = 128,
  } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Orbit avatar ${initials}">
  <defs>
    <clipPath id="orbit-clip">
      <rect width="128" height="128" rx="36" />
    </clipPath>
  </defs>
  <g clip-path="url(#orbit-clip)">
    <circle cx="64" cy="64" r="30" fill="${color}" />
    <text x="64" y="64" text-anchor="middle" dominant-baseline="central"
      font-family="Inter, system-ui, sans-serif" font-size="24" font-weight="700"
      fill="#ffffff">${initials}</text>
    <g>
      <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="8s" repeatCount="indefinite" />
      <ellipse cx="64" cy="64" rx="48" ry="18" fill="none" stroke="${orbitColor}" stroke-width="1.5" opacity="0.5" />
      <circle cx="112" cy="64" r="4.5" fill="${orbitColor}" />
    </g>
    <g>
      <animateTransform attributeName="transform" type="rotate" from="360 64 64" to="0 64 64" dur="13s" repeatCount="indefinite" />
      <ellipse cx="64" cy="64" rx="20" ry="44" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.5" />
      <circle cx="64" cy="20" r="3.5" fill="${color}" />
    </g>
  </g>
</svg>`;
}
