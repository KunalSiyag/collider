/** Wifi Pulse — signal arcs radiating outward with a blinking dot. */
export interface WifiPulseOptions {
  color?: string;
  size?: number;
}

export function createWifiPulse(options: WifiPulseOptions = {}): string {
  const { color = '#22d3ee', size = 96 } = options;
  return `<svg viewBox="0 0 96 96" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round">
    <path d="M20 44 A 40 40 0 0 1 76 44">
      <animate attributeName="opacity" values="1;0.15;1" dur="2.4s" repeatCount="indefinite"/>
    </path>
    <path d="M30 56 A 26 26 0 0 1 66 56">
      <animate attributeName="opacity" values="0.15;1;0.15" dur="2.4s" begin="0.3s" repeatCount="indefinite"/>
    </path>
  </g>
  <circle cx="48" cy="72" r="6" fill="${color}">
    <animate attributeName="r" values="6;7.5;6" dur="2.4s" repeatCount="indefinite"/>
  </circle>
</svg>`;
}
