/** Wave Stack — layered offset wave bands breathing out of phase. */
export interface WaveStackOptions {
  colors?: string[];
  background?: string;
  speed?: number;
}

export function createWaveStack(options: WaveStackOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#fbbf24'], background = 'transparent', speed = 1 } = options;
  const bands = colors
    .map((tone, i) => {
      const y = 150 + i * 105;
      const dur = (7 + i * 1.6) / speed;
      const begin = (-i * 1.3).toFixed(2);
      return `<g opacity="${(0.92 - i * 0.08).toFixed(2)}">
        <path d="M-100 ${y} C 160 ${y - 56} 420 ${y + 48} 720 ${y} S 1300 ${y - 50} 1540 ${y} L1540 720 L-100 720 Z" fill="${tone}"/>
        <animateTransform attributeName="transform" type="translate" values="-60 0;60 0;-60 0" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
      </g>`;
    })
    .join('');
  return `<svg viewBox="0 0 1440 720" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="1440" height="720" fill="${background}"/>
  ${bands}
</svg>`;
}
