export interface MonsterOptions {
  size?: number;
}

export function createMonsterSluggo(options: MonsterOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sluggo, a slug chibi monster">
  <path d="M30 176 Q60 168 90 172 T150 170 Q170 168 178 174" stroke="#a3e635" stroke-width="6" fill="none" stroke-linecap="round" opacity=".5"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;14 0;0 0" dur="4.2s" repeatCount="indefinite"/>
    <path d="M40 160 C38 120 58 96 96 96 C134 96 156 118 158 152 C159 166 148 172 128 172 L64 172 C48 172 41 170 40 160 Z" fill="#84cc16"/>
    <path d="M52 130 C66 112 92 104 116 108" stroke="#bef264" stroke-width="7" stroke-linecap="round" fill="none" opacity=".85"/>
    <g>
      <line x1="76" y1="100" x2="70" y2="66" stroke="#65a30d" stroke-width="7" stroke-linecap="round"/>
      <line x1="104" y1="98" x2="110" y2="62" stroke="#65a30d" stroke-width="7" stroke-linecap="round"/>
      <circle cx="69" cy="58" r="11" fill="#1a2e05"/>
      <circle cx="111" cy="54" r="11" fill="#1a2e05"/>
      <circle cx="71" cy="55" r="3.6" fill="#d9f99d"/><circle cx="113" cy="51" r="3.6" fill="#d9f99d"/>
      <g><animateTransform attributeName="transform" type="rotate" values="-8 76 100; 8 76 100; -8 76 100" dur="3s" repeatCount="indefinite"/>
        <line x1="76" y1="100" x2="70" y2="66" stroke="#65a30d" stroke-width="7" stroke-linecap="round"/>
        <circle cx="69" cy="58" r="11" fill="#1a2e05"/><circle cx="71" cy="55" r="3.6" fill="#d9f99d"/>
      </g>
    </g>
    <path d="M88 140 Q100 149 112 140" stroke="#365314" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="74" cy="136" rx="6.5" ry="4" fill="#ecfccb" opacity=".9"/><ellipse cx="126" cy="136" rx="6.5" ry="4" fill="#ecfccb" opacity=".9"/>
  </g>
</svg>`;
}
