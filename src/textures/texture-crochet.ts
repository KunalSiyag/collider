export interface TextureCrochetOptions {
  yarn?: string;
  hole?: string;
}

export function createTextureCrochet(options: TextureCrochetOptions = {}): string {
  const { yarn = '#c25e7a', hole = '#3a2029' } = options;
  const motifs: string[] = [];
  for (let r = -1; r < 4; r++) {
    for (let c = -1; c < 4; c++) {
      const cx = c * 110 + ((r % 2) * 55) + 55;
      const cy = r * 95 + 45;
      motifs.push(`<circle cx="${cx}" cy="${cy}" r="42" fill="none" stroke="${yarn}" stroke-width="7"/>`);
      motifs.push(`<circle cx="${cx}" cy="${cy}" r="28" fill="none" stroke="#d98ba0" stroke-width="5.5"/>`);
      motifs.push(`<circle cx="${cx}" cy="${cy}" r="15" fill="none" stroke="${yarn}" stroke-width="5"/>`);
      motifs.push(`<circle cx="${cx}" cy="${cy}" r="6" fill="${hole}"/>`);
      for (let p = 0; p < 10; p++) {
        const a = (p / 10) * Math.PI * 2;
        motifs.push(`<line x1="${(cx + Math.cos(a) * 30).toFixed(1)}" y1="${(cy + Math.sin(a) * 30).toFixed(1)}" x2="${(cx + Math.cos(a) * 41).toFixed(1)}" y2="${(cy + Math.sin(a) * 41).toFixed(1)}" stroke="${yarn}" stroke-width="3.4"/>`);
      }
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${hole}"/>
  ${motifs.join('\n  ')}
</svg>`;
}
