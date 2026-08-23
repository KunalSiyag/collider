export interface TulipoOptions {
  size?: number;
}

export function createTulipo(options: TulipoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="14" ry="3" fill="#000" opacity=".25"/>
  <path d="M48 62 Q46 74 44 87" stroke="#15803d" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M46 74 Q34 70 30 78 Q40 82 46 78 Z" fill="#22c55e"/>
  <path d="M48 80 Q60 78 64 84 Q54 88 48 84 Z" fill="#16a34a"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2 48 88;2 48 88;-2 48 88" dur="3s" repeatCount="indefinite"/>
    <path d="M32 26 Q32 16 40 18 Q44 10 48 16 Q52 10 56 18 Q64 16 64 26 Q66 44 60 56 Q54 62 48 62 Q42 62 36 56 Q30 44 32 26 Z" fill="#ec4899"/>
    <path d="M40 20 Q36 34 40 54" stroke="#f9a8d4" stroke-width="2.4" fill="none" opacity=".8"/>
    <path d="M56 20 Q60 34 56 54" stroke="#be185d" stroke-width="2.4" fill="none" opacity=".7"/>
    <path d="M36 30 Q48 24 60 30" stroke="#fbcfe8" stroke-width="2" fill="none" opacity=".7"/>
    <circle cx="43" cy="42" r="3.6" fill="#fff"/>
    <circle cx="53" cy="42" r="3.6" fill="#fff"/>
    <circle cx="44" cy="43" r="1.8" fill="#831843"/>
    <circle cx="54" cy="43" r="1.8" fill="#831843"/>
    <path d="M45 50 Q48 53 51 50" stroke="#9d174d" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <ellipse cx="36" cy="48" rx="2.4" ry="1.6" fill="#fb7185" opacity=".7"/>
    <ellipse cx="60" cy="48" rx="2.4" ry="1.6" fill="#fb7185" opacity=".7"/>
  </g>
</svg>`;
}
