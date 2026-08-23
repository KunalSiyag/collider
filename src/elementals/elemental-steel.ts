export interface ElementalOptions {
  size?: number;
}

export function createElementalSteel(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1361; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const plates = Array.from({ length: 4 }, (_, i) => {
    const y = 120 + i * 30;
    return `<rect x="96" y="${y}" width="128" height="24" rx="4" fill="#475569" stroke="#1e293b" stroke-width="2"><animate attributeName="fill" values="#475569;#64748b;#475569" dur="${(3 + rand() * 3).toFixed(1)}s" begin="${(i * 0.5).toFixed(1)}s" repeatCount="indefinite" /></rect><line x1="104" y1="${y + 12}" x2="216" y2="${y + 12}" stroke="#94a3b8" stroke-width="1.4" opacity="0.7" />`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <linearGradient id="stl-frame" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#cbd5e1" /><stop offset="100%" stop-color="#334155" />
    </linearGradient>
    <filter id="stl-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="4" /></filter>
  </defs>
  <ellipse cx="160" cy="288" rx="78" ry="11" fill="#475569" opacity="0.35" />
  <path d="M160 58 L248 108 L248 212 L160 262 L72 212 L72 108 Z" fill="url(#stl-frame)" stroke="#0f172a" stroke-width="3.5">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="5s" repeatCount="indefinite" />
  </path>
  ${plates}
  <circle cx="160" cy="92" r="14" fill="#38bdf8" filter="url(#stl-glow)">
    <animate attributeName="opacity" values="1;0.45;1" dur="1.8s" repeatCount="indefinite" />
  </circle>
  <rect x="126" y="228" width="68" height="14" rx="7" fill="#0f172a" />
  <g stroke="#94a3b8" stroke-width="2"><line x1="84" y1="118" x2="84" y2="202" /><line x1="236" y1="118" x2="236" y2="202" /></g>
  <circle cx="222.5" cy="210.1" r="2.5" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.8s" begin="0.6s" repeatCount="indefinite" /></circle>
  <circle cx="69.7" cy="185.2" r="3.3" fill="none" stroke="#fb7185" stroke-width="1.4"><animate attributeName="r" values="3.3;8.3;3.3" dur="3.2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.2s" repeatCount="indefinite" /></circle>
  <rect x="275.1" y="118.1" width="3.9" height="5.7" fill="#a78bfa" opacity="0.55" transform="rotate(34 275.1 118.1)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.2s" repeatCount="indefinite" /></rect>
  <circle cx="271.0" cy="148.0" r="3.4" fill="#67e8f9" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.7s" begin="0.3s" repeatCount="indefinite" /></circle>
  <circle cx="281.9" cy="252.6" r="4.3" fill="none" stroke="#fde047" stroke-width="1.4"><animate attributeName="r" values="4.3;9.3;4.3" dur="4.2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="2.7s" repeatCount="indefinite" /></circle>
  <rect x="220.3" y="105.9" width="5.2" height="5.6" fill="#fb7185" opacity="0.55" transform="rotate(5 220.3 105.9)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.7s" repeatCount="indefinite" /></rect>
  <circle cx="162.4" cy="192.4" r="3.2" fill="#fb7185" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.8s" begin="0.1s" repeatCount="indefinite" /></circle>
  <circle cx="111" cy="61" r="2" fill="#22d3ee" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
