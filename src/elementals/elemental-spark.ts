export interface ElementalOptions {
  size?: number;
}

export function createElementalSpark(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1297; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const sparks = Array.from({ length: 8 }, () => {
    const a = rand() * Math.PI * 2; const r1 = 40 + rand() * 30; const r2 = r1 + 20 + rand() * 30;
    return `<line x1="${(160 + Math.cos(a) * r1).toFixed(1)}" y1="${(160 + Math.sin(a) * r1).toFixed(1)}" x2="${(160 + Math.cos(a) * r2).toFixed(1)}" y2="${(160 + Math.sin(a) * r2).toFixed(1)}" stroke="#fde047" stroke-width="2.6" stroke-linecap="round"><animate attributeName="opacity" values="0;1;0" dur="${(0.9 + rand() * 1.4).toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /></line>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="spk-core" cx="46%" cy="44%" r="60%">
      <stop offset="0%" stop-color="#fffbeb" /><stop offset="60%" stop-color="#fde047" /><stop offset="100%" stop-color="#f59e0b" />
    </radialGradient>
    <filter id="spk-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="9" /></filter>
  </defs>
  ${sparks}
  <circle cx="160" cy="160" r="52" fill="#fbbf24" filter="url(#spk-glow)" opacity="0.5">
    <animate attributeName="r" values="48;58;48" dur="1.4s" repeatCount="indefinite" />
  </circle>
  <path d="M160 108 L176 146 L212 150 L186 176 L194 214 L160 192 L126 214 L134 176 L108 150 L144 146 Z" fill="url(#spk-core)">
    <animateTransform attributeName="transform" type="rotate" values="-6 160 160;6 160 160;-6 160 160" dur="2.4s" repeatCount="indefinite" />
  </path>
  <circle cx="148" cy="156" r="6.5" fill="#78350f"><animate attributeName="r" values="6;7.5;6" dur="0.9s" repeatCount="indefinite" /></circle>
  <circle cx="174" cy="156" r="6.5" fill="#78350f"><animate attributeName="r" values="7.5;6;7.5" dur="0.9s" repeatCount="indefinite" /></circle>
  <path d="M152 176 Q161 182 170 176" stroke="#78350f" stroke-width="3.6" fill="none" stroke-linecap="round">
    <animate attributeName="d" values="M152 176 Q161 182 170 176;M152 180 Q161 175 170 180;M152 176 Q161 182 170 176" dur="1.1s" repeatCount="indefinite" />
  </path>
  <circle cx="107.8" cy="196.0" r="3.3" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.6s" begin="0.6s" repeatCount="indefinite" /></circle>
  <circle cx="216.9" cy="111.8" r="3.6" fill="none" stroke="#a78bfa" stroke-width="1.4"><animate attributeName="r" values="3.6;8.6;3.6" dur="4.3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="2.6s" repeatCount="indefinite" /></circle>
  <rect x="77.8" y="275.0" width="3.8" height="3.4" fill="#22d3ee" opacity="0.55" transform="rotate(24 77.8 275.0)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></rect>
  <circle cx="241.1" cy="56.3" r="2.1" fill="#67e8f9" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="4.1s" begin="0.3s" repeatCount="indefinite" /></circle>
  <circle cx="253.7" cy="149.4" r="4.0" fill="none" stroke="#fbbf24" stroke-width="1.4"><animate attributeName="r" values="4.0;9.0;4.0" dur="3.3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="2.6s" repeatCount="indefinite" /></circle>
  <circle cx="26" cy="216" r="2" fill="#a78bfa" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
