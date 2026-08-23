export interface ShapeTreeRingsOvalOptions {
  colors?: string[];
  size?: number;
}

export function createShapeTreeRingsOval(options: ShapeTreeRingsOvalOptions = {}): string {
  const { colors = ['#8b5cf6', '#a78bfa', '#67e8f9', '#22d3ee'], size = 320 } = options;
  const rings: string[] = [];

  for (let i = 0; i < 7; i++) {
    const rx = 130 - i * 17;
    const ry = 100 - i * 12.5;
    const cx = 150 + i * 3;
    const cy = 165 - i * 2;
    rings.push(
      `  <ellipse cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="none" stroke="${colors[i % colors.length]}" stroke-width="${i === 0 ? 8 : 3}" opacity="${(1 - i * 0.08).toFixed(2)}">
    <animate attributeName="rx" values="${rx.toFixed(1)};${(rx + 4).toFixed(1)};${rx.toFixed(1)}" dur="${(5 + i).toFixed(0)}s" repeatCount="indefinite" />
  </ellipse>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
${rings.join('\n')}
<circle cx="171" cy="151" r="6" fill="#fafafa"><animate attributeName="r" values="6;9;6" dur="4s" repeatCount="indefinite" /></circle>
</svg>`;
}
