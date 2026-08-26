/** Status Badge — a pill with a breathing presence dot and label. */
export interface StatusBadgeOptions {
  label?: string;
  tone?: 'online' | 'busy' | 'away' | 'offline';
}

const TONES: Record<string, string> = {
  online: '#4ade80',
  busy: '#ef4444',
  away: '#fbbf24',
  offline: '#71717a',
};

export function createStatusBadge(options: StatusBadgeOptions = {}): string {
  const { label = 'Online', tone = 'online' } = options;
  const c = TONES[tone] ?? TONES.online;
  return `<svg viewBox="0 0 132 40" height="40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="1" y="1" width="130" height="38" rx="19" fill="#18181b" stroke="#3f3f46"/>
  <circle cx="24" cy="20" r="5.5" fill="${c}">
    <animate attributeName="opacity" values="1;0.45;1" dur="2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="24" cy="20" r="5.5" fill="none" stroke="${c}" opacity="0.5">
    <animate attributeName="r" values="5.5;11" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.5;0" dur="2s" repeatCount="indefinite"/>
  </circle>
  <text x="40" y="25" fill="#e4e4e7" font-size="14" font-weight="600" font-family="system-ui">${label}</text>
</svg>`;
}
