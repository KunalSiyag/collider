export interface TextureLaceOptions {
  thread?: string;
  bg?: string;
}

export function createTextureLace(options: TextureLaceOptions = {}): string {
  const { thread = '#f4f0e8', bg = '#5c4a56' } = options;
  const net: string[] = [];
  for (let y = -10; y < 340; y += 40) {
    net.push(`<path d="M0,${y} Q80,${y + 26} 160,${y} T320,${y}" stroke="${thread}" stroke-width="2" fill="none" opacity="0.9"/>`);
    for (let x = 20; x < 320; x += 60) {
      net.push(`<circle cx="${x}" cy="${(y + 13).toFixed(1)}" r="4.6" fill="none" stroke="${thread}" stroke-width="1.8"/>`);
      net.push(`<path d="M${x},${y + 18} l-3,7 h6 Z" fill="${thread}"/>`);
      net.push(`<line x1="${x - 30}" y1="${y}" x2="${x - 30}" y2="${y + 34}" stroke="${thread}" stroke-width="1.2" opacity="0.75"/>`);
    }
    net.push(`<path d="M0,${y + 34} Q160,${y + 46} 320,${y + 34}" stroke="${thread}" stroke-width="2.6" fill="none"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${bg}"/>
  ${net.join('\n  ')}
</svg>`;
}
