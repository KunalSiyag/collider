export interface AvatarKoalaOptions {
  fur?: string;
  nose?: string;
  size?: number;
}

export function createAvatarKoala(options: AvatarKoalaOptions = {}): string {
  const { fur = '#9ca3af', nose = '#334155', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Koala avatar">
  <rect width="128" height="128" rx="36" fill="#9ca3af" opacity="0.14" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="3.4s" repeatCount="indefinite" />
    <ellipse cx="26" cy="44" rx="16" ry="19" fill="#6b7280" transform="rotate(-16 26 44)">
      <animateTransform attributeName="transform" type="rotate" values="-16 26 44;-24 26 44;-16 26 44" dur="3.6s" repeatCount="indefinite" additive="sum" />
    </ellipse>
    <ellipse cx="102" cy="44" rx="16" ry="19" fill="#6b7280" transform="rotate(16 102 44)">
      <animateTransform attributeName="transform" type="rotate" values="16 102 44;24 102 44;16 102 44" dur="3.6s" repeatCount="indefinite" additive="sum" />
    </ellipse>
    <ellipse cx="28" cy="45" rx="8" ry="11" fill="#f9a8d4" transform="rotate(-16 28 45)" />
    <ellipse cx="100" cy="45" rx="8" ry="11" fill="#f9a8d4" transform="rotate(16 100 45)" />
    <ellipse cx="64" cy="74" rx="34" ry="31" fill="${fur}" />
    <circle cx="50" cy="68" r="5" fill="#1c1917">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.4s" repeatCount="indefinite" />
    </circle>
    <circle cx="78" cy="68" r="5" fill="#1c1917">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.4s" repeatCount="indefinite" />
    </circle>
    <ellipse cx="64" cy="86" rx="9" ry="11" fill="${nose}" />
    <ellipse cx="61" cy="82" rx="2.5" ry="3.5" fill="#e2e8f0" opacity="0.7" />
    <path d="M56 99 Q64 104 72 99" stroke="#1c1917" stroke-width="3" fill="none" stroke-linecap="round" />
    <ellipse cx="40" cy="82" rx="5" ry="3.5" fill="#f9a8d4" opacity="0.5" />
    <ellipse cx="88" cy="82" rx="5" ry="3.5" fill="#f9a8d4" opacity="0.5" />
  </g>
</svg>`;
}
