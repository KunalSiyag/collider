export interface GreatWaveOptions {
  size?: number;
  crests?: number;
  foam?: string;
  water?: string;
}

export function createGreatWave(options: GreatWaveOptions = {}): string {
  const { size = 720, crests = 5, foam = '#e4e4e7', water = '#27272a' } = options;
  const els: string[] = [];
  const steps = 80;

  for (let wv = 0; wv < crests; wv++) {
    const baseY = size * (0.45 + wv * 0.13);
    const amp = size * (0.05 + wv * 0.015);
    const phase = wv * 1.4;
    let d = `M0 ${size} L0 ${baseY.toFixed(1)}`;
    let claw: string[] = [];
    for (let s = 0; s <= steps; s++) {
      const x = (s / steps) * size;
      const y = baseY - Math.abs(Math.sin((s / steps) * Math.PI * 3 + phase)) * amp;
      d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
      if (s % 8 === 4 && Math.sin((s / steps) * Math.PI * 3 + phase) > 0.7) {
        claw.push(`      <path d="M${x.toFixed(1)} ${(y + 2).toFixed(1)} q6 -12 14 -10" fill="none" stroke="${foam}" stroke-width="1.6" stroke-linecap="round">
          <animate attributeName="opacity" values="0.9;0.3;0.9" dur="${(3 + wv).toFixed(1)}s" begin="${(s * 0.03).toFixed(2)}s" repeatCount="indefinite" />
        </path>`);
      }
    }
    d += ` L${size} ${size} Z`;
    els.push(`      <path d="${d}" fill="${water}" fill-opacity="${0.55 + wv * 0.09}" stroke="#3f3f46" stroke-width="1.2" />`);
    els.push(claw.join('\n'));
    void foam;
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <circle cx="${size * 0.72}" cy="${size * 0.18}" r="${size * 0.07}" fill="none" stroke="#fbbf24" stroke-width="3" />
${els.join('\n')}
</svg>`;
}
