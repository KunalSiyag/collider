export interface ShapeScallopsOptions {
  colors?: string[];
  size?: number;
}

export function createShapeScallops(options: ShapeScallopsOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6'], size = 560 } = options;
  const r = size / 9;
  const arcs: string[] = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      const cx = col * (r * 1.4) + (row % 2 ? r * 0.7 : 0);
      const cy = row * (r * 0.85) + r * 0.5;
      arcs.push(
        `<path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}" fill="none" stroke="${colors[(row + col) % colors.length]!}" stroke-width="${size / 90}" stroke-linecap="round"/>`,
      );
    }
  }
  return `<svg viewBox="0 0 ${size} ${(r * 0.85 * 6 + r).toFixed(0)}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0f0f13"/>
${arcs.join('\n')}
</svg>`;
}
