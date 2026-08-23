export interface ElementalOptions {
  size?: number;
}

export function createElementalRoot(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1193; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const rootlets = Array.from({ length: 6 }, () => {
    const x0 = 160 + (rand() - 0.5) * 60; const y1 = 220 + rand() * 40;
    return `<path d="M${x0.toFixed(1)} 200 Q${(x0 + (rand() - 0.5) * 60).toFixed(1)} ${(y1).toFixed(1)} ${(x0 + (rand() - 0.5) * 120).toFixed(1)} ${(y1 + 30 + rand() * 20).toFixed(1)}" stroke="#a16207" stroke-width="${(2 + rand() * 2.5).toFixed(1)}" fill="none" stroke-linecap="round"><animate attributeName="opacity" values="0.9;0.5;0.9" dur="${(3 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></path>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="rt-face" cx="46%" cy="40%" r="64%">
      <stop offset="0%" stop-color="#d9f99d" /><stop offset="100%" stop-color="#4d7c0f" />
    </radialGradient>
    <linearGradient id="rt-soil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#292524" /><stop offset="100%" stop-color="#1c1917" stop-opacity="0" />
    </linearGradient>
    <filter id="rt-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" /></filter>
  </defs>
  ${rootlets}
  <rect y="238" width="320" height="82" fill="#292524" opacity="0.85" />
  <g transform="translate(160 150)">
    <circle r="62" fill="url(#rt-face)">
      <animate attributeName="r" values="60;64;60" dur="3.4s" repeatCount="indefinite" />
    </circle>
    <path d="M-58 -18 A62 62 0 0 1 58 -18" fill="none" stroke="#365314" stroke-width="10" opacity="0.55" />
    <path d="M-16 -58 q8 -18 24 -22 M14 -56 q12 -12 26 -12 M-34 -50 q-2 -16 -14 -24" stroke="#84cc16" stroke-width="5" fill="none" stroke-linecap="round">
      <animateTransform attributeName="transform" type="rotate" values="-3;3;-3" dur="5s" repeatCount="indefinite" />
    </path>
    <circle cx="-19" cy="6" r="7.5" fill="#1a2e05" /><circle cx="21" cy="6" r="7.5" fill="#1a2e05" />
    <circle cx="-16.5" cy="3.5" r="2.6" fill="#fff" /><circle cx="23.5" cy="3.5" r="2.6" fill="#fff" />
    <path d="M-11 28 L-2 35 L7 27 L15 33" stroke="#1a2e05" stroke-width="4" fill="none" stroke-linecap="round" />
  </g>
  <ellipse cx="160" cy="300" rx="90" ry="14" fill="#a16207" opacity="0.15" filter="url(#rt-glow)" />
</svg>`;
}
