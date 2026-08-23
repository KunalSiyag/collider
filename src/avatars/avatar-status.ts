export interface AvatarStatusOptions {
  status?: 'online' | 'away' | 'busy' | 'offline';
  body?: string;
  ringColor?: string;
  size?: number;
}

const STATUS_COLORS: Record<string, string> = {
  online: '#22c55e',
  away: '#f59e0b',
  busy: '#ef4444',
  offline: '#71717a',
};

export function createAvatarStatus(options: AvatarStatusOptions = {}): string {
  const {
    status = 'online',
    body = '#3f3f46',
    ringColor = '#8b5cf6',
    size = 128,
  } = options;

  const dot = STATUS_COLORS[status] ?? STATUS_COLORS.online;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Avatar with ${status} status">
  <defs>
    <clipPath id="status-clip">
      <circle cx="64" cy="60" r="46" />
    </clipPath>
  </defs>
  <circle cx="64" cy="60" r="50" fill="none" stroke="${ringColor}" stroke-width="4" opacity="0.85" />
  <g clip-path="url(#status-clip)">
    <circle cx="64" cy="60" r="46" fill="#18181b" />
    <circle cx="64" cy="48" r="16" fill="${body}" />
    <path d="M32 106 C32 84 48 74 64 74 C80 74 96 84 96 106 Z" fill="${body}" />
  </g>
  <circle cx="102" cy="94" r="14" fill="#18181b" stroke="${dot}" stroke-width="5" />
</svg>`;
}
