export interface TextureCorkOptions {
  base?: string;
  fleck?: string;
}

export function createTextureCork(options: TextureCorkOptions = {}): string {
  const { base = '#c2853f', fleck = '#8b5a2b' } = options;
  let s = 13;
  const rand = () => ((s = (s * 48271) % 2147483647) / 2147483647);
  const blobs: string[] = [];
  for (let i = 0; i < 130; i++) {
    const x = (rand() * 480).toFixed(0);
    const y = (rand() * 480).toFixed(0);
    const rx = (rand() * 9 + 3).toFixed(1);
    const ry = (rand() * 5 + 2).toFixed(1);
    const rot = Math.floor(rand() * 180);
    const o = (rand() * 0.45 + 0.2).toFixed(2);
    blobs.push(
      `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${rand() > 0.4 ? fleck : '#e8c496'}" opacity="${o}" transform="rotate(${rot} ${x} ${y})"/>`,
    );
  }
  return `<svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="480" height="480" fill="${base}"/>
${blobs.join('\n')}
</svg>`;
}
