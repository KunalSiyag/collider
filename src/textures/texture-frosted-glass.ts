export interface TextureFrostedGlassOptions {
  tint?: string;
  streak?: string;
}

export function createTextureFrostedGlass(options: TextureFrostedGlassOptions = {}): string {
  const { tint = '#c8d8e4', streak = '#ffffff' } = options;
  let seed = 229;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const bands: string[] = [];
  for (let x = -20; x < 340; x += 24 + rnd() * 26) {
    const w = 10 + rnd() * 26;
    bands.push(`<rect x="${x.toFixed(1)}" y="-10" width="${w.toFixed(1)}" height="340" fill="${streak}" opacity="${(0.06 + rnd() * 0.12).toFixed(2)}"/>`);
  }
  const blobs: string[] = [];
  for (let i = 0; i < 30; i++) {
    blobs.push(`<circle cx="${(rnd() * 320).toFixed(1)}" cy="${(rnd() * 320).toFixed(1)}" r="${(14 + rnd() * 36).toFixed(0)}" fill="#fff" opacity="${(0.04 + rnd() * 0.08).toFixed(2)}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="frg-f" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="turbulence" baseFrequency="0.9" numOctaves="2" seed="81"/>
      <feGaussianBlur stdDeviation="1.6" result="b"/>
      <feComposite in="SourceGraphic" in2="b" operator="over"/>
    </filter>
    <linearGradient id="frg-g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e6eef5"/>
      <stop offset="1" stop-color="#a7bccb"/>
    </linearGradient>
  </defs>
  <rect width="320" height="320" fill="${tint}"/>
  <rect width="320" height="320" fill="url(#frg-g)" filter="url(#frg-f)" opacity="0.85"/>
  ${bands.join('\n  ')}
  ${blobs.join('\n  ')}
</svg>`;
}
