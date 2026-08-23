export interface TextureMacrameOptions {
  cord?: string;
  shadow?: string;
}

export function createTextureMacrame(options: TextureMacrameOptions = {}): string {
  const { cord = '#d8c49a', shadow = '#8a7550' } = options;
  const knots: string[] = [];
  for (let y = -10; y < 340; y += 44) {
    for (let x = -20; x < 360; x += 48) {
      const d1 = `M${x},${y} Q${x + 24},${y + 34} ${x + 48},${y}`;
      const d2 = `M${x + 24},${y + 40} Q${x + 12},${y + 16} ${x + 24},${y - 6} Q${x + 36},${y + 16} ${x + 24},${y + 40}`;
      knots.push(`<path d="${d1}" stroke="${shadow}" stroke-width="9" fill="none" stroke-linecap="round" opacity="0.5"/>`);
      knots.push(`<path d="${d1}" stroke="${cord}" stroke-width="7" fill="none" stroke-linecap="round"/>`);
      knots.push(`<path d="${d2}" stroke="${cord}" stroke-width="5.5" fill="none" stroke-linecap="round"/>`);
      knots.push(`<circle cx="${x + 24}" cy="${y + 17}" r="4.5" fill="none" stroke="${shadow}" stroke-width="2"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#3a2f1e"/>
  ${knots.join('\n  ')}
</svg>`;
}
