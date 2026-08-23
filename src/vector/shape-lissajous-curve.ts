export interface ShapeLissajousCurveOptions {
  colors?: string[];
  size?: number;
}

export function createShapeLissajousCurve(options: ShapeLissajousCurveOptions = {}): string {
  const { colors = ['#8b5cf6', '#67e8f9'], size = 320 } = options;
  const c = size / 2;

  const buildPath = (a: number, b: number, delta: number, scale: number) => {
    let d = '';
    for (let t = 0; t <= 640; t += 4) {
      const rad = (t / 640) * Math.PI * 2;
      const x = c + Math.sin(a * rad + delta) * scale;
      const y = c + Math.sin(b * rad) * scale;
      d += `${t === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)} `;
    }
    return d + 'Z';
  };

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<path d="${buildPath(3, 2, Math.PI / 2, 118)}" fill="none" stroke="${colors[0]}" stroke-width="5">
  <animate attributeName="stroke-dasharray" values="12 10;3 19;12 10" dur="6s" repeatCount="indefinite" />
</path>
<path d="${buildPath(3, 4, Math.PI / 3, 84)}" fill="none" stroke="${colors[1]}" stroke-width="3.5" opacity="0.85">
  <animate attributeName="opacity" values="0.85;0.35;0.85" dur="7s" repeatCount="indefinite" />
</path>
</svg>`;
}
