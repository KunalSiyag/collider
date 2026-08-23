export interface TextureBarcodeOptions {
  paper?: string;
  ink?: string;
}

export function createTextureBarcode(options: TextureBarcodeOptions = {}): string {
  const { paper = '#f2f0ea', ink = '#141414' } = options;
  let seed = 449;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const bars: string[] = [];
  let x = 6;
  while (x < 314) {
    const w = 1 + Math.floor(rnd() * 5);
    if (rnd() > 0.42) {
      bars.push(`<rect x="${x}" y="0" width="${w}" height="320" fill="${ink}" opacity="${rnd() < 0.12 ? 0.55 : 1}"/>`);
    }
    x += w;
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="bcd-f" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0.35" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#fff" stop-opacity="0.18"/>
      <stop offset="0.65" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="320" height="320" fill="${paper}"/>
  ${bars.join('\n  ')}
  <rect width="320" height="320" fill="url(#bcd-f)"/>
</svg>`;
}
