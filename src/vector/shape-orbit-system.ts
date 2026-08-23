export interface ShapeOrbitSystemOptions {
  colors?: string[];
  size?: number;
}

export function createShapeOrbitSystem(options: ShapeOrbitSystemOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6'], size = 320 } = options;
  const c = size / 2;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="${c}" cy="${c}" r="34" fill="#8b5cf6">
    <animate attributeName="r" values="34;38;34" dur="4s" repeatCount="indefinite" />
  </circle>
  <ellipse cx="${c}" cy="${c}" rx="105" ry="105" fill="none" stroke="#3f3f46" stroke-width="2" />
  <circle r="10" fill="${colors[1]}">
    <animateTransform attributeName="transform" type="rotate" from="0 ${c} ${c}" to="360 ${c} ${c}" dur="9s" repeatCount="indefinite" />
    <animate attributeName="cx" values="${c};${c + 105};${c}" dur="0.01s" fill="freeze" />
    <animate attributeName="cy" values="${c};${c};${c}" dur="0.01s" fill="freeze" />
  </circle>
  <g>
    <animateTransform attributeName="transform" type="rotate" from="360 ${c} ${c}" to="0 ${c} ${c}" dur="14s" repeatCount="indefinite" />
    <circle cx="${c - 140}" cy="${c}" r="7" fill="${colors[2]}" />
    <ellipse cx="${c}" cy="${c}" rx="140" ry="52" fill="none" stroke="#27272a" stroke-width="2" transform="rotate(-24 ${c} ${c})" />
  </g>
</svg>`;
}
