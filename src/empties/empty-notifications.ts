/** Empty Notifications — a sleeping bell with a soft zzz drift. */
export interface EmptyNotificationsOptions {
  accent?: string;
  label?: string;
}

export function createEmptyNotifications(options: EmptyNotificationsOptions = {}): string {
  const { accent = '#a78bfa', label = "You're all caught up" } = options;
  return `<svg viewBox="0 0 260 200" width="260" height="200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g>
    <animateTransform attributeName="transform" type="rotate" values="0 130 92;3 130 92;0 130 92;-3 130 92;0 130 92" dur="4.6s" repeatCount="indefinite"/>
    <path d="M130 46 a34 34 0 0 1 34 34 v22 l10 16 H86 l10 -16 v-22 a34 34 0 0 1 34 -34 z" fill="none" stroke="${accent}" stroke-width="4.5" stroke-linejoin="round"/>
    <path d="M118 126 a12 12 0 0 0 24 0" fill="none" stroke="${accent}" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="130" y1="40" x2="130" y2="48" stroke="${accent}" stroke-width="4.5" stroke-linecap="round"/>
  </g>
  <g fill="#52525b" font-size="15" font-weight="700" font-family="system-ui">
    <text x="176" y="66" opacity="0">z
      <animate attributeName="opacity" values="0;0.9;0" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="y" values="66;52" dur="3s" repeatCount="indefinite"/>
    </text>
    <text x="188" y="56" opacity="0" font-size="12">z
      <animate attributeName="opacity" values="0;0.8;0" dur="3s" begin="0.7s" repeatCount="indefinite"/>
      <animate attributeName="y" values="56;42" dur="3s" begin="0.7s" repeatCount="indefinite"/>
    </text>
  </g>
  <text x="130" y="172" text-anchor="middle" fill="#71717a" font-size="12.5" font-weight="500" font-family="system-ui">${label}</text>
</svg>`;
}
