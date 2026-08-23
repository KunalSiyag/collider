export interface ElementalOptions {
  size?: number;
}

export function createElementalHalo(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 521; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const sparks = Array.from({ length: 8 }, (_, i) => {
    const a = (i * 360) / 8;
    return `<rect x="158" y="34" width="4" height="18" rx="2" fill="#fef9c3" transform="rotate(${a} 160 160)"><animate attributeName="opacity" values="0.3;1;0.3" dur="${(1.6 + rand() * 1.6).toFixed(1)}s" begin="${(rand()).toFixed(1)}s" repeatCount="indefinite" /></rect>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="halo-core" cx="50%" cy="42%" r="62%">
      <stop offset="0%" stop-color="#fffbeb" /><stop offset="100%" stop-color="#fbbf24" />
    </radialGradient>
    <filter id="halo-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="10" /></filter>
  </defs>
  ${sparks}
  <circle cx="160" cy="160" r="104" fill="none" stroke="#fde68a" stroke-width="10" opacity="0.55" filter="url(#halo-glow)">
    <animate attributeName="stroke-width" values="8;14;8" dur="3.4s" repeatCount="indefinite" />
  </circle>
  <circle cx="160" cy="160" r="96" fill="none" stroke="#fde047" stroke-width="5">
    <animate attributeName="r" values="94;99;94" dur="3.4s" repeatCount="indefinite" />
  </circle>
  <circle cx="160" cy="172" r="58" fill="url(#halo-core)" />
  <path d="M132 118 Q160 84 188 118 Q160 106 132 118 Z" fill="#fde68a" />
  <circle cx="142" cy="166" r="8" fill="#78350f" /><circle cx="178" cy="166" r="8" fill="#78350f" />
  <circle cx="144.5" cy="163" r="2.8" fill="#fff" /><circle cx="180.5" cy="163" r="2.8" fill="#fff" />
  <path d="M146 190 Q160 200 174 190" stroke="#78350f" stroke-width="4.5" fill="none" stroke-linecap="round" />
  <circle cx="120" cy="182" r="7" fill="#fb7185" opacity="0.75"><animate attributeName="cy" values="176;186;176" dur="2.2s" repeatCount="indefinite" /></circle>
  <circle cx="202" cy="184" r="7" fill="#fb7185" opacity="0.75"><animate attributeName="cy" values="178;188;178" dur="2.6s" begin="0.5s" repeatCount="indefinite" /></circle>
  <circle cx="243.1" cy="209.5" r="3.7" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.4s" begin="0.7s" repeatCount="indefinite" /></circle>
  <circle cx="185.7" cy="218.3" r="2.6" fill="none" stroke="#4ade80" stroke-width="1.4"><animate attributeName="r" values="2.6;7.6;2.6" dur="4.3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.4s" repeatCount="indefinite" /></circle>
  <rect x="48.1" y="216.9" width="3.2" height="3.6" fill="#67e8f9" opacity="0.55" transform="rotate(34 48.1 216.9)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.9s" repeatCount="indefinite" /></rect>
  <circle cx="78" cy="68" r="2" fill="#a78bfa" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
