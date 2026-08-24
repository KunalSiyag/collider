/** Bamboo Path — misty bamboo grove with a lantern-lit stone path. */
export interface BambooPathOptions {
  mistColor?: string;
  bambooLight?: string;
  bambooDeep?: string;
  lanternGlow?: string;
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

export function createBambooPath(options: BambooPathOptions = {}): string {
  const {
    mistColor = '#dfe8dc', bambooLight = '#7fae5e', bambooDeep = '#4a7340',
    lanternGlow = '#ffcf7a', seed = 8,
  } = options;
  const rand = mulberry32(seed);

  /** One bamboo culm: segmented stalk with lean + leaf clusters. */
  const culm = (x: number, baseY: number, h: number, w: number, tone: string, lean: number) => {
    const segs = Math.ceil(h / 46);
    let stalk = `<g transform="translate(${x} ${baseY}) rotate(${lean})">
      <animateTransform attributeName="transform" type="rotate" values="${lean};${lean + 1.1};${lean}" dur="${(5 + rand() * 4).toFixed(1)}s" begin="${(-rand() * 5).toFixed(1)}s" repeatCount="indefinite" additive="replace"/>
      <rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="${tone}" rx="${w / 2}"/>`;
    for (let i = 1; i < segs; i++) {
      stalk += `<rect x="${-w / 2 - 1}" y="${(-i * 46).toFixed(1)}" width="${w + 2}" height="3" fill="#3a5c33" opacity="0.8"/>`;
    }
    const leaves = Array.from({ length: 3 }, () => {
      const ly = -h + rand() * h * 0.5;
      const dir = rand() > 0.5 ? 1 : -1;
      return `<path d="M0 ${ly.toFixed(0)} q ${dir * 26} ${(-6 - rand() * 8).toFixed(1)} ${dir * 46} ${(-2 - rand() * 6).toFixed(1)} q ${-dir * 22} ${10} ${-dir * 46} ${(2 + rand() * 6).toFixed(1)} z" fill="${tone}" opacity="0.92">
        <animateTransform attributeName="transform" type="rotate" values="0;${(dir * 3).toFixed(1)};0" dur="${(4 + rand() * 3).toFixed(1)}s" repeatCount="indefinite"/>
      </path>`;
    }).join('');
    return stalk + `<g transform="translate(0 ${(-h * 0.82).toFixed(0)})">${leaves}</g></g>`;
  };

  const lantern = (x: number, y: number, s: number) =>
    `<g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="-30" rx="34" ry="12" fill="${lanternGlow}" opacity="0.22">
        <animate attributeName="opacity" values="0.14;0.3;0.14" dur="6s" repeatCount="indefinite"/>
      </ellipse>
      <rect x="-12" y="-14" width="24" height="6" fill="#8a8f96"/>
      <rect x="-9" y="-8" width="18" height="16" fill="#cfd4d9"/>
      <rect x="-7" y="-6" width="14" height="12" fill="${lanternGlow}">
        <animate attributeName="opacity" values="0.75;1;0.75" dur="4s" repeatCount="indefinite"/>
      </rect>
      <rect x="-12" y="8" width="24" height="6" fill="#8a8f96"/>
      <rect x="-14" y="14" width="28" height="7" fill="#6f747b"/>
    </g>`;

  // Perspective rows: culms get taller/darker toward the edges.
  let grove = '';
  for (let i = 0; i < 26; i++) {
    const side = i % 2 === 0 ? rand() * 330 : 1110 + rand() * 330;
    const depth = i / 26;
    grove += culm(
      side + (rand() * 60 - 30),
      620 + rand() * 60,
      300 + depth * 260 + rand() * 90,
      7 + depth * 7,
      rand() > 0.5 ? bambooLight : bambooDeep,
      rand() * 7 - 3.5,
    );
  }

  return `<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="bp-mist" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${mistColor}"/><stop offset="1" stop-color="#c3d2bd"/>
    </linearGradient>
    <filter id="bp-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="10"/></filter>
  </defs>

  <rect width="1440" height="720" fill="url(#bp-mist)"/>
  <ellipse cx="720" cy="430" rx="700" ry="180" fill="#ffffff" opacity="0.55" filter="url(#bp-blur)"/>

  ${grove}

  <!-- stepping stones receding into the mist -->
  <g fill="#9aa79a">
    <ellipse cx="720" cy="700" rx="120" ry="26"/>
    <ellipse cx="730" cy="652" rx="92" ry="20" opacity="0.92"/>
    <ellipse cx="712" cy="616" rx="70" ry="15" opacity="0.85"/>
    <ellipse cx="726" cy="588" rx="52" ry="11" opacity="0.75"/>
    <ellipse cx="716" cy="566" rx="38" ry="8" opacity="0.6"/>
  </g>
  ${lantern(560, 640, 1.15)}
  ${lantern(900, 620, 1)}
  ${lantern(620, 585, 0.8)}

  <!-- drifting light motes -->
  ${Array.from({ length: 14 }, () => {
    const x = (rand() * 1440).toFixed(0);
    const dur = (9 + rand() * 8).toFixed(1);
    const begin = (-rand() * 12).toFixed(1);
    return `<circle cx="${x}" cy="${(200 + rand() * 300).toFixed(0)}" r="${(1.4 + rand() * 2).toFixed(1)}" fill="#f6f2d8" opacity="0.7">
      <animate attributeName="opacity" values="0.1;0.8;0.1" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
    </circle>`;
  }).join('')}
</svg>`;
}
