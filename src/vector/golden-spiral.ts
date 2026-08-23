export interface GoldenSpiralOptions {
  size?: number;
  squares?: number;
  stroke?: string;
  accent?: string;
}

export function createGoldenSpiral(options: GoldenSpiralOptions = {}): string {
  const { size = 720, squares = 9, stroke = '#27272a', accent = '#8b5cf6' } = options;
  const phi = 1.6180339887;

  let x = size * 0.06;
  let y = size * 0.06;
  let w = size * 0.88;
  let h = w / phi;
  if (h > size * 0.88) { h = size * 0.88; w = h * phi; y += (size * 0.88 - h) / 2; x += (size * 0.88 - w) / 2; }

  const rects: string[] = [];
  let cx = x, cy = y, cw = w, ch = h;
  for (let i = 0; i < squares; i++) {
    rects.push(`    <rect x="${cx.toFixed(1)}" y="${cy.toFixed(1)}" width="${cw.toFixed(1)}" height="${ch.toFixed(1)}" fill="none" stroke="${stroke}" stroke-width="1" />`);
    if (cw > ch) { cx += ch; cw -= ch; } else { cy += cw; ch -= cw; }
    if (Math.min(cw, ch) < 4) break;
  }

  const steps = 220;
  const totalTheta = Math.PI * 2 * 2.2;
  const b = Math.log(phi) / (Math.PI / 2);
  const originX = x + w - h;
  const originY = y + h;
  const pts: string[] = [];
  for (let s = 0; s <= steps; s++) {
    const th = (s / steps) * totalTheta;
    const r = h * Math.exp(-b * th);
    pts.push(`${s === 0 ? 'M' : 'L'}${(originX + Math.cos(th) * r).toFixed(1)} ${(originY + Math.sin(th) * r).toFixed(1)}`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${rects.join('\n')}
  <path d="${pts.join(' ')}" fill="none" stroke="${accent}" stroke-width="2">
    <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="7s" repeatCount="indefinite" />
  </path>
</svg>`;
}
