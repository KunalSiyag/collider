export interface TextureTerrazzoOptions {
  base?: string;
  chips?: string[];
}

export function createTextureTerrazzo(options: TextureTerrazzoOptions = {}): string {
  const { base = '#f5f5f4', chips = ['#0ea5e9', '#f43f5e', '#facc15', '#8b5cf6', '#10b981'] } = options;
  let s = 29;
  const rand = () => ((s = (s * 48271) % 2147483647) / 2147483647);
  const pieces: string[] = [];
  for (let i = 0; i < 150; i++) {
    const x = (rand() * 480).toFixed(0);
    const y = (rand() * 480).toFixed(0);
    const size = (rand() * 9 + 3).toFixed(1);
    const rot = Math.floor(rand() * 360);
    const color = chips[Math.floor(rand() * chips.length)]!;
    const kind = i % 3;
    if (kind === 0) {
      pieces.push(`<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${color}" transform="rotate(${rot} ${x} ${y})"/>`);
    } else if (kind === 1) {
      pieces.push(`<circle cx="${x}" cy="${y}" r="${(Number(size) / 2).toFixed(1)}" fill="${color}"/>`);
    } else {
      pieces.push(`<polygon points="${x},${Number(y) - Number(size) / 1.6} ${Number(x) + Number(size) / 1.6},${Number(y) + Number(size) / 2.4} ${x},${y}" fill="${color}" transform="rotate(${rot} ${x} ${y})"/>`);
    }
  }
  return `<svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="480" height="480" fill="${base}"/>
${pieces.join('\n')}
</svg>`;
}
