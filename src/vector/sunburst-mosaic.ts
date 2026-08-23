export interface SunburstMosaicOptions {
  size?: number;
  wedges?: number;
  colors?: string[];
  base?: string;
}

export function createSunburstMosaic(options: SunburstMosaicOptions = {}): string {
  const { size = 720, wedges = 28, colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#fbbf24'], base = '#18181b' } = options;
  const c = size / 2;
  const r = size * 0.75;
  const step = 360 / wedges;
  const paths: string[] = [];

  for (let i = 0; i < wedges; i++) {
    const a0 = ((i * step - 90) * Math.PI) / 180;
    const a1 = (((i + 1) * step - 90) * Math.PI) / 180;
    const x0 = c + Math.cos(a0) * r;
    const y0 = c + Math.sin(a0) * r;
    const x1 = c + Math.cos(a1) * r;
    const y1 = c + Math.sin(a1) * r;
    const fill = i % 3 === 2 ? 'none' : colors[i % colors.length];
    const op = fill === 'none' ? 0 : 0.14 + ((i * 37) % 20) / 100;
    paths.push(
      `      <path d="M${c} ${c} L${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" fill="${fill}" fill-opacity="${op.toFixed(2)}" stroke="#27272a" stroke-width="1" />`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <g>
${paths.join('\n')}
    <animateTransform attributeName="transform" type="rotate" from="0 ${c} ${c}" to="6 ${c} ${c}" dur="24s" repeatCount="indefinite" />
  </g>
  <circle cx="${c}" cy="${c}" r="26" fill="#0b0b10" stroke="${colors[0]}" stroke-width="2" />
</svg>`;
}
