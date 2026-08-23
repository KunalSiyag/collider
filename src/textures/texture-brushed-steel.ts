export interface TextureBrushedSteelOptions {
  base?: string;
  streak?: string;
}

export function createTextureBrushedSteel(options: TextureBrushedSteelOptions = {}): string {
  const { base = '#9aa3ab', streak = '#cfd6dc' } = options;
  let seed = 89;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const lines: string[] = [];
  for (let y = 0; y < 320; y++) {
    if (rnd() < 0.55) continue;
    const c = rnd() > 0.5 ? streak : '#5f676e';
    lines.push(`<line x1="0" y1="${y}" x2="320" y2="${(y + (rnd() - 0.5)).toFixed(1)}" stroke="${c}" stroke-width="${rnd() < 0.15 ? 1 : 0.5}" opacity="${(0.12 + rnd() * 0.4).toFixed(2)}"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="bst-g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#6b737a"/>
      <stop offset="0.25" stop-color="#aeb7bf"/>
      <stop offset="0.5" stop-color="#848d95"/>
      <stop offset="0.75" stop-color="#bcc4cb"/>
      <stop offset="1" stop-color="#70787f"/>
    </linearGradient>
  </defs>
  <rect width="320" height="320" fill="url(#bst-g)"/>
  ${lines.join('\n  ')}
</svg>`;
}
