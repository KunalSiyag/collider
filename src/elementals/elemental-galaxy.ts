export interface ElementalOptions {
  size?: number;
}

export function createElementalGalaxy(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1607; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const stars = Array.from({ length: 20 }, () => {
    const a = rand() * Math.PI * 2; const r = 30 + rand() * 110;
    return `<circle cx="${(160 + Math.cos(a) * r).toFixed(1)}" cy="${(160 + Math.sin(a) * r * 0.55).toFixed(1)}" r="${(0.8 + rand() * 1.6).toFixed(1)}" fill="#fef9c3"><animateTransform attributeName="transform" type="rotate" values="0 160 160;-360 160 160" dur="${(14 + rand() * 16).toFixed(0)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.9;0.2;0.9" dur="${(2 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  const arms = [0, 140, 220].map((a, i) => `<path d="M160 160 Q${(230 + i * 10).toFixed(0)} ${(120 - i * 14).toFixed(0)} ${(280 - i * 6).toFixed(0)} ${(150 + i * 18).toFixed(0)} M160 160 Q${(90 - i * 10).toFixed(0)} ${(200 + i * 14).toFixed(0)} ${(40 + i * 6).toFixed(0)} ${(170 - i * 18).toFixed(0)}" stroke="#a78bfa" stroke-width="${(5 - i).toFixed(1)}" fill="none" opacity="${(0.65 - i * 0.15).toFixed(2)}">
      <animateTransform attributeName="transform" type="rotate" values="${a} 160 160;${a + 360} 160 160" dur="${(22 + i * 8).toFixed(0)}s" repeatCount="indefinite" />
    </path>`).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="gal-bulge" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#fffbeb" /><stop offset="60%" stop-color="#fcd34d" /><stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
    </radialGradient>
    <filter id="gal-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="12" /></filter>
  </defs>
  ${stars}
  <ellipse cx="160" cy="160" rx="130" ry="72" fill="#6d28d9" opacity="0.15" filter="url(#gal-glow)">
    <animate attributeName="ry" values="68;80;68" dur="8s" repeatCount="indefinite" />
  </ellipse>
  ${arms}
  <circle cx="160" cy="160" r="42" fill="url(#gal-bulge)">
    <animate attributeName="r" values="40;46;40" dur="4s" repeatCount="indefinite" />
  </circle>
  <g>
    <circle cx="146" cy="154" r="7" fill="#431407" /><circle cx="176" cy="154" r="7" fill="#431407" />
    <circle cx="148" cy="152" r="2.4" fill="#fff" /><circle cx="178" cy="152" r="2.4" fill="#fff" />
    <path d="M150 172 Q161 179 172 172" stroke="#431407" stroke-width="3.6" fill="none" stroke-linecap="round" />
    <animateTransform attributeName="transform" type="rotate" values="0 160 160;360 160 160" dur="26s" repeatCount="indefinite" />
  </g>

</svg>`;
}
