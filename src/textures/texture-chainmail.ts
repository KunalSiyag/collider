export interface TextureChainmailOptions {
  ring?: string;
  shadow?: string;
}

export function createTextureChainmail(options: TextureChainmailOptions = {}): string {
  const { ring = '#9aa4ae', shadow = '#2a2f36' } = options;
  const links: string[] = [];
  for (let row = -1; row < 12; row++) {
    for (let col = -1; col < 10; col++) {
      const x = col * 36 + ((row % 2) * 18);
      const y = row * 28;
      links.push(`<circle cx="${x}" cy="${y}" r="13" fill="none" stroke="${shadow}" stroke-width="5"/>`);
      links.push(`<circle cx="${x}" cy="${y}" r="13" fill="none" stroke="${ring}" stroke-width="2.6"/>`);
      links.push(`<path d="M${x - 9},${y - 9} A13,13 0 0 1 ${x + 3},${y - 12.7}" fill="none" stroke="#e2e8ee" stroke-width="1.6" opacity="0.8"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="cml-g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#454d56"/>
      <stop offset="1" stop-color="#171b20"/>
    </linearGradient>
  </defs>
  <rect width="320" height="320" fill="url(#cml-g)"/>
  ${links.join('\n  ')}
</svg>`;
}
