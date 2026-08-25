/** Bluetooth Ping — the rune with expanding connection pings. */
export interface BluetoothPingOptions {
  color?: string;
  size?: number;
}

export function createBluetoothPing(options: BluetoothPingOptions = {}): string {
  const { color = '#8b5cf6', size = 96 } = options;
  return `<svg viewBox="0 0 96 96" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g stroke="${color}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M32 28 L64 68 L48 80 L48 16 L64 28 L32 68"/>
  </g>
  <circle cx="48" cy="48" r="18" fill="none" stroke="${color}" stroke-width="3" opacity="0">
    <animate attributeName="r" values="16;40" dur="2.2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.8;0" dur="2.2s" repeatCount="indefinite"/>
  </circle>
</svg>`;
}
