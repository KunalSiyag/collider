export interface ElementalOptions {
  size?: number;
}

export function createElementalOcean(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 907; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const fish = Array.from({ length: 3 }, () => {
    const y = 60 + rand() * 160; const dur = 6 + rand() * 6;
    return `<g><path d="M0 0 l10 5 -10 5 z" fill="#fbbf24" /><ellipse cx="-8" cy="5" rx="8" ry="4.5" fill="#fde68a" /><animateTransform attributeName="transform" type="translate" values="-40 ${y.toFixed(0)};360 ${(y + (rand() * 40 - 20)).toFixed(0)}" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /></g>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="ocn-deep" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0ea5e9" /><stop offset="100%" stop-color="#082f49" />
    </linearGradient>
    <filter id="ocn-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
  </defs>
  ${fish}
  <path d="M20 120 C80 90 240 90 300 120 L300 320 L20 320 Z" fill="url(#ocn-deep)" />
  <path d="M20 124 Q70 106 120 122 T220 118 T300 126 L300 150 Q230 136 160 148 T20 146 Z" fill="#38bdf8" opacity="0.55">
    <animate attributeName="d" dur="4.4s" repeatCount="indefinite"
      values="M20 124 Q70 106 120 122 T220 118 T300 126 L300 150 Q230 136 160 148 T20 146 Z;
              M20 128 Q72 118 122 128 T222 130 T300 122 L300 154 Q228 144 158 152 T20 142 Z;
              M20 124 Q70 106 120 122 T220 118 T300 126 L300 150 Q230 136 160 148 T20 146 Z" />
  </path>
  <circle cx="160" cy="200" r="56" fill="#0369a1">
    <animate attributeName="cy" values="196;206;196" dur="4s" repeatCount="indefinite" />
  </circle>
  <circle cx="160" cy="200" r="56" fill="none" stroke="#38bdf8" stroke-width="2.5" opacity="0.8" filter="url(#ocn-glow)" />
  <path d="M116 186 Q140 172 164 184 T212 180" stroke="#7dd3fc" stroke-width="4" fill="none" opacity="0.75">
    <animate attributeName="d" dur="3s" repeatCount="indefinite"
      values="M116 186 Q140 172 164 184 T212 180;
              M116 190 Q142 178 166 188 T212 184;
              M116 186 Q140 172 164 184 T212 180" />
  </path>
  <circle cx="142" cy="204" r="8" fill="#fff" /><circle cx="182" cy="204" r="8" fill="#fff" />
  <circle cx="145" cy="207" r="4" fill="#082f49" /><circle cx="179" cy="207" r="4" fill="#082f49" />
  <path d="M150 224 Q161 231 172 224" stroke="#bae6fd" stroke-width="4" fill="none" stroke-linecap="round" />
</svg>`;
}
