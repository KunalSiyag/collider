export interface CircuitBoardOptions {
  trace?: string;
  pad?: string;
  accent?: string;
  width?: number;
  height?: number;
  traces?: number;
}

export function createCircuitBoard(options: CircuitBoardOptions = {}): string {
  const {
    trace = '#27272a',
    pad = '#3f3f46',
    accent = '#22d3ee',
    width = 800,
    height = 600,
    traces = 16,
  } = options;

  const elements: string[] = [];

  for (let i = 0; i < traces; i++) {
    const seedA = Math.sin(i * 12.9898) * 43758.5453;
    const rand1 = seedA - Math.floor(seedA);
    const seedB = Math.sin(i * 78.233) * 12345.6789;
    const rand2 = seedB - Math.floor(seedB);

    const y = ((rand1 * height) % (height - 40)) + 20;
    const startX = rand2 > 0.5 ? 0 : width;
    const dir = startX === 0 ? 1 : -1;
    const stepX = (width * (0.25 + rand1 * 0.5)) | 0;
    const cornerX = startX + dir * stepX;
    const endY = y + (((rand2 - 0.5) * height) / 3) | 0;
    const clampedY = Math.min(Math.max(endY, 20), height - 20);
    const isAccent = i % 5 === 0;
    const color = isAccent ? accent : trace;
    const strokeWidth = isAccent ? 2.5 : 1.5;

    elements.push(
      `    <path d="M ${startX} ${y.toFixed(0)} L ${cornerX} ${y.toFixed(0)} L ${cornerX} ${clampedY}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" />`,
    );
    elements.push(
      `    <circle cx="${startX === 0 ? 6 : width - 6}" cy="${y.toFixed(0)}" r="5" fill="${pad}" stroke="${isAccent ? accent : 'none'}" stroke-width="1.5" />`,
    );
    elements.push(
      `    <circle cx="${cornerX}" cy="${clampedY}" r="${isAccent ? 7 : 5}" fill="${isAccent ? accent : pad}" />`,
    );
  }

  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${elements.join('\n')}
</svg>`;
}
