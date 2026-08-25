/** Volume Wave — speaker bars pulsing like an audio level meter. */
export interface VolumeWaveOptions {
  color?: string;
  size?: number;
  bars?: number;
}

export function createVolumeWave(options: VolumeWaveOptions = {}): string {
  const { color = '#f472b6', size = 110, bars = 5 } = options;
  const barW = 10;
  const gap = 8;
  const w = bars * barW + (bars - 1) * gap;

  const els = Array.from({ length: bars }, (_, i) => {
    const mid = (bars - 1) / 2;
    const scale = 1 - Math.abs(i - mid) * 0.16;
    const dur = (0.7 + (i % 3) * 0.22).toFixed(2);
    const begin = (-(i * 0.13)).toFixed(2);
    const x = i * (barW + gap);
    return `<rect x="${x}" y="${(54 - 22 * scale).toFixed(1)}" width="${barW}" height="${(44 * scale).toFixed(1)}" rx="5" fill="${color}">
      <animateTransform attributeName="transform" type="scale" values="1 ${scale};1 ${(scale + 0.5).toFixed(2)};1 ${scale}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite" additive="replace"/>
    </rect>`;
  }).join('');

  return `<svg viewBox="0 0 ${w} 108" width="${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g transform="translate(0 0)">${els}</g>
</svg>`;
}
