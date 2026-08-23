export interface TextureRisographOptions {
  paper?: string;
  inkA?: string;
  inkB?: string;
}

export function createTextureRisograph(options: TextureRisographOptions = {}): string {
  const { paper = '#f2ead8', inkA = '#e8557a', inkB = '#3a6ea5' } = options;
  const dots: string[] = [];
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 20; x++) {
      const cx = x * 16 + 8 + (y % 2) * 8;
      const cy = y * 16 + 8;
      const ta = Math.hypot(x - 6, y - 6) / 12;
      const tb = Math.hypot(x - 13, y - 14) / 14;
      if (ta < 1.05) dots.push(`<circle cx="${cx}" cy="${cy}" r="${(5.5 * (1 - ta)).toFixed(1)}" fill="${inkA}" opacity="0.75"/>`);
      if (tb < 1.05) dots.push(`<circle cx="${cx}" cy="${cy}" r="${(5.5 * (1 - tb)).toFixed(1)}" fill="${inkB}" opacity="0.65"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="ris-n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="157"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="${paper}"/>
  ${dots.join('\n  ')}
  <rect width="320" height="320" fill="#000" filter="url(#ris-n)" opacity="0.3"/>
</svg>`;
}
