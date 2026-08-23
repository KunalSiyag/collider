export interface ElementalOptions {
  size?: number;
}

export function createElementalSilk(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1229; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const threads = Array.from({ length: 5 }, (_, i) => {
    const y0 = 60 + i * 44;
    return `<path d="M-20 ${y0} C80 ${(y0 - 24).toFixed(0)} 240 ${(y0 + 24).toFixed(0)} 340 ${y0}" stroke="#fce7f3" stroke-width="1.8" fill="none" opacity="0.75">
      <animate attributeName="d" dur="${(4 + rand() * 3).toFixed(1)}s" repeatCount="indefinite"
        values="M-20 ${y0} C80 ${(y0 - 24).toFixed(0)} 240 ${(y0 + 24).toFixed(0)} 340 ${y0};
                M-20 ${y0} C80 ${(y0 + 22).toFixed(0)} 240 ${(y0 - 22).toFixed(0)} 340 ${y0};
                M-20 ${y0} C80 ${(y0 - 24).toFixed(0)} 240 ${(y0 + 24).toFixed(0)} 340 ${y0}" />
    </path>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="silk-body" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fdf2f8" /><stop offset="50%" stop-color="#f9a8d4" /><stop offset="100%" stop-color="#be185d" />
    </linearGradient>
    <filter id="silk-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5" /></filter>
  </defs>
  ${threads}
  <path d="M160 64 C222 68 254 114 250 172 C246 228 206 266 158 262 C110 258 72 220 76 164 C80 108 104 60 160 64 Z" fill="url(#silk-body)" filter="url(#silk-glow)" opacity="0.35">
    <animate attributeName="d" dur="4.6s" repeatCount="indefinite"
      values="M160 64 C222 68 254 114 250 172 C246 228 206 266 158 262 C110 258 72 220 76 164 C80 108 104 60 160 64 Z;
              M158 70 C222 58 254 118 246 176 C240 230 198 270 154 256 C112 244 82 216 86 160 C90 106 96 78 158 70 Z;
              M160 64 C222 68 254 114 250 172 C246 228 206 266 158 262 C110 258 72 220 76 164 C80 108 104 60 160 64 Z" />
  </path>
  <path d="M160 74 C216 78 244 120 240 170 C236 220 200 254 158 250 C116 246 86 212 90 162 C94 112 112 70 160 74 Z" fill="url(#silk-body)" />
  <path d="M112 128 Q142 108 172 124" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none" opacity="0.85">
    <animate attributeName="d" dur="3.6s" repeatCount="indefinite"
      values="M112 128 Q142 108 172 124;
              M114 132 Q144 116 174 128;
              M112 128 Q142 108 172 124" />
  </path>
  <circle cx="138" cy="160" r="8.5" fill="#831843"><animate attributeName="r" values="8;9.5;8" dur="2.4s" repeatCount="indefinite" /></circle>
  <circle cx="184" cy="158" r="8.5" fill="#831843"><animate attributeName="r" values="9.5;8;9.5" dur="2.4s" repeatCount="indefinite" /></circle>
  <circle cx="140.5" cy="157" r="2.8" fill="#fff" /><circle cx="186.5" cy="155" r="2.8" fill="#fff" />
  <path d="M148 186 Q161 193 174 185" stroke="#831843" stroke-width="4" fill="none" stroke-linecap="round" />
</svg>`;
}
