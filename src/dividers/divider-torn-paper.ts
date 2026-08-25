/** Torn Paper — a ragged torn-edge separator with a shadowed underside. */
export interface TornPaperOptions {
  topColor?: string;
  bottomColor?: string;
  seed?: number;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createTornPaper(options: TornPaperOptions = {}): string {
  const { topColor = '#18181b', bottomColor = '#27272a', seed = 7 } = options;
  const rand = mulberry32(seed);

  // Ragged edge: irregular steps with the occasional deep tear.
  let edge = 'M0 40';
  let x = 0;
  while (x < 1440) {
    const step = 18 + rand() * 40;
    x = Math.min(1440, x + step);
    const dip = rand() > 0.88 ? 14 + rand() * 12 : rand() * 9;
    edge += ` L${x.toFixed(0)} ${(26 + dip).toFixed(1)} L${(x - step * 0.4).toFixed(0)} ${(34 + rand() * 6).toFixed(1)}`;
  }
  edge += ' L1440 40 L1440 80 L0 80 Z';

  return `<svg viewBox="0 0 1440 80" preserveAspectRatio="none" width="100%" height="80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="${edge}" fill="${bottomColor}" opacity="0.6" transform="translate(3 4)"/>
  <path d="${edge}" fill="${topColor}"/>
</svg>`;
}
