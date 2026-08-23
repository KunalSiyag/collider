export interface ScatterDustOptions {
  seed?: number;
  count?: number;
  size?: number;
  base?: string;
  accents?: string[];
}

export function createScatterDust(options: ScatterDustOptions = {}): string {
  const { seed = 42, count = 260, size = 720, base = '#3f3f46', accents = ['#8b5cf6', '#22d3ee', '#f472b6'] } = options;

  let t = seed >>> 0;
  const rand = () => {
    t |= 0; t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const dots: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = (rand() * size).toFixed(1);
    const y = (rand() * size).toFixed(1);
    const r = (0.6 + rand() * rand() * 2.6).toFixed(2);
    const roll = rand();
    const fill = roll < 0.06 ? accents[i % accents.length] : base;
    const op = (0.25 + rand() * 0.65).toFixed(2);
    const anim = roll < 0.08
      ? `\n      <animate attributeName="opacity" values="${op};0.15;${op}" dur="${(3 + rand() * 5).toFixed(1)}s" repeatCount="indefinite" />`
      : '';
    dots.push(`    <circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" opacity="${op}">${anim}\n    </circle>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${dots.join('\n')}
</svg>`;
}
