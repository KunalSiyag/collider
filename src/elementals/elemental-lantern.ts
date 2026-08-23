export interface ElementalOptions {
  size?: number;
}

export function createElementalLantern(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1627; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const moths = Array.from({ length: 3 }, () => {
    const x = 40 + rand() * 240; const y = 60 + rand() * 180;
    return `<g><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="#fef08a"><animate attributeName="cx" values="${x.toFixed(1)};${(x + (rand() > 0.5 ? '' : '-') + (30 + rand() * 30).toFixed(0))};${x.toFixed(1)}" dur="${(2.5 + rand() * 2).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="cy" values="${y.toFixed(1)};${(y + (rand() - 0.5) * 50).toFixed(0)};${y.toFixed(1)}" dur="${(2.5 + rand() * 2).toFixed(1)}s" repeatCount="indefinite" /></circle></g>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="lnt-flame" cx="46%" cy="42%" r="62%">
      <stop offset="0%" stop-color="#fffbeb" /><stop offset="65%" stop-color="#fb923c" /><stop offset="100%" stop-color="#c2410c" />
    </radialGradient>
    <filter id="lnt-glow" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="12" /></filter>
  </defs>
  ${moths}
  <line x1="160" y1="30" x2="160" y2="66" stroke="#44403c" stroke-width="4" />
  <path d="M120 92 L200 92 L192 74 L128 74 Z" fill="#292524" />
  <path d="M118 96 L202 96 L214 210 L106 210 Z" fill="#78716c">
    <animateTransform attributeName="transform" type="rotate" values="-3 160 100;3 160 100;-3 160 100" dur="4s" repeatCount="indefinite" />
  </path>
  <path d="M126 104 L194 104 L204 202 L116 202 Z" fill="#fde68a" opacity="0.35">
    <animate attributeName="opacity" values="0.35;0.55;0.35" dur="1.8s" repeatCount="indefinite" />
  </path>
  <g stroke="#57534e" stroke-width="3"><line x1="140" y1="98" x2="134" y2="206" /><line x1="160" y1="98" x2="160" y2="206" /><line x1="180" y1="98" x2="186" y2="206" /></g>
  <circle cx="160" cy="156" r="34" fill="#fb923c" filter="url(#lnt-glow)" opacity="0.55">
    <animate attributeName="r" values="31;39;31" dur="1.4s" repeatCount="indefinite" />
  </circle>
  <path d="M160 130 C174 142 182 154 180 170 C178 186 170 196 160 196 C150 196 142 186 140 170 C138 154 146 142 160 130 Z" fill="url(#lnt-flame)">
    <animate attributeName="d" dur="1.1s" repeatCount="indefinite"
      values="M160 130 C174 142 182 154 180 170 C178 186 170 196 160 196 C150 196 142 186 140 170 C138 154 146 142 160 130 Z;
              M158 126 C172 140 184 152 181 170 C179 188 169 199 159 198 C149 197 141 185 139 168 C137 151 145 138 158 126 Z;
              M160 130 C174 142 182 154 180 170 C178 186 170 196 160 196 C150 196 142 186 140 170 C138 154 146 142 160 130 Z" />
  </path>
  <circle cx="153" cy="166" r="4.5" fill="#7c2d12"><animate attributeName="cy" values="164;169;164" dur="1.1s" repeatCount="indefinite" /></circle>
  <circle cx="167" cy="166" r="4.5" fill="#7c2d12"><animate attributeName="cy" values="169;164;169" dur="1.1s" begin="0.3s" repeatCount="indefinite" /></circle>
  <path d="M154 182 Q160 186 166 181" stroke="#7c2d12" stroke-width="2.8" fill="none" stroke-linecap="round" />
  <rect x="112" y="208" width="96" height="10" rx="5" fill="#292524" />
</svg>`;
}
