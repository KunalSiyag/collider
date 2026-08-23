export interface CloudLayersOptions {
  seed?: number;
  size?: number;
  clouds?: number;
  base?: string;
  accent?: string;
}

export function createCloudLayers(options: CloudLayersOptions = {}): string {
  const { seed = 96, size = 720, clouds = 7, base = '#1c1c24', accent = '#a78bfa' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const items: { y: number; el: string }[] = [];
  for (let i = 0; i < clouds; i++) {
    const y = size * (0.12 + (i / clouds) * 0.75);
    const cx = rnd() * size;
    const w = size * (0.16 + rnd() * 0.22);
    const h = size * (0.03 + rnd() * 0.04);
    const color = i === 2 ? accent : base;
    const puffs = 4 + Math.floor(rnd() * 3);
    let puffsSvg = '';
    for (let p = 0; p < puffs; p++) {
      const px = cx - w / 2 + (w / (puffs - 1)) * p;
      const pr = h * (0.8 + rnd() * 0.7) * (p === 0 || p === puffs - 1 ? 0.8 : 1.15);
      puffsSvg += `        <circle cx="${px.toFixed(1)}" cy="${(y - pr * 0.35).toFixed(1)}" r="${pr.toFixed(1)}" />\n`;
    }
    items.push({
      y,
      el: `      <g fill="${color}" fill-opacity="${i === 2 ? 0.3 : 0.85}" stroke="${color}" stroke-width="1">
${puffsSvg}        <rect x="${(cx - w / 2).toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="${h.toFixed(1)}" />
        <animateTransform attributeName="transform" type="translate" values="-30 0; 30 0; -30 0" dur="${(14 + rnd() * 12).toFixed(1)}s" repeatCount="indefinite" />
      </g>`,
    });
  }
  items.sort((a, b) => a.y - b.y);

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${items.map((it) => it.el).join('\n')}
</svg>`;
}
