export interface FernFrondsOptions {
  size?: number;
  pairs?: number;
  stroke?: string;
  accent?: string;
}

export function createFernFronds(options: FernFrondsOptions = {}): string {
  const { size = 720, stroke = '#3f3f46', accent = '#a78bfa' } = options;
  const baseX = size / 2;
  const baseY = size * 0.95;
  const tipY = size * 0.08;
  const paths: string[] = [];
  const steps = 44;

  for (let p = 0; p <= steps; p++) {
    const t = p / steps;
    const y = baseY + (tipY - baseY) * t;
    const stemX = baseX + Math.sin(t * 2.2) * size * 0.03;
    if (p % 2 === 0 && p > 1 && p < steps - 3) {
      const len = size * 0.13 * Math.sin(Math.PI * t) + size * 0.015;
      const curve = len * 0.55;
      paths.push(`      <path d="M${stemX.toFixed(1)} ${y.toFixed(1)} Q${(stemX + curve).toFixed(1)} ${(y + len * 0.35).toFixed(1)} ${(stemX + len).toFixed(1)} ${(y + len * 0.8).toFixed(1)}" />`);
      paths.push(`      <path d="M${stemX.toFixed(1)} ${y.toFixed(1)} Q${(stemX - curve).toFixed(1)} ${(y + len * 0.35).toFixed(1)} ${(stemX - len).toFixed(1)} ${(y + len * 0.8).toFixed(1)}" />`);
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M${baseX} ${baseY} Q${(baseX + size * 0.04).toFixed(1)} ${(baseY + tipY) / 2} ${baseX} ${tipY}" fill="none" stroke="${accent}" stroke-width="2">
    <animate attributeName="stroke-opacity" values="1;0.5;1" dur="7s" repeatCount="indefinite" />
  </path>
  <g fill="none" stroke="${stroke}" stroke-width="1.2" stroke-linecap="round">
${paths.join('\n')}
  </g>
</svg>`;
}
