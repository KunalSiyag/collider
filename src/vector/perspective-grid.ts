export interface PerspectiveGridOptions {
  color?: string;
  horizonColor?: string;
  width?: number;
  height?: number;
  verticals?: number;
  horizontals?: number;
}

export function createPerspectiveGrid(options: PerspectiveGridOptions = {}): string {
  const {
    color = '#27272a',
    horizonColor = '#8b5cf6',
    width = 1000,
    height = 500,
    verticals = 20,
    horizontals = 10,
  } = options;

  const lines: string[] = [];
  const horizonY = height * 0.42;
  const vanishX = width / 2;

  for (let i = -verticals / 2; i <= verticals / 2; i++) {
    const xBottom = vanishX + i * (width / (verticals / 2)) * 1.6;
    lines.push(
      `    <line x1="${vanishX}" y1="${horizonY}" x2="${xBottom.toFixed(0)}" y2="${height}" stroke="${color}" stroke-width="1.5" />`,
    );
  }

  for (let i = 0; i < horizontals; i++) {
    const t = i / horizontals;
    const y = horizonY + (height - horizonY) * t * t;
    lines.push(
      `    <line x1="0" y1="${y.toFixed(1)}" x2="${width}" y2="${y.toFixed(1)}" stroke="${color}" stroke-width="${(1 + t * 2).toFixed(1)}" />`,
    );
  }

  return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${lines.join('\n')}
    <line x1="0" y1="${horizonY}" x2="${width}" y2="${horizonY}" stroke="${horizonColor}" stroke-width="2.5" opacity="0.9" />
</svg>`;
}
