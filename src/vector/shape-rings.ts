export interface ShapeRingsOptions {
  colors?: string[];
  size?: number;
}

export function createShapeRings(options: ShapeRingsOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6'], size = 600 } = options;
  const c = size / 2;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g fill="none" stroke-width="${size * 0.055}">
    <circle cx="${(c - size * 0.1).toFixed(0)}" cy="${(c - size * 0.06).toFixed(0)}" r="${size * 0.28}" stroke="${colors[0]}" opacity="0.85">
      <animate attributeName="r" values="${size * 0.26};${size * 0.3};${size * 0.26}" dur="6s" repeatCount="indefinite" />
    </circle>
    <circle cx="${c}" cy="${(c + size * 0.08).toFixed(0)}" r="${size * 0.24}" stroke="${colors[1]}" opacity="0.85">
      <animate attributeName="r" values="${size * 0.22};${size * 0.26};${size * 0.22}" dur="7s" repeatCount="indefinite" />
    </circle>
    <circle cx="${(c + size * 0.12).toFixed(0)}" cy="${(c - size * 0.08).toFixed(0)}" r="${size * 0.2}" stroke="${colors[2]}" opacity="0.85">
      <animate attributeName="r" values="${size * 0.18};${size * 0.22};${size * 0.18}" dur="8s" repeatCount="indefinite" />
    </circle>
  </g>
</svg>`;
}
