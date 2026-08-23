export interface ScanLinesOptions {
  line?: string;
  gap?: number;
  width?: number;
  height?: number;
}

export function createScanLines(options: ScanLinesOptions = {}): string {
  const { line = '#ffffff', gap = 12, width = 800, height = 500 } = options;
  const lines: string[] = [];

  for (let y = gap / 2; y < height; y += gap) {
    const opacity = (0.04 + (y / height) * 0.1).toFixed(3);
    lines.push(`    <rect x="0" y="${y.toFixed(1)}" width="${width}" height="2" fill="${line}" opacity="${opacity}" />`);
  }

  return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${lines.join('\n')}
</svg>`;
}
