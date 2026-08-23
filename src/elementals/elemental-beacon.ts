export interface ElementalOptions {
  size?: number;
}

export function createElementalBeacon(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1613; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const beams = [0, 90, 180, 270].map((a, i) => `<path d="M160 160 L${(320).toFixed(0)} 148 L320 172 Z" fill="#fde047" opacity="0.5" transform="rotate(${a} 160 160)">
      <animate attributeName="opacity" values="0.5;0.05;0.5" dur="${(3 + i * 0.4).toFixed(1)}s" begin="${(i * 0.8).toFixed(1)}s" repeatCount="indefinite" />
    </path>`).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="bcn-lamp" cx="46%" cy="40%" r="64%">
      <stop offset="0%" stop-color="#fffbeb" /><stop offset="70%" stop-color="#fbbf24" /><stop offset="100%" stop-color="#b45309" />
    </radialGradient>
    <filter id="bcn-glow" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="12" /></filter>
  </defs>
  ${beams}
  <rect x="120" y="216" width="80" height="76" fill="#292524" />
  <g stroke="#44403c" stroke-width="3"><line x1="136" y1="222" x2="136" y2="290" /><line x1="160" y1="222" x2="160" y2="290" /><line x1="184" y1="222" x2="184" y2="290" /></g>
  <path d="M104 220 L216 220 L200 190 L120 190 Z" fill="#78716c" />
  <circle cx="160" cy="152" r="46" fill="#fbbf24" filter="url(#bcn-glow)" opacity="0.45">
    <animate attributeName="r" values="42;54;42" dur="1.6s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.25;0.6;0.25" dur="1.6s" repeatCount="indefinite" />
  </circle>
  <circle cx="160" cy="152" r="34" fill="url(#bcn-lamp)">
    <animate attributeName="opacity" values="1;0.75;1" dur="1.6s" repeatCount="indefinite" />
  </circle>
  <circle cx="146" cy="146" r="6.5" fill="#451a03"><animate attributeName="r" values="6;7.5;6" dur="1.6s" repeatCount="indefinite" /></circle>
  <circle cx="176" cy="146" r="6.5" fill="#451a03"><animate attributeName="r" values="7.5;6;7.5" dur="1.6s" begin="0.4s" repeatCount="indefinite" /></circle>
  <circle cx="147.5" cy="143.5" r="2" fill="#fff" /><circle cx="177.5" cy="143.5" r="2" fill="#fff" />
  <path d="M150 166 Q161 173 172 165" stroke="#451a03" stroke-width="3.6" fill="none" stroke-linecap="round" />
  <g opacity="0.7">
    <circle cx="70" cy="80" r="1.6" fill="#fef9c3"><animate attributeName="opacity" values="0.9;0.1;0.9" dur="2.1s" repeatCount="indefinite" /></circle>
    <circle cx="256" cy="64" r="1.8" fill="#fef9c3"><animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.5s" begin="0.7s" repeatCount="indefinite" /></circle>
    <circle cx="284" cy="150" r="1.4" fill="#fef9c3"><animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.8s" repeatCount="indefinite" /></circle>
  </g>
</svg>`;
}
