export interface ConcentricDotsOptions {
  color?: string;
  accentColor?: string;
  rings?: number;
  size?: number;
}

function ringPoints(cx: number, cy: number, radius: number, count: number): string {
  const points: string[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    points.push(`${(cx + Math.cos(angle) * radius).toFixed(1)},${(cy + Math.sin(angle) * radius).toFixed(1)}`);
  }
  return points.join(' ');
}

export function createConcentricDots(options: ConcentricDotsOptions = {}): string {
  const { color = '#52525b', accentColor = '#22d3ee', rings = 7, size = 600 } = options;
  const c = size / 2;
  const circles: string[] = [];

  for (let r = 1; r <= rings; r++) {
    const radius = (size * 0.055) * r;
    const count = Math.max(6, Math.round(radius * 0.45));
    const isAccent = r === Math.ceil(rings / 2);
    circles.push(
      `    <polygon points="${ringPoints(c, c, radius, count)}" fill="none" stroke="${isAccent ? accentColor : color}" stroke-width="${isAccent ? 4 : 3}" stroke-linecap="round" stroke-dasharray="0.1 ${((radius * 2 * Math.PI) / count).toFixed(1)}" opacity="${isAccent ? 1 : 0.7}" />`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${circles.join('\n')}
  <circle cx="${c}" cy="${c}" r="5" fill="${accentColor}" />
</svg>`;
}
