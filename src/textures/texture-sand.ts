export interface TextureSandOptions {
  base?: string;
  speck?: string;
}

export function createTextureSand(options: TextureSandOptions = {}): string {
  const { base = '#d97706', speck = '#fde68a' } = options;
  const grains: string[] = [];
  let s = 7;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  for (let i = 0; i < 900; i++) {
    const x = (rand() * 480).toFixed(0);
    const y = (rand() * 320).toFixed(0);
    const r = (rand() * 1.6 + 0.4).toFixed(2);
    const o = (rand() * 0.5 + 0.2).toFixed(2);
    grains.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${speck}" opacity="${o}" />`);
  }
  return `<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="sand-g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${base}" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
  </defs>
  <rect width="480" height="320" fill="url(#sand-g)" />
  ${grains.join('')}
</svg>`;
}
