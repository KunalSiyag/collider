/** Sync Rotate — two arrows chasing each other around a circle. */
export interface SyncRotateOptions {
  color?: string;
  colorB?: string;
  size?: number;
}

export function createSyncRotate(options: SyncRotateOptions = {}): string {
  const { color = '#8b5cf6', colorB = '#22d3ee', size = 96 } = options;
  return `<svg viewBox="0 0 96 96" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g fill="none" stroke-width="7" stroke-linecap="round">
    <path d="M70 34 A 28 28 0 0 0 26 32" stroke="${color}">
      <animateTransform attributeName="transform" type="rotate" values="0 48 48;360 48 48" dur="2.6s" repeatCount="indefinite"/>
    </path>
    <path d="M26 62 A 28 28 0 0 0 70 64" stroke="${colorB}">
      <animateTransform attributeName="transform" type="rotate" values="0 48 48;360 48 48" dur="2.6s" begin="-1.3s" repeatCount="indefinite"/>
    </path>
  </g>
  <path d="M70 22 L70 36 L56 34 Z" fill="${color}"/>
  <path d="M26 74 L26 60 L40 62 Z" fill="${colorB}"/>
</svg>`;
}
