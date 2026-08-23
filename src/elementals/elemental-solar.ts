export interface ElementalOptions {
  size?: number;
}

export function createElementalSolar(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1283; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const flares = Array.from({ length: 5 }, () => {
    const a = rand() * Math.PI * 2; const r1 = 66; const r2 = r1 + 26 + rand() * 22;
    return `<path d="M${(160 + Math.cos(a) * r1).toFixed(1)} ${(160 + Math.sin(a) * r1).toFixed(1)} Q${(160 + Math.cos(a + 0.12) * ((r1 + r2) / 2)).toFixed(1)} ${(160 + Math.sin(a + 0.12) * ((r1 + r2) / 2)).toFixed(1)} ${(160 + Math.cos(a - 0.06) * r2).toFixed(1)} ${(160 + Math.sin(a - 0.06) * r2).toFixed(1)}" stroke="#fb923c" stroke-width="4" fill="none" stroke-linecap="round"><animate attributeName="opacity" values="0;1;0" dur="${(1.6 + rand() * 2).toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /></path>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="sol-body" cx="46%" cy="42%" r="62%">
      <stop offset="0%" stop-color="#fef9c3" /><stop offset="60%" stop-color="#f97316" /><stop offset="100%" stop-color="#c2410c" />
    </radialGradient>
    <filter id="sol-glow" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="16" /></filter>
  </defs>
  ${flares}
  <circle cx="160" cy="160" r="102" fill="#f59e0b" filter="url(#sol-glow)" opacity="0.45">
    <animate attributeName="r" values="98;112;98" dur="2.8s" repeatCount="indefinite" />
  </circle>
  <circle cx="160" cy="160" r="72" fill="url(#sol-body)">
    <animate attributeName="r" values="70;76;70" dur="2.8s" repeatCount="indefinite" />
  </circle>
  <g opacity="0.55">
    <ellipse cx="132" cy="132" rx="14" ry="9" fill="#b45309" transform="rotate(-20 132 132)" />
    <ellipse cx="192" cy="186" rx="16" ry="10" fill="#b45309" transform="rotate(15 192 186)" />
    <ellipse cx="150" cy="204" rx="9" ry="6" fill="#7c2d12" />
  </g>
  <circle cx="140" cy="148" r="8" fill="#7c2d12"><animate attributeName="cy" values="146;151;146" dur="2s" repeatCount="indefinite" /></circle>
  <circle cx="180" cy="148" r="8" fill="#7c2d12"><animate attributeName="cy" values="151;146;151" dur="2s" begin="0.6s" repeatCount="indefinite" /></circle>
  <circle cx="142" cy="145" r="2.6" fill="#fff" /><circle cx="182" cy="145" r="2.6" fill="#fff" />
  <path d="M148 172 Q161 181 174 172" stroke="#7c2d12" stroke-width="4.5" fill="none" stroke-linecap="round" />
  <circle cx="163.8" cy="54.9" r="4.1" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.2s" begin="0.5s" repeatCount="indefinite" /></circle>
  <circle cx="154" cy="144" r="2" fill="#f472b6" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
