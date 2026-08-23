export interface ElementalOptions {
  size?: number;
}

export function createElementalPaper(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1553; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const scraps = Array.from({ length: 5 }, () => {
    const x = rand() * 320; const y0 = -30; const rot0 = rand() * 360;
    return `<rect x="${x.toFixed(1)}" y="${y0}" width="16" height="20" fill="#fef3c7" opacity="0.8" transform="rotate(${rot0.toFixed(0)} ${x.toFixed(1)} ${y0})"><animate attributeName="transform" type="translate" values="0 0;${((rand() - 0.5) * 100).toFixed(0)} 350" dur="${(4 + rand() * 4).toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /><animateTransform attributeName="transform" type="rotate" from="${rot0.toFixed(0)}" to="${(rot0 + 360).toFixed(0)}" additive="sum" dur="${(3 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></rect>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  ${scraps}
  <defs>
    <linearGradient id="pap-sheet" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fffbeb" /><stop offset="100%" stop-color="#fde68a" />
    </linearGradient>
    <filter id="pap-soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="4" /></filter>
  </defs>
  <ellipse cx="160" cy="290" rx="70" ry="9" fill="#fbbf24" opacity="0.15" />
  <g transform="translate(-14 -6)">
    <path d="M174 62 L252 84 L242 250 L164 262 Z" fill="#e7d8b8">
      <animateTransform attributeName="transform" type="rotate" values="-2 208 160;2 208 160;-2 208 160" dur="5s" repeatCount="indefinite" />
    </path>
    <path d="M166 58 L246 78 L236 246 L156 258 Z" fill="url(#pap-sheet)" stroke="#d6b68a" stroke-width="2" />
    <path d="M170 92 Q200 86 228 96 M168 122 Q198 116 226 126 M167 152 Q197 146 225 156 M165 182 Q195 176 223 186" stroke="#b45309" stroke-width="2.6" fill="none" opacity="0.65" stroke-linecap="round">
      <animate attributeName="opacity" values="0.65;0.35;0.65" dur="3s" repeatCount="indefinite" />
    </path>
    <circle cx="196" cy="140" r="9" fill="#92400e"><animate attributeName="cy" values="138;143;138" dur="2.2s" repeatCount="indefinite" /></circle>
    <circle cx="206" cy="180" r="9" fill="#92400e"><animate attributeName="cy" values="182;177;182" dur="2.2s" begin="0.5s" repeatCount="indefinite" /></circle>
    <circle cx="199" cy="137" r="3" fill="#fff" /><circle cx="209" cy="177" r="3" fill="#fff" />
    <path d="M192 210 Q202 217 212 209" stroke="#92400e" stroke-width="4" fill="none" stroke-linecap="round" />
  </g>
  <circle cx="272.4" cy="232.8" r="1.7" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.0s" begin="0.2s" repeatCount="indefinite" /></circle>
  <circle cx="147.0" cy="184.2" r="2.5" fill="none" stroke="#22d3ee" stroke-width="1.4"><animate attributeName="r" values="2.5;7.5;2.5" dur="3.0s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
  <circle cx="272" cy="222" r="2" fill="#a78bfa" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
