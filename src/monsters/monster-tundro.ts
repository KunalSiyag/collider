export interface TundroOptions {
  size?: number;
}

export function createTundro(options: TundroOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="22" ry="3.5" fill="#e0f2fe" opacity=".8"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.7s" repeatCount="indefinite"/>
    <path d="M30 34 Q18 30 16 42 Q15 52 24 54 Q20 44 30 42 Z" fill="#94a3b8"/>
    <path d="M66 34 Q78 30 80 42 Q81 52 72 54 Q76 44 66 42 Z" fill="#94a3b8"/>
    <ellipse cx="48" cy="66" rx="21" ry="17" fill="#e7e5e4"/>
    <circle cx="48" cy="42" r="18" fill="#f5f5f4"/>
    <path d="M32 34 Q40 28 48 32 Q56 28 64 34" stroke="#d6d3d1" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M38 26 Q34 18 40 14 Q42 20 40 26 Z" fill="#a8a29e"/>
    <path d="M58 26 Q62 18 56 14 Q54 20 56 26 Z" fill="#a8a29e"/>
    <circle cx="42" cy="43" r="3.6" fill="#fff"/>
    <circle cx="54" cy="43" r="3.6" fill="#fff"/>
    <circle cx="43" cy="44" r="1.8" fill="#44403c"/>
    <circle cx="55" cy="44" r="1.8" fill="#44403c"/>
    <ellipse cx="48" cy="50" rx="2.6" ry="1.8" fill="#57534e"/>
    <path d="M45 54 Q48 56.5 51 54" stroke="#44403c" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <ellipse cx="35" cy="49" rx="2.6" ry="1.7" fill="#fda4af" opacity=".7"/>
    <ellipse cx="61" cy="49" rx="2.6" ry="1.7" fill="#fda4af" opacity=".7"/>
    <ellipse cx="38" cy="83" rx="7" ry="3" fill="#d6d3d1"/>
    <ellipse cx="58" cy="83" rx="7" ry="3" fill="#d6d3d1"/>
  </g>
</svg>`;
}
