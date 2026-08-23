export interface PendulumArcsOptions {
  size?: number;
  arms?: number;
  stroke?: string;
  accent?: string;
}

export function createPendulumArcs(options: PendulumArcsOptions = {}): string {
  const { size = 720, arms = 7, stroke = '#27272a', accent = '#22d3ee' } = options;
  const c: [number, number] = [size / 2, size * 0.12];
  const els: string[] = [];

  for (let i = 0; i < arms; i++) {
    const t = i / (arms - 1);
    const len = size * (0.3 + Math.abs(t - 0.5) * 0.55);
    const swing = 28 + i * 6;
    const dur = (2.4 + i * 0.35).toFixed(2);
    const color = i === Math.floor(arms / 2) ? accent : stroke;
    els.push(`      <g>
        <line x1="${c[0]}" y1="${c[1]}" x2="${c[0]}" y2="${(c[1] + len).toFixed(1)}" stroke="${color}" stroke-width="1.4">
          <animateTransform attributeName="transform" type="rotate" values="${-swing} ${c[0]} ${c[1]}; ${swing} ${c[0]} ${c[1]}; ${-swing} ${c[0]} ${c[1]}" dur="${dur}s" repeatCount="indefinite" />
        </line>
        <circle cx="${c[0]}" cy="${(c[1] + len).toFixed(1)}" r="5" fill="${i % 3 === 0 ? '#8b5cf6' : '#3f3f46'}">
          <animateTransform attributeName="transform" type="rotate" values="${-swing} ${c[0]} ${c[1]}; ${swing} ${c[0]} ${c[1]}; ${-swing} ${c[0]} ${c[1]}" dur="${dur}s" repeatCount="indefinite" />
        </circle>
      </g>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
