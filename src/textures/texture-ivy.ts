export interface TextureIvyOptions {
  bg?: string;
  leaf?: string;
}

export function createTextureIvy(options: TextureIvyOptions = {}): string {
  const { bg = '#1a2418', leaf = '#3e6b34' } = options;
  let seed = 359;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const vines: string[] = [];
  for (let v = 0; v < 6; v++) {
    let x = rnd() * 320;
    let y = -10;
    let d = `M${x.toFixed(1)},${y} `;
    const drift = rnd() > 0.5 ? 1 : -1;
    while (y < 330) {
      y += 26 + rnd() * 18;
      x += drift * (12 + rnd() * 22);
      d += `Q${(x - drift * 10).toFixed(1)},${(y - 14).toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)} `;
      if (rnd() > 0.25) {
        const s = 0.5 + rnd() * 0.5;
        const side = rnd() > 0.5 ? 1 : -1;
        vines.push(`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(2)})">
          <path d="M0,0 q${side * 14},-16 ${side * 2},-30 q14,-2 20,12 q6,14 -8,20 q-10,4 -12,-2 Z" fill="${rnd() < 0.5 ? leaf : '#55853f'}"/>
          <path d="M0,0 L${side * 10},-22" stroke="#a8cc88" stroke-width="1" opacity="0.5"/>
        </g>`);
      }
    }
    vines.unshift(`<path d="${d}" stroke="#5c7a44" stroke-width="3" fill="none"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${bg}"/>
  ${vines.join('\n  ')}
</svg>`;
}
