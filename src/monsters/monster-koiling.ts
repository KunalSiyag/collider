export interface MonsterOptions {
  size?: number;
}

export function createMonsterKoiling(options: MonsterOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Koiling, a koi fish chibi monster">
  <ellipse cx="100" cy="196" rx="58" ry="9" fill="#fb7185" opacity=".22"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-4 100 130; 4 100 130; -4 100 130" dur="2.9s" repeatCount="indefinite"/>
    <path d="M148 128 C168 118 176 104 174 92 C162 98 150 96 142 90 C152 112 150 122 148 128 Z" fill="#f43f5e"/>
    <path d="M52 128 C40 116 38 100 46 90 C54 100 62 104 72 104 L64 128 Z" fill="#fb7185"/>
    <path d="M60 128 C60 94 84 70 108 74 C132 78 146 102 144 126 C142 150 120 166 100 166 C80 166 60 152 60 128 Z" fill="#fff"/>
    <g fill="#fb7185">
      <circle cx="86" cy="106" r="11"/><circle cx="114" cy="110" r="13"/><circle cx="98" cy="136" r="12"/><circle cx="124" cy="140" r="8"/>
      <circle cx="76" cy="134" r="8"/>
    </g>
    <path d="M100 74 Q104 88 100 100 M76 92 Q82 104 78 114 M124 92 Q118 104 122 116" stroke="#e11d48" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".6"/>
    <circle cx="80" cy="102" r="7" fill="#1c1917"/><circle cx="82" cy="100" r="2.4" fill="#fff"/>
    <path d="M64 96 q-10 -2 -12 -10" stroke="#f43f5e" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M88 148 Q100 156 112 148" stroke="#be123c" stroke-width="4" fill="none" stroke-linecap="round"/>
    <g fill="#67e8f9" opacity=".8">
      <circle cx="42" cy="80" r="4"><animate attributeName="cy" values="80;56;80" dur="2.5s" repeatCount="indefinite"/></circle>
      <circle cx="160" cy="66" r="3"><animate attributeName="cy" values="66;44;66" dur="2s" begin=".5s" repeatCount="indefinite"/></circle>
    </g>
  </g>
</svg>`;
}
