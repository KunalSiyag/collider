export interface ElementalOptions {
  size?: number;
}

export function createElementalCrystal(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 137; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const shards = Array.from({ length: 5 }, () => {
    const x = 30 + rand() * 260; const h = 24 + rand() * 46;
    return `<polygon points="${x.toFixed(1)},300 ${(x - 12).toFixed(1)},${(300 - h * 0.55).toFixed(1)} ${x.toFixed(1)},${(300 - h).toFixed(1)} ${(x + 12).toFixed(1)},${(300 - h * 0.55).toFixed(1)}" fill="#a78bfa" opacity="0.5"><animate attributeName="opacity" values="0.5;0.15;0.5" dur="${(2.5 + rand() * 3).toFixed(1)}s" repeatCount="indefinite" /></polygon>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="crys-facet" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e9d5ff" /><stop offset="50%" stop-color="#a78bfa" /><stop offset="100%" stop-color="#6d28d9" />
    </linearGradient>
    <filter id="crys-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7" /></filter>
  </defs>
  <ellipse cx="160" cy="292" rx="86" ry="11" fill="#8b5cf6" opacity="0.22" />
  ${shards}
  <g>
    <path d="M160 44 L216 140 L192 268 L128 268 L104 140 Z" fill="url(#crys-facet)">
      <animate attributeName="opacity" values="1;0.85;1" dur="3s" repeatCount="indefinite" />
    </path>
    <path d="M160 44 L160 268 M104 140 L216 140" stroke="#f5f3ff" stroke-width="2" opacity="0.6" />
    <path d="M160 44 L128 268" stroke="#fff" stroke-width="1.4" opacity="0.4" />
    <path d="M160 44 L104 140 Z" fill="#f3e8ff" opacity="0.45" />
  </g>
  <circle cx="138" cy="168" r="9" fill="#2e1065" /><circle cx="182" cy="168" r="9" fill="#2e1065" />
  <circle cx="141" cy="165" r="3" fill="#f5f3ff" /><circle cx="185" cy="165" r="3" fill="#f5f3ff" />
  <path d="M146 196 L160 206 L174 196" stroke="#2e1065" stroke-width="4.5" fill="none" stroke-linecap="round" />
  <circle cx="160" cy="110" r="16" fill="#ddd6fe" opacity="0.5" filter="url(#crys-glow)">
    <animate attributeName="r" values="13;19;13" dur="2.6s" repeatCount="indefinite" />
  </circle>
  <circle cx="133.4" cy="84.7" r="1.8" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.6s" begin="0.2s" repeatCount="indefinite" /></circle>
  <circle cx="98" cy="228" r="2" fill="#fbbf24" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
