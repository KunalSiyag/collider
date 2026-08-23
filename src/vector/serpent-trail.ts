export interface SerpentTrailOptions {
  size?: number;
  coils?: number;
  stroke?: string;
  accent?: string;
}

export function createSerpentTrail(options: SerpentTrailOptions = {}): string {
  const { size = 720, coils = 5, stroke = '#3f3f46', accent = '#22d3ee' } = options;
  const steps = 160;
  const pts: string[] = [];
  const head: [number, number] = [0, 0];

  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    const y = size * 0.12 + t * size * 0.76;
    const x = size / 2 + Math.sin(t * Math.PI * 2 * coils) * size * 0.32;
    if (s === steps) { head[0] = x; head[1] = y; }
    pts.push(`${s === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <path d="M${(head[0]).toFixed(1)} ${(head[1] - 16).toFixed(1)} l14 8 l-14 8 Z" fill="${accent}">
    <animateTransform attributeName="transform" type="rotate" values="-6;6;-6" dur="3s" repeatCount="indefinite" />
  </path>
  <path d="${pts.join(' ')}" fill="none" stroke="${stroke}" stroke-width="10" stroke-linecap="round" opacity="0.9" />
  <path d="${pts.join(' ')}" fill="none" stroke="#18181b" stroke-width="4" stroke-dasharray="10 14">
    <animate attributeName="stroke-dashoffset" from="0" to="-96" dur="4s" repeatCount="indefinite" />
  </path>
</svg>`;
}
