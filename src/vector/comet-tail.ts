export interface CometTailOptions {
  size?: number;
  segments?: number;
  head?: string;
  tail?: string;
}

export function createCometTail(options: CometTailOptions = {}): string {
  const { size = 720, segments = 26, head = '#fbbf24', tail = '#67e8f9' } = options;
  const els: string[] = [];
  const startX = size * 0.82;
  const startY = size * 0.18;
  const endX = size * 0.1;
  const endY = size * 0.78;

  for (let i = 0; i < segments; i++) {
    const t = i / (segments - 1);
    const x = startX + (endX - startX) * t + Math.sin(t * 5) * 14 * t;
    const y = startY + (endY - startY) * t + Math.cos(t * 4) * 10 * t;
    const r = (1 - t) * 16 + 1.2;
    els.push(
      `      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${i === 0 ? head : tail}" opacity="${(1 - t) * 0.85}">${i === 0 ? '\n        <animate attributeName="opacity" values="1;0.55;1" dur="3s" repeatCount="indefinite" />\n      ' : ''}</circle>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <g>
${els.join('\n')}
    <animateTransform attributeName="transform" type="translate" values="0 0; -14 10; 0 0" dur="9s" repeatCount="indefinite" />
  </g>
</svg>`;
}
