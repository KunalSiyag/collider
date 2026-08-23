export interface ArrowFlowOptions {
  color?: string;
  count?: number;
  size?: number;
}

export function createArrowFlow(options: ArrowFlowOptions = {}): string {
  const { color = '#22d3ee', count = 5, size = 400 } = options;
  const c = size / 2;
  const spacing = size * 0.13;
  const startX = c - ((count - 1) * spacing) / 2;
  const a = size * 0.055;

  const arrows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = startX + i * spacing;
    const begin = (i * 0.18).toFixed(2);
    arrows.push(
      `    <path d="M ${x.toFixed(1)} ${(c - a).toFixed(1)} L ${(x + a).toFixed(1)} ${c} L ${x.toFixed(1)} ${(c + a).toFixed(1)}" fill="none" stroke="${color}" stroke-width="${size * 0.02}" stroke-linecap="round" stroke-linejoin="round">
      <animate attributeName="opacity" values="0.15;1;0.15" dur="1.8s" begin="${begin}s" repeatCount="indefinite" />
    </path>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${arrows.join('\n')}
</svg>`;
}
