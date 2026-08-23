export interface ElementalOptions {
  size?: number;
}

export function createElementalChaos(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 101; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const palette = ['#8b5cf6', '#22d3ee', '#f472b6', '#4ade80', '#fbbf24', '#fb7185'];
  const shards = Array.from({ length: 10 }, (_, i) => {
    const x = 40 + rand() * 240; const y = 40 + rand() * 240; const s2 = 8 + rand() * 18;
    const c = palette[Math.floor(rand() * palette.length)];
    return `<polygon points="${x.toFixed(1)},${y.toFixed(1)} ${(x + s2).toFixed(1)},${(y - s2 * 0.6).toFixed(1)} ${(x + s2 * 1.5).toFixed(1)},${(y + s2 * 0.5).toFixed(1)} ${(x + s2 * 0.4).toFixed(1)},${(y + s2).toFixed(1)}" fill="${c}" opacity="0.75"><animateTransform attributeName="transform" type="rotate" values="0 ${x.toFixed(1)} ${y.toFixed(1)};360 ${x.toFixed(1)} ${y.toFixed(1)}" dur="${(4 + rand() * 6).toFixed(1)}s" repeatCount="indefinite" /></polygon>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="chaos-core" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#fafafa" /><stop offset="60%" stop-color="#a78bfa" /><stop offset="100%" stop-color="#6d28d9" />
    </radialGradient>
    <filter id="chaos-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8" /></filter>
  </defs>
  ${shards}
  <circle cx="160" cy="160" r="58" fill="#7c3aed" filter="url(#chaos-glow)" opacity="0.6">
    <animate attributeName="r" values="54;64;54" dur="2s" repeatCount="indefinite" />
  </circle>
  <circle cx="160" cy="160" r="46" fill="url(#chaos-core)">
    <animate attributeName="r" values="46;50;46" dur="2s" repeatCount="indefinite" />
    <animate attributeName="fill" values="#fafafa;#22d3ee;#f472b6;#fafafa" dur="5s" repeatCount="indefinite" />
  </circle>
  <g>
    <circle cx="143" cy="152" r="8" fill="#111" /><circle cx="177" cy="152" r="8" fill="#111" />
    <animateTransform attributeName="transform" type="translate" values="0 0;-6 3;5 -4;0 0" dur="1.1s" repeatCount="indefinite" />
  </g>
  <path d="M142 180 L156 170 L166 182 L178 172" stroke="#111" stroke-width="4" fill="none" stroke-linecap="round">
    <animate attributeName="d" values="M142 180 L156 170 L166 182 L178 172;M142 174 L156 182 L166 172 L178 180;M142 180 L156 170 L166 182 L178 172" dur="1.4s" repeatCount="indefinite" />
  </path>
  <g opacity="0.75">
    <circle cx="52" cy="52" r="4" fill="#22d3ee"><animate attributeName="cx" values="52;72;52" dur="1.7s" repeatCount="indefinite" /></circle>
    <circle cx="272" cy="268" r="4.5" fill="#fb7185"><animate attributeName="cy" values="268;248;268" dur="2.1s" repeatCount="indefinite" /></circle>
    <circle cx="280" cy="48" r="3.5" fill="#4ade80"><animate attributeName="cy" values="48;66;48" dur="1.9s" repeatCount="indefinite" /></circle>
  </g>
</svg>`;
}
