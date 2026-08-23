export interface NebulaCloudOptions {
  seed?: number;
  size?: number;
  puffs?: number;
  accents?: string[];
}

export function createNebulaCloud(options: NebulaCloudOptions = {}): string {
  const { seed = 64, size = 720, puffs = 22, accents = ['#8b5cf6', '#f472b6', '#67e8f9', '#a78bfa'] } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const cx = size / 2;
  const cy = size / 2;
  const els: string[] = [];
  for (let i = 0; i < puffs; i++) {
    const a = rnd() * Math.PI * 2;
    const d = Math.pow(rnd(), 1.4) * size * 0.3;
    const x = cx + Math.cos(a) * d;
    const y = cy + Math.sin(a) * d * 0.72;
    const rx = size * (0.05 + rnd() * 0.14);
    const ry = rx * (0.5 + rnd() * 0.5);
    const rot = (rnd() * 180).toFixed(0);
    const color = accents[Math.floor(rnd() * accents.length)];
    const op = (0.05 + rnd() * 0.12).toFixed(2);
    els.push(`      <ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="${color}" opacity="${op}" transform="rotate(${rot} ${x.toFixed(1)} ${y.toFixed(1)})">
        <animate attributeName="opacity" values="${op};${(parseFloat(op) * 2).toFixed(3)};${op}" dur="${(5 + rnd() * 9).toFixed(1)}s" repeatCount="indefinite" />
      </ellipse>`);
  }
  for (let i = 0; i < 60; i++) {
    els.push(`      <circle cx="${(rnd() * size).toFixed(1)}" cy="${(rnd() * size).toFixed(1)}" r="${(rnd() * 1.4 + 0.3).toFixed(2)}" fill="#e4e4e7" opacity="${(rnd() * 0.8).toFixed(2)}" />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
