export interface CaveColumnsOptions {
  size?: number;
  columns?: number;
  base?: string;
  accent?: string;
}

export function createCaveColumns(options: CaveColumnsOptions = {}): string {
  const { size = 720, columns = 14, base = '#18181b', accent = '#8b5cf6' } = options;
  const els: string[] = [];
  const stepW = size / columns;

  for (let i = 0; i <= columns; i++) {
    const x = i * stepW + stepW / 2;
    const isAccent = i % 5 === 2;
    const color = isAccent ? accent : '#3f3f46';
    const topLen = size * (0.1 + ((i * 31) % 10) / 10 * 0.3);
    const botLen = size * (0.1 + (((i * 17) % 10) / 10) * 0.3);
    const wTop = stepW * (isAccent ? 0.3 : 0.22);
    els.push(`      <polygon points="${(x - wTop).toFixed(1)},0 ${(x + wTop).toFixed(1)},0 ${(x + wTop * 0.25).toFixed(1)},${topLen.toFixed(1)} ${(x - wTop * 0.25).toFixed(1)},${topLen.toFixed(1)}" fill="${base}" stroke="${color}" stroke-width="1" />`);
    els.push(`      <polygon points="${(x - wTop).toFixed(1)},${size} ${(x + wTop).toFixed(1)},${size} ${(x + wTop * 0.25).toFixed(1)},${(size - botLen).toFixed(1)} ${(x - wTop * 0.25).toFixed(1)},${(size - botLen).toFixed(1)}" fill="${base}" stroke="${color}" stroke-width="1" />`);
    if (isAccent) {
      els.push(`      <circle cx="${x}" cy="${(topLen + 14).toFixed(1)}" r="3" fill="${accent}">
        <animate attributeName="opacity" values="1;0.2;1" dur="${(2.5 + i * 0.3).toFixed(1)}s" repeatCount="indefinite" />
      </circle>`);
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
