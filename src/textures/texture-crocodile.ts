export interface TextureCrocodileOptions {
  scute?: string;
  line?: string;
}

export function createTextureCrocodile(options: TextureCrocodileOptions = {}): string {
  const { scute = '#3d4f2a', line = '#141c0b' } = options;
  const tiles: string[] = [];
  let seed = 71;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 8; c++) {
      const x = c * 42 + (r % 2) * 21;
      const y = r * 34;
      const w = 36 + rnd() * 4;
      const h = 28 + rnd() * 4;
      tiles.push(`<rect x="${x + 2}" y="${y + 3}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="9" fill="#000" opacity="0.5"/>`);
      tiles.push(`<rect x="${x}" y="${y}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="9" fill="${scute}" stroke="${line}" stroke-width="2"/>`);
      tiles.push(`<rect x="${(x + w * 0.25).toFixed(1)}" y="${y + 4}" width="${(w * 0.5).toFixed(1)}" height="7" rx="3.5" fill="#6a844a" opacity="0.55"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="crc-f"><feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="2" seed="13"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="${line}"/>
  ${tiles.join('\n  ')}
  <rect width="320" height="320" fill="${scute}" filter="url(#crc-f)" opacity="0.35"/>
</svg>`;
}
