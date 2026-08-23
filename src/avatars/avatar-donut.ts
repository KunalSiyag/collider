export interface AvatarDonutOptions {
  glaze?: string;
  dough?: string;
  size?: number;
}

export function createAvatarDonut(options: AvatarDonutOptions = {}): string {
  const { glaze = '#f472b6', dough = '#d97706', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Donut avatar">
  <rect width="128" height="128" rx="36" fill="#fbbf24" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2 64 66;2 64 66;-2 64 66" dur="4s" repeatCount="indefinite" />
    <circle cx="64" cy="66" r="40" fill="${dough}" />
    <path d="M64 30 a36 36 0 0 1 34 26 q-16 -8 -34 -4 q-20 4 -33 6 A36 36 0 0 1 64 30 Z" fill="${glaze}" />
    <circle cx="64" cy="66" r="12" fill="#fef3c7" />
    <g fill="#22c55e"><rect x="42" y="46" width="9" height="4" rx="2" transform="rotate(-18 46 48)" /><rect x="76" y="44" width="9" height="4" rx="2" transform="rotate(14 80 46)" /><rect x="60" y="38" width="8" height="4" rx="2" /></g>
    <g fill="#facc15"><rect x="86" y="58" width="9" height="4" rx="2" transform="rotate(28 90 60)" /><rect x="34" y="62" width="9" height="4" rx="2" transform="rotate(-30 38 64)" /></g>
    <ellipse cx="50" cy="62" rx="5.5" ry="6" fill="#1c1917">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.1s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="78" cy="62" rx="5.5" ry="6" fill="#1c1917">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.1s" begin="-0.4s" repeatCount="indefinite" />
    </ellipse>
    <circle cx="51.5" cy="60" r="2" fill="#ffffff" />
    <circle cx="79.5" cy="60" r="2" fill="#ffffff" />
    <path d="M54 78 Q64 85 74 78" stroke="#1c1917" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <ellipse cx="38" cy="74" rx="5" ry="3.5" fill="#fb7185" opacity="0.45" />
    <ellipse cx="90" cy="74" rx="5" ry="3.5" fill="#fb7185" opacity="0.45" />
  </g>
</svg>`;
}
