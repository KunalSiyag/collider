export interface ShapeMetaballMergeOptions {
  colors?: string[];
  size?: number;
}

export function createShapeMetaballMerge(options: ShapeMetaballMergeOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee'], size = 320 } = options;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>
  <filter id="mb-blur"><feGaussianBlur stdDeviation="14" /></filter>
</defs>
<rect width="${size}" height="${size}" fill="#0b0b10" />
<g filter="url(#mb-blur)">
  <circle cx="110" cy="140" r="52" fill="${colors[0]}"><animate attributeName="cx" values="110;180;110" dur="9s" repeatCount="indefinite" /></circle>
  <circle cx="210" cy="170" r="44" fill="${colors[1]}"><animate attributeName="cx" values="210;150;210" dur="11s" repeatCount="indefinite" /></circle>
  <circle cx="160" cy="230" r="36" fill="#f472b6"><animate attributeName="cy" values="230;180;230" dur="7s" repeatCount="indefinite" /></circle>
</g>
<g fill="none" stroke="#fafafa" stroke-opacity="0.15" filter="url(#mb-blur)">
  <circle cx="110" cy="140" r="60"><animate attributeName="r" values="60;70;60" dur="9s" repeatCount="indefinite" /></circle>
</g>
</svg>`;
}
