export interface IvyCornerOptions {
  seed?: number;
  size?: number;
  leaves?: number;
  stem?: string;
  accent?: string;
}

export function createIvyCorner(options: IvyCornerOptions = {}): string {
  const { seed = 14, size = 720, leaves = 22, stem = '#3f3f46', accent = '#a78bfa' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  let x = size * 0.04;
  let y = size * 0.96;
  let angle = -Math.PI / 3;

  for (let i = 0; i < leaves * 2 && x < size * 0.95 && y > size * 0.05; i++) {
    angle += (rnd() - 0.5) * 0.7;
    if (x > size * 0.5) angle -= 0.25;
    if (y < size * 0.5) angle += 0.2;
    const step = size * 0.05 + rnd() * 20;
    const nx = x + Math.cos(angle) * step;
    const ny = y + Math.sin(angle) * step;
    els.push(`      <path d="M${x.toFixed(1)} ${y.toFixed(1)} Q${((x + nx) / 2).toFixed(1)} ${((y + ny) / 2).toFixed(1)} ${nx.toFixed(1)} ${ny.toFixed(1)}" fill="none" stroke="${stem}" stroke-width="2" />`);
    if (i % 2 === 0) {
      const lr = size * (0.02 + rnd() * 0.018);
      const la = angle + (rnd() > 0.5 ? 1 : -1) * 1.1;
      const lx = nx + Math.cos(la) * lr;
      const ly = ny + Math.sin(la) * lr;
      const color = i % 9 === 0 ? accent : '#27272a';
      els.push(`      <path d="M${nx.toFixed(1)} ${ny.toFixed(1)} Q${lx.toFixed(1)} ${(ly - lr).toFixed(1)} ${(lx + lr * 0.8).toFixed(1)} ${ly.toFixed(1)} Q${lx.toFixed(1)} ${(ly + lr).toFixed(1)} ${nx.toFixed(1)} ${ny.toFixed(1)} Z" fill="${color}" stroke="${i % 9 === 0 ? accent : '#52525b'}" stroke-width="1"${i % 9 === 0 ? '>\n          <animate attributeName="fill-opacity" values="0.35;0.7;0.35" dur="5s" repeatCount="indefinite" />\n        ' : ''} />`);
    }
    x = nx;
    y = ny;
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
