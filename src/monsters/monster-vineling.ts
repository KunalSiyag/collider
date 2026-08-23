export interface VinelingOptions {
  size?: number;
}

export function createVineling(options: VinelingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="16" ry="3" fill="#000" opacity=".25"/>
  <path d="M70 90 Q74 70 70 52 Q66 34 74 16" stroke="#15803d" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M74 30 q8 -2 8 6 q0 6 -7 4" stroke="#16a34a" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-3 48 88;3 48 88;-3 48 88" dur="3.2s" repeatCount="indefinite"/>
    <path d="M46 86 Q38 70 44 56 Q48 48 44 40" stroke="#22c55e" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M44 66 Q32 62 28 52 Q40 54 44 60 Z" fill="#4ade80"/>
    <path d="M45 50 Q56 44 60 34 Q48 38 44 46 Z" fill="#4ade80">
      <animateTransform attributeName="transform" type="rotate" values="0 45 48;-8 45 48;0 45 48" dur="2.4s" repeatCount="indefinite"/>
    </path>
    <circle cx="44" cy="36" r="13" fill="#34d399"/>
    <path d="M33 32 Q28 26 30 20 Q36 24 37 30 Z" fill="#059669"/>
    <path d="M55 32 Q60 26 58 20 Q52 24 51 30 Z" fill="#059669"/>
    <circle cx="40" cy="35" r="3" fill="#fff"/>
    <circle cx="49" cy="35" r="3" fill="#fff"/>
    <circle cx="40.8" cy="36" r="1.5" fill="#064e3b"/>
    <circle cx="49.8" cy="36" r="1.5" fill="#064e3b"/>
    <path d="M41 41 Q44.5 44 48 41" stroke="#065f46" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <ellipse cx="36" cy="39" rx="2.2" ry="1.4" fill="#a7f3d0" opacity=".8"/>
    <ellipse cx="53" cy="39" rx="2.2" ry="1.4" fill="#a7f3d0" opacity=".8"/>
  </g>
</svg>`;
}
