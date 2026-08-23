export interface ElementalOptions {
  size?: number;
}

export function createElementalChrono(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 103; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    const x1 = 160 + Math.sin(a) * 92; const y1 = 150 - Math.cos(a) * 92;
    const x2 = 160 + Math.sin(a) * 102; const y2 = 150 - Math.cos(a) * 102;
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#fbbf24" stroke-width="${i % 3 === 0 ? 4 : 2}" opacity="0.8" />`;
  }).join('');
  const gears = Array.from({ length: 3 }, () => {
    const x = 30 + rand() * 260; const y = 30 + rand() * 100; const r = 8 + rand() * 12;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="none" stroke="#a16207" stroke-width="2" stroke-dasharray="4 3"><animateTransform attributeName="transform" type="rotate" values="0 ${x.toFixed(1)} ${y.toFixed(1)};360 ${x.toFixed(1)} ${y.toFixed(1)}" dur="${(6 + rand() * 8).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="chrono-face" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#fef3c7" /><stop offset="100%" stop-color="#b45309" />
    </radialGradient>
    <filter id="chrono-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
  </defs>
  ${gears}
  <circle cx="160" cy="150" r="116" fill="none" stroke="#fbbf24" stroke-width="6" />
  <circle cx="160" cy="150" r="116" fill="none" stroke="#fde68a" stroke-width="2" opacity="0.5" filter="url(#chrono-glow)" />
  ${ticks}
  <circle cx="160" cy="150" r="86" fill="url(#chrono-face)" />
  <circle cx="132" cy="142" r="8" fill="#451a03" /><circle cx="188" cy="142" r="8" fill="#451a03" />
  <circle cx="134" cy="139" r="2.6" fill="#fff" /><circle cx="190" cy="139" r="2.6" fill="#fff" />
  <path d="M146 168 Q160 178 174 168" stroke="#451a03" stroke-width="4.5" fill="none" stroke-linecap="round" />
  <line x1="160" y1="150" x2="160" y2="94" stroke="#451a03" stroke-width="5" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" values="0 160 150;360 160 150" dur="12s" repeatCount="indefinite" />
  </line>
  <line x1="160" y1="150" x2="206" y2="150" stroke="#b91c1c" stroke-width="3" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" values="0 160 150;360 160 150" dur="4s" repeatCount="indefinite" />
  </line>
  <circle cx="160" cy="150" r="7" fill="#451a03" />
</svg>`;
}
