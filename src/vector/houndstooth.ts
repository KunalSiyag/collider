export interface HoundstoothOptions {
  size?: number;
  cells?: number;
  dark?: string;
  light?: string;
  accent?: string;
}

export function createHoundstooth(options: HoundstoothOptions = {}): string {
  const { size = 720, cells = 8, dark = '#18181b', light = '#27272a', accent = '#22d3ee' } = options;
  const u = size / (cells * 2);
  const paths: string[] = [];

  for (let row = 0; row < cells * 2; row++) {
    for (let col = 0; col < cells * 2; col++) {
      const x = col * u;
      const y = row * u;
      const k = ((col % 4) + 4) % 4;
      const m = ((row % 4) + 4) % 4;
      const isAccent = row === Math.floor(cells) && col >= cells - 1 && col <= cells + 1;
      const fill = isAccent ? accent : (k + m) % 4 === 0 ? light : dark;
      let d = '';
      if (k === 0 && m === 0) d = `M${x} ${y} h${u * 2} v${u} l-${u} ${u} h-${u} Z`;
      else if (k === 2 && m === 0) d = `M${x + u} ${y} h${u} v${u} l-${u} ${u} h-${u} Z`;
      else if (k === 0 && m === 2) d = `M${x} ${y + u} h${u} l${u} ${u} h-${u * 2} Z`;
      else if (k === 2 && m === 2) d = `M${x + u} ${y + u} h${u * 2} v${u} h-${u} Z`;
      else continue;
      paths.push(`    <path d="${d}" fill="${fill}" />`);
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="${dark}" />
${paths.join('\n')}
</svg>`;
}
