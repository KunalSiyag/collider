export interface ElementalOptions {
  size?: number;
}

export function createElementalEclipse(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 211; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const stars = Array.from({ length: 12 }, () => `<circle cx="${rand().toFixed(2) && (rand() * 320).toFixed(1)}" cy="${(rand() * 320).toFixed(1)}" r="${(0.8 + rand()).toFixed(1)}" fill="#fff"><animate attributeName="opacity" values="0.9;0.15;0.9" dur="${(1.6 + rand() * 2.4).toFixed(1)}s" repeatCount="indefinite" /></circle>`).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="ecl-ring" cx="50%" cy="50%" r="55%">
      <stop offset="70%" stop-color="#fde047" /><stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
    </radialGradient>
    <filter id="ecl-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9" /></filter>
    <mask id="ecl-mask"><rect width="320" height="320" fill="#fff" /><circle cx="196" cy="128" r="96" fill="#000" /></mask>
  </defs>
  ${stars}
  <circle cx="150" cy="150" r="100" fill="url(#ecl-ring)" mask="url(#ecl-mask)" filter="url(#ecl-glow)">
    <animate attributeName="r" values="98;106;98" dur="4s" repeatCount="indefinite" />
  </circle>
  <circle cx="150" cy="150" r="88" fill="#fbbf24" mask="url(#ecl-mask)" />
  <circle cx="196" cy="128" r="92" fill="#0b0b10">
    <animate attributeName="cx" values="196;188;196" dur="6s" repeatCount="indefinite" />
    <animate attributeName="cy" values="128;136;128" dur="6s" repeatCount="indefinite" />
  </circle>
  <g transform="translate(-6 4)">
    <path d="M118 138 A46 46 0 0 1 190 132" fill="none" stroke="#fde047" stroke-width="3.5" opacity="0.95" />
    <circle cx="130" cy="158" r="7" fill="#fde047" /><circle cx="174" cy="158" r="7" fill="#fde047" />
    <circle cx="132" cy="160" r="2.6" fill="#111" /><circle cx="176" cy="160" r="2.6" fill="#111" />
    <path d="M138 180 Q152 189 166 180" stroke="#fde047" stroke-width="4" fill="none" stroke-linecap="round" />
  </g>
  <circle cx="281.6" cy="148.2" r="3.1" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.9s" begin="0.6s" repeatCount="indefinite" /></circle>
  <circle cx="113.7" cy="162.0" r="4.3" fill="none" stroke="#67e8f9" stroke-width="1.4"><animate attributeName="r" values="4.3;9.3;4.3" dur="3.0s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="3.4s" repeatCount="indefinite" /></circle>
  <rect x="299.0" y="244.8" width="4.5" height="4.1" fill="#22d3ee" opacity="0.55" transform="rotate(85 299.0 244.8)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.6s" repeatCount="indefinite" /></rect>
  <circle cx="178.8" cy="196.1" r="2.0" fill="#4ade80" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="3.2s" begin="0.0s" repeatCount="indefinite" /></circle>
  <circle cx="176" cy="266" r="2" fill="#f472b6" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
