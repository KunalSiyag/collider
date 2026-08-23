export interface TextureTieDyeOptions {
  colors?: string[];
}

export function createTextureTieDye(options: TextureTieDyeOptions = {}): string {
  const { colors = ['#e0447a', '#f2b134', '#3aa66f', '#3f7fd1', '#8a4fc8'] } = options;
  const arms: string[] = [];
  const turns = 5;
  for (let arm = 0; arm < 12; arm++) {
    const c = colors[arm % colors.length];
    let d = 'M160,160 ';
    for (let t = 0; t <= turns * Math.PI * 2; t += 0.35) {
      const r = 6 + (t / (turns * Math.PI * 2)) * 165;
      const a = t + (arm * Math.PI * 2) / 12;
      d += `L${(160 + Math.cos(a) * r).toFixed(1)},${(160 + Math.sin(a) * r).toFixed(1)} `;
    }
    d += `L320,320 L0,320 Z`;
    arms.push(`<path d="${d}" fill="${c}" opacity="0.75"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="tdy-b" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="7"/></filter>
    <filter id="tdy-n"><feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="101"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="#f4f0e4"/>
  <g filter="url(#tdy-b)">
    ${arms.join('\n    ')}
  </g>
  <rect width="320" height="320" fill="#000" filter="url(#tdy-n)" opacity="0.25"/>
</svg>`;
}
