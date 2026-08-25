/** Location Pulse — a map pin dropping onto its own radiating ripple. */
export interface LocationPulseOptions {
  color?: string;
  size?: number;
}

export function createLocationPulse(options: LocationPulseOptions = {}): string {
  const { color = '#ef4444', size = 100 } = options;
  return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="50" cy="42" r="14" fill="none" stroke="${color}" stroke-width="2.4" opacity="0">
    <animate attributeName="r" values="10;30" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="50" cy="42" r="14" fill="none" stroke="${color}" stroke-width="2.4" opacity="0">
    <animate attributeName="r" values="10;30" dur="2s" begin="-1s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.8;0" dur="2s" begin="-1s" repeatCount="indefinite"/>
  </circle>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -26;0 0;0 0" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.2 1;0.3 0 0.2 1"/>
    <path d="M50 14 C 61 14 68 22 68 32 C 68 44 50 66 50 66 C 50 66 32 44 32 32 C 32 22 39 14 50 14 Z" fill="${color}"/>
    <circle cx="50" cy="32" r="7" fill="#ffffff"/>
  </g>
</svg>`;
}
