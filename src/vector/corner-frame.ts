export interface CornerFrameOptions {
  color?: string;
  size?: number;
  armLength?: number;
  thickness?: number;
}

export function createCornerFrame(options: CornerFrameOptions = {}): string {
  const { color = '#8b5cf6', size = 400, armLength = 56, thickness = 4 } = options;
  const inset = 24;
  const a = inset;
  const b = size - inset;
  const l = armLength;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g stroke="${color}" stroke-width="${thickness}" fill="none" stroke-linecap="round">
    <path d="M ${a} ${(a + l).toFixed(0)} L ${a} ${a} L ${(a + l).toFixed(0)} ${a}" />
    <path d="M ${(b - l).toFixed(0)} ${a} L ${b} ${a} L ${b} ${(a + l).toFixed(0)}" />
    <path d="M ${b} ${(b - l).toFixed(0)} L ${b} ${b} L ${(b - l).toFixed(0)} ${b}" />
    <path d="M ${(a + l).toFixed(0)} ${b} L ${a} ${b} L ${a} ${(b - l).toFixed(0)}" />
  </g>
</svg>`;
}
