export interface RadialRaysOptions {
  color?: string;
  rays?: number;
  size?: number;
}

export function createRadialRays(options: RadialRaysOptions = {}): string {
  const { color = '#8b5cf6', rays = 48, size = 800 } = options;
  const center = size / 2;
  const lines: string[] = [];

  for (let i = 0; i < rays; i++) {
    const angle = (i / rays) * Math.PI * 2 - Math.PI / 2;
    const innerRadius = size * 0.16;
    const outerRadius = size * (0.42 + (i % 4 === 0 ? 0.08 : 0));
    const x1 = center + Math.cos(angle) * innerRadius;
    const y1 = center + Math.sin(angle) * innerRadius;
    const x2 = center + Math.cos(angle) * outerRadius;
    const y2 = center + Math.sin(angle) * outerRadius;
    const opacity = i % 4 === 0 ? 0.9 : 0.35;
    lines.push(
      `    <line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke-width="${i % 4 === 0 ? 2 : 1}" opacity="${opacity}" />`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g stroke="${color}" stroke-linecap="round">
${lines.join('\n')}
  </g>
  <circle cx="${center}" cy="${center}" r="${(size * 0.05).toFixed(1)}" fill="${color}" />
</svg>`;
}
