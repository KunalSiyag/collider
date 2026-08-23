export interface ElementalOptions {
  size?: number;
}

export function createElementalPulse(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1093; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const rings = [0, 1, 2, 3].map((i) => `<circle cx="160" cy="160" r="40" fill="none" stroke="#fb7185" stroke-width="3"><animate attributeName="r" values="40;150" dur="${(2.4 + i * 0.5).toFixed(1)}s" begin="${(i * 0.6).toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.8;0" dur="${(2.4 + i * 0.5).toFixed(1)}s" begin="${(i * 0.6).toFixed(1)}s" repeatCount="indefinite" /></circle>`).join('');
  const blips = Array.from({ length: 6 }, () => {
    const x = rand() * 320; const y = rand() * 320;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="#fda4af"><animate attributeName="r" values="0;5;0" dur="${(1.4 + rand() * 1.8).toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  ${blips}
  <path d="M20 160 L90 160 L110 110 L134 210 L156 84 L180 236 L202 130 L216 160 L300 160" stroke="#f43f5e" stroke-width="4" fill="none" stroke-linecap="round">
    <animate attributeName="stroke-dasharray" values="600;600" dur="1ms" repeatCount="indefinite" />
    <animate attributeName="opacity" values="1;0.55;1" dur="0.9s" repeatCount="indefinite" />
  </path>
  <circle cx="160" cy="160" r="52" fill="#881337" opacity="0.85">
    <animate attributeName="r" values="50;56;50" dur="0.9s" repeatCount="indefinite" />
  </circle>
  ${rings}
  <circle cx="144" cy="152" r="7" fill="#fecdd3" /><circle cx="176" cy="152" r="7" fill="#fecdd3" />
  <circle cx="146" cy="149.5" r="2.4" fill="#450a0a" /><circle cx="178" cy="149.5" r="2.4" fill="#450a0a" />
  <path d="M150 174 L159 181 L167 173 L175 180" stroke="#fecdd3" stroke-width="3.6" fill="none" stroke-linecap="round">
    <animate attributeName="d" values="M150 174 L159 181 L167 173 L175 180;M150 179 L159 172 L167 181 L175 173;M150 174 L159 181 L167 173 L175 180" dur="0.9s" repeatCount="indefinite" />
  </path>
  <circle cx="75.3" cy="281.1" r="2.9" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.1s" begin="0.0s" repeatCount="indefinite" /></circle>
  <circle cx="213.8" cy="255.3" r="3.9" fill="none" stroke="#fde047" stroke-width="1.4"><animate attributeName="r" values="3.9;8.9;3.9" dur="3.0s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="2.7s" repeatCount="indefinite" /></circle>
  <rect x="49.0" y="260.2" width="3.8" height="4.5" fill="#22d3ee" opacity="0.55" transform="rotate(70 49.0 260.2)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.6s" repeatCount="indefinite" /></rect>
  <circle cx="228.7" cy="159.9" r="4.1" fill="#67e8f9" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.3s" begin="0.2s" repeatCount="indefinite" /></circle>
  <circle cx="256.1" cy="252.2" r="3.3" fill="none" stroke="#f472b6" stroke-width="1.4"><animate attributeName="r" values="3.3;8.3;3.3" dur="4.1s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="2.5s" repeatCount="indefinite" /></circle>
  <rect x="161.8" y="235.8" width="4.0" height="4.4" fill="#4ade80" opacity="0.55" transform="rotate(62 161.8 235.8)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.1s" repeatCount="indefinite" /></rect>
  <circle cx="139.1" cy="190.2" r="2.9" fill="#fb7185" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.0s" begin="0.3s" repeatCount="indefinite" /></circle>
  <circle cx="281.3" cy="39.4" r="3.8" fill="none" stroke="#22d3ee" stroke-width="1.4"><animate attributeName="r" values="3.8;8.8;3.8" dur="3.3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.9s" repeatCount="indefinite" /></circle>
  <circle cx="48" cy="38" r="2" fill="#f472b6" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
