export interface ElementalOptions {
  size?: number;
}

export function createElementalMeteor(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 751; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const streaks = Array.from({ length: 5 }, () => {
    const y = 20 + rand() * 160; const dur = 1.6 + rand() * 2;
    return `<line x1="${(60 + rand() * 120).toFixed(0)}" y1="${y.toFixed(0)}" x2="${(100 + rand() * 100).toFixed(0)}" y2="${(y + 40).toFixed(0)}" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"><animate attributeName="opacity" values="0;0.9;0" dur="${dur.toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /><animateTransform attributeName="transform" type="translate" values="-80 -30;80 30" dur="${dur.toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /></line>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="met-rock" cx="38%" cy="34%" r="70%">
      <stop offset="0%" stop-color="#a8a29e" /><stop offset="65%" stop-color="#44403c" /><stop offset="100%" stop-color="#1c1917" />
    </radialGradient>
    <linearGradient id="met-tail" x1="1" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#f97316" /><stop offset="100%" stop-color="#f97316" stop-opacity="0" />
    </linearGradient>
    <filter id="met-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="10" /></filter>
  </defs>
  ${streaks}
  <g transform="rotate(-35 160 160)">
    <path d="M300 160 Q200 130 90 152 L40 160 L90 168 Q200 190 300 160 Z" fill="url(#met-tail)" opacity="0.85">
      <animate attributeName="opacity" values="0.7;1;0.7" dur="1.4s" repeatCount="indefinite" />
    </path>
    <circle cx="110" cy="160" r="46" fill="#f97316" filter="url(#met-glow)" opacity="0.5">
      <animate attributeName="r" values="44;52;44" dur="1.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="110" cy="160" r="38" fill="url(#met-rock)">
      <animate attributeName="cy" values="158;162;158" dur="0.9s" repeatCount="indefinite" />
    </circle>
    <circle cx="96" cy="148" r="9" fill="#78716c" opacity="0.8" /><circle cx="124" cy="172" r="6" fill="#57534e" opacity="0.8" />
    <circle cx="98" cy="164" r="7" fill="#111" /><circle cx="126" cy="150" r="7" fill="#111" />
    <circle cx="99.5" cy="161.5" r="2.2" fill="#fde047" /><circle cx="127.5" cy="147.5" r="2.2" fill="#fde047" />
    <path d="M104 176 Q112 182 120 174" stroke="#111" stroke-width="3.5" fill="none" stroke-linecap="round" transform="rotate(-14 112 176)" />
  </g>
</svg>`;
}
