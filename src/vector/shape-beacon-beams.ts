export interface ShapeBeaconBeamsOptions {
  colors?: string[];
  size?: number;
}

export function createShapeBeaconBeams(options: ShapeBeaconBeamsOptions = {}): string {
  const { colors = ['#facc15', '#f472b6'], size = 320 } = options;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<g opacity="0.5">
  <animateTransform attributeName="transform" type="rotate" from="0 160 190" to="360 160 190" dur="10s" repeatCount="indefinite" />
  <polygon points="160,190 40,120 60,220" fill="${colors[0]}" opacity="0.6" />
  <polygon points="160,190 280,120 260,220" fill="${colors[1]}" opacity="0.5" />
</g>
<polygon points="140,290 180,290 172,150 148,150" fill="#a78bfa" />
<circle cx="160" cy="138" r="16" fill="${colors[0]}">
  <animate attributeName="opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite" />
</circle>
<path d="M 100 100 A 85 85 0 0 1 220 100" fill="none" stroke="${colors[0]}" stroke-width="4" opacity="0.5">
  <animate attributeName="stroke-opacity" values="0.5;0.1;0.5" dur="2.2s" repeatCount="indefinite" />
</path>
<path d="M 80 78 A 112 112 0 0 1 240 78" fill="none" stroke="${colors[0]}" stroke-width="4" opacity="0.25">
  <animate attributeName="stroke-opacity" values="0.25;0.05;0.25" dur="2.2s" begin="0.4s" repeatCount="indefinite" />
</path>
<rect x="110" y="288" width="100" height="12" rx="6" fill="#27272a" />
</svg>`;
}
