export interface IkatStripeOptions {
  seed?: number;
  size?: number;
  rows?: number;
  base?: string;
  accent?: string;
}

export function createIkatStripe(options: IkatStripeOptions = {}): string {
  const { seed = 52, size = 720, rows = 14, base = '#27272a', accent = '#f472b6' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const rowH = size / rows;
  const els: string[] = [];
  for (let r = 0; r < rows; r++) {
    const y = r * rowH;
    const isAccent = r % 4 === 1;
    els.push(`      <rect x="0" y="${y.toFixed(1)}" width="${size}" height="${(rowH - 3).toFixed(1)}" fill="${isAccent ? accent : base}" opacity="${isAccent ? 0.4 : 0.9}" />`);
    const dashes = Math.floor(size / 26);
    let dxs = '';
    for (let d = 0; d < dashes; d++) {
      if (rnd() > 0.5) continue;
      const dx = d * 26 + rnd() * 8;
      dxs += `M${dx.toFixed(1)} ${(y + rowH * 0.28).toFixed(1)} h${(6 + rnd() * 10).toFixed(1)} v${(rowH * 0.44).toFixed(1)} h-${(6 + rnd() * 10).toFixed(1)} Z `;
    }
    els.push(`      <path d="${dxs}" fill="#0b0b10" opacity="0.85">
        <animate attributeName="opacity" values="0.85;0.55;0.85" dur="${(6 + r % 5).toFixed(1)}s" repeatCount="indefinite" />
      </path>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${els.join('\n')}\n</svg>`;
}
