export interface ElementalOptions {
  size?: number;
}

export function createElementalFungus(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 353; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const spores = Array.from({ length: 9 }, () => {
    const x = 60 + rand() * 200; const dur = 3 + rand() * 3;
    return `<circle cx="${x.toFixed(1)}" cy="180" r="${(2 + rand() * 2.5).toFixed(1)}" fill="#d8b4fe"><animate attributeName="cy" values="180;${(40 + rand() * 60).toFixed(0)}" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0;0.9;0" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="fun-cap" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f472b6" /><stop offset="100%" stop-color="#be185d" />
    </linearGradient>
    <radialGradient id="fun-gill" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#fdf4ff" /><stop offset="100%" stop-color="#e9d5ff" />
    </radialGradient>
    <filter id="fun-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
  </defs>
  <ellipse cx="160" cy="294" rx="80" ry="10" fill="#a21caf" opacity="0.2" />
  ${spores}
  <path d="M148 170 C144 220 146 258 152 286 L172 286 C176 250 176 210 174 170 Z" fill="url(#fun-gill)" />
  <g stroke="#c084fc" stroke-width="1.6" opacity="0.7">
    <line x1="156" y1="176" x2="154" y2="282" /><line x1="164" y1="176" x2="164" y2="284" />
  </g>
  <path d="M160 62 C224 62 262 106 260 142 C258 166 216 178 160 178 C104 178 62 166 60 142 C58 106 96 62 160 62 Z" fill="url(#fun-cap)" filter="url(#fun-glow)" opacity="0.55">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="3.8s" repeatCount="indefinite" />
  </path>
  <path d="M160 66 C220 66 256 108 254 142 C252 164 212 174 160 174 C108 174 68 164 66 142 C64 108 100 66 160 66 Z" fill="url(#fun-cap)" />
  <g fill="#fdf4ff">
    <circle cx="118" cy="112" r="10"><animate attributeName="r" values="10;12;10" dur="2.6s" repeatCount="indefinite" /></circle>
    <circle cx="168" cy="94" r="7" /><circle cx="206" cy="120" r="11"><animate attributeName="r" values="11;9;11" dur="3.1s" repeatCount="indefinite" /></circle>
    <circle cx="98" cy="140" r="5" /><circle cx="238" cy="146" r="6" />
  </g>
  <circle cx="138" cy="208" r="8" fill="#4a044e" /><circle cx="184" cy="208" r="8" fill="#4a044e" />
  <circle cx="141" cy="205" r="2.6" fill="#fff" /><circle cx="187" cy="205" r="2.6" fill="#fff" />
  <path d="M148 228 Q161 236 174 228" stroke="#4a044e" stroke-width="4" fill="none" stroke-linecap="round" />
</svg>`;
}
