export interface SpiralDotsOptions {
  color?: string;
  accentColor?: string;
  count?: number;
  size?: number;
}

export function createSpiralDots(options: SpiralDotsOptions = {}): string {
  const { color = '#a78bfa', accentColor = '#22d3ee', count = 220, size = 640 } = options;
  const c = size / 2;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const dots: string[] = [];

  for (let i = 0; i < count; i++) {
    const t = i / count;
    const r = Math.sqrt(t) * (size * 0.46);
    const theta = i * goldenAngle;
    const x = c + Math.cos(theta) * r;
    const y = c + Math.sin(theta) * r;
    const radius = 1.2 + t * 3.4;
    const isAccent = i % 17 === 8;
    dots.push(
      `    <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${radius.toFixed(2)}" fill="${isAccent ? accentColor : color}" opacity="${(0.35 + t * 0.65).toFixed(2)}" />`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${dots.join('\n')}
</svg>`;
}
