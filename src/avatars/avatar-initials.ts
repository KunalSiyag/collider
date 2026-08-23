export interface AvatarInitialsOptions {
  name?: string;
  from?: string;
  to?: string;
  size?: number;
}

export function createAvatarInitials(options: AvatarInitialsOptions = {}): string {
  const {
    name = 'Ada Lovelace',
    from = '#8b5cf6',
    to = '#22d3ee',
    size = 128,
  } = options;

  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join('');

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${name}">
  <defs>
    <linearGradient id="avatar-grad" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${from}" />
      <stop offset="100%" stop-color="${to}" />
    </linearGradient>
  </defs>
  <rect width="128" height="128" rx="36" fill="url(#avatar-grad)" />
  <text x="64" y="64" text-anchor="middle" dominant-baseline="central"
    font-family="Inter, system-ui, sans-serif" font-size="52" font-weight="700"
    fill="#ffffff" letter-spacing="1">${initials}</text>
</svg>`;
}
