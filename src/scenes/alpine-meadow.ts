/**
 * Alpine Meadow — golden-hour valley hero scene
 * ==============================================
 * A painterly full-bleed landscape in the spirit of classic "Haven-style"
 * landing pages: hazy sun over layered peaks, a rocky crag, a lit cabin,
 * and a wildflower meadow that sways in the foreground.
 *
 * Returns a standalone `<svg>` string (no JS runtime, animations are SMIL),
 * so it can be inlined server-side, dropped behind hero content, or saved
 * as a static asset.
 *
 * MODIFY
 * ------
 *   - Palette: every color option below is a hook (sky stops, sun, meadow
 *     bands, flower colors). Override via `createAlpineMeadow({...})`.
 *   - Density: `flowerCount` / `bladeCount` control foreground detail.
 *     More = richer bokeh but a bigger HTML payload.
 *   - Composition: the scene is drawn on a 1440x720 canvas with
 *     `preserveAspectRatio="slice"`, so it crops like `object-fit: cover`
 *     at any container size. Move the sun/crag by editing their coordinates.
 *   - Motion: each `<animate*>` tag carries its own `dur`; longer values
 *     read calmer. Remove them all for a fully static image.
 */

export interface AlpineMeadowOptions {
  /** Top-of-sky color (cool blue). */
  skyTop?: string;
  /** Warm mid-sky band. */
  skyMid?: string;
  /** Peach horizon glow. */
  skyHorizon?: string;
  /** Sun core + glow color. */
  sunColor?: string;
  /** Farthest (most atmospheric) mountain tone. */
  mountainFar?: string;
  /** Nearest meadow green (darkest band base). */
  meadowDeep?: string;
  /** Seed for the deterministic flower/grass scatter. */
  seed?: number;
  /** Number of foreground flowers (default 170). */
  flowerCount?: number;
  /** Number of grass blade strokes (default 110). */
  bladeCount?: number;
}

/** Small deterministic PRNG so the scatter is identical on every build. */
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

