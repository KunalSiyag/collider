/** Empty Inbox — an open mailbox with drifting dust motes and "all caught up". */
export interface EmptyInboxOptions {
  accent?: string;
  label?: string;
}

export function createEmptyInbox(options: EmptyInboxOptions = {}): string {
  const { accent = '#8b5cf6', label = 'All caught up' } = options;
  return `<svg viewBox="0 0 260 200" width="260" height="200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  ${Array.from({ length: 6 }, (_, i) => `<circle cx="${50 + i * 32}" cy="${40 + (i % 3) * 14}" r="1.8" fill="#52525b" opacity="0.7">
    <animate attributeName="cy" values="${40 + (i % 3) * 14};${28 + (i % 3) * 14};${40 + (i % 3) * 14}" dur="${(3 + i * 0.5).toFixed(1)}s" begin="${(-i * 0.6).toFixed(1)}s" repeatCount="indefinite"/>
  </circle>`).join('')}
  <path d="M60 110 L60 160 L200 160 L200 110 L130 138 Z" fill="#1c1c22" stroke="#3f3f46" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M60 110 L130 138 L200 110" fill="none" stroke="#3f3f46" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M60 110 L130 138 L200 110 L200 96 L60 96 Z" fill="#27272a" stroke="#3f3f46" stroke-width="2.5" stroke-linejoin="round"/>
  <circle cx="130" cy="106" r="17" fill="#0b0b10" stroke="${accent}" stroke-width="2.5"/>
  <path d="M123 106 l5 5 L138 100" stroke="${accent}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"
    stroke-dasharray="24" stroke-dashoffset="24">
    <animate attributeName="stroke-dashoffset" from="24" to="0" dur="0.6s" begin="0.5s" fill="freeze"/>
  </path>
  <text x="130" y="184" text-anchor="middle" fill="#71717a" font-size="12.5" font-weight="500" font-family="system-ui">${label}</text>
</svg>`;
}
