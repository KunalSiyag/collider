export interface OtterlingOptions {
  size?: number;
}

export function createOtterling(options: OtterlingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="88" rx="28" ry="4" fill="#0e7490" opacity=".5"/>
  <path d="M12 88 Q22 84 32 88 M64 88 Q74 84 84 88" stroke="#22d3ee" stroke-width="2" fill="none" opacity=".6">
    <animate attributeName="d" values="M12 88 Q22 84 32 88;M12 88 Q22 92 32 88;M12 88 Q22 84 32 88" dur="2.4s" repeatCount="indefinite"/>
  </path>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.6s" repeatCount="indefinite"/>
    <path d="M70 62 Q82 60 84 52 Q74 52 70 56 Z" fill="#a16207"/>
    <ellipse cx="48" cy="64" rx="24" ry="14" fill="#b45309"/>
    <ellipse cx="48" cy="66" rx="17" ry="9" fill="#fcd34d"/>
    <circle cx="34" cy="48" r="14" fill="#b45309"/>
    <path d="M24 40 L20 30 L30 36 Z" fill="#b45309"/>
    <path d="M44 40 L48 30 L38 36 Z" fill="#b45309"/>
    <ellipse cx="34" cy="52" rx="7" ry="5" fill="#fcd34d"/>
    <circle cx="31" cy="50" r="1.4" fill="#451a03"/>
    <circle cx="37" cy="50" r="1.4" fill="#451a03"/>
    <ellipse cx="34" cy="53" rx="1.6" ry="1.1" fill="#451a03"/>
    <path d="M31 55 Q34 57 37 55" stroke="#78350f" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <circle cx="27" cy="45" r="2.6" fill="#78350f"/>
    <circle cx="41" cy="45" r="2.6" fill="#78350f"/>
    <circle cx="62" cy="70" r="3.4" fill="#94a3b8"/>
    <path d="M56 72 Q62 68 68 71" stroke="#78350f" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  </g>
</svg>`;
}
