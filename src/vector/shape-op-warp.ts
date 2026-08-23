export interface ShapeOpWarpOptions {
  colors?: string[];
  size?: number;
  count?: number;
}

export function createShapeOpWarp(options: ShapeOpWarpOptions = {}): string {
  const { colors = ['#8b5cf6', '#0b0b10'], size = 320, count = 16 } = options;
  const step = size / count;
  const cols: string[] = [];

  for (let i = 0; i <= count; i++) {
    const baseX = i * step;
    const amp = step * 1.4 * Math.sin((i / count) * Math.PI);
    const phase = i * 0.45;
    let d = `M ${(baseX - amp).toFixed(1)} 0`;
    for (let y = 20; y <= size; y += 20) {
      const t = y / size;
      const x = baseX - amp + Math.sin(t * Math.PI * 2 + phase) * amp;
      d += ` L ${x.toFixed(1)} ${y}`;
    }
    cols.push(
      `  <path d="${d}" fill="none" stroke="${colors[i % 2 === 0 ? 0 : 1]}" stroke-width="${(step * 0.55).toFixed(1)}"><animate attributeName="stroke-width" values="${(step * 0.55).toFixed(1)};${(step * 0.35).toFixed(1)};${(step * 0.55).toFixed(1)}" dur="${(4 + (i % 5) * 0.6).toFixed(1)}s" repeatCount="indefinite" /></path>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${cols.join('\n')}
</svg>`;
}
