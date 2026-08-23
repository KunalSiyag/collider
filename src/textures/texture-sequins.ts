export interface TextureSequinsOptions {
  base?: string;
  disc?: string;
}

export function createTextureSequins(options: TextureSequinsOptions = {}): string {
  const { base = '#1c1030', disc = '#c8b4f0' } = options;
  let seed = 281;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const paillettes: string[] = [];
  for (let i = 0; i < 190; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const r = 6 + rnd() * 6;
    const tilt = rnd();
    const c = tilt < 0.3 ? disc : tilt < 0.55 ? '#e8d8ff' : tilt < 0.85 ? '#9a80d8' : '#f2e28a';
    paillettes.push(`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r * 0.92).toFixed(1)}" fill="${c}"/>`);
    if (tilt < 0.5) {
      paillettes.push(`<path d="M${(x - r).toFixed(1)},${y.toFixed(1)} a${r.toFixed(1)},${(r * 0.92).toFixed(1)} 0 0 1 ${(r * 2).toFixed(1)},0" fill="#fff" opacity="0.35"/>`);
    }
    paillettes.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1" fill="#000" opacity="0.5"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${base}"/>
  ${paillettes.join('\n  ')}
</svg>`;
}
