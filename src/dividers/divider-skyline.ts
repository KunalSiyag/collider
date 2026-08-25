/** Skyline Divider — a city silhouette strip with twinkling window lights. */
export interface SkylineDividerOptions {
  silhouetteColor?: string;
  windowColor?: string;
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

export function createSkylineDivider(options: SkylineDividerOptions = {}): string {
  const { silhouetteColor = '#18181b', windowColor = '#fbbf24', seed = 11 } = options;
  const rand = mulberry32(seed);

  let buildings = '';
  let windows = '';
  let x = 0;
  while (x < 1440) {
    const w = 40 + rand() * 70;
    const h = 30 + rand() * 70;
    buildings += `<rect x="${x.toFixed(0)}" y="${(110 - h).toFixed(1)}" width="${w.toFixed(0)}" height="${h.toFixed(1)}"/>`;
    // Sparse lit windows.
    const cols = Math.floor(w / 16);
    const rows = Math.floor(h / 18);
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if (rand() > 0.18) continue;
        const wx = x + 6 + c * 16;
        const wy = 110 - h + 8 + r * 18;
        windows += `<rect x="${wx.toFixed(0)}" y="${wy.toFixed(0)}" width="5" height="7" fill="${windowColor}" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.2;0.9" dur="${(2.6 + rand() * 4).toFixed(1)}s" begin="${(-rand() * 4).toFixed(1)}s" repeatCount="indefinite"/>
        </rect>`;
      }
    }
    x += w + rand() * 14;
  }

  return `<svg viewBox="0 0 1440 110" preserveAspectRatio="none" width="100%" height="110" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g fill="${silhouetteColor}">${buildings}</g>
  ${windows}
</svg>`;
}
