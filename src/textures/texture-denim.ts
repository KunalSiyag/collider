export interface TextureDenimOptions {
  color?: string;
}

export function createTextureDenim(options: TextureDenimOptions = {}): string {
  const { color = '#1e40af' } = options;
  const lines: string[] = [];
  for (let i = -20; i < 30; i++) {
    for (let j = 0; j < 3; j++) {
      lines.push(
        `<line x1="${i * 22 + j * 5}" y1="0" x2="${i * 22 + j * 5 + 300}" y2="600" stroke="#3b82f6" stroke-width="${j === 0 ? 2.4 : 1.2}" opacity="${j === 0 ? 0.55 : 0.28}"/>`,
      );
      lines.push(
        `<line x1="${i * 22 + j * 5}" y1="0" x2="${i * 22 + j * 5 - 300}" y2="600" stroke="#1e3a8a" stroke-width="1.6" opacity="0.4"/>`,
      );
    }
  }
  return `<svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="480" height="480" fill="${color}"/>
${lines.join('\n')}
</svg>`;
}
