export interface TextureSandstoneOptions {
  base?: string;
  stratum?: string;
}

export function createTextureSandstone(options: TextureSandstoneOptions = {}): string {
  const { base = '#c89a62', stratum = '#96683a' } = options;
  let seed = 379;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const layers: string[] = [];
  for (let y = -10; y < 340; y += 12 + rnd() * 14) {
    let d = `M-10,${y.toFixed(1)} `;
    for (let x = -10; x <= 340; x += 45) {
      d += `L${x},${(y + Math.sin(x * 0.02 + y) * 5 + rnd() * 4).toFixed(1)} `;
    }
    const c = rnd() < 0.5 ? stratum : rnd() < 0.5 ? '#dcae76' : '#7d5428';
    layers.push(`<path d="${d} L340,340 L-10,340 Z" fill="${c}" opacity="${(0.18 + rnd() * 0.3).toFixed(2)}"/>`);
    layers.push(`<path d="${d}" stroke="#6e4820" stroke-width="1.2" fill="none" opacity="0.5"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="snd-n"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="2" seed="127"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/><feComposite operator="over" in2="SourceGraphic"/></filter>
  </defs>
  <rect width="320" height="320" fill="${base}"/>
  ${layers.join('\n  ')}
  <rect width="320" height="320" fill="#fff" filter="url(#snd-n)" opacity="0.35"/>
</svg>`;
}
