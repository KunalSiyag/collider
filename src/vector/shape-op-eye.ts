export interface ShapeOpEyeOptions {
  size?: number;
  rings?: number;
}

export function createShapeOpEye(options: ShapeOpEyeOptions = {}): string {
  const { size = 320, rings = 9 } = options;
  const c = size / 2;
  const ell: string[] = [];

  for (let i = 0; i < rings; i++) {
    const rx = 24 + i * 16;
    const ry = 12 + i * 15;
    const fill = i % 2 === 0 ? '#fafafa' : '#0b0b10';
    ell.push(
      `  <ellipse cx="${c}" cy="${c}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="#27272a" stroke-width="1"><animate attributeName="ry" values="${ry};${(ry * 1.06).toFixed(0)};${ry}" dur="${(3 + i * 0.4).toFixed(1)}s" repeatCount="indefinite" /></ellipse>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${ell.join('\n')}
  <circle cx="${c}" cy="${c}" r="13" fill="#8b5cf6">
    <animate attributeName="r" values="13;17;13" dur="3s" repeatCount="indefinite" />
  </circle>
</svg>`;
}
