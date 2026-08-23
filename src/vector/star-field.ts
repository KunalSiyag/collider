export interface StarFieldOptions {
  color?: string;
  count?: number;
  size?: number;
}

function starPath(x: number, y: number, r: number): string {
  const inner = r * 0.28;
  return [
    `M ${x} ${y - r}`,
    `Q ${x + inner * 0.4} ${y - inner * 0.4} ${x + r} ${y}`,
    `Q ${x + inner * 0.4} ${y + inner * 0.4} ${x} ${y + r}`,
    `Q ${x - inner * 0.4} ${y + inner * 0.4} ${x - r} ${y}`,
    `Q ${x - inner * 0.4} ${y - inner * 0.4} ${x} ${y - r}`,
    'Z',
  ].join(' ');
}

export function createStarField(options: StarFieldOptions = {}): string {
  const { color = '#fafafa', count = 26, size = 800 } = options;
  const stars: string[] = [];

  for (let i = 0; i < count; i++) {
    const x = Math.round((Math.sin(i * 127.1) * 0.5 + 0.5) * size);
    const y = Math.round((Math.sin(i * 311.7) * 0.5 + 0.5) * size);
    const r = 3 + ((Math.sin(i * 74.7) * 0.5 + 0.5) * size) / 130;
    const delay = (i % 8).toFixed(1);
    const duration = (2.6 + (i % 5) * 0.9).toFixed(1);
    stars.push(
      `    <path d="${starPath(x, y, r)}" fill="${color}">
      <animate attributeName="opacity" values="0.15;1;0.15" dur="${duration}s" begin="${delay}s" repeatCount="indefinite" />
    </path>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${stars.join('\n')}
</svg>`;
}
