/** Offline State — an unplugged cable with sparks and a reconnect hint. */
export interface OfflineStateOptions {
  accent?: string;
  label?: string;
}

export function createOfflineState(options: OfflineStateOptions = {}): string {
  const { accent = '#ef4444', label = 'Connection lost — retrying…' } = options;
  return `<svg viewBox="0 0 260 200" width="260" height="200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M20 100 C 60 100 70 78 104 78" fill="none" stroke="#52525b" stroke-width="5" stroke-linecap="round"/>
  <rect x="100" y="66" width="26" height="24" rx="6" fill="#27272a" stroke="#52525b" stroke-width="2.5"/>
  <rect x="126" y="72" width="8" height="5" rx="2" fill="#71717a"/>
  <rect x="126" y="80" width="8" height="5" rx="2" fill="#71717a"/>
  <path d="M240 100 C 200 100 190 122 158 122" fill="none" stroke="#52525b" stroke-width="5" stroke-linecap="round"/>
  <rect x="134" y="110" width="26" height="24" rx="6" fill="#27272a" stroke="#52525b" stroke-width="2.5"/>
  <!-- gap spark -->
  <g stroke="${accent}" stroke-width="2.6" stroke-linecap="round">
    <path d="M136 96 l-6 -8 M142 92 l0 -10 M148 96 l6 -8">
      <animate attributeName="opacity" values="0;1;0" dur="1.6s" repeatCount="indefinite"/>
    </path>
  </g>
  <circle cx="140" cy="100" r="3" fill="${accent}">
    <animate attributeName="r" values="2;4;2" dur="1.6s" repeatCount="indefinite"/>
  </circle>
  <text x="130" y="164" text-anchor="middle" fill="#71717a" font-size="12.5" font-family="system-ui">${label}</text>
</svg>`;
}
