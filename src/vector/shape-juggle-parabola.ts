export interface ShapeJuggleParabolaOptions {
  colors?: string[];
  size?: number;
}

export function createShapeJuggleParabola(options: ShapeJuggleParabolaOptions = {}): string {
  const { colors = ['#f472b6', '#22d3ee', '#facc15'], size = 320 } = options;

  const ball = (color: string, begin: string) =>
    `<circle r="12" fill="${color}"><animateMotion path="M 60 240 Q 160 60 260 240" dur="2.4s" begin="${begin}" repeatCount="indefinite" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear" /></circle>`;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<path d="M 40 250 Q 160 50 280 250" fill="none" stroke="#3f3f46" stroke-width="3" stroke-dasharray="6 10">
  <animate attributeName="stroke-dashoffset" from="-32" to="32" dur="2s" repeatCount="indefinite" />
</path>
<rect x="30" y="248" width="70" height="16" rx="8" fill="#a78bfa" />
<rect x="220" y="248" width="70" height="16" rx="8" fill="#67e8f9" />
${ball(colors[0]!, '0s')}
${ball(colors[1]!, '-0.8s')}
${ball(colors[2]!, '-1.6s')}
</svg>`;
}
