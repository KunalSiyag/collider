export interface BarberPoleOptions {
  size?: number;
  stripes?: number;
  colors?: string[];
}

export function createBarberPole(options: BarberPoleOptions = {}): string {
  const { size = 720, stripes = 7, colors = ['#f472b6', '#67e8f9', '#e4e4e7'] } = options;
  const w = size * 0.5;
  const x0 = (size - w) / 2;
  const els: string[] = [];
  const stripeW = w / stripes;

  els.push(`      <clipPath id="bp-clip"><rect x="${x0}" y="0" width="${w}" height="${size}" rx="18" /></clipPath>`);
  for (let i = -stripes * 2; i < stripes * 2 + 4; i++) {
    const color = colors[((i % colors.length) + colors.length) % colors.length];
    els.push(`      <line x1="${x0 - w}" y1="${(i * stripeW * 2).toFixed(1)}" x2="${x0 + w * 2}" y2="${(i * stripeW * 2 - w).toFixed(1)}" stroke="${color}" stroke-width="${stripeW.toFixed(1)}">
        <animateTransform attributeName="transform" type="translate" values="0 0; 0 ${stripeW * 4}" dur="5s" repeatCount="indefinite" />
      </line>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>${els[0]}</defs>
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <g clip-path="url(#bp-clip)">
${els.slice(1).join('\n')}
  </g>
  <rect x="${x0}" y="0" width="${w}" height="${size}" fill="none" stroke="#3f3f46" stroke-width="3" rx="18" />
</svg>`;
}
