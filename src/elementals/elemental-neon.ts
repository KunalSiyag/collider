export interface ElementalOptions {
  size?: number;
}

export function createElementalNeon(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1571; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const tubes = [
    { c: '#22d3ee', d: 'M40 60 H280', dur: 3.2 },
    { c: '#f472b6', d: 'M60 130 H260', dur: 2.6 },
    { c: '#4ade80', d: 'M40 200 Q160 170 280 200', dur: 3.8 },
  ].map((t, i) => `<path d="${t.d}" stroke="#0b0b10" stroke-width="12" fill="none" /><path d="${t.d}" stroke="${t.c}" stroke-width="5" fill="none" stroke-linecap="round">
      <animate attributeName="opacity" values="1;0.25;1;1;1;0.35;1" dur="${(t.dur + rand()).toFixed(1)}s" begin="${(i * 0.7).toFixed(1)}s" repeatCount="indefinite" />
    </path>`).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <filter id="neo-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="6" /></filter>
  </defs>
  ${tubes}
  <g filter="url(#neo-glow)">
    <circle cx="118" cy="96" r="14" fill="#f472b6" opacity="0.55"><animate attributeName="r" values="13;17;13" dur="2s" repeatCount="indefinite" /></circle>
    <circle cx="204" cy="96" r="14" fill="#22d3ee" opacity="0.55"><animate attributeName="r" values="17;13;17" dur="2s" repeatCount="indefinite" /></circle>
  </g>
  <circle cx="118" cy="96" r="9" fill="#fb7185"><animate attributeName="fill" values="#fb7185;#fecdd3;#fb7185" dur="2s" repeatCount="indefinite" /></circle>
  <circle cx="204" cy="96" r="9" fill="#67e8f9"><animate attributeName="fill" values="#67e8f9;#cffafe;#67e8f9" dur="2s" begin="0.4s" repeatCount="indefinite" /></circle>
  <path d="M138 128 L146 142 L162 132 L172 144" stroke="#fde047" stroke-width="5" fill="none" stroke-linecap="round">
    <animate attributeName="opacity" values="1;0.4;1" dur="0.9s" repeatCount="indefinite" />
  </path>
  <circle cx="182.7" cy="88.2" r="4.0" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.1s" begin="0.9s" repeatCount="indefinite" /></circle>
  <circle cx="105.9" cy="185.3" r="2.2" fill="none" stroke="#a78bfa" stroke-width="1.4"><animate attributeName="r" values="2.2;7.2;2.2" dur="4.5s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.7s" repeatCount="indefinite" /></circle>
  <rect x="155.7" y="127.5" width="4.2" height="4.4" fill="#a78bfa" opacity="0.55" transform="rotate(7 155.7 127.5)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.8s" repeatCount="indefinite" /></rect>
  <circle cx="70.4" cy="234.6" r="3.0" fill="#a78bfa" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.6s" begin="1.0s" repeatCount="indefinite" /></circle>
  <circle cx="229.2" cy="153.4" r="2.9" fill="none" stroke="#22d3ee" stroke-width="1.4"><animate attributeName="r" values="2.9;7.9;2.9" dur="3.3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
  <rect x="244.4" y="282.5" width="4.8" height="5.8" fill="#4ade80" opacity="0.55" transform="rotate(90 244.4 282.5)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.9s" repeatCount="indefinite" /></rect>
  <circle cx="41.9" cy="257.4" r="1.5" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.8s" begin="0.2s" repeatCount="indefinite" /></circle>
  <circle cx="292" cy="142" r="2" fill="#a78bfa" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
