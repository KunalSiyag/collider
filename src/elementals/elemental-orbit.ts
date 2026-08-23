export interface ElementalOptions {
  size?: number;
}

export function createElementalOrbit(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 997; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const moons = Array.from({ length: 3 }, (_, i) => {
    const r = 70 + i * 26;
    return `<circle cx="${160 + r}" cy="160" r="${5 + i * 2}" fill="#fbbf24"><animateTransform attributeName="transform" type="rotate" values="0 160 160;-360 160 160" dur="${(6 + i * 4).toFixed(0)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  const dust = Array.from({ length: 8 }, () => {
    const a = rand() * Math.PI * 2; const r = 60 + rand() * 80;
    return `<circle cx="${(160 + Math.cos(a) * r).toFixed(1)}" cy="${(160 + Math.sin(a) * r * 0.42).toFixed(1)}" r="${(1.2 + rand() * 1.8).toFixed(1)}" fill="#c4b5fd" opacity="0.6"><animateTransform attributeName="transform" type="rotate" values="0 160 160;360 160 160" dur="${(9 + rand() * 9).toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="orb-planet" cx="38%" cy="34%" r="72%">
      <stop offset="0%" stop-color="#a78bfa" /><stop offset="60%" stop-color="#6d28d9" /><stop offset="100%" stop-color="#2e1065" />
    </radialGradient>
    <filter id="orb-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="10" /></filter>
  </defs>
  <ellipse cx="160" cy="160" rx="130" ry="52" fill="none" stroke="#7c3aed" stroke-width="2" opacity="0.55">
    <animateTransform attributeName="transform" type="rotate" values="14 160 160;18 160 160;14 160 160" dur="8s" repeatCount="indefinite" />
  </ellipse>
  ${moons}
  ${dust}
  <circle cx="160" cy="160" r="58" fill="url(#orb-planet)">
    <animate attributeName="r" values="56;60;56" dur="3.6s" repeatCount="indefinite" />
  </circle>
  <path d="M112 142 Q140 128 166 138 T210 134" stroke="#ddd6fe" stroke-width="4" fill="none" opacity="0.65">
    <animate attributeName="opacity" values="0.65;0.25;0.65" dur="4s" repeatCount="indefinite" />
  </path>
  <circle cx="142" cy="158" r="7" fill="#f5f3ff" /><circle cx="182" cy="158" r="7" fill="#f5f3ff" />
  <circle cx="144" cy="156" r="2.6" fill="#2e1065" /><circle cx="184" cy="156" r="2.6" fill="#2e1065" />
  <path d="M150 178 Q161 185 172 178" stroke="#f5f3ff" stroke-width="4" fill="none" stroke-linecap="round" />
</svg>`;
}