export function createAlpineMeadow(options: AlpineMeadowOptions = {}): string {
  const {
    skyTop = '#a9c4e0',
    skyMid = '#e9d5b8',
    skyHorizon = '#f9cf9a',
    sunColor = '#fff3d8',
    mountainFar = '#aebad4',
    meadowDeep = '#42602c',
    seed = 20260824,
    flowerCount = 170,
    bladeCount = 110,
  } = options;

  const rand = mulberry32(seed);

  /* ---- Wildflower scatter ------------------------------------------------
   * Flowers live in the front meadow band (y 555-720). Depth is faked by
   * scaling radius and opacity with y: nearer flowers are larger, brighter
   * and blurrier (the nearest slice gets a bokeh blur filter). Each flower
   * sways around its stem base with its own duration so the field moves
   * out of phase — this is what keeps it from looking mechanical. */
  interface FlowerKind {
    petal: string;
    core: string;
    weight: number;
    petals: number;
  }
  const kinds: FlowerKind[] = [
    { petal: '#fdfbf4', core: '#f0b23e', weight: 0.38, petals: 5 }, // daisy
    { petal: '#ef7d3c', core: '#8c3b16', weight: 0.24, petals: 5 }, // poppy
    { petal: '#f6a44e', core: '#a34f14', weight: 0.14, petals: 5 }, // marigold
    { petal: '#b295cf', core: '#f4eef9', weight: 0.16, petals: 5 }, // lavender
    { petal: '#f3f7e9', core: '#e5e0c8', weight: 0.08, petals: 4 }, // yarrow
  ];
  const totalWeight = kinds.reduce((s, k) => s + k.weight, 0);

  const flowers: string[] = [];
  for (let i = 0; i < flowerCount; i++) {
    let pick = rand() * totalWeight;
    const kind = kinds.find((k) => (pick -= k.weight) <= 0) ?? kinds[0];

    const x = rand() * 1460 - 10;
    // Bias density toward the bottom (closer = more flowers).
    const y = 555 + Math.pow(rand(), 0.7) * 165;
    const depth = (y - 555) / 165; // 0 far -> 1 near
    const r = 2.2 + depth * 5.4 * (0.8 + rand() * 0.4);
    const stemH = r * (1.6 + rand() * 1.2);
    const sway = (1.4 + depth * 2.2).toFixed(2);
    const dur = (2.8 + rand() * 3.4).toFixed(2);
    const begin = (-rand() * 6).toFixed(2);
    const op = (0.55 + depth * 0.45).toFixed(2);

    const petals = Array.from({ length: kind.petals }, (_, p) => {
      const a = (360 / kind.petals) * p + rand() * 14;
      return `<circle cx="0" cy="${(-r * 0.85).toFixed(2)}" r="${(r * 0.62).toFixed(2)}" fill="${kind.petal}" transform="rotate(${a.toFixed(1)})"/>`;
    }).join('');

    flowers.push(
      `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})" opacity="${op}">` +
        `<path d="M0 0 Q ${(rand() * 3 - 1.5).toFixed(1)} ${(-stemH * 0.6).toFixed(1)} 0 ${-stemH.toFixed(1)}" stroke="#4e6b2e" stroke-width="${(0.8 + depth * 0.9).toFixed(2)}" fill="none"/>` +
        `<g transform="translate(0 ${-stemH.toFixed(1)})">` +
        `<animateTransform attributeName="transform" type="rotate" values="${-sway};${sway};${-sway}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite" additive="sum"/>` +
        petals +
        `<circle r="${(r * 0.34).toFixed(2)}" fill="${kind.core}"/>` +
        `</g></g>`,
    );
  }

  /* ---- Grass blades ------------------------------------------------------ */
  const blades: string[] = [];
  for (let i = 0; i < bladeCount; i++) {
    const x = rand() * 1460 - 10;
    const y = 590 + rand() * 130;
    const h = 10 + rand() * 26;
    const lean = rand() * 10 - 5;
    const tone = rand() > 0.5 ? '#6d8f3f' : '#557634';
    blades.push(
      `<path d="M${x.toFixed(1)} ${y.toFixed(1)} Q ${(x + lean).toFixed(1)} ${(y - h * 0.6).toFixed(1)} ${(x + lean * 1.8).toFixed(1)} ${(y - h).toFixed(1)}" stroke="${tone}" stroke-width="${(1 + rand()).toFixed(2)}" fill="none" opacity="${(0.25 + rand() * 0.3).toFixed(2)}"/>`,
    );
  }

  /* ---- Clouds ------------------------------------------------------------ */
  const cloud = (x: number, y: number, s: number, dur: number, drift: number, begin: number) =>
    `<g transform="translate(${x} ${y}) scale(${s})" opacity="0.85">` +
    `<animateTransform attributeName="transform" type="translate" values="${x} ${y};${x + drift} ${y};${x} ${y}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>` +
    `<g fill="#ffffff"><ellipse cx="0" cy="0" rx="70" ry="20"/><ellipse cx="42" cy="8" rx="52" ry="15"/><ellipse cx="-44" cy="9" rx="46" ry="13"/><ellipse cx="10" cy="-12" rx="40" ry="16"/></g>` +
    `<g fill="#f6d9ae" opacity="0.55"><ellipse cx="0" cy="10" rx="66" ry="9"/><ellipse cx="40" cy="16" rx="48" ry="7"/></g>` +
    `</g>`;

  /* ---- Birds ------------------------------------------------------------- */
  const bird = (x: number, y: number, s: number, dur: number, begin: number) =>
    `<g transform="translate(${x} ${y}) scale(${s})" stroke="#4a4536" stroke-width="2.2" fill="none" stroke-linecap="round">` +
    `<animateTransform attributeName="transform" type="translate" values="${x} ${y};${x + 90} ${y - 14};${x + 180} ${y}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>` +
    `<path d="M-9 0 Q -4 -6 0 0 Q 4 -6 9 0"><animate attributeName="d" values="M-9 0 Q -4 -6 0 0 Q 4 -6 9 0;M-9 -2 Q -4 3 0 -1 Q 4 3 9 -2;M-9 0 Q -4 -6 0 0 Q 4 -6 9 0" dur="0.9s" repeatCount="indefinite"/></path>` +
    `</g>`;

  return `<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="am-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${skyTop}"/>
      <stop offset="0.45" stop-color="#d8cfc0"/>
      <stop offset="0.75" stop-color="${skyMid}"/>
      <stop offset="1" stop-color="${skyHorizon}"/>
    </linearGradient>
    <radialGradient id="am-sun-glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${sunColor}" stop-opacity="0.9"/>
      <stop offset="0.35" stop-color="${sunColor}" stop-opacity="0.4"/>
      <stop offset="1" stop-color="${sunColor}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="am-far" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${mountainFar}"/>
      <stop offset="1" stop-color="#cfc4b4"/>
    </linearGradient>
    <linearGradient id="am-mid" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#93a883"/>
      <stop offset="1" stop-color="#b3a98a"/>
    </linearGradient>
    <linearGradient id="am-ridge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7f9c5c"/>
      <stop offset="1" stop-color="#5d7a42"/>
    </linearGradient>
    <linearGradient id="am-meadow-1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#a3bd63"/>
      <stop offset="1" stop-color="#7d9c4c"/>
    </linearGradient>
    <linearGradient id="am-meadow-2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#8cab52"/>
      <stop offset="1" stop-color="${meadowDeep}"/>
    </linearGradient>
    <linearGradient id="am-meadow-3" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#6f9440"/>
      <stop offset="1" stop-color="#3c5726"/>
    </linearGradient>
    <linearGradient id="am-crag" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8d93a2"/>
      <stop offset="0.55" stop-color="#b9a98f"/>
      <stop offset="1" stop-color="#e3c9a0"/>
    </linearGradient>
    <filter id="am-soft" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="7"/>
    </filter>
    <filter id="am-mist" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
    <filter id="am-bokeh" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3.2"/>
    </filter>
  </defs>

  <!-- sky -->
  <rect width="1440" height="720" fill="url(#am-sky)"/>

  <!-- sun + pulsing glow -->
  <circle cx="985" cy="330" r="300" fill="url(#am-sun-glow)">
    <animate attributeName="opacity" values="0.85;1;0.85" dur="9s" repeatCount="indefinite"/>
  </circle>
  <circle cx="985" cy="330" r="58" fill="${sunColor}" opacity="0.95" filter="url(#am-soft)"/>

  <!-- light shafts leaning down-left from the sun -->
  <g fill="#fff6e0" opacity="0.14" filter="url(#am-mist)">
    <path d="M930 300 L840 720 L960 720 L1010 300 Z">
      <animate attributeName="opacity" values="0.10;0.2;0.10" dur="11s" repeatCount="indefinite"/>
    </path>
    <path d="M1060 320 L1120 720 L1220 720 L1120 320 Z">
      <animate attributeName="opacity" values="0.08;0.16;0.08" dur="13s" begin="-4s" repeatCount="indefinite"/>
    </path>
  </g>

  <!-- drifting clouds -->
  ${cloud(210, 120, 1.15, 46, 60, -8)}
  ${cloud(640, 78, 0.9, 58, -70, -20)}
  ${cloud(1150, 150, 1.05, 52, 55, -30)}
  ${cloud(880, 205, 0.62, 40, -45, -12)}

  <!-- far range: soft, desaturated, half-lost in haze -->
  <path d="M0 432 L90 372 L170 412 L260 344 L352 408 L470 356 L560 416 L640 388 L720 424 L810 372 L920 420 L1010 380 L1100 424 L1200 368 L1300 416 L1380 388 L1440 420 L1440 470 L0 470 Z"
        fill="url(#am-far)" opacity="0.85"/>

  <!-- mid slopes with warm side-light -->
  <path d="M560 470 L700 380 L820 440 L940 396 L1080 462 L1220 408 L1340 456 L1440 428 L1440 500 L560 500 Z"
        fill="url(#am-mid)" opacity="0.95"/>

  <!-- the big crag, left — faceted rock catching low sun on its right edge -->
  <g>
    <path d="M-30 500 L60 300 L128 356 L196 208 L268 330 L330 282 L392 420 L420 500 Z" fill="url(#am-crag)"/>
    <path d="M196 208 L268 330 L330 282 L392 420 L340 470 L240 430 L150 460 L96 380 Z" fill="#d9c3a0" opacity="0.55"/>
    <path d="M60 300 L128 356 L96 380 L40 420 Z" fill="#6f7688" opacity="0.7"/>
    <!-- snow streaks sitting in the crevices -->
    <path d="M188 226 L214 268 L198 272 Z M252 316 L276 352 L256 356 Z M318 292 L338 322 L322 326 Z" fill="#f6f2ea" opacity="0.85"/>
    <path d="M120 340 L142 372 L126 378 Z" fill="#f1ece2" opacity="0.6"/>
  </g>

  <!-- near green ridge, right -->
  <path d="M690 500 L830 440 L960 486 L1100 444 L1250 496 L1370 462 L1440 486 L1440 540 L690 540 Z" fill="url(#am-ridge)"/>

  <!-- valley mist breathing between ridge and meadow -->
  <g filter="url(#am-mist)" fill="#fdf3df">
    <ellipse cx="420" cy="492" rx="420" ry="26" opacity="0.4">
      <animate attributeName="opacity" values="0.28;0.46;0.28" dur="14s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="1080" cy="502" rx="380" ry="22" opacity="0.3">
      <animate attributeName="opacity" values="0.2;0.4;0.2" dur="17s" begin="-6s" repeatCount="indefinite"/>
    </ellipse>
  </g>

  <!-- meadow bands -->
  <path d="M0 508 C220 488 470 522 720 504 C970 486 1200 518 1440 500 L1440 720 L0 720 Z" fill="url(#am-meadow-1)"/>
  <path d="M0 566 C260 544 540 580 820 562 C1080 546 1280 574 1440 558 L1440 720 L0 720 Z" fill="url(#am-meadow-2)"/>
  <path d="M0 640 C300 618 620 652 940 636 C1180 624 1330 646 1440 636 L1440 720 L0 720 Z" fill="url(#am-meadow-3)"/>

  <!-- sunlit patches raking across the grass -->
  <g filter="url(#am-mist)" fill="#ffe9b0">
    <ellipse cx="760" cy="560" rx="300" ry="18" opacity="0.22">
      <animate attributeName="opacity" values="0.14;0.26;0.14" dur="12s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="300" cy="620" rx="260" ry="16" opacity="0.18">
      <animate attributeName="opacity" values="0.1;0.22;0.1" dur="15s" begin="-5s" repeatCount="indefinite"/>
    </ellipse>
  </g>

  <!-- trees with warm rim light on the sun side -->
  <g>
    <g transform="translate(560 508)">
      <rect x="-3" y="-8" width="6" height="22" fill="#5d4630"/>
      <circle cx="0" cy="-24" r="17" fill="#3f5c33"/><circle cx="-12" cy="-16" r="12" fill="#46653a"/><circle cx="12" cy="-16" r="12" fill="#46653a"/>
      <circle cx="7" cy="-27" r="9" fill="#c9a45e" opacity="0.5"/>
    </g>
    <g transform="translate(640 522) scale(0.8)">
      <rect x="-3" y="-8" width="6" height="22" fill="#5d4630"/>
      <circle cx="0" cy="-24" r="17" fill="#425f36"/><circle cx="-12" cy="-16" r="12" fill="#4a6a3e"/><circle cx="12" cy="-16" r="12" fill="#4a6a3e"/>
      <circle cx="7" cy="-27" r="9" fill="#d3ad64" opacity="0.5"/>
    </g>
    <g transform="translate(1058 500) scale(1.05)">
      <rect x="-3" y="-8" width="6" height="22" fill="#5d4630"/>
      <circle cx="0" cy="-24" r="17" fill="#3f5c33"/><circle cx="-12" cy="-16" r="12" fill="#46653a"/><circle cx="12" cy="-16" r="12" fill="#46653a"/>
      <circle cx="7" cy="-27" r="9" fill="#c9a45e" opacity="0.5"/>
    </g>
    <g transform="translate(1120 516) scale(0.7)">
      <rect x="-3" y="-8" width="6" height="22" fill="#5d4630"/>
      <circle cx="0" cy="-24" r="17" fill="#425f36"/><circle cx="12" cy="-16" r="12" fill="#4a6a3e"/>
      <circle cx="7" cy="-27" r="8" fill="#d3ad64" opacity="0.5"/>
    </g>
  </g>

  <!-- the cabin: white walls, dark roof, one amber window -->
  <g>
    <radialGradient id="am-window-glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#ffcf7a" stop-opacity="0.85"/>
      <stop offset="1" stop-color="#ffcf7a" stop-opacity="0"/>
    </radialGradient>
    <ellipse cx="238" cy="470" rx="70" ry="34" fill="url(#am-window-glow)" opacity="0.7"/>
    <g transform="translate(196 448)">
      <rect x="0" y="18" width="86" height="40" fill="#ece5d4"/>
      <rect x="62" y="18" width="24" height="40" fill="#cfc5b0"/>
      <path d="M-6 20 L43 -4 L92 20 L86 26 L43 4 L0 26 Z" fill="#4d4238"/>
      <path d="M-6 20 L43 -4 L92 20" fill="none" stroke="#3a322b" stroke-width="2"/>
      <rect x="12" y="30" width="15" height="15" fill="#ffc86e"/>
      <rect x="12" y="30" width="15" height="15" fill="none" stroke="#8a7a5e" stroke-width="1.4"/>
      <line x1="19.5" y1="30" x2="19.5" y2="45" stroke="#8a7a5e" stroke-width="1.2"/>
      <rect x="44" y="30" width="12" height="28" fill="#6b5844"/>
      <rect x="70" y="-12" width="8" height="16" fill="#8d8577"/>
      <ellipse cx="74" cy="-16" rx="7" ry="4" fill="#f4efe4" opacity="0.5">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="6s" repeatCount="indefinite"/>
      </ellipse>
    </g>
  </g>

  <!-- birds crossing the valley -->
  ${bird(760, 250, 1, 34, -4)}
  ${bird(820, 236, 0.8, 40, -18)}
  ${bird(700, 268, 0.65, 46, -30)}

  <!-- grass texture -->
  <g>${blades.join('')}</g>

  <!-- flower field: nearest slice blurred for bokeh depth -->
  <g filter="url(#am-bokeh)" opacity="0.9">${flowers.slice(0, Math.floor(flowerCount * 0.35)).join('')}</g>
  <g>${flowers.slice(Math.floor(flowerCount * 0.35)).join('')}</g>
</svg>`;
}
