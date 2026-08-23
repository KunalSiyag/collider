export interface TextureCharcoalSketchOptions {
  paper?: string;
  char?: string;
}

export function createTextureCharcoalSketch(options: TextureCharcoalSketchOptions = {}): string {
  const { paper = '#e6e2d8', char = '#26241f' } = options;
  let seed = 439;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const marks: string[] = [];
  for (let i = 0; i < 150; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const len = 10 + rnd() * 50;
    const a = (rnd() < 0.7 ? -0.5 : Math.PI / 3) + (rnd() - 0.5) * 0.4;
    marks.push(`<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + Math.cos(a) * len).toFixed(1)}" y2="${(y + Math.sin(a) * len).toFixed(1)}" stroke="${char}" stroke-width="${(1 + rnd() * 3).toFixed(1)}" stroke-linecap="round" opacity="${(0.08 + rnd() * 0.28).toFixed(2)}"/>`);
  }
  for (let i = 0; i < 14; i++) {
    marks.push(`<ellipse cx="${(rnd() * 320).toFixed(1)}" cy="${(rnd() * 320).toFixed(1)}" rx="${(12 + rnd() * 30).toFixed(0)}" ry="${(6 + rnd() * 14).toFixed(0)}" transform="rotate(${(rnd() * 180).toFixed(0)} 160 160)" fill="${char}" opacity="0.05"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="chr-n"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed="149"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="${paper}"/>
  ${marks.join('\n  ')}
  <rect width="320" height="320" fill="#000" filter="url(#chr-n)" opacity="0.15"/>
</svg>`;
}
