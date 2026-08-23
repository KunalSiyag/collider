export interface ElementalOptions {
  size?: number;
}

export function createElementalPearl(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 1049; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const shimmer = Array.from({ length: 5 }, () => {
    const x = rand() * 320; const y = rand() * 320;
    return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2 Z" fill="#fdf4ff"><animate attributeName="opacity" values="0;1;0" dur="${(2 + rand() * 2.4).toFixed(1)}s" begin="${rand().toFixed(1)}s" repeatCount="indefinite" /></path>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="pearl-body" cx="38%" cy="32%" r="75%">
      <stop offset="0%" stop-color="#ffffff" /><stop offset="40%" stop-color="#fce7f3" /><stop offset="75%" stop-color="#e9d5ff" /><stop offset="100%" stop-color="#a855f7" />
    </radialGradient>
    <path id="pearl-shell" d="M60 250 Q160 190 260 250 Q160 300 60 250 Z" />
    <filter id="pearl-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8" /></filter>
  </defs>
  ${shimmer}
  <use href="#pearl-shell" fill="#f9a8d4" opacity="0.85" />
  <use href="#pearl-shell" fill="none" stroke="#fbcfe8" stroke-width="2.5" opacity="0.7">
    <animate attributeName="opacity" values="0.7;0.35;0.7" dur="3s" repeatCount="indefinite" />
  </use>
  <circle cx="160" cy="150" r="82" fill="url(#pearl-body)" filter="url(#pearl-glow)">
    <animate attributeName="r" values="80;86;80" dur="3.4s" repeatCount="indefinite" />
  </circle>
  <ellipse cx="130" cy="112" rx="20" ry="11" fill="#fff" opacity="0.95" transform="rotate(-28 130 112)" />
  <ellipse cx="196" cy="196" rx="10" ry="5" fill="#fff" opacity="0.6" transform="rotate(-28 196 196)" />
  <circle cx="140" cy="156" r="8" fill="#701a75" /><circle cx="180" cy="156" r="8" fill="#701a75" />
  <circle cx="142.5" cy="153" r="2.6" fill="#fff" /><circle cx="182.5" cy="153" r="2.6" fill="#fff" />
  <path d="M148 180 Q160 188 172 180" stroke="#701a75" stroke-width="4" fill="none" stroke-linecap="round" />
  <circle cx="136.7" cy="48.7" r="3.8" fill="#fbbf24" opacity="0.6"><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.8s" begin="0.3s" repeatCount="indefinite" /></circle>
  <circle cx="88.4" cy="104.9" r="2.5" fill="none" stroke="#67e8f9" stroke-width="1.4"><animate attributeName="r" values="2.5;7.5;2.5" dur="4.5s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="4.0s" repeatCount="indefinite" /></circle>
  <rect x="146.9" y="37.6" width="3.3" height="5.5" fill="#a78bfa" opacity="0.55" transform="rotate(53 146.9 37.6)"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="4.2s" repeatCount="indefinite" /></rect>
  <circle cx="117" cy="247" r="2" fill="#4ade80" opacity="0.5"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.0s" repeatCount="indefinite" /></circle>
</svg>`;
}
