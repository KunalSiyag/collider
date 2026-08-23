export interface ElementalOptions {
  size?: number;
}

export function createElementalOpal(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 967; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const palette = ['#f472b6', '#22d3ee', '#a78bfa', '#4ade80', '#fbbf24'];
  const fires = Array.from({ length: 6 }, (_, i) => {
    const x = 100 + rand() * 120; const y = 90 + rand() * 130;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(4 + rand() * 7).toFixed(1)}" fill="${palette[i % palette.length]}" opacity="0.5"><animate attributeName="opacity" values="0.5;0.05;0.5" dur="${(1.8 + rand() * 2.2).toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="opal-body" cx="42%" cy="38%" r="70%">
      <stop offset="0%" stop-color="#fdf4ff" /><stop offset="60%" stop-color="#d8b4fe" /><stop offset="100%" stop-color="#6b21a8" />
    </radialGradient>
    <filter id="opal-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9" /></filter>
  </defs>
  ${fires}
  <ellipse cx="160" cy="290" rx="76" ry="10" fill="#c084fc" opacity="0.22" />
  <circle cx="160" cy="162" r="94" fill="#e879f9" filter="url(#opal-glow)" opacity="0.3">
    <animate attributeName="r" values="90;100;90" dur="3.2s" repeatCount="indefinite" />
  </circle>
  <path d="M160 64 C218 68 250 114 246 170 C242 228 204 264 158 260 C112 256 76 220 80 164 C84 108 108 60 160 64 Z" fill="url(#opal-body)">
    <animate attributeName="fill" values="#fdf4ff;#bae6fd;#fbcfe8;#ddd6fe;#fdf4ff" dur="7s" repeatCount="indefinite" />
  </path>
  <ellipse cx="128" cy="112" rx="20" ry="11" fill="#fff" opacity="0.85" transform="rotate(-26 128 112)" />
  <circle cx="138" cy="160" r="9" fill="#581c87" /><circle cx="184" cy="158" r="9" fill="#581c87" />
  <circle cx="141" cy="157" r="3" fill="#fff" /><circle cx="187" cy="155" r="3" fill="#fff" />
  <path d="M146 190 Q161 198 176 188" stroke="#581c87" stroke-width="4" fill="none" stroke-linecap="round" />
  <circle cx="257.2" cy="110.3" r="4.2" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.8s" begin="0.7s" repeatCount="indefinite" /></circle>
  <circle cx="39.8" cy="115.6" r="1.7" fill="none" stroke="#fbbf24" stroke-width="1.4"><animate attributeName="r" values="1.7;6.7;1.7" dur="3.6s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="2.8s" repeatCount="indefinite" /></circle>
  <rect x="168.0" y="76.0" width="3.1" height="4.6" fill="#fde047" opacity="0.55" transform="rotate(17 168.0 76.0)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.1s" repeatCount="indefinite" /></rect>
  <circle cx="186.8" cy="273.0" r="4.1" fill="#67e8f9" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.6s" begin="0.2s" repeatCount="indefinite" /></circle>
  <circle cx="113" cy="123" r="2" fill="#22d3ee" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
