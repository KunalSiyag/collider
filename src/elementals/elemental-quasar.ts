export interface ElementalOptions {
  size?: number;
}

export function createElementalQuasar(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1103; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const jets = Array.from({ length: 2 }, (_, i) => {
    const dir = i === 0 ? -1 : 1;
    return `<path d="M160 160 L${(140 + rand() * 40).toFixed(0)} ${(160 + dir * (90 + rand() * 30)).toFixed(0)} L${(180 + rand() * 20).toFixed(0)} ${(160 + dir * (110 + rand() * 20)).toFixed(0)} Z" fill="#67e8f9" opacity="0.75"><animate attributeName="opacity" values="0.75;0.3;0.75" dur="${(1.6 + rand()).toFixed(1)}s" begin="${(i * 0.4).toFixed(1)}s" repeatCount="indefinite" /></path>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="qs-disk" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#fef08a" /><stop offset="60%" stop-color="#f97316" /><stop offset="100%" stop-color="#f97316" stop-opacity="0" />
    </radialGradient>
    <filter id="qs-glow" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="12" /></filter>
  </defs>
  ${jets}
  <ellipse cx="160" cy="160" rx="120" ry="26" fill="url(#qs-disk)" filter="url(#qs-glow)">
    <animateTransform attributeName="transform" type="rotate" values="-8 160 160;8 160 160;-8 160 160" dur="5s" repeatCount="indefinite" />
  </ellipse>
  <ellipse cx="160" cy="160" rx="86" ry="18" fill="#fff7ed" opacity="0.85">
    <animate attributeName="rx" values="82;92;82" dur="2.2s" repeatCount="indefinite" />
  </ellipse>
  <circle cx="160" cy="160" r="34" fill="#1e1b4b">
    <animate attributeName="r" values="32;37;32" dur="2.2s" repeatCount="indefinite" />
  </circle>
  <circle cx="160" cy="160" r="34" fill="none" stroke="#22d3ee" stroke-width="2.5">
    <animate attributeName="stroke-opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite" />
  </circle>
  <circle cx="146" cy="154" r="6" fill="#e0f2fe" /><circle cx="176" cy="154" r="6" fill="#e0f2fe" />
  <circle cx="148" cy="152" r="2.2" fill="#0e7490" /><circle cx="178" cy="152" r="2.2" fill="#0e7490" />
  <path d="M150 172 Q161 179 172 172" stroke="#e0f2fe" stroke-width="3.5" fill="none" stroke-linecap="round" />
  <circle cx="81.3" cy="249.6" r="3.0" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.7s" begin="0.5s" repeatCount="indefinite" /></circle>
  <circle cx="195" cy="265" r="2" fill="#22d3ee" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
