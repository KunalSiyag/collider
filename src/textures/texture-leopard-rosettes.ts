export interface TextureLeopardRosettesOptions {
  coat?: string;
  spot?: string;
}

export function createTextureLeopardRosettes(options: TextureLeopardRosettesOptions = {}): string {
  const { coat = '#d8b06a', spot = '#3a2410' } = options;
  let seed = 467;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const rosettes: string[] = [];
  for (let r = -1; r < 8; r++) {
    for (let c = -1; c < 8; c++) {
      const x = c * 46 + ((r % 2) * 23) + rnd() * 8;
      const y = r * 44 + rnd() * 8;
      const s = 9 + rnd() * 4;
      const rot = rnd() * 360;
      let d = '';
      for (let p = 0; p < 8; p++) {
        if (p % 3 === 2 && rnd() > 0.5) continue;
        const a = (p / 8) * Math.PI * 2;
        const rr = s * (1 + Math.sin(p * 2.3 + c + r) * 0.18);
        const px = x + Math.cos(a) * rr;
        const py = y + Math.sin(a) * rr;
        d += `${p === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)} `;
      }
      rosettes.push(`<g transform="rotate(${rot.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})">
        <path d="${(d || '')}Z" fill="none" stroke="${spot}" stroke-width="4" stroke-linecap="round"/>
      </g>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="lpr-g" cx="45%" cy="40%" r="80%">
      <stop offset="0%" stop-color="#e8c68a"/>
      <stop offset="100%" stop-color="#c09450"/>
    </radialGradient>
  </defs>
  <rect width="320" height="320" fill="url(#lpr-g)"/>
  ${rosettes.join('\n  ')}
</svg>`;
}
