export interface OpTunnelOptions {
  size?: number;
  layers?: number;
  stroke?: string;
  accent?: string;
}

export function createOpTunnel(options: OpTunnelOptions = {}): string {
  const { size = 720, layers = 16, stroke = '#3f3f46', accent = '#22d3ee' } = options;
  const frames: string[] = [];
  const c = size / 2;

  for (let i = layers; i >= 1; i--) {
    const t = i / layers;
    const half = t * t * c * 0.92;
    const jitter = (i % 2 === 0 ? 4 : -4) * (1 - t);
    const color = i % 4 === 0 ? accent : stroke;
    const sw = 1 + (1 - t) * 2;
    frames.push(
      `    <rect x="${(c - half + jitter).toFixed(1)}" y="${(c - half - jitter).toFixed(1)}" width="${(half * 2).toFixed(1)}" height="${(half * 2).toFixed(1)}" fill="none" stroke="${color}" stroke-width="${sw.toFixed(1)}" />`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${frames.join('\n')}
  <circle cx="${c}" cy="${c}" r="5" fill="${accent}">
    <animate attributeName="r" values="5;9;5" dur="3s" repeatCount="indefinite" />
  </circle>
</svg>`;
}
