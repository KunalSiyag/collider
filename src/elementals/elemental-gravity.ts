export interface ElementalOptions {
  size?: number;
}

export function createElementalGravity(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 491; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const debris = Array.from({ length: 8 }, (_, i) => {
    const a = rand() * Math.PI * 2; const r = 90 + rand() * 50; const dur = 5 + rand() * 6;
    return `<circle cx="${(160 + Math.cos(a) * r).toFixed(1)}" cy="${(160 + Math.sin(a) * r * 0.55).toFixed(1)}" r="${(2 + rand() * 4).toFixed(1)}" fill="#c4b5fd"><animateTransform attributeName="transform" type="rotate" values="0 160 160;-360 160 160" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="grav-well" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#000" /><stop offset="70%" stop-color="#4c1d95" /><stop offset="100%" stop-color="#7c3aed" stop-opacity="0" />
    </radialGradient>
    <filter id="grav-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="10" /></filter>
  </defs>
  <ellipse cx="160" cy="160" rx="150" ry="80" fill="none" stroke="#6d28d9" stroke-width="1.6" opacity="0.5">
    <animateTransform attributeName="transform" type="rotate" values="3 160 160;-3 160 160;3 160 160" dur="9s" repeatCount="indefinite" />
  </ellipse>
  ${debris}
  <circle cx="160" cy="160" r="86" fill="url(#grav-glow)" opacity="0.7" filter="url(#grav-glow)">
    <animate attributeName="r" values="82;92;82" dur="3.2s" repeatCount="indefinite" />
  </circle>
  <circle cx="160" cy="160" r="58" fill="#111" stroke="#a78bfa" stroke-width="3" />
  <path d="M104 148 A58 58 0 0 1 216 142" fill="none" stroke="#fbbf24" stroke-width="5" stroke-linecap="round" opacity="0.95">
    <animate attributeName="stroke-dashoffset" values="0;-140" dur="2.4s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="1;0.5;1" dur="2.4s" repeatCount="indefinite" />
  </path>
  <circle cx="138" cy="156" r="8" fill="#e9d5ff" /><circle cx="184" cy="156" r="8" fill="#e9d5ff" />
  <circle cx="141" cy="153" r="2.8" fill="#111" /><circle cx="187" cy="153" r="2.8" fill="#111" />
  <path d="M146 178 Q161 188 176 178" stroke="#e9d5ff" stroke-width="4.5" fill="none" stroke-linecap="round" />
  <circle cx="285.1" cy="56.8" r="3.4" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.7s" begin="0.9s" repeatCount="indefinite" /></circle>
  <circle cx="116.5" cy="32.2" r="2.4" fill="none" stroke="#f472b6" stroke-width="1.4"><animate attributeName="r" values="2.4;7.4;2.4" dur="4.2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.6s" repeatCount="indefinite" /></circle>
  <circle cx="122" cy="92" r="2" fill="#f472b6" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
