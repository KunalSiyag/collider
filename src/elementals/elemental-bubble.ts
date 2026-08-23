export interface ElementalOptions {
  size?: number;
}

export function createElementalBubble(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  const rand = (() => { let s = 83; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  const bubbles = Array.from({ length: 8 }, () => {
    const x = 30 + rand() * 260; const r = 4 + rand() * 12; const dur = 3 + rand() * 4;
    return `<circle cx="${x.toFixed(1)}" cy="300" r="${r.toFixed(1)}" fill="none" stroke="#93c5fd" stroke-width="1.6" opacity="0.7"><animate attributeName="cy" values="300;${(20 + rand() * 60).toFixed(0)}" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /><animate attributeName="opacity" values="0;0.8;0" dur="${dur.toFixed(1)}s" repeatCount="indefinite" /></circle>`;
  }).join('');
  return `<svg width="${size}" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="320" height="320" fill="#0b0b10" />
  <defs>
    <radialGradient id="bubble-shell" cx="38%" cy="32%" r="70%">
      <stop offset="0%" stop-color="#dbeafe" stop-opacity="0.9" /><stop offset="55%" stop-color="#3b82f6" stop-opacity="0.25" /><stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.5" />
    </radialGradient>
    <filter id="bubble-blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="3" /></filter>
  </defs>
  ${bubbles}
  <circle cx="160" cy="160" r="104" fill="url(#bubble-shell)">
    <animate attributeName="r" values="102;107;102" dur="3.4s" repeatCount="indefinite" />
  </circle>
  <ellipse cx="122" cy="116" rx="26" ry="15" fill="#fff" opacity="0.75" transform="rotate(-28 122 116)" />
  <ellipse cx="204" cy="204" rx="14" ry="8" fill="#fff" opacity="0.4" transform="rotate(-28 204 204)" />
  <circle cx="128" cy="156" r="9" fill="#0c4a6e" /><circle cx="192" cy="156" r="9" fill="#0c4a6e" />
  <circle cx="131" cy="153" r="3" fill="#fff" /><circle cx="195" cy="153" r="3" fill="#fff" />
  <path d="M146 184 Q160 194 174 184" stroke="#0c4a6e" stroke-width="4.5" fill="none" stroke-linecap="round" />
  <circle cx="160" cy="264" r="18" fill="none" stroke="#bfdbfe" stroke-width="2" opacity="0.6">
    <animate attributeName="cy" values="264;180;264" dur="5s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0;0.7;0" dur="5s" repeatCount="indefinite" />
  </circle>
  <circle cx="160" cy="160" r="104" fill="none" stroke="#93c5fd" stroke-width="1.4" opacity="0.55" filter="url(#bubble-blur)">
    <animate attributeName="r" values="104;108;104" dur="3.4s" repeatCount="indefinite" />
  </circle>
  <ellipse cx="160" cy="292" rx="60" ry="9" fill="#3b82f6" opacity="0.18" />

</svg>`;
}
