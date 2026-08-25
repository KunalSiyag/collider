/** Cloud Sync — a cloud with arrows cycling through it. */
export interface CloudSyncOptions {
  color?: string;
  accent?: string;
  size?: number;
}

export function createCloudSync(options: CloudSyncOptions = {}): string {
  const { color = '#a1a1aa', accent = '#22d3ee', size = 120 } = options;
  return `<svg viewBox="0 0 120 84" width="${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M34 62 A 16 16 0 0 1 36 30 A 22 22 0 0 1 78 24 A 15 15 0 0 1 88 62 Z"
    fill="none" stroke="${color}" stroke-width="5" stroke-linejoin="round"/>
  <g stroke="${accent}" stroke-width="4" fill="none" stroke-linecap="round">
    <path d="M52 40 q 8 -6 16 0">
      <animate attributeName="d" values="M52 40 q 8 -6 16 0;M52 40 q 8 6 16 0;M52 40 q 8 -6 16 0" dur="2.2s" repeatCount="indefinite"/>
    </path>
    <path d="M52 52 q 8 6 16 0">
      <animate attributeName="d" values="M52 52 q 8 6 16 0;M52 52 q 8 -6 16 0;M52 52 q 8 6 16 0" dur="2.2s" begin="-1.1s" repeatCount="indefinite"/>
    </path>
  </g>
</svg>`;
}
