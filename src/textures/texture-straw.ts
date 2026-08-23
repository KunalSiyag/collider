export interface TextureStrawOptions {
  stalk?: string;
  shadow?: string;
}

export function createTextureStraw(options: TextureStrawOptions = {}): string {
  const { stalk = '#d9b45e', shadow = '#8a6c2c' } = options;
  let seed = 347;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const reeds: string[] = [];
  for (let i = 0; i < 90; i++) {
    const x0 = rnd() * 380 - 30;
    const y0 = rnd() * 320;
    const len = 60 + rnd() * 120;
    const a = Math.PI / 4 + (rnd() - 0.5) * 0.3;
    const x1 = x0 + Math.cos(a) * len;
    const y1 = y0 + Math.sin(a) * len;
    const mx = (x0 + x1) / 2 + (rnd() - 0.5) * 20;
    const my = (y0 + y1) / 2 + (rnd() - 0.5) * 20;
    reeds.push(`<line x1="${x0.toFixed(1)}" y1="${y0.toFixed(1)}" x2="${x1.toFixed(1)}" y2="${y1.toFixed(1)}" stroke="${shadow}" stroke-width="7" opacity="0.35"/>`);
    reeds.push(`<path d="M${x0.toFixed(1)},${y0.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}" stroke="${stalk}" stroke-width="4.5" fill="none" stroke-linecap="round" opacity="${(0.7 + rnd() * 0.3).toFixed(2)}"/>`);
    reeds.push(`<line x1="${mx.toFixed(1)}" y1="${my.toFixed(1)}" x2="${x1.toFixed(1)}" y2="${y1.toFixed(1)}" stroke="#f2d88a" stroke-width="1.2" opacity="0.5"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#a5823a"/>
  ${reeds.join('\n  ')}
</svg>`;
}
