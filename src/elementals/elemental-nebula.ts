export interface ElementalOptions {
  size?: number;
}

export function createElementalNebula(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 839; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const stars = Array.from({ length: 16 }, () => `<circle cx="${(rand() * 320).toFixed(1)}" cy="${(rand() * 320).toFixed(1)}" r="${(0.6 + rand() * 1.4).toFixed(1)}" fill="#f5f3ff"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="${(1.2 + rand() * 2.8).toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /></circle>`).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="neb-pink" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#f472b6" stop-opacity="0.85" /><stop offset="100%" stop-color="#f472b6" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="neb-cyan" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.8" /><stop offset="100%" stop-color="#22d3ee" stop-opacity="0" />
    </radialGradient>
    <filter id="neb-soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="10" /></filter>
  </defs>
  ${stars}
  <ellipse cx="130" cy="150" rx="110" ry="80" fill="url(#neb-pink)" transform="rotate(-20 130 150)">
    <animate attributeName="rx" values="104;118;104" dur="7s" repeatCount="indefinite" />
  </ellipse>
  <ellipse cx="205" cy="190" rx="96" ry="66" fill="url(#neb-cyan)" transform="rotate(24 205 190)">
    <animate attributeName="ry" values="60;74;60" dur="8s" repeatCount="indefinite" />
  </ellipse>
  <g filter="url(#neb-soft)">
    <path d="M90 200 Q140 140 170 170 T250 120" stroke="#c4b5fd" stroke-width="14" fill="none" opacity="0.5">
      <animate attributeName="d" dur="9s" repeatCount="indefinite"
        values="M90 200 Q140 140 170 170 T250 120;
                M86 192 Q142 152 176 162 T254 132;
                M90 200 Q140 140 170 170 T250 120" />
    </path>
  </g>
  <circle cx="160" cy="160" r="34" fill="#faf5ff" />
  <circle cx="160" cy="160" r="34" fill="#a78bfa" opacity="0.4"><animate attributeName="opacity" values="0.2;0.55;0.2" dur="3s" repeatCount="indefinite" /></circle>
  <circle cx="148" cy="154" r="6" fill="#312e81" /><circle cx="174" cy="154" r="6" fill="#312e81" />
  <circle cx="150" cy="151.5" r="2" fill="#fff" /><circle cx="176" cy="151.5" r="2" fill="#fff" />
  <path d="M150 172 Q160 179 170 172" stroke="#312e81" stroke-width="3.5" fill="none" stroke-linecap="round" />
</svg>`;
}
