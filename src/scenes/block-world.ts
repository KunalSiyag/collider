/**
 * Block World — voxel sandbox landscape
 * =====================================
 * A blocky, cube-built wilderness in the spirit of voxel sandbox games:
 * layered grass/dirt/stone terrain with ore veins, cubic trees, a shimmering
 * pond, square clouds and a little blocky pig. Original art — evokes the
 * genre's aesthetic without copying any game assets.
 *
 * All shapes are axis-aligned rects with `shape-rendering="crispEdges"`;
 * depth is faked with per-block top/left/right shading like a 2.5D voxel.
 *
 * MODIFY
 * ------
 *   - `BLOCK` is the world unit (default 24px). Change it to zoom the world.
 *   - Terrain is generated from a seeded heightmap — change `seed` for a
 *     different layout, or edit `terrainProfile` to bias hills/valleys.
 *   - Palette options: sky, grass, dirt, stone, water, leaves.
 */

export interface BlockWorldOptions {
  skyTop?: string;
  skyBottom?: string;
  grassColor?: string;
  dirtColor?: string;
  stoneColor?: string;
  waterColor?: string;
  leafColor?: string;
  /** World unit in px (default 24). */
  block?: number;
  seed?: number;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createBlockWorld(options: BlockWorldOptions = {}): string {
  const {
    skyTop = '#78a7ff',
    skyBottom = '#cfe4ff',
    grassColor = '#6fbf44',
    dirtColor = '#8a5a33',
    stoneColor = '#8a8a8a',
    waterColor = '#3f76e4',
    leafColor = '#3e8e41',
    block: B = 24,
    seed = 11,
  } = options;

  const rand = mulberry32(seed);
  const COLS = Math.ceil(1440 / B) + 1;
  const HORIZON = 15; // terrain rows below this many units of sky

  /* ---- Terrain heightmap -------------------------------------------------
   * Smooth random walk: each column steps up/down at most one block, which
   * is exactly how voxel terrain gets its gentle rolling feel. */
  const heights: number[] = [];
  let h = HORIZON - 2;
  for (let i = 0; i < COLS; i++) {
    h += Math.round(rand() * 2 - 1);
    // Gentle pull back toward the horizon keeps hills from running away.
    h += h < HORIZON - 4 ? 1 : h > HORIZON + 1 ? -1 : 0;
    heights.push(Math.max(HORIZON - 6, Math.min(HORIZON + 2, h)));
  }

  /* Shading helpers: top faces catch light, right faces fall to shadow —
   * the classic voxel look with three flat tones per material. */
  const shade = (hex: string, f: number) => {
    const n = parseInt(hex.slice(1), 16);
    const c = (v: number) =>
      Math.max(0, Math.min(255, Math.round(v * f)))
        .toString(16)
        .padStart(2, '0');
    return `#${c((n >> 16) & 255)}${c((n >> 8) & 255)}${c(n & 255)}`;
  };

  const cubeColumn = (col: number, topRow: number, rowsBelow: number) => {
    const x = col * B;
    const y = topRow * B;
    const grass = `<rect x="${x}" y="${y}" width="${B}" height="${B}" fill="${grassColor}"/>
      <rect x="${x}" y="${y}" width="${B}" height="${B * 0.28}" fill="${shade(grassColor, 1.18)}"/>
      <rect x="${x + B * 0.78}" y="${y}" width="${B * 0.22}" height="${B}" fill="${shade(grassColor, 0.82)}"/>`;
    let dirt = '';
    for (let r = 1; r <= rowsBelow; r++) {
      const dy = y + r * B;
      const speck =
        rand() > 0.72
          ? `<rect x="${x + Math.floor(rand() * (B - 5))}" y="${dy + Math.floor(rand() * (B - 5))}" width="4" height="4" fill="${shade(dirtColor, 0.75)}"/>`
          : '';
      dirt += `<rect x="${x}" y="${dy}" width="${B}" height="${B}" fill="${dirtColor}"/>${speck}`;
    }
    return grass + dirt;
  };

  const stoneBase = (() => {
    const top = (HORIZON + 3) * B;
    let out = `<rect x="0" y="${top}" width="1440" height="${720 - top}" fill="${stoneColor}"/>`;
    // Sparse ore veins: coal + the occasional glinting diamond.
    for (let i = 0; i < 26; i++) {
      const x = rand() * 1440;
      const y = top + rand() * (720 - top - 8);
      const kind = rand();
      const fill = kind > 0.85 ? '#4fd6d6' : kind > 0.45 ? '#3a3a3a' : '#6e6e6e';
      out += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${6 + Math.floor(rand() * 6)}" height="${5 + Math.floor(rand() * 5)}" fill="${fill}">${
        kind > 0.85
          ? '<animate attributeName="opacity" values="0.6;1;0.6" dur="' + (2 + rand() * 2).toFixed(1) + 's" repeatCount="indefinite"/>'
          : ''
      }</rect>`;
    }
    return out;
  })();

  /* ---- Trees: trunk column + 2x2 leaf cubes with a lighter crown -------- */
  const tree = (col: number, groundRow: number) => {
    const x = col * B;
    const top = groundRow * B;
    const th = 3 * B;
    const trunk = `<rect x="${x + B * 0.25}" y="${top - th}" width="${B * 0.5}" height="${th}" fill="#6b4423"/>
      <rect x="${x + B * 0.25}" y="${top - th}" width="${B * 0.18}" height="${th}" fill="#7d5230"/>`;
    const lx = x - B * 0.6;
    const ly = top - th - B * 1.7;
    const leaves = `<g>
      <animateTransform attributeName="transform" type="translate" values="0 0;0 -1.5;0 0" dur="${(3 + rand() * 2).toFixed(1)}s" repeatCount="indefinite"/>
      <rect x="${lx}" y="${ly}" width="${B * 2.2}" height="${B * 1.7}" fill="${leafColor}"/>
      <rect x="${lx}" y="${ly}" width="${B * 2.2}" height="${B * 0.3}" fill="${shade(leafColor, 1.2)}"/>
      <rect x="${lx + B * 0.4}" y="${ly - B * 0.7}" width="${B * 1.4}" height="${B * 0.8}" fill="${shade(leafColor, 1.08)}"/>
      <rect x="${lx + B * 1.9}" y="${ly}" width="${B * 0.3}" height="${B * 1.7}" fill="${shade(leafColor, 0.8)}"/>
    </g>`;
    return trunk + leaves;
  };

  /* ---- Pond: carve a dip by drawing water where the heightmap dips ------- */
  const pond = (() => {
    const start = 30;
    const width = 9;
    let out = '';
    for (let i = start; i < start + width; i++) {
      const surface = (HORIZON + 1) * B;
      out += `<rect x="${i * B}" y="${surface}" width="${B}" height="${B * 1.2}" fill="${waterColor}" opacity="0.92">
        <animate attributeName="opacity" values="0.82;0.96;0.82" dur="${(3 + (i % 4)).toFixed(1)}s" begin="${-(i * 0.3).toFixed(1)}s" repeatCount="indefinite"/>
      </rect>
      <rect x="${i * B}" y="${surface}" width="${B}" height="3" fill="${shade(waterColor, 1.35)}"/>`;
    }
    return out;
  })();

  /* ---- Blocky pig: three pink cubes + snout. Anchored to the heightmap so
   * it stands on the terrain regardless of the seed. ---- */
  const pig = (() => {
    const col = 19;
    const x = col * B;
    const y = (heights[col] - 1) * B;
    return `<g transform="translate(${x} ${y})">
      <animateTransform attributeName="transform" type="translate" values="${x} ${y};${x + B * 1.2} ${y};${x} ${y}" dur="14s" repeatCount="indefinite"/>
      <rect x="0" y="${B * 0.4}" width="${B * 1.6}" height="${B * 0.9}" fill="#eda3a3"/>
      <rect x="0" y="${B * 0.4}" width="${B * 1.6}" height="${B * 0.2}" fill="#f4bcbc"/>
      <rect x="${B * 1.3}" y="${B * 0.1}" width="${B * 0.7}" height="${B * 0.8}" fill="#eda3a3"/>
      <rect x="${B * 1.75}" y="${B * 0.32}" width="${B * 0.25}" height="${B * 0.3}" fill="#d97b7b"/>
      <rect x="${B * 1.42}" y="${B * 0.28}" width="${B * 0.14}" height="${B * 0.14}" fill="#2b2b2b"/>
      <rect x="${B * 0.15}" y="${B * 1.3}" width="${B * 0.22}" height="${B * 0.35}" fill="#d97b7b"/>
      <rect x="${B * 1.2}" y="${B * 1.3}" width="${B * 0.22}" height="${B * 0.35}" fill="#d97b7b"/>
    </g>`;
  })();

  const squareCloud = (x: number, y: number, s: number, dur: number, drift: number, begin: number) =>
    `<g transform="translate(${x} ${y}) scale(${s})" fill="#ffffff" opacity="0.92">
      <animateTransform attributeName="transform" type="translate" values="${x} ${y};${x + drift} ${y};${x} ${y}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
      <rect x="0" y="0" width="84" height="18"/>
      <rect x="12" y="-12" width="48" height="14"/>
      <rect x="-10" y="6" width="20" height="10"/>
    </g>`;

  /* ---- Flowers: tiny crosses in grass tones ------------------------------ */
  let flowers = '';
  for (let i = 0; i < 22; i++) {
    const col = Math.floor(rand() * COLS);
    const x = col * B + rand() * B * 0.6;
    const y = heights[col] * B - 6 + rand() * B * 0.4;
    const tone = rand() > 0.5 ? '#e33e3e' : '#f2d43d';
    flowers += `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)})">
      <rect x="-1" y="0" width="2" height="6" fill="#2f6b2f"/>
      <rect x="-3" y="-4" width="6" height="2" fill="${tone}"/>
      <rect x="-1" y="-6" width="2" height="6" fill="${tone}"/>
    </g>`;
  }

  return `<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" shape-rendering="crispEdges">
  <defs>
    <linearGradient id="bw-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyTop}"/>
      <stop offset="1" stop-color="${skyBottom}"/>
    </linearGradient>
  </defs>

  <rect width="1440" height="720" fill="url(#bw-sky)"/>

  <!-- square sun -->
  <rect x="1150" y="70" width="64" height="64" fill="#fff6b0"/>
  <rect x="1150" y="70" width="64" height="14" fill="#fffde0"/>

  ${squareCloud(120, 90, 1.3, 46, 70, -8)}
  ${squareCloud(600, 55, 1, 58, -80, -18)}
  ${squareCloud(1020, 130, 0.85, 50, 55, -30)}

  <!-- terrain -->
  ${heights.map((ht, col) => cubeColumn(col, ht, HORIZON + 3 - ht + 4)).join('')}
  ${stoneBase}
  ${pond}

  <!-- trees on selected high columns -->
  ${tree(6, heights[6])}
  ${tree(13, heights[13])}
  ${tree(24, heights[24])}
  ${tree(38, heights[38])}
  ${tree(46, heights[46])}
  ${tree(55, heights[55])}

  ${pig}
  ${flowers}
</svg>`;
}
