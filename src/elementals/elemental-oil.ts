export interface ElementalOptions {
  size?: number;
}

export function createElementalOil(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 937; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const sheen = Array.from({ length: 4 }, () => {
    const x = 90 + rand() * 140; const y = 100 + rand() * 120; const w = 20 + rand() * 30;
    return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${w.toFixed(0)}" ry="6" fill="#a78bfa" opacity="0.35" transform="rotate(-18 ${x.toFixed(1)} ${y.toFixed(1)})"><animate attributeName="opacity" values="0.35;0.08;0.35" dur="${(2.5 + rand() * 2.5).toFixed(1)}s" repeatCount="indefinite" /></ellipse>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="oil-body" cx="40%" cy="34%" r="72%">
      <stop offset="0%" stop-color="#6d28d9" /><stop offset="55%" stop-color="#1e1b4b" /><stop offset="100%" stop-color="#000" />
    </radialGradient>
    <filter id="oil-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" /></filter>
  </defs>
  <ellipse cx="160" cy="290" rx="76" ry="10" fill="#4c1d95" opacity="0.3" />
  <path d="M160 60 C226 66 258 118 250 176 C242 234 202 272 154 266 C106 260 68 220 74 162 C80 106 102 54 160 60 Z" fill="url(#oil-body)" filter="url(#oil-soft)">
    <animate attributeName="d" dur="4.4s" repeatCount="indefinite"
      values="M160 60 C226 66 258 118 250 176 C242 234 202 272 154 266 C106 260 68 220 74 162 C80 106 102 54 160 60 Z;
              M156 66 C224 56 256 122 246 180 C240 236 198 276 152 260 C108 246 80 216 84 160 C88 104 94 74 156 66 Z;
              M160 60 C226 66 258 118 250 176 C242 234 202 272 154 266 C106 260 68 220 74 162 C80 106 102 54 160 60 Z" />
  </path>
  ${sheen}
  <path d="M110 230 Q150 210 190 228 T250 218" stroke="#7c3aed" stroke-width="3" fill="none" opacity="0.6">
    <animate attributeName="d" dur="3.8s" repeatCount="indefinite"
      values="M110 230 Q150 210 190 228 T250 218;
              M110 224 Q152 218 192 222 T250 224;
              M110 230 Q150 210 190 228 T250 218" />
  </path>
  <circle cx="136" cy="146" r="10" fill="#fbbf24"><animate attributeName="r" values="9;11;9" dur="2.2s" repeatCount="indefinite" /></circle>
  <circle cx="186" cy="146" r="10" fill="#fbbf24"><animate attributeName="r" values="11;9;11" dur="2.2s" repeatCount="indefinite" /></circle>
  <path d="M146 178 Q161 187 176 178" stroke="#fbbf24" stroke-width="4.5" fill="none" stroke-linecap="round" />

</svg>`;
}
