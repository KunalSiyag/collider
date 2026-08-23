export interface TextureBatikOptions {
  dye?: string;
  wax?: string;
}

export function createTextureBatik(options: TextureBatikOptions = {}): string {
  const { dye = '#2e4a6b', wax = '#f0e8d0' } = options;
  let seed = 277;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const blooms: string[] = [];
  for (let i = 0; i < 26; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const r = 10 + rnd() * 34;
    const c = rnd() < 0.5 ? '#5a7d9e' : '#7d5a8a';
    blooms.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${c}" opacity="0.55"/>`);
    if (rnd() > 0.5) {
      for (let p = 0; p < 6; p++) {
        const a = (p / 6) * Math.PI * 2 + rnd();
        blooms.push(`<circle cx="${(x + Math.cos(a) * r).toFixed(1)}" cy="${(y + Math.sin(a) * r).toFixed(1)}" r="${(4 + rnd() * 6).toFixed(1)}" fill="${c}" opacity="0.5"/>`);
      }
    }
  }
  const cracks: string[] = [];
  for (let i = 0; i < 40; i++) {
    let x = rnd() * 320;
    let y = rnd() * 320;
    let a = rnd() * Math.PI * 2;
    let d = `M${x.toFixed(1)},${y.toFixed(1)} `;
    for (let s = 0; s < 3 + Math.floor(rnd() * 4); s++) {
      a += (rnd() - 0.5) * 1.8;
      d += `L${(x += Math.cos(a) * (10 + rnd() * 20)).toFixed(1)},${(y += Math.sin(a) * (10 + rnd() * 20)).toFixed(1)} `;
    }
    cracks.push(`<path d="${d}" stroke="${wax}" stroke-width="0.8" fill="none" opacity="${(0.3 + rnd() * 0.4).toFixed(2)}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${wax}"/>
  ${blooms.join('\n  ')}
  ${cracks.join('\n  ')}
</svg>`;
}
