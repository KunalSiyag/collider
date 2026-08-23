export interface TextureQuartzClusterOptions {
  base?: string;
  gem?: string;
}

export function createTextureQuartzCluster(options: TextureQuartzClusterOptions = {}): string {
  const { base = '#2a2630', gem = '#cfd8ea' } = options;
  let seed = 397;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const shards: string[] = [];
  for (let s = 0; s < 22; s++) {
    const x = 40 + rnd() * 240;
    const y = 300;
    const h = 90 + rnd() * 190;
    const w = 16 + rnd() * 24;
    const tilt = (rnd() - 0.5) * 1.1;
    const tipx = x + Math.sin(tilt) * h;
    const tipy = y - Math.cos(tilt) * h;
    const tone = rnd() < 0.35 ? '#e8f0fa' : rnd() < 0.6 ? '#aab8d0' : gem;
    shards.push(`<polygon points="${(x - w).toFixed(1)},${y} ${(x + w).toFixed(1)},${y} ${(x + w * 0.55 + Math.sin(tilt) * h * 0.85).toFixed(1)},${(tipy * 0.15 + y * 0.85).toFixed(1)} ${tipx.toFixed(1)},${tipy.toFixed(1)}" fill="${tone}" opacity="${(0.5 + rnd() * 0.45).toFixed(2)}"/>`);
    shards.push(`<line x1="${(x - w * 0.3).toFixed(1)}" y1="${(y - 10).toFixed(1)}" x2="${(x - w * 0.3 + Math.sin(tilt) * h * 0.9).toFixed(1)}" y2="${(y - Math.cos(tilt) * h * 0.9).toFixed(1)}" stroke="#fff" stroke-width="1.6" opacity="0.5"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="qtz-g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3c3648"/>
      <stop offset="1" stop-color="#171420"/>
    </linearGradient>
  </defs>
  <rect width="320" height="320" fill="url(#qtz-g)"/>
  ${shards.join('\n  ')}
</svg>`;
}
