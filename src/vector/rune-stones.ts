export interface RuneStonesOptions {
  seed?: number;
  size?: number;
  stones?: number;
  stone?: string;
  mark?: string;
}

export function createRuneStones(options: RuneStonesOptions = {}): string {
  const { seed = 84, size = 720, stones = 6, stone = '#1c1c24', mark = '#a78bfa' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  for (let i = 0; i < stones; i++) {
    const x = size * (0.12 + (i / (stones - 1)) * 0.76);
    const w = size * (0.07 + rnd() * 0.04);
    const h = size * (0.16 + rnd() * 0.22);
    const topY = size * 0.88 - h;
    const tilt = (rnd() - 0.5) * 8;
    const strokes: string[] = [];
    const kind = i % 3;
    if (kind === 0) {
      strokes.push(`M${x} ${topY + h * 0.2} L${x} ${topY + h * 0.85}`, `M${x} ${topY + h * 0.35} L${x + w * 0.3} ${topY + h * 0.55}`, `M${x} ${topY + h * 0.35} L${x - w * 0.3} ${topY + h * 0.55}`);
    } else if (kind === 1) {
      strokes.push(`M${x - w * 0.28} ${topY + h * 0.25} L${x + w * 0.28} ${topY + h * 0.75}`, `M${x + w * 0.28} ${topY + h * 0.25} L${x - w * 0.28} ${topY + h * 0.75}`, `M${x} ${topY + h * 0.15} L${x} ${topY + h * 0.9}`);
    } else {
      strokes.push(`M${x - w * 0.26} ${topY + h * 0.3} L${x + w * 0.26} ${topY + h * 0.5} L${x - w * 0.26} ${topY + h * 0.7}`);
    }
    els.push(`      <g transform="rotate(${tilt.toFixed(1)} ${x} ${size * 0.88})">
        <path d="M${(x - w / 2).toFixed(1)} ${size * 0.88} Q${(x - w * 0.42).toFixed(1)} ${(topY + h * 0.2).toFixed(1)} ${(x - w * 0.2).toFixed(1)} ${topY.toFixed(1)} L${(x + w * 0.2).toFixed(1)} ${topY.toFixed(1)} Q${(x + w * 0.42).toFixed(1)} ${(topY + h * 0.2).toFixed(1)} ${(x + w / 2).toFixed(1)} ${size * 0.88} Z" fill="${stone}" stroke="#52525b" stroke-width="1" />
        <g fill="none" stroke="${mark}" stroke-width="2.4" stroke-linecap="round" opacity="0.85">
${strokes.map((d) => `          <path d="${d}" />`).join('\n')}
          <animate attributeName="opacity" values="0.85;0.4;0.85" dur="${(5 + rnd() * 4).toFixed(1)}s" repeatCount="indefinite" />
        </g>
      </g>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
