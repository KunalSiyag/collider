export interface ElementalOptions {
  size?: number;
}

export function createElementalVine(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1451; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const tendrils = Array.from({ length: 4 }, (_, i) => {
    const side = i % 2 === 0 ? -1 : 1;
    const y0 = 110 + Math.floor(i / 2) * 70;
    return `<path d="M160 ${y0} q${side * (30 + rand() * 20).toFixed(0)} ${(rand() * 20 - 10).toFixed(0)} ${side * (50 + rand() * 30).toFixed(0)} ${(20 + rand() * 20).toFixed(0)}" stroke="#22c55e" stroke-width="5" fill="none" stroke-linecap="round">
      <animate attributeName="d" dur="${(3.5 + rand() * 2.5).toFixed(1)}s" repeatCount="indefinite"
        values="M160 ${y0} q${side * 34} -6 ${side * 60} 18;
                M160 ${y0} q${side * 40} 8 ${side * 66} 24;
                M160 ${y0} q${side * 34} -6 ${side * 60} 18" />
    </path><circle cx="${160 + side * 60}" cy="${y0 + 18}" r="5" fill="#86efac"><animate attributeName="opacity" values="1;0.5;1" dur="${(2.4 + rand() * 2).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="vine-face" cx="44%" cy="40%" r="64%">
      <stop offset="0%" stop-color="#bbf7d0" /><stop offset="70%" stop-color="#16a34a" /><stop offset="100%" stop-color="#14532d" />
    </radialGradient>
    <filter id="vine-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
  </defs>
  <ellipse cx="160" cy="290" rx="74" ry="10" fill="#15803d" opacity="0.25" />
  <circle cx="160" cy="164" r="92" fill="#22c55e" opacity="0.15" filter="url(#vine-glow)">
    <animate attributeName="r" values="88;98;88" dur="3.4s" repeatCount="indefinite" />
  </circle>
  ${tendrils}
  <circle cx="160" cy="164" r="58" fill="url(#vine-face)">
    <animate attributeName="r" values="56;61;56" dur="3.4s" repeatCount="indefinite" />
  </circle>
  <circle cx="140" cy="154" r="8" fill="#052e16"><animate attributeName="cy" values="152;156;152" dur="2.2s" repeatCount="indefinite" /></circle>
  <circle cx="180" cy="154" r="8" fill="#052e16"><animate attributeName="cy" values="156;152;156" dur="2.2s" begin="0.5s" repeatCount="indefinite" /></circle>
  <circle cx="142.5" cy="151" r="2.6" fill="#fff" /><circle cx="182.5" cy="151" r="2.6" fill="#fff" />
  <path d="M148 184 Q161 192 174 183" stroke="#052e16" stroke-width="4.5" fill="none" stroke-linecap="round" />
</svg>`;
}
