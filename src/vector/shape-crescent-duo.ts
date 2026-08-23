export interface ShapeCrescentDuoOptions {
  colors?: string[];
  size?: number;
}

export function createShapeCrescentDuo(options: ShapeCrescentDuoOptions = {}): string {
  const { colors = ['#f472b6', '#22d3ee'], size = 320 } = options;
  const c = size / 2;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <mask id="cd-cut-a"><rect width="${size}" height="${size}" fill="#fff" /><circle cx="${c - 26}" cy="${c - 20}" r="86" fill="#000" /></mask>
    <mask id="cd-cut-b"><rect width="${size}" height="${size}" fill="#fff" /><circle cx="${c + 30}" cy="${c + 24}" r="78" fill="#000" /></mask>
  </defs>
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <circle cx="${c + 14}" cy="${c + 10}" r="92" fill="${colors[0]}" mask="url(#cd-cut-a)">
    <animateTransform attributeName="transform" type="rotate" from="-8 ${c} ${c}" to="8 ${c} ${c}" to="0 ${c} ${c}" values="-8 ${c} ${c};8 ${c} ${c};-8 ${c} ${c}" dur="8s" repeatCount="indefinite" />
  </circle>
  <circle cx="${c - 18}" cy="${c - 14}" r="84" fill="${colors[1]}" opacity="0.85" mask="url(#cd-cut-b)">
    <animateTransform attributeName="transform" type="rotate" values="6 ${c} ${c};-6 ${c} ${c};6 ${c} ${c}" dur="10s" repeatCount="indefinite" />
  </circle>
</svg>`;
}
