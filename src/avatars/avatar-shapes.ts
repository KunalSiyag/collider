export interface AvatarShapesOptions {
  seed?: number;
  size?: number;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SHAPE_COLORS = ['#8b5cf6', '#22d3ee', '#fb7185', '#fafafa', '#facc15'];

export function createAvatarShapes(options: AvatarShapesOptions = {}): string {
  const { seed = 3, size = 128 } = options;
  const rand = mulberry32(seed * 7919 + 17);

  const bg = SHAPE_COLORS[Math.floor(rand() * SHAPE_COLORS.length)]!;
  const c1 = SHAPE_COLORS[Math.floor(rand() * SHAPE_COLORS.length)]!;
  const c2 = SHAPE_COLORS[Math.floor(rand() * SHAPE_COLORS.length)]!;
  const c3 = SHAPE_COLORS[Math.floor(rand() * SHAPE_COLORS.length)]!;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Abstract avatar ${seed}">
  <rect width="128" height="128" rx="36" fill="#18181b" />
  <circle cx="64" cy="64" r="52" fill="${bg}" opacity="0.25" />
  <path d="M64 12 A52 52 0 0 1 116 64 L64 64 Z" fill="${c1}" />
  <rect x="26" y="58" width="38" height="38" rx="8" fill="${c2}" transform="rotate(${Math.floor(rand() * 30 - 15)} 45 77)" />
  <circle cx="86" cy="86" r="18" fill="${c3}" />
  <circle cx="64" cy="64" r="10" fill="#18181b" />
</svg>`;
}
