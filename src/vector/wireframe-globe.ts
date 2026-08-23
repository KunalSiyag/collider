export interface WireframeGlobeOptions {
  size?: number;
  meridians?: number;
  parallels?: number;
  stroke?: string;
  accent?: string;
}

export function createWireframeGlobe(options: WireframeGlobeOptions = {}): string {
  const { size = 720, meridians = 8, parallels = 6, stroke = '#3f3f46', accent = '#22d3ee' } = options;
  const c = size / 2;
  const R = size * 0.4;
  const els: string[] = [];

  els.push(`      <circle cx="${c}" cy="${c}" r="${R}" fill="#10101a" stroke="${stroke}" stroke-width="1.6" />`);
  for (let i = 1; i < meridians; i++) {
    const rx = R * Math.cos((i / meridians) * Math.PI);
    if (rx < 2) continue;
    els.push(`      <ellipse cx="${c}" cy="${c}" rx="${rx.toFixed(1)}" ry="${R}" fill="none" stroke="${stroke}" stroke-width="1" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.4;0.8" dur="${(5 + i).toFixed(1)}s" repeatCount="indefinite" />
      </ellipse>`);
  }
  for (let i = 1; i < parallels; i++) {
    const y = -R + (i / parallels) * 2 * R;
    const ry = Math.sqrt(Math.max(0, R * R - y * y));
    const squash = 0.32;
    els.push(`      <path d="M${(c - ry).toFixed(1)} ${(c + y * (1 - squash * 0) ).toFixed(1)} A${ry.toFixed(1)} ${(ry * squash).toFixed(1)} 0 0 ${y > 0 ? 0 : 1} ${(c + ry).toFixed(1)} ${(c + y).toFixed(1)}" fill="none" stroke="#52525b" stroke-width="1" />`);
    void squash;
  }
  els.push(`      <circle cx="${(c + R * 0.45).toFixed(1)}" cy="${(c - R * 0.35).toFixed(1)}" r="4" fill="${accent}">
        <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
      </circle>`);

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
