export interface AvatarRingOptions {
  initials?: string;
  from?: string;
  to?: string;
  size?: number;
}

export function createAvatarRing(options: AvatarRingOptions = {}): string {
  const {
    initials = 'MX',
    from = '#f472b6',
    to = '#8b5cf6',
    size = 128,
  } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Story ring avatar ${initials}">
  <defs>
    <linearGradient id="ring-grad" x1="10" y1="10" x2="118" y2="118" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${from}" />
      <stop offset="100%" stop-color="${to}" />
    </linearGradient>
  </defs>
  <circle cx="64" cy="64" r="58" fill="none" stroke="url(#ring-grad)" stroke-width="6"
    stroke-dasharray="300 65" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="9s" repeatCount="indefinite" />
  </circle>
  <circle cx="64" cy="64" r="58" fill="none" stroke="#27272a" stroke-width="6" opacity="0.4" />
  <circle cx="64" cy="64" r="44" fill="#18181b" />
  <text x="64" y="64" text-anchor="middle" dominant-baseline="central"
    font-family="Inter, system-ui, sans-serif" font-size="34" font-weight="700"
    fill="url(#ring-grad)">${initials}</text>
</svg>`;
}
