export interface ZelligeTileOptions {
  size?: number;
  cells?: number;
  base?: string;
  accents?: string[];
}

export function createZelligeTile(options: ZelligeTileOptions = {}): string {
  const { size = 720, cells = 6, base = '#18181b', accents = ['#8b5cf6', '#22d3ee', '#f472b6'] } = options;
  const step = size / cells;
  const els: string[] = [];

  for (let row = 0; row < cells; row++) {
    for (let col = 0; col < cells; col++) {
      const x = col * step;
      const y = row * step;
      const cx = x + step / 2;
      const cy = y + step / 2;
      const r = step / 2;
      const k = (row + col) % 3;
      const color = accents[k % accents.length];
      els.push(`      <rect x="${x}" y="${y}" width="${step}" height="${step}" fill="${base}" />`);
      els.push(`      <polygon points="${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}" fill="none" stroke="${color}" stroke-width="1.6" opacity="0.85" />`);
      els.push(`      <polygon points="${x},${y} ${x + step},${y} ${cx},${cy} " fill="none" stroke="#52525b" stroke-width="0.8" opacity="0.7" />`);
      els.push(`      <polygon points="${x},${y + step} ${x + step},${y + step} ${cx},${cy}" fill="none" stroke="#52525b" stroke-width="0.8" opacity="0.7" />`);
      if ((row * cells + col) % 7 === 3) {
        els.push(`      <circle cx="${cx}" cy="${cy}" r="${(r * 0.28).toFixed(1)}" fill="${color}" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="${(4 + (col % 4)).toFixed(1)}s" repeatCount="indefinite" />
      </circle>`);
      }
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${els.join('\n')}\n</svg>`;
}
