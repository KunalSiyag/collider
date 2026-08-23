export interface ZigzagDividerOptions {
  color?: string;
  size?: number;
  teeth?: number;
  amplitude?: number;
}

export function createZigzagDivider(options: ZigzagDividerOptions = {}): string {
  const { color = '#8b5cf6', size = 1200, teeth = 24, amplitude = 28 } = options;

  const points: string[] = [];
  const step = size / teeth;
  for (let i = 0; i <= teeth; i++) {
    const x = i * step;
    const y = i % 2 === 0 ? 0 : amplitude;
    points.push(`L ${x.toFixed(1)} ${y.toFixed(1)}`);
  }

  return `<svg viewBox="0 0 ${size} ${(amplitude * 1.4).toFixed(0)}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M 0 0 ${points.join(' ')} L ${size} ${(amplitude * 1.4).toFixed(0)} L 0 ${(amplitude * 1.4).toFixed(0)} Z" fill="${color}" />
</svg>`;
}
