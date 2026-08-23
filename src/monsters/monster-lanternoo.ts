export interface LanternooOptions {
  size?: number;
}

export function createLanternoo(options: LanternooOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="18" ry="3" fill="#000" opacity=".25"/>
  <line x1="48" y1="4" x2="48" y2="16" stroke="#7f1d1d" stroke-width="2"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-3 48 8;3 48 8;-3 48 8" dur="3.2s" repeatCount="indefinite"/>
    <rect x="36" y="14" width="24" height="5" rx="2.5" fill="#7f1d1d"/>
    <ellipse cx="48" cy="46" rx="26" ry="28" fill="#f97316">
      <animate attributeName="opacity" values="1;.85;1" dur="2s" repeatCount="indefinite"/>
    </ellipse>
    <path d="M34 26 Q40 30 38 66 M62 26 Q56 30 58 66" stroke="#fed7aa" stroke-width="3" fill="none" opacity=".6"/>
    <rect x="36" y="72" width="24" height="5" rx="2.5" fill="#7f1d1d"/>
    <g stroke="#b91c1c" stroke-width="1.5"><line x1="42" y1="77" x2="42" y2="84"/><line x1="48" y1="77" x2="48" y2="86"/><line x1="54" y1="77" x2="54" y2="84"/></g>
    <circle cx="41" cy="44" r="4.2" fill="#fff7ed"/>
    <circle cx="55" cy="44" r="4.2" fill="#fff7ed"/>
    <circle cx="42" cy="45" r="2" fill="#7c2d12"/>
    <circle cx="56" cy="45" r="2" fill="#7c2d12"/>
    <path d="M44 53 Q48 56.5 52 53" stroke="#9a3412" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="33" cy="50" rx="0" r="0" fill="none"/>
    <ellipse cx="33" cy="50" rx="2.6" ry="1.7" fill="#fbbf24" opacity=".7"/>
    <ellipse cx="63" cy="50" rx="2.6" ry="1.7" fill="#fbbf24" opacity=".7"/>
  </g>
</svg>`;
}
