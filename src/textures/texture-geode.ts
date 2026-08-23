export interface TextureGeodeOptions {
  outer?: string;
  crystal?: string;
}

export function createTextureGeode(options: TextureGeodeOptions = {}): string {
  const { outer = '#5a4a3c', crystal = '#8ab8d8' } = options;
  const rings: string[] = [];
  const cx = 160;
  const cy = 160;
  for (let i = 9; i >= 0; i--) {
    const r = 20 + i * 15;
    const wob = (i * 37) % 11;
    let d = '';
    for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.25) {
      const rr = r + Math.sin(a * (3 + (i % 3)) + i) * wob;
      d += `${a === 0 ? 'M' : 'L'}${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)} `;
    }
    const tone = ['#6b5847', '#7d6852', '#8d7a60', '#9a8870', '#7a8a94'][i % 5];
    rings.push(`<path d="${d}Z" fill="${i === 0 ? '#241f19' : tone}" stroke="#3a3128" stroke-width="2"/>`);
    if (i < 4) rings.push(`<path d="${d}Z" fill="${crystal}" opacity="${(0.12 * (5 - i)).toFixed(2)}"/>`);
  }
  const spikes: string[] = [];
  for (let s = 0; s < 26; s++) {
    const a = (s / 26) * Math.PI * 2 + 0.13;
    const x = cx + Math.cos(a) * 22;
    const y = cy + Math.sin(a) * 22;
    spikes.push(`<polygon points="${x.toFixed(1)},${y.toFixed(1)} ${(cx + Math.cos(a + 0.09) * (34 + (s % 4) * 10)).toFixed(1)},${(cy + Math.sin(a + 0.09) * (34 + (s % 4) * 10)).toFixed(1)} ${(cx + Math.cos(a - 0.05) * 30).toFixed(1)},${(cy + Math.sin(a - 0.05) * 30).toFixed(1)}" fill="${crystal}" opacity="0.75"/>`);
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="${outer}"/>
  ${rings.join('\n  ')}
  ${spikes.join('\n  ')}
</svg>`;
}
