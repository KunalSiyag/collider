export interface MoireRingsOptions {
  size?: number;
  rings?: number;
  gap?: number;
  stroke?: string;
  accent?: string;
}

export function createMoireRings(options: MoireRingsOptions = {}): string {
  const { size = 720, rings = 34, gap = 11, stroke = '#3f3f46', accent = '#67e8f9' } = options;
  const circles = (cx: number, cy: number, cls: string) =>
    Array.from({ length: rings }, (_, i) => `      <circle cx="${cx}" cy="${cy}" r="${((i + 1) * gap).toFixed(1)}" class="${cls}" />`).join('\n');

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <style>.mr{fill:none;stroke:${stroke};stroke-width:1}.ma{fill:none;stroke:${accent};stroke-width:1}</style>
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <g>
${circles(size * 0.44, size / 2, 'mr')}
  </g>
  <g>
${circles(size * 0.58, size / 2, 'ma')}
    <animateTransform attributeName="transform" type="translate" values="0 0; 14 0; 0 0" dur="10s" repeatCount="indefinite" />
  </g>
</svg>`;
}
