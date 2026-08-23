export interface TextureHoneycombOptions {
  wax?: string;
  wall?: string;
}

export function createTextureHoneycomb(options: TextureHoneycombOptions = {}): string {
  const { wax = '#e8a832', wall = '#7a5210' } = options;
  const hexes: string[] = [];
  const r = 22;
  const dx = r * Math.sqrt(3);
  for (let row = -1; row < 10; row++) {
    for (let col = -1; col < 9; col++) {
      const cx = col * dx + ((row % 2) * dx) / 2 + dx / 2;
      const cy = row * (r * 1.5) + r;
      let pts = '';
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 180) * (60 * i + 30);
        pts += `${(cx + r * 0.92 * Math.cos(a)).toFixed(1)},${(cy + r * 0.92 * Math.sin(a)).toFixed(1)} `;
      }
      const depth = 0.75 + ((row * 7 + col * 13) % 5) * 0.05;
      hexes.push(`<polygon points="${pts}" fill="${wax}" opacity="${depth.toFixed(2)}" stroke="${wall}" stroke-width="3"/>`);
      hexes.push(`<polygon points="${pts}" fill="none" stroke="#ffe9b0" stroke-width="1" transform="translate(0 -1)" opacity="0.4"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#5c3d08"/>
  ${hexes.join('\n  ')}
</svg>`;
}
