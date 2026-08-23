export interface TextureSnowOptions {
  base?: string;
  sparkle?: string;
}

export function createTextureSnow(options: TextureSnowOptions = {}): string {
  const { base = '#e8eef5', sparkle = '#ffffff' } = options;
  let seed = 409;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const drifts: string[] = [];
  for (let y = -10; y < 340; y += 30) {
    let d = `M-10,${y} `;
    for (let x = -10; x <= 340; x += 55) {
      d += `Q${x + 28},${(y + rnd() * 16).toFixed(1)} ${x + 56},${(y + (rnd() - 0.3) * 8).toFixed(1)} `;
    }
    drifts.push(`<path d="${d}" stroke="#f8fbff" stroke-width="9" fill="none" opacity="0.7"/>`);
    drifts.push(`<path d="${d}" stroke="#c6d2e2" stroke-width="1.4" fill="none" opacity="0.7"/>`);
  }
  const glints: string[] = [];
  for (let i = 0; i < 130; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const s = 0.8 + rnd() * 1.8;
    glints.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${s.toFixed(1)}" fill="${sparkle}"/>`);
    if (rnd() < 0.25) {
      glints.push(`<path d="M${x.toFixed(1)},${(y - s * 3).toFixed(1)} L${x.toFixed(1)},${(y + s * 3).toFixed(1)} M${(x - s * 3).toFixed(1)},${y.toFixed(1)} L${(x + s * 3).toFixed(1)},${y.toFixed(1)}" stroke="${sparkle}" stroke-width="0.8"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${base}"/>
  ${drifts.join('\n  ')}
  ${glints.join('\n  ')}
</svg>`;
}
