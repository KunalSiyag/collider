export interface PetalBloomOptions {
  size?: number;
  petals?: number;
  stroke?: string;
  accent?: string;
}

export function createPetalBloom(options: PetalBloomOptions = {}): string {
  const { size = 720, petals = 12, stroke = '#3f3f46', accent = '#a78bfa' } = options;
  const c = size / 2;
  const R = size * 0.4;
  const els: string[] = [];

  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * Math.PI * 2;
    const tipX = c + Math.cos(a) * R;
    const tipY = c + Math.sin(a) * R;
    const ctrlA = a - Math.PI / petals * 1.6;
    const ctrlB = a + Math.PI / petals * 1.6;
    const color = i % 4 === 1 ? accent : stroke;
    els.push(`      <path d="M${c} ${c} Q${(c + Math.cos(ctrlA) * R * 0.9).toFixed(1)} ${(c + Math.sin(ctrlA) * R * 0.9).toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)} Q${(c + Math.cos(ctrlB) * R * 0.9).toFixed(1)} ${(c + Math.sin(ctrlB) * R * 0.9).toFixed(1)} ${c} ${c} Z" fill="${color === accent ? accent : 'none'}" fill-opacity="${color === accent ? 0.18 : 0}" stroke="${color}" stroke-width="1.3">
        <animateTransform attributeName="transform" type="rotate" values="-3 ${c} ${c}; 3 ${c} ${c}; -3 ${c} ${c}" dur="${(8 + (i % 5)).toFixed(0)}s" repeatCount="indefinite" />
      </path>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${els.join('\n')}
  <circle cx="${c}" cy="${c}" r="${size * 0.05}" fill="#0b0b10" stroke="${accent}" stroke-width="2" />
</svg>`;
}
