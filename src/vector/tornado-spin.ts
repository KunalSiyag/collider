export interface TornadoSpinOptions {
  size?: number;
  bands?: number;
  base?: string;
  accent?: string;
}

export function createTornadoSpin(options: TornadoSpinOptions = {}): string {
  const { size = 720, bands = 14, base = '#27272a', accent = '#22d3ee' } = options;
  const topY = size * 0.1;
  const botY = size * 0.88;
  const els: string[] = [];

  for (let i = 0; i < bands; i++) {
    const t = i / (bands - 1);
    const y = topY + t * (botY - topY);
    const w = size * (0.42 - t * 0.34);
    const cxp = size / 2 + Math.sin(t * Math.PI * 1.5) * size * 0.06;
    const isAccent = i === Math.floor(bands * 0.6);
    els.push(`      <ellipse cx="${cxp.toFixed(1)}" cy="${y.toFixed(1)}" rx="${w.toFixed(1)}" ry="${(size * 0.02).toFixed(1)}" fill="${isAccent ? accent : base}" fill-opacity="${isAccent ? 0.4 : 0.9}" stroke="#3f3f46" stroke-width="1">
        <animateTransform attributeName="transform" type="translate" values="${(-w * 0.12).toFixed(1)} 0; ${(w * 0.12).toFixed(1)} 0; ${(-w * 0.12).toFixed(1)} 0" dur="${(2.4 + t * 3).toFixed(1)}s" repeatCount="indefinite" />
      </ellipse>`);
    if (i % 3 === 1) {
      for (let d = 0; d < 3; d++) {
        els.push(`      <circle cx="${(cxp - w * 0.7 + d * w * 0.35).toFixed(1)}" cy="${y.toFixed(1)}" r="2.4" fill="#52525b">
          <animate attributeName="opacity" values="1;0;1" dur="1.8s" begin="${(d * 0.4).toFixed(1)}s" repeatCount="indefinite" />
        </circle>`);
      }
    }
  }
  els.push(`      <path d="M${size * 0.2} ${botY} q${size * 0.08} ${-size * 0.03} ${size * 0.16} 0 t${size * 0.16} 0 t${size * 0.16} 0 t${size * 0.16} 0" fill="none" stroke="#3f3f46" stroke-width="2" />`);

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
