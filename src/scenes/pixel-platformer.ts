/**
 * Pixel Platformer — retro side-scrolling level
 * =============================================
 * A chunky 16-bit style platformer world: question blocks, brick rows,
 * warp pipes, spinning coins, drifting pixel clouds and a jumping hero in
 * red cap and overalls. Original pixel art — no game assets are copied,
 * only the beloved *genre* is evoked.
 *
 * Every rect uses `shape-rendering="crispEdges"` so edges stay razor sharp
 * at any scale (the essence of pixel art).
 *
 * MODIFY
 * ------
 *   - `scale`: size of one pixel-unit. All geometry is authored on an 8px
 *     grid multiplied by this — change it to make everything chunkier.
 *   - Palette options cover sky, bricks, blocks and the hero's outfit.
 *   - `TILE` helpers below (brick, questionBlock, pipe, cloud) are reusable:
 *     call them with different x/y to extend the level.
 */

export interface PixelPlatformerOptions {
  skyColor?: string;
  brickColor?: string;
  brickLight?: string;
  blockColor?: string;
  pipeGreen?: string;
  heroCap?: string;
  heroOveralls?: string;
  /** Size of one pixel-unit (default 4 -> an 8px-grid tile becomes 32px). */
  scale?: number;
}

export function createPixelPlatformer(options: PixelPlatformerOptions = {}): string {
  const {
    skyColor = '#5c94fc',
    brickColor = '#9c4a00',
    brickLight = '#ffce9c',
    blockColor = '#f8b800',
    pipeGreen = '#00a800',
    heroCap = '#e52521',
    heroOveralls = '#2038ec',
    scale = 4,
  } = options;

  const S = (n: number) => n * scale; // grid -> canvas units

  /* ---- Reusable pixel tiles --------------------------------------------- */

  /** Brick block: warm body, light top edge, dark mortar cross. */
  const brick = (gx: number, gy: number) => {
    const x = S(gx);
    const y = S(gy);
    return `<g transform="translate(${x} ${y})">
      <rect width="${S(8)}" height="${S(8)}" fill="${brickColor}"/>
      <rect width="${S(8)}" height="${S(1)}" fill="${brickLight}"/>
      <rect y="${S(4)}" width="${S(8)}" height="${S(1)}" fill="#3d1e00" opacity="0.7"/>
      <rect x="${S(4)}" width="${S(1)}" height="${S(4)}" fill="#3d1e00" opacity="0.7"/>
      <rect x="${S(2)}" y="${S(5)}" width="${S(1)}" height="${S(3)}" fill="#3d1e00" opacity="0.7"/>
      <rect x="${S(6)}" y="${S(5)}" width="${S(1)}" height="${S(3)}" fill="#3d1e00" opacity="0.7"/>
    </g>`;
  };

  /** Question block: gold face, riveted corners, pulsing "?" glyph. */
  const questionBlock = (gx: number, gy: number) => {
    const x = S(gx);
    const y = S(gy);
    return `<g transform="translate(${x} ${y})">
      <rect width="${S(8)}" height="${S(8)}" fill="${blockColor}"/>
      <rect width="${S(8)}" height="${S(1)}" fill="#ffe9a8"/>
      <rect y="${S(7)}" width="${S(8)}" height="${S(1)}" fill="#7a5200"/>
      <rect x="${S(1)}" y="${S(1)}" width="${S(1)}" height="${S(1)}" fill="#7a5200"/>
      <rect x="${S(6)}" y="${S(1)}" width="${S(1)}" height="${S(1)}" fill="#7a5200"/>
      <rect x="${S(1)}" y="${S(6)}" width="${S(1)}" height="${S(1)}" fill="#7a5200"/>
      <rect x="${S(6)}" y="${S(6)}" width="${S(1)}" height="${S(1)}" fill="#7a5200"/>
      <g fill="#7a5200">
        <rect x="${S(3)}" y="${S(2)}" width="${S(2)}" height="${S(1)}"/>
        <rect x="${S(5)}" y="${S(3)}" width="${S(1)}" height="${S(1)}"/>
        <rect x="${S(4)}" y="${S(4)}" width="${S(1)}" height="${S(1)}"/>
        <rect x="${S(4)}" y="${S(6)}" width="${S(1)}" height="${S(1)}"/>
      </g>
      <animateTransform attributeName="transform" type="translate" values="${x} ${y};${x} ${y - S(0.6)};${x} ${y}" dur="2.4s" repeatCount="indefinite" additive="replace"/>
    </g>`;
  };

  /** Coin: gold disc that "spins" by scaling its X axis. The scale lives on
   * an inner group so it composes with (not replaces) the translate. */
  const coin = (gx: number, gy: number) => {
    const x = S(gx);
    const y = S(gy);
    return `<g transform="translate(${x} ${y})"><g>
      <animateTransform attributeName="transform" type="scale" values="1 1;0.15 1;1 1" dur="1.6s" repeatCount="indefinite"/>
      <rect x="${S(1)}" width="${S(4)}" height="${S(6)}" fill="${blockColor}"/>
      <rect width="${S(1)}" y="${S(1)}" height="${S(4)}" fill="${blockColor}"/>
      <rect x="${S(5)}" y="${S(1)}" width="${S(1)}" height="${S(4)}" fill="${blockColor}"/>
      <rect x="${S(2)}" y="${S(1)}" width="${S(2)}" height="${S(4)}" fill="#ffe9a8"/>
    </g></g>`;
  };

  /** Warp pipe: classic lip + shaft with a light stripe. */
  const pipe = (gx: number, groundY: number, hUnits: number) => {
    const x = S(gx);
    const lipY = S(groundY - hUnits - 2);
    return `<g>
      <rect x="${x}" y="${lipY}" width="${S(10)}" height="${S(2)}" fill="${pipeGreen}"/>
      <rect x="${x}" y="${lipY}" width="${S(10)}" height="${S(0.8)}" fill="#80d010"/>
      <rect x="${x + S(1)}" y="${lipY + S(2)}" width="${S(8)}" height="${S(hUnits)}" fill="${pipeGreen}"/>
      <rect x="${x + S(1)}" y="${lipY + S(2)}" width="${S(2)}" height="${S(hUnits)}" fill="#80d010"/>
      <rect x="${x + S(7)}" y="${lipY + S(2)}" width="${S(2)}" height="${S(hUnits)}" fill="#005800"/>
    </g>`;
  };

  /** Puffy pixel cloud built from overlapping squares. */
  const cloud = (x: number, y: number, s: number, dur: number, drift: number, begin: number) =>
    `<g transform="translate(${x} ${y}) scale(${s})" fill="#ffffff">
      <animateTransform attributeName="transform" type="translate" values="${x} ${y};${x + drift} ${y};${x} ${y}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
      <rect x="0" y="8" width="72" height="16"/>
      <rect x="8" y="0" width="24" height="12"/>
      <rect x="36" y="4" width="20" height="8"/>
      <rect x="-10" y="12" width="14" height="10"/>
    </g>`;

  /** Green hill: a stepped pixel mound with darker speckle details.
   * `s` scales the mound; it sits on the ground line at baseY. */
  const hill = (x: number, baseY: number, s: number) =>
    `<g transform="translate(${x} ${baseY}) scale(${s})" fill="#1e9e00">
      <rect x="0" y="${S(-16)}" width="${S(64)}" height="${S(16)}"/>
      <rect x="${S(8)}" y="${S(-24)}" width="${S(48)}" height="${S(8)}"/>
      <rect x="${S(20)}" y="${S(-30)}" width="${S(24)}" height="${S(6)}"/>
      <g fill="#005800">
        <rect x="${S(16)}" y="${S(-12)}" width="${S(2)}" height="${S(2)}"/>
        <rect x="${S(40)}" y="${S(-8)}" width="${S(2)}" height="${S(2)}"/>
        <rect x="${S(28)}" y="${S(-20)}" width="${S(2)}" height="${S(2)}"/>
      </g>
    </g>`;

  /* ---- The hero: a chunky original plumber-adjacent jumping figure ------
   * Authored on an 8x12 grid: cap, face, mustache, shirt, overalls, gloves,
   * shoes. Legs tucked for a mid-jump read. */
  const heroX = S(74);
  const heroY = S(28);
  const hero = `<g transform="translate(${heroX} ${heroY})">
    <animateTransform attributeName="transform" type="translate" values="${heroX} ${heroY};${heroX} ${heroY - S(4)};${heroX} ${heroY}" dur="1.9s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.4 1;0.6 0 0.8 1"/>
    <!-- cap -->
    <rect x="${S(1)}" width="${S(6)}" height="${S(2)}" fill="${heroCap}"/>
    <rect x="${S(5)}" y="${S(2)}" width="${S(4)}" height="${S(1)}" fill="${heroCap}"/>
    <!-- face -->
    <rect x="${S(1)}" y="${S(2)}" width="${S(5)}" height="${S(3)}" fill="#ffcda0"/>
    <rect x="${S(2)}" y="${S(2)}" width="${S(1)}" height="${S(1)}" fill="#20201c"/>
    <!-- mustache + nose -->
    <rect x="${S(4)}" y="${S(4)}" width="${S(3)}" height="${S(1)}" fill="#5c2e00"/>
    <!-- shirt + arms -->
    <rect x="${S(1)}" y="${S(5)}" width="${S(6)}" height="${S(2)}" fill="${heroCap}"/>
    <rect x="${S(7)}" y="${S(5)}" width="${S(2)}" height="${S(2)}" fill="#ffcda0"/>
    <rect x="${S(-1)}" y="${S(4)}" width="${S(2)}" height="${S(2)}" fill="#ffffff"/>
    <!-- overalls -->
    <rect x="${S(2)}" y="${S(6)}" width="${S(4)}" height="${S(3)}" fill="${heroOveralls}"/>
    <rect x="${S(1)}" y="${S(5)}" width="${S(1)}" height="${S(2)}" fill="${heroOveralls}"/>
    <rect x="${S(6)}" y="${S(5)}" width="${S(1)}" height="${S(2)}" fill="${heroOveralls}"/>
    <rect x="${S(3)}" y="${S(6)}" width="${S(1)}" height="${S(1)}" fill="${blockColor}"/>
    <rect x="${S(5)}" y="${S(6)}" width="${S(1)}" height="${S(1)}" fill="${blockColor}"/>
    <!-- tucked legs + shoes -->
    <rect x="${S(1)}" y="${S(9)}" width="${S(3)}" height="${S(1)}" fill="#5c2e00"/>
    <rect x="${S(5)}" y="${S(9)}" width="${S(3)}" height="${S(1)}" fill="#5c2e00"/>
  </g>`;

  const GROUND = 62; // grid row where the ground strip begins

  return `<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" shape-rendering="crispEdges">
  <defs>
    <linearGradient id="pp-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyColor}"/>
      <stop offset="1" stop-color="#9cc8ff"/>
    </linearGradient>
  </defs>

  <rect width="1440" height="720" fill="url(#pp-sky)"/>

  ${cloud(140, 90, 1.4, 42, 70, -6)}
  ${cloud(620, 60, 1, 55, -80, -16)}
  ${cloud(1080, 120, 1.2, 48, 60, -26)}
  ${cloud(380, 190, 0.7, 38, -50, -10)}

  ${hill(60, S(GROUND), 1)}
  ${hill(950, S(GROUND), 0.8)}

  <!-- floating block formations -->
  ${questionBlock(18, 34)}
  ${brick(26, 34)}
  ${questionBlock(34, 34)}
  ${brick(42, 34)}
  ${questionBlock(26, 22)}
  ${brick(30, 22)}
  ${questionBlock(96, 30)}
  ${brick(104, 30)}

  ${coin(20, 40)}
  ${coin(36, 40)}
  ${coin(28, 28)}

  ${hero}

  ${pipe(56, GROUND, 4)}
  ${pipe(120, GROUND, 2)}

  <!-- ground: grass lip + brick soil, tiled across the canvas -->
  <g>
    <rect x="0" y="${S(GROUND)}" width="1440" height="${S(2)}" fill="#8a4b20"/>
    <rect x="0" y="${S(GROUND)}" width="1440" height="${S(0.7)}" fill="#e39b57"/>
    ${Array.from({ length: 40 }, (_, i) => brick(i * 9, GROUND + 2)).join('')}
    ${Array.from({ length: 40 }, (_, i) => brick(i * 9 + 4.5, GROUND + 10)).join('').replaceAll('opacity="0.7"', 'opacity="0.5"')}
  </g>

  <!-- castle silhouette on the horizon -->
  <g fill="#b8b8b8">
    <rect x="1290" y="${S(GROUND) - S(14)}" width="${S(20)}" height="${S(14)}"/>
    <rect x="1284" y="${S(GROUND) - S(20)}" width="${S(6)}" height="${S(20)}"/>
    <rect x="1310" y="${S(GROUND) - S(20)}" width="${S(6)}" height="${S(20)}"/>
    <rect x="1296" y="${S(GROUND) - S(19)}" width="${S(8)}" height="${S(6)}" fill="#3d1e00"/>
  </g>
</svg>`;
}
