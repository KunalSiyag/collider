export interface TextureFlagstoneOptions {
  stone?: string;
  joint?: string;
}

export function createTextureFlagstone(options: TextureFlagstoneOptions = {}): string {
  const { stone = '#6e6a62', joint = '#2e2c28' } = options;
  let seed = 317;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const slabs: string[] = [];
  const cols = [0, 105, 215, 320];
  for (let c = 0; c < 3; c++) {
    for (let y = -10; y < 330; ) {
      const h = 55 + rnd() * 60;
      const jitter = () => (rnd() - 0.5) * 10;
      const x1 = cols[c] + jitter();
      const x2 = cols[c + 1] + jitter();
      const tone = rnd() < 0.35 ? '#7d7970' : rnd() < 0.5 ? '#5f5b53' : stone;
      slabs.push(`<path d="M${x1.toFixed(1)},${y.toFixed(1)} L${x2.toFixed(1)},${(y + jitter()).toFixed(1)} L${(x2 + jitter()).toFixed(1)},${(y + h).toFixed(1)} L${(x1 - jitter()).toFixed(1)},${(y + h - jitter()).toFixed(1)} Z" fill="${tone}" stroke="${joint}" stroke-width="4"/>`);
      slabs.push(`<path d="M${x1.toFixed(1)},${y.toFixed(1)} L${x2.toFixed(1)},${(y + jitter()).toFixed(1)}" stroke="#94908a" stroke-width="1.4" opacity="0.5"/>`);
      y += h;
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${joint}"/>
  ${slabs.join('\n  ')}
</svg>`;
}
