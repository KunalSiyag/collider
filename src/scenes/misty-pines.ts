/**
 * Misty Pines — foggy sunrise over layered pine ridges
 * ====================================================
 * A calm, atmospheric full-bleed scene: a pale gold sun burning through
 * valley fog, four receding pine ridges fading into haze, and slow-drifting
 * mist banks with faint god rays. Pairs well as a hero or section background.
 *
 * Returns a standalone `<svg>` string (pure SMIL animation, zero JS).
 *
 * MODIFY
 * ------
 *   - `ridges` controls how many tree lines are drawn (more = deeper valley).
 *   - Palette options cover sky, sun, fog and the near-ridge green.
 *   - `seed` changes the jitter of every tree so no two forests match.
 */

export interface MistyPinesOptions {
  skyTop?: string;
  skyHorizon?: string;
  sunColor?: string;
  fogColor?: string;
  ridgeNear?: string;
  seed?: number;
  ridges?: number;
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

export function createMistyPines(options: MistyPinesOptions = {}): string {
  const {
    skyTop = '#7f9bb8',
    skyHorizon = '#f6d9a6',
    sunColor = '#fff2d0',
    fogColor = '#e9e2d2',
    ridgeNear = '#2e4a38',
    seed = 7,
    ridges = 4,
  } = options;

  const rand = mulberry32(seed);

  /* One pine = a tapered trunk plus three stacked, slightly irregular
   * triangle tiers. Jitter keeps the treeline organic. */
  function pine(x: number, baseY: number, h: number, tone: string): string {
    const w = h * 0.34;
    const tier = (cy: number, tw: number, th: number) => {
      const l = x - tw / 2 + (rand() * 4 - 2);
      const r = x + tw / 2 + (rand() * 4 - 2);
      const tip = x + (rand() * 3 - 1.5);
      return `<path d="M${l} ${cy} L${tip} ${cy - th} L${r} ${cy} Z" fill="${tone}"/>`;
    };
    return (
      `<g>` +
      `<rect x="${x - h * 0.03}" y="${baseY - h * 0.18}" width="${h * 0.06}" height="${h * 0.2}" fill="${tone}"/>` +
      tier(baseY - h * 0.1, w, h * 0.42) +
      tier(baseY - h * 0.36, w * 0.78, h * 0.38) +
      tier(baseY - h * 0.6, w * 0.55, h * 0.34) +
      `</g>`
    );
  }

  /* Build a treeline: a ground path plus pines of varying height along it. */
  function ridgeLine(baseY: number, amp: number, treeH: number, tone: string, count: number): string {
    let ground = `M0 ${baseY + 8}`;
    const pts: number[] = [];
    for (let x = 0; x <= 1440; x += 1440 / 8) {
      const y = baseY + (rand() * 2 - 1) * amp;
      pts.push(x, y);
      ground += ` L${x} ${y.toFixed(1)}`;
    }
    ground += ' L1440 720 L0 720 Z';

    let trees = '';
    for (let i = 0; i < count; i++) {
      const x = rand() * 1460 - 10;
      // Sample ground height near x for a tree that sits on the line.
      const seg = Math.min(7, Math.max(0, Math.floor((x / 1440) * 8)));
      const gy = pts[seg * 2 + 1] ?? baseY;
      const h = treeH * (0.65 + rand() * 0.7);
      trees += pine(x, gy + 6, h, tone);
    }
    return `<path d="${ground}" fill="${tone}"/>${trees}`;
  }

  const layers: string[] = [];
  // Far -> near: lighter, hazier tones and smaller trees with depth.
  const tones = ['#8fa08d', '#6d8570', '#4b6752', ridgeNear];
  const fogPerLayer = [0.55, 0.38, 0.22, 0.08];
  for (let i = 0; i < Math.min(ridges, 4); i++) {
    const baseY = 430 + i * 62;
    layers.push(
      `<g>${ridgeLine(baseY, 10, 46 + i * 26, tones[i], 16 + i * 6)}</g>` +
        `<rect x="0" y="${baseY - 90}" width="1440" height="${720 - baseY + 90}" fill="${fogColor}" opacity="${fogPerLayer[i]}"/>`,
    );
  }

  const mistBank = (x: number, y: number, rx: number, ry: number, dur: number, drift: number, begin: number, op: number) =>
    `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fogColor}" opacity="${op}" filter="url(#mp-mist)">` +
    `<animateTransform attributeName="transform" type="translate" values="${-drift} 0;${drift} 0;${-drift} 0" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>` +
    `</ellipse>`;

  return `<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="mp-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyTop}"/>
      <stop offset="0.6" stop-color="#cfc0a8"/>
      <stop offset="1" stop-color="${skyHorizon}"/>
    </linearGradient>
    <radialGradient id="mp-sun" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${sunColor}" stop-opacity="0.95"/>
      <stop offset="0.4" stop-color="${sunColor}" stop-opacity="0.4"/>
      <stop offset="1" stop-color="${sunColor}" stop-opacity="0"/>
    </radialGradient>
    <filter id="mp-mist" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="16"/>
    </filter>
  </defs>

  <rect width="1440" height="720" fill="url(#mp-sky)"/>

  <!-- rising sun with a slow breathing halo -->
  <circle cx="720" cy="360" r="260" fill="url(#mp-sun)">
    <animate attributeName="opacity" values="0.8;1;0.8" dur="10s" repeatCount="indefinite"/>
  </circle>
  <circle cx="720" cy="360" r="46" fill="${sunColor}" opacity="0.95" filter="url(#mp-mist)"/>

  <!-- faint god rays fanning out through the fog -->
  <g fill="${sunColor}" filter="url(#mp-mist)">
    <path d="M700 340 L240 720 L400 720 L730 350 Z" opacity="0.12">
      <animate attributeName="opacity" values="0.07;0.16;0.07" dur="12s" repeatCount="indefinite"/>
    </path>
    <path d="M740 340 L1040 720 L1200 720 L760 350 Z" opacity="0.1">
      <animate attributeName="opacity" values="0.06;0.14;0.06" dur="14s" begin="-5s" repeatCount="indefinite"/>
    </path>
  </g>

  ${layers.join('\n  ')}

  <!-- slow fog banks sliding through the valley -->
  ${mistBank(300, 520, 340, 34, 26, 60, -4, 0.5)}
  ${mistBank(1050, 560, 380, 40, 32, -70, -12, 0.45)}
  ${mistBank(700, 640, 460, 46, 38, 50, -20, 0.55)}

  <!-- birds, small against the light -->
  <g stroke="#3d3a30" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.7">
    <g>
      <animateTransform attributeName="transform" type="translate" values="560 220;700 204;840 220" dur="38s" repeatCount="indefinite"/>
      <path d="M-8 0 Q -4 -5 0 0 Q 4 -5 8 0"/>
    </g>
    <g>
      <animateTransform attributeName="transform" type="translate" values="600 246;720 232;840 246" dur="44s" begin="-10s" repeatCount="indefinite"/>
      <path d="M-6 0 Q -3 -4 0 0 Q 3 -4 6 0"/>
    </g>
  </g>
</svg>`;
}
