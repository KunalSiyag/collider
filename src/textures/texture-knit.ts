export interface TextureKnitOptions {
  color?: string;
}

export function createTextureKnit(options: TextureKnitOptions = {}): string {
  const { color = '#be123c' } = options;
  const stitches: string[] = [];
  const w = 40;
  const h = 34;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 12; col++) {
      const x = col * w + (row % 2 ? w / 2 : 0);
      const y = row * (h - 6);
      const light = mix(color, 0.22);
      const darkShade = mix(color, -0.3);
      stitches.push(
        `    <path d="M ${x} ${y + h} C ${x - 14} ${y + h * 0.5}, ${x - 10} ${y}, ${x + w / 2 - 8} ${y + 4} C ${x + w - 2} ${y + 7}, ${x + w + 12} ${y + h * 0.55}, ${x + w} ${y + h}" fill="none" stroke="${light}" stroke-width="9" stroke-linecap="round" opacity="0.85" />
    <path d="M ${x + 4} ${y + h - 2} C ${x - 8} ${y + h * 0.5}, ${x - 6} ${y + 5}, ${x + w / 2 - 8} ${y + 9}" fill="none" stroke="${darkShade}" stroke-width="3" stroke-linecap="round" opacity="0.6" />`,
      );
    }
  }
  function mix(hex: string, amount: number): string {
    const n = parseInt(hex.slice(1), 16);
    const adj = (v: number) =>
      Math.min(255, Math.max(0, amount >= 0 ? v + (255 - v) * amount : v * (1 + amount)));
    return `#${[adj((n >> 16) & 255), adj((n >> 8) & 255), adj(n & 255)]
      .map((v) => Math.round(v).toString(16).padStart(2, '0'))
      .join('')}`;
  }
  return `<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="480" height="300" fill="${mix(color, -0.45)}" />
${stitches.join('\n')}
</svg>`;
}
