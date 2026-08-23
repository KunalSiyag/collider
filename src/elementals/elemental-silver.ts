export interface ElementalOptions {
  size?: number;
}

export function createElementalSilver(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1237; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const glints = Array.from({ length: 6 }, () => {
    const x = rand() * 320; const y = rand() * 320;
    return `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + 8).toFixed(1)}" y2="${(y - 12).toFixed(1)}" stroke="#f1f5f9" stroke-width="2.4" stroke-linecap="round"><animate attributeName="opacity" values="0;1;0" dur="${(1.4 + rand() * 2).toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /></line>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="sil-skin" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f8fafc" /><stop offset="40%" stop-color="#cbd5e1" /><stop offset="70%" stop-color="#64748b" /><stop offset="100%" stop-color="#334155" />
    </linearGradient>
    <filter id="sil-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7" /></filter>
  </defs>
  ${glints}
  <path d="M160 60 C224 64 256 112 252 170 C248 228 208 266 158 262 C108 258 70 220 74 162 C78 106 102 56 160 60 Z" fill="url(#sil-skin)">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="4.8s" repeatCount="indefinite" />
  </path>
  <path d="M104 112 Q136 90 168 106" stroke="#fff" stroke-width="9" stroke-linecap="round" fill="none" opacity="0.95">
    <animate attributeName="opacity" values="0.95;0.45;0.95" dur="3s" repeatCount="indefinite" />
  </path>
  <path d="M196 210 Q216 196 222 174" stroke="#e2e8f0" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.55" />
  <circle cx="138" cy="156" r="9.5" fill="#0f172a"><animate attributeName="r" values="9;10.5;9" dur="2.2s" repeatCount="indefinite" /></circle>
  <circle cx="186" cy="154" r="9.5" fill="#0f172a"><animate attributeName="r" values="10.5;9;10.5" dur="2.2s" begin="0.5s" repeatCount="indefinite" /></circle>
  <circle cx="141" cy="153" r="3" fill="#e2e8f0" /><circle cx="189" cy="151" r="3" fill="#e2e8f0" />
  <path d="M148 184 L159 191 L169 183 L179 190" stroke="#0f172a" stroke-width="4" fill="none" stroke-linecap="round" />
  <circle cx="236.6" cy="74.8" r="3.2" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.0s" begin="0.6s" repeatCount="indefinite" /></circle>
  <circle cx="274.3" cy="175.4" r="4.3" fill="none" stroke="#fde047" stroke-width="1.4"><animate attributeName="r" values="4.3;9.3;4.3" dur="4.0s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.4s" repeatCount="indefinite" /></circle>
  <rect x="106.2" y="261.1" width="4.7" height="4.4" fill="#f472b6" opacity="0.55" transform="rotate(70 106.2 261.1)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.6s" repeatCount="indefinite" /></rect>
  <circle cx="273.6" cy="240.7" r="2.4" fill="#4ade80" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.4s" begin="0.8s" repeatCount="indefinite" /></circle>
  <circle cx="202.6" cy="33.0" r="2.3" fill="none" stroke="#fb7185" stroke-width="1.4"><animate attributeName="r" values="2.3;7.3;2.3" dur="3.9s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.5s" repeatCount="indefinite" /></circle>
  <circle cx="160" cy="150" r="2" fill="#a78bfa" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
