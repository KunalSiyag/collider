export interface AudioPulseOptions {
  seed?: number;
  size?: number;
  bars?: number;
  base?: string;
  accents?: string[];
}

export function createAudioPulse(options: AudioPulseOptions = {}): string {
  const { seed = 17, size = 720, bars = 28, base = '#27272a', accents = ['#8b5cf6', '#22d3ee', '#f472b6'] } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const c = size / 2;
  const stepW = (size * 0.86) / bars;
  const els: string[] = [];
  for (let i = 0; i < bars; i++) {
    const x = size * 0.07 + i * stepW + stepW * 0.18;
    const w = stepW * 0.64;
    const hMax = size * (0.08 + rnd() * rnd() * 0.3);
    const color = i % 9 === 4 ? accents[(i / 9 | 0) % accents.length] : base;
    els.push(`      <rect x="${x.toFixed(1)}" y="${(c - hMax).toFixed(1)}" width="${w.toFixed(1)}" height="${(hMax * 2).toFixed(1)}" rx="${(w / 2).toFixed(1)}" fill="${color}" opacity="0.85">
        <animate attributeName="height" values="${(hMax * 2).toFixed(0)};${(hMax * 0.5).toFixed(0)};${(hMax * 2).toFixed(0)}" dur="${(1 + rnd() * 1.8).toFixed(2)}s" repeatCount="indefinite" />
        <animate attributeName="y" values="${(c - hMax).toFixed(0)};${(c - hMax * 0.25).toFixed(0)};${(c - hMax).toFixed(0)}" dur="${(1 + rnd() * 1.8).toFixed(2)}s" repeatCount="indefinite" />
      </rect>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
  <line x1="${size * 0.05}" y1="${c}" x2="${size * 0.95}" y2="${c}" stroke="#3f3f46" stroke-width="1" stroke-dasharray="4 6" />
</svg>`;
}
