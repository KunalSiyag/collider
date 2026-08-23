export interface ShapeEclipseGlowOptions {
  colors?: string[];
  size?: number;
}

export function createShapeEclipseGlow(options: ShapeEclipseGlowOptions = {}): string {
  const { colors = ['#facc15', '#8b5cf6'], size = 320 } = options;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>
  <radialGradient id="eg-glow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="${colors[1]}" stop-opacity="0.55" />
    <stop offset="70%" stop-color="${colors[1]}" stop-opacity="0.12" />
    <stop offset="100%" stop-color="${colors[1]}" stop-opacity="0" />
  </radialGradient>
</defs>
<rect width="${size}" height="${size}" fill="#0b0b10" />
<circle cx="160" cy="160" r="150" fill="url(#eg-glow)">
  <animate attributeName="r" values="150;164;150" dur="6s" repeatCount="indefinite" />
</circle>
<circle cx="160" cy="160" r="86" fill="#0b0b10" stroke="${colors[0]}" stroke-width="3">
  <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="4s" repeatCount="indefinite" />
</circle>
<g stroke="${colors[0]}" stroke-linecap="round">
  ${[0, 45, 90, 135, 180, 225, 270, 315]
    .map(
      (a) =>
        `<line x1="${(160 + Math.cos((a * Math.PI) / 180) * 96).toFixed(1)}" y1="${(160 + Math.sin((a * Math.PI) / 180) * 96).toFixed(1)}" x2="${(160 + Math.cos((a * Math.PI) / 180) * 112).toFixed(1)}" y2="${(160 + Math.sin((a * Math.PI) / 180) * 112).toFixed(1)}" stroke-width="4"><animate attributeName="opacity" values="1;0.2;1" dur="3s" begin="${(a / 360 * 2).toFixed(2)}s" repeatCount="indefinite" /></line>`,
    )
    .join('\n  ')}
</g>
</svg>`;
}
