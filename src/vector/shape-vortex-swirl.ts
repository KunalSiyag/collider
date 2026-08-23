export interface ShapeVortexSwirlOptions {
  colors?: string[];
  size?: number;
  arms?: number;
}

export function createShapeVortexSwirl(options: ShapeVortexSwirlOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6'], size = 320, arms = 3 } = options;
  const c = size / 2;
  const paths: string[] = [];

  for (let i = 0; i < arms; i++) {
    let d = `M ${c} ${c}`;
    for (let t = 0; t <= 120; t += 8) {
      const ang = (i * (360 / arms) + t) * (Math.PI / 180);
      const r = t * 1.15;
      const x = c + Math.cos(ang) * r;
      const y = c + Math.sin(ang) * r;
      d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    paths.push(
      `<path d="${d}" fill="none" stroke="${colors[i % colors.length]}" stroke-width="9" stroke-linecap="round" />`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<g>
  <animateTransform attributeName="transform" type="rotate" from="0 ${c} ${c}" to="-360 ${c} ${c}" dur="16s" repeatCount="indefinite" />
${paths.join('\n')}
</g>
<circle cx="${c}" cy="${c}" r="12" fill="#fafafa"><animate attributeName="r" values="12;18;12" dur="3s" repeatCount="indefinite" /></circle>
</svg>`;
}
