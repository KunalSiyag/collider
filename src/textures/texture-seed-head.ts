export interface TextureSeedHeadOptions {
  base?: string;
  seed?: string;
}

export function createTextureSeedHead(options: TextureSeedHeadOptions = {}): string {
  const { base = '#2a2416', seed = '#c8a45e' } = options;
  const dots: string[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < 420; i++) {
    const r = 8.4 * Math.sqrt(i);
    if (r > 155) break;
    const a = i * golden;
    const x = 160 + Math.cos(a) * r;
    const y = 160 + Math.sin(a) * r;
    const s = 1.4 + (r / 155) * 3.4;
    const tone = ((i % 7) / 7) * 0.35;
    dots.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${s.toFixed(1)}" fill="${seed}" opacity="${(0.75 - tone).toFixed(2)}"/>`);
    dots.push(`<circle cx="${(x - s * 0.3).toFixed(1)}" cy="${(y - s * 0.3).toFixed(1)}" r="${(s * 0.32).toFixed(1)}" fill="#f2dca0" opacity="0.5"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="sdh-g" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#4a4028"/>
      <stop offset="100%" stop-color="#171308"/>
    </radialGradient>
  </defs>
  <rect width="320" height="320" fill="url(#sdh-g)"/>
  ${dots.join('\n  ')}
</svg>`;
}
