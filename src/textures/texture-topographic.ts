export interface TextureTopographicOptions {
  paper?: string;
  line?: string;
}

export function createTextureTopographic(options: TextureTopographicOptions = {}): string {
  const { paper = '#efe8d4', line = '#7a6a4a' } = options;
  const rings: string[] = [];
  let seed = 383;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const cx = 130 + rnd() * 60;
  const cy = 130 + rnd() * 60;
  for (let i = 1; i <= 12; i++) {
    let d = '';
    for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.3) {
      const wob = 1 + Math.sin(a * 3 + i) * 0.14 + Math.sin(a * 5 - i * 0.7) * 0.08;
      const r = i * 13 * wob;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r * 0.85;
      d += `${a === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)} `;
    }
    const major = i % 4 === 0;
    rings.push(`<path d="${d}Z" fill="none" stroke="${line}" stroke-width="${major ? 2 : 0.9}" opacity="${major ? 0.85 : 0.5}"/>`);
    if (major) rings.push(`<circle cx="${(cx + i * 10).toFixed(0)}" cy="${cy.toFixed(0)}" r="1.8" fill="${line}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${paper}"/>
  ${rings.join('\n  ')}
</svg>`;
}
