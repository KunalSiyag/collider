export interface ShapePinwheelOptions {
  colors?: string[];
  size?: number;
}

export function createShapePinwheel(options: ShapePinwheelOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#facc15'], size = 320 } = options;
  const c = size / 2;
  const blade = `M ${c} ${c} L ${c} 30 A 130 130 0 0 1 ${c + 92} 68 Z`;
  const arms: string[] = [];

  for (let i = 0; i < 4; i++) {
    arms.push(`  <path d="${blade}" fill="${colors[i]}" transform="rotate(${i * 90} ${c} ${c})" />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
<g>
  <animateTransform attributeName="transform" type="rotate" from="0 ${c} ${c}" to="360 ${c} ${c}" dur="12s" repeatCount="indefinite" />
${arms.join('\n')}
</g>
<circle cx="${c}" cy="${c}" r="20" fill="#0b0b10" stroke="#fafafa" stroke-width="4" />
</svg>`;
}
