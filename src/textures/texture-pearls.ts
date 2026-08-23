export interface TexturePearlsOptions {
  silk?: string;
  pearl?: string;
}

export function createTexturePearls(options: TexturePearlsOptions = {}): string {
  const { silk = '#4a3a4e', pearl = '#f2ecf5' } = options;
  const rows: string[] = [];
  for (let r = -1; r < 9; r++) {
    for (let c = -1; c < 8; c++) {
      const x = c * 44 + ((r % 2) * 22) + 10;
      const y = r * 40 + 14;
      rows.push(`<circle cx="${x}" cy="${(y + 3).toFixed(1)}" r="16" fill="#000" opacity="0.45"/>`);
      rows.push(`<circle cx="${x}" cy="${y}" r="15.5" fill="url(#prl-g${(r + c) % 2})"/>`);
      rows.push(`<ellipse cx="${(x - 5).toFixed(1)}" cy="${(y - 6).toFixed(1)}" rx="4.5" ry="3" fill="#fff" opacity="0.9"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="prl-g0" cx="35%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="55%" stop-color="${pearl}"/>
      <stop offset="100%" stop-color="#c0aecb"/>
    </radialGradient>
    <radialGradient id="prl-g1" cx="60%" cy="35%" r="80%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#eadff0"/>
      <stop offset="100%" stop-color="#a892b8"/>
    </radialGradient>
  </defs>
  <rect width="320" height="320" fill="${silk}"/>
  ${rows.join('\n  ')}
</svg>`;
}
