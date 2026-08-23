export interface ElementalOptions {
  size?: number;
}

export function createElementalStone(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1367; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const pebbles = Array.from({ length: 5 }, () => {
    const x = rand() * 320; const y = rand() * 320; const r = 3 + rand() * 5;
    return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r * 0.75).toFixed(1)}" fill="#78716c" opacity="0.6"><animate attributeName="cy" values="${y.toFixed(1)};${(y - 16).toFixed(0)};${y.toFixed(1)}" dur="${(3.5 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></ellipse>`;
  }).join('');
  const moss = Array.from({ length: 4 }, () => {
    const x = 100 + rand() * 120; const y = 100 + rand() * 130;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(4 + rand() * 6).toFixed(1)}" fill="#65a30d" opacity="0.55"><animate attributeName="opacity" values="0.55;0.25;0.55" dur="${(3 + rand() * 2).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  ${pebbles}
  <ellipse cx="160" cy="290" rx="82" ry="11" fill="#57534e" opacity="0.35" />
  <path d="M160 74 C226 76 258 120 250 178 C244 232 202 268 156 264 C110 260 68 224 72 168 C76 112 100 72 160 74 Z" fill="#57534e">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="5.4s" repeatCount="indefinite" />
  </path>
  <path d="M160 82 C218 84 248 122 242 174 C236 222 198 256 158 252 C118 248 82 216 86 166 C90 118 108 80 160 82 Z" fill="#78716c" />
  <path d="M104 140 Q140 128 172 142 T228 138" stroke="#44403c" stroke-width="4" fill="none" opacity="0.8" />
  ${moss}
  <circle cx="136" cy="176" r="10" fill="#292524"><animate attributeName="r" values="9;11;9" dur="3s" repeatCount="indefinite" /></circle>
  <circle cx="186" cy="176" r="10" fill="#292524"><animate attributeName="r" values="11;9;11" dur="3s" begin="0.7s" repeatCount="indefinite" /></circle>
  <circle cx="139" cy="173" r="3.2" fill="#d6d3d1" /><circle cx="189" cy="173" r="3.2" fill="#d6d3d1" />
  <path d="M146 204 Q160 212 176 203" stroke="#292524" stroke-width="4.5" fill="none" stroke-linecap="round" />
  <circle cx="76.5" cy="168.1" r="2.2" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.2s" begin="0.8s" repeatCount="indefinite" /></circle>
  <circle cx="40.0" cy="144.4" r="2.4" fill="none" stroke="#22d3ee" stroke-width="1.4"><animate attributeName="r" values="2.4;7.4;2.4" dur="2.6s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.1s" repeatCount="indefinite" /></circle>
  <rect x="188.8" y="246.9" width="3.2" height="3.0" fill="#4ade80" opacity="0.55" transform="rotate(10 188.8 246.9)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.5s" repeatCount="indefinite" /></rect>
  <circle cx="131.2" cy="202.2" r="3.8" fill="#67e8f9" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.2s" begin="0.4s" repeatCount="indefinite" /></circle>
  <circle cx="257.3" cy="60.1" r="3.0" fill="none" stroke="#67e8f9" stroke-width="1.4"><animate attributeName="r" values="3.0;8.0;3.0" dur="4.2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.5s" repeatCount="indefinite" /></circle>
  <rect x="295.5" y="196.6" width="4.9" height="5.2" fill="#fde047" opacity="0.55" transform="rotate(10 295.5 196.6)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.9s" repeatCount="indefinite" /></rect>
  <circle cx="191.5" cy="223.8" r="1.5" fill="#4ade80" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.2s" begin="0.7s" repeatCount="indefinite" /></circle>
  <circle cx="91" cy="61" r="2" fill="#4ade80" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
