export interface ElementalOptions {
  size?: number;
}

export function createElementalMirage(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 797; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const waves = Array.from({ length: 4 }, (_, i) => {
    const y = 230 + i * 22;
    return `<path d="M0 ${y} Q80 ${(y - 12).toFixed(0)} 160 ${y} T320 ${y}" stroke="#fbbf24" stroke-width="2.5" fill="none" opacity="${(0.4 - i * 0.08).toFixed(2)}"><animate attributeName="d" dur="${(3 + i).toFixed(1)}s" repeatCount="indefinite" values="M0 ${y} Q80 ${(y - 12).toFixed(0)} 160 ${y} T320 ${y};M0 ${y} Q80 ${(y + 10).toFixed(0)} 160 ${y} T320 ${y};M0 ${y} Q80 ${(y - 12).toFixed(0)} 160 ${y} T320 ${y}" /></path>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="mir-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.35" /><stop offset="100%" stop-color="#0b0b10" />
    </linearGradient>
    <filter id="mir-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7" /></filter>
  </defs>
  <rect width="320" height="240" fill="url(#mir-sky)" />
  <circle cx="160" cy="120" r="70" fill="none" stroke="#fde68a" stroke-width="3" opacity="0.6">
    <animate attributeName="r" values="66;76;66" dur="4s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.6;0.15;0.6" dur="4s" repeatCount="indefinite" />
  </circle>
  <g filter="url(#mir-soft)" opacity="0.85">
    <path d="M160 70 C200 74 216 108 212 148 C208 184 184 204 158 202 C132 200 110 178 110 144 C110 108 124 68 160 70 Z" fill="#fcd34d">
      <animate attributeName="opacity" values="0.9;0.25;0.9" dur="5s" repeatCount="indefinite" />
    </path>
    <circle cx="142" cy="128" r="8" fill="#78350f"><animate attributeName="opacity" values="1;0.2;1" dur="5s" repeatCount="indefinite" /></circle>
    <circle cx="182" cy="128" r="8" fill="#78350f"><animate attributeName="opacity" values="1;0.2;1" dur="5s" begin="0.4s" repeatCount="indefinite" /></circle>
    <path d="M146 156 Q160 164 174 156" stroke="#78350f" stroke-width="4" fill="none" stroke-linecap="round"><animate attributeName="opacity" values="1;0.2;1" dur="5s" begin="0.8s" repeatCount="indefinite" /></path>
  </g>
  <rect y="228" width="320" height="92" fill="#451a03" opacity="0.55" />
  ${waves}
  <circle cx="164.4" cy="278.8" r="2.2" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.5s" begin="0.5s" repeatCount="indefinite" /></circle>
  <circle cx="58.8" cy="131.5" r="3.9" fill="none" stroke="#f472b6" stroke-width="1.4"><animate attributeName="r" values="3.9;8.9;3.9" dur="4.0s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="2.9s" repeatCount="indefinite" /></circle>
  <circle cx="125" cy="195" r="2" fill="#22d3ee" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
