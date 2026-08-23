export interface TextureFeathersOptions {
  vane?: string;
  quill?: string;
}

export function createTextureFeathers(options: TextureFeathersOptions = {}): string {
  const { vane = '#3b5f8a', quill = '#c8d8ea' } = options;
  const rows: string[] = [];
  for (let r = -1; r < 9; r++) {
    for (let c = -1; c < 7; c++) {
      const x = c * 52 + ((r % 2) * 26);
      const y = r * 42;
      rows.push(`<g transform="translate(${x} ${y}) rotate(-12)">
        <path d="M0,40 Q-16,18 -10,-2 Q-4,-20 0,-26 Q4,-20 10,-2 Q16,18 0,40 Z" fill="${vane}" stroke="#22394f" stroke-width="1"/>
        <path d="M0,38 L0,-24" stroke="${quill}" stroke-width="2" opacity="0.85"/>
        <path d="M0,10 L-9,-6 M0,14 L9,-2 M0,24 L-11,10 M0,26 L11,13" stroke="${quill}" stroke-width="0.8" opacity="0.4"/>
      </g>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#101c29"/>
  ${rows.join('\n  ')}
</svg>`;
}
