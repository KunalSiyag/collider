export interface TexturePlaidOptions {
  a?: string;
  b?: string;
  c?: string;
}

export function createTexturePlaid(options: TexturePlaidOptions = {}): string {
  const { a = '#14532d', b = '#166534', c = '#dc2626' } = options;
  const stripes: string[] = [];
  const bands = [
    [0, 90, a, 0.9],
    [90, 40, b, 0.85],
    [130, 18, c, 0.8],
    [148, 60, a, 0.75],
    [208, 24, c, 0.65],
    [232, 88, b, 0.8],
  ] as const;

  for (const [offset, width, color, opacity] of bands) {
    stripes.push(`    <rect x="${offset}" y="0" width="${width}" height="320" fill="${color}" opacity="${opacity}" />`);
    stripes.push(`    <rect x="0" y="${offset}" width="320" height="${width}" fill="${color}" opacity="${opacity * 0.8}" />`);
  }

  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0a1f10" />
${stripes.join('\n')}
</svg>`;
}
