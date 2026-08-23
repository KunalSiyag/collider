export interface TextureNebulaOptions {
  space?: string;
  gas?: string;
}

export function createTextureNebula(options: TextureNebulaOptions = {}): string {
  const { space = '#0a0a18', gas = '#7a4fc8' } = options;
  const clouds: string[] = [];
  let seed = 421;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let i = 0; i < 26; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const r = 30 + rnd() * 80;
    const c = rnd() < 0.35 ? gas : rnd() < 0.6 ? '#3f8ac8' : '#c85a9a';
    clouds.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${c}" opacity="${(0.05 + rnd() * 0.1).toFixed(2)}"/>`);
  }
  const stars: string[] = [];
  for (let i = 0; i < 160; i++) {
    const x = rnd() * 320;
    const y = rnd() * 320;
    const s = rnd();
    stars.push(s < 0.08
      ? `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.6" fill="#fff"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.2" fill="#fff" opacity="0.3"/>`
      : `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.4 + s * 0.9).toFixed(1)}" fill="#e8eaff" opacity="${(0.5 + s * 0.5).toFixed(2)}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="neb-b" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="14"/></filter>
  </defs>
  <rect width="320" height="320" fill="${space}"/>
  <g filter="url(#neb-b)">
    ${clouds.join('\n    ')}
  </g>
  ${stars.join('\n  ')}
</svg>`;
}
