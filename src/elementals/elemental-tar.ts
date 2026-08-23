export interface ElementalOptions {
  size?: number;
}

export function createElementalTar(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1409; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const drips = Array.from({ length: 3 }, () => {
    const x = 100 + rand() * 120; const len = 26 + rand() * 34;
    return `<path d="M${x.toFixed(1)} 250 q5 ${len * 0.55} 0 ${len}" stroke="#0f172a" stroke-width="10" fill="none" stroke-linecap="round"><animate attributeName="stroke-dasharray" values="0 ${len + 10};${len} 10" dur="${(2.6 + rand() * 2).toFixed(1)}s" repeatCount="indefinite" /></path>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="tar-body" cx="40%" cy="32%" r="74%">
      <stop offset="0%" stop-color="#334155" /><stop offset="60%" stop-color="#0f172a" /><stop offset="100%" stop-color="#000000" />
    </radialGradient>
    <filter id="tar-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" /></filter>
  </defs>
  <ellipse cx="160" cy="292" rx="80" ry="10" fill="#0f172a" opacity="0.8" />
  ${drips}
  <path d="M160 58 C228 62 260 114 254 174 C248 232 206 272 154 268 C102 264 64 224 70 164 C76 106 98 54 160 58 Z" fill="url(#tar-body)" filter="url(#tar-soft)">
    <animate attributeName="d" dur="5s" repeatCount="indefinite"
      values="M160 58 C228 62 260 114 254 174 C248 232 206 272 154 268 C102 264 64 224 70 164 C76 106 98 54 160 58 Z;
              M158 52 C230 56 262 118 252 178 C246 234 200 276 150 262 C100 248 72 218 78 160 C84 104 92 46 158 52 Z;
              M160 58 C228 62 260 114 254 174 C248 232 206 272 154 268 C102 264 64 224 70 164 C76 106 98 54 160 58 Z" />
  </path>
  <ellipse cx="124" cy="106" rx="20" ry="10" fill="#94a3b8" opacity="0.35" transform="rotate(-22 124 106)">
    <animate attributeName="opacity" values="0.35;0.1;0.35" dur="3.4s" repeatCount="indefinite" />
  </ellipse>
  <circle cx="136" cy="152" r="11" fill="#fbbf24"><animate attributeName="r" values="10;12;10" dur="2.4s" repeatCount="indefinite" /></circle>
  <circle cx="186" cy="150" r="11" fill="#fbbf24"><animate attributeName="r" values="12;10;12" dur="2.4s" begin="0.6s" repeatCount="indefinite" /></circle>
  <circle cx="139" cy="149" r="3.6" fill="#111" /><circle cx="189" cy="147" r="3.6" fill="#111" />
  <path d="M148 184 Q161 191 174 183" stroke="#fbbf24" stroke-width="4" fill="none" stroke-linecap="round" />
  <circle cx="210.2" cy="164.6" r="2.7" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.2s" begin="0.6s" repeatCount="indefinite" /></circle>
  <circle cx="227.5" cy="218.7" r="3.8" fill="none" stroke="#f472b6" stroke-width="1.4"><animate attributeName="r" values="3.8;8.8;3.8" dur="4.0s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.4s" repeatCount="indefinite" /></circle>
  <circle cx="268" cy="38" r="2" fill="#f472b6" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
