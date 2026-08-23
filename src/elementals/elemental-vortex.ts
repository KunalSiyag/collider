export interface ElementalOptions {
  size?: number;
}

export function createElementalVortex(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1453; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const swirls = [0, 1, 2, 3].map((i) => {
    const r = 40 + i * 26;
    return `<ellipse cx="160" cy="160" rx="${r}" ry="${(r * 0.42).toFixed(1)}" fill="none" stroke="#38bdf8" stroke-width="${(5 - i * 0.8).toFixed(1)}" opacity="${(0.85 - i * 0.15).toFixed(2)}">
      <animateTransform attributeName="transform" type="rotate" values="${i * 20} 160 160;${i * 20 + 360} 160 160" dur="${(6 - i).toFixed(0)}s" repeatCount="indefinite" />
    </ellipse>`;
  }).join('');
  const debris = Array.from({ length: 6 }, () => {
    const a = rand() * Math.PI * 2; const r = 60 + rand() * 70;
    return `<circle cx="${(160 + Math.cos(a) * r).toFixed(1)}" cy="${(160 + Math.sin(a) * r * 0.45).toFixed(1)}" r="${(2 + rand() * 3).toFixed(1)}" fill="#bae6fd"><animateTransform attributeName="transform" type="rotate" values="0 160 160;-360 160 160" dur="${(3 + rand() * 4).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="vtx-eye" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#f0f9ff" /><stop offset="100%" stop-color="#0369a1" />
    </radialGradient>
    <filter id="vtx-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="10" /></filter>
  </defs>
  ${debris}
  <circle cx="160" cy="160" r="120" fill="#0ea5e9" opacity="0.12" filter="url(#vtx-glow)">
    <animate attributeName="r" values="116;128;116" dur="4s" repeatCount="indefinite" />
  </circle>
  ${swirls}
  <circle cx="160" cy="160" r="36" fill="url(#vtx-eye)">
    <animate attributeName="r" values="34;39;34" dur="2.4s" repeatCount="indefinite" />
  </circle>
  <circle cx="146" cy="154" r="7" fill="#082f49" /><circle cx="176" cy="154" r="7" fill="#082f49" />
  <circle cx="148" cy="152" r="2.4" fill="#fff" /><circle cx="178" cy="152" r="2.4" fill="#fff" />
  <path d="M150 174 L159 181 L167 172 L176 179" stroke="#082f49" stroke-width="3.6" fill="none" stroke-linecap="round" transform="rotate(-8 163 176)" />

</svg>`;
}
