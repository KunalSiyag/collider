export interface TextureTerracottaOptions {
  clay?: string;
  fleck?: string;
}

export function createTextureTerracotta(options: TextureTerracottaOptions = {}): string {
  const { clay = '#b35c38', fleck = '#e8b48f' } = options;
  let seed = 251;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const bands: string[] = [];
  for (let y = 0; y < 320; y += 8) {
    bands.push(`<rect x="0" y="${y}" width="320" height="7" fill="${rnd() > 0.5 ? '#a04e2d' : '#c26a44'}" opacity="${(0.1 + rnd() * 0.2).toFixed(2)}"/>`);
  }
  const specks: string[] = [];
  for (let i = 0; i < 380; i++) {
    specks.push(`<circle cx="${(rnd() * 320).toFixed(1)}" cy="${(rnd() * 320).toFixed(1)}" r="${(0.5 + rnd() * 1.6).toFixed(1)}" fill="${rnd() < 0.55 ? fleck : '#6e3220'}" opacity="${(0.25 + rnd() * 0.45).toFixed(2)}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${clay}"/>
  ${bands.join('\n  ')}
  ${specks.join('\n  ')}
</svg>`;
}
