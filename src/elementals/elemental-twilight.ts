export interface ElementalOptions {
  size?: number;
}

export function createElementalTwilight(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1433; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const stars = Array.from({ length: 10 }, () => `<circle cx="${(rand() * 320).toFixed(1)}" cy="${(rand() * 200).toFixed(1)}" r="${(0.8 + rand() * 1.5).toFixed(1)}" fill="#e9d5ff"><animate attributeName="opacity" values="0.85;0.1;0.85" dur="${(1.6 + rand() * 2.2).toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /></circle>`).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="twi-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e1b4b" /><stop offset="60%" stop-color="#6d28d9" /><stop offset="100%" stop-color="#db2777" />
    </linearGradient>
    <radialGradient id="twi-body" cx="46%" cy="40%" r="64%">
      <stop offset="0%" stop-color="#ede9fe" /><stop offset="65%" stop-color="#8b5cf6" /><stop offset="100%" stop-color="#4c1d95" />
    </radialGradient>
    <filter id="twi-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8" /></filter>
  </defs>
  ${stars}
  <rect width="320" height="250" fill="url(#twi-sky)" />
  <path d="M0 244 L320 236 L320 320 L0 320 Z" fill="#12081f" />
  <circle cx="160" cy="150" r="80" fill="#a78bfa" opacity="0.3" filter="url(#twi-glow)">
    <animate attributeName="r" values="76;88;76" dur="3.6s" repeatCount="indefinite" />
  </circle>
  <path d="M160 74 C216 78 244 118 240 170 C236 222 202 254 158 250 C114 246 80 212 84 160 C88 108 108 70 160 74 Z" fill="url(#twi-body)">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="4.4s" repeatCount="indefinite" />
  </path>
  <g stroke="#fbcfe8" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.85">
    <path d="M112 130 Q126 122 140 128"><animate attributeName="opacity" values="0.85;0.3;0.85" dur="2.4s" repeatCount="indefinite" /></path>
    <path d="M182 124 Q196 118 210 126"><animate attributeName="opacity" values="0.3;0.85;0.3" dur="2.4s" repeatCount="indefinite" /></path>
  </g>
  <circle cx="140" cy="152" r="8" fill="#2e1065" /><circle cx="182" cy="150" r="8" fill="#2e1065" />
  <circle cx="142" cy="149" r="2.6" fill="#fbcfe8" /><circle cx="184" cy="147" r="2.6" fill="#fbcfe8" />
  <path d="M148 178 Q161 186 174 177" stroke="#2e1065" stroke-width="4" fill="none" stroke-linecap="round" />
  <circle cx="285.0" cy="280.6" r="3.6" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.5s" begin="0.8s" repeatCount="indefinite" /></circle>
  <circle cx="132" cy="42" r="2" fill="#a78bfa" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
