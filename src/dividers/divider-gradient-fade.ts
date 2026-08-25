/** Gradient Fade — a soft horizontal rule that dissolves from accent to transparent. */
export interface GradientFadeOptions {
  color?: string;
  colorB?: string;
  height?: number;
}

export function createGradientFade(options: GradientFadeOptions = {}): string {
  const { color = '#8b5cf6', colorB = '#22d3ee', height = 3 } = options;
  return `<svg viewBox="0 0 1440 ${height + 8}" preserveAspectRatio="none" width="100%" height="${height + 8}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="gf-line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${color}" stop-opacity="0"/>
      <stop offset="0.2" stop-color="${color}"/>
      <stop offset="0.5" stop-color="${colorB}"/>
      <stop offset="0.8" stop-color="${color}" stop-opacity="0.9"/>
      <stop offset="1" stop-color="${colorB}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="0" y="4" width="1440" height="${height}" rx="${height / 2}" fill="url(#gf-line)"/>
</svg>`;
}
