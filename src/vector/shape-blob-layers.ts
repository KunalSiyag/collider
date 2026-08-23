export interface ShapeBlobLayersOptions {
  colors?: string[];
  size?: number;
}

export function createShapeBlobLayers(options: ShapeBlobLayersOptions = {}): string {
  const { colors = ['#8b5cf6', '#a78bfa', '#22d3ee', '#f472b6'], size = 320 } = options;
  const blobs: string[] = [];
  const proto =
    'M160 52 C 218 52 262 92 262 148 C 262 206 232 268 162 268 C 92 268 58 214 58 154 C 58 96 102 52 160 52 Z';

  for (let i = 0; i < 4; i++) {
    const s = 1 - i * 0.17;
    const dy = i * 12;
    blobs.push(
      `  <path d="${proto}" fill="${colors[i]}" transform="translate(${(160 * (1 - s)).toFixed(1)} ${(dy + 160 * (1 - s)).toFixed(1)}) scale(${s.toFixed(2)})" opacity="${(0.95 - i * 0.08).toFixed(2)}"><animateTransform attributeName="transform" type="translate" values="${(160 * (1 - s)).toFixed(1)} ${(dy + 160 * (1 - s)).toFixed(1)};${(160 * (1 - s)).toFixed(1)} ${(dy - 4 + 160 * (1 - s)).toFixed(1)};${(160 * (1 - s)).toFixed(1)} ${(dy + 160 * (1 - s)).toFixed(1)}" dur="${(5 + i).toFixed(0)}s" repeatCount="indefinite" additive="sum" /></path>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#18181b" />
${blobs.join('\n')}
</svg>`;
}
