export interface BasketWeaveOptions {
  size?: number;
  cells?: number;
  base?: string;
  alt?: string;
  accent?: string;
}

export function createBasketWeave(options: BasketWeaveOptions = {}): string {
  const { size = 720, cells = 10, base = '#18181b', alt = '#27272a', accent = '#fbbf24' } = options;
  const step = size / cells;
  const els: string[] = [];
  const gap = step * 0.08;

  for (let row = 0; row < cells; row++) {
    for (let col = 0; col < cells; col++) {
      const horiz = (row + col) % 2 === 0;
      const isAccent = (row * 7 + col * 3) % 13 === 0;
      const x = col * step + gap / 2;
      const y = row * step + gap / 2;
      const w = step - gap;
      const inset = step * (horiz ? 0.22 : 0.06);
      if (horiz) {
        els.push(`    <rect x="${x.toFixed(1)}" y="${(y + inset).toFixed(1)}" width="${w.toFixed(1)}" height="${(step - gap - inset * 2).toFixed(1)}" rx="3" fill="${isAccent ? accent : alt}" opacity="${isAccent ? 0.75 : 0.95}" />`);
        els.push(`    <rect x="${x.toFixed(1)}" y="${(y + inset).toFixed(1)}" width="${w.toFixed(1)}" height="3" fill="#3f3f46" />`);
      } else {
        els.push(`    <rect x="${(x + inset).toFixed(1)}" y="${y.toFixed(1)}" width="${(step - gap - inset * 2).toFixed(1)}" height="${w.toFixed(1)}" rx="3" fill="${isAccent ? accent : base}" stroke="#3f3f46" stroke-width="1" />`);
      }
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${els.join('\n')}\n</svg>`;
}
