export interface HalftoneWaveOptions {
  size?: number;
  step?: number;
  stroke?: string;
  accent?: string;
}

export function createHalftoneWave(options: HalftoneWaveOptions = {}): string {
  const { size = 720, step = 24, stroke = '#3f3f46', accent = '#f472b6' } = options;
  const dots: string[] = [];
  const maxR = step * 0.52;

  for (let row = 0; row * step + step / 2 < size; row++) {
    for (let col = 0; col * step + step / 2 < size; col++) {
      const x = col * step + step / 2;
      const y = row * step + step / 2;
      const v = Math.sin(x * 0.017) + Math.sin(y * 0.023 + x * 0.008);
      const r = maxR * (v + 2) / 4;
      const isAccent = r > maxR * 0.88;
      dots.push(
        `    <circle cx="${x}" cy="${y}" r="${Math.max(0.4, r).toFixed(2)}" fill="${isAccent ? accent : stroke}" />`,
      );
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${dots.join('\n')}
</svg>`;
}
