export interface MonsterOptions {
  size?: number;
}

export function createMonsterShroom(options: MonsterOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Shroomling, a mushroom chibi monster">
  <ellipse cx="100" cy="198" rx="54" ry="10" fill="#dc2626" opacity="0.25"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2.5 100 190; 2.5 100 190; -2.5 100 190" dur="3.1s" repeatCount="indefinite"/>
    <path d="M74 110 C70 140 72 164 78 178 C90 184 110 184 122 178 C128 164 130 140 126 110 Z" fill="#fdf2ec"/>
    <circle cx="84" cy="136" r="7" fill="#292524"/><circle cx="116" cy="136" r="7" fill="#292524"/>
    <circle cx="86" cy="133" r="2.4" fill="#fff"/><circle cx="118" cy="133" r="2.4" fill="#fff"/>
    <path d="M88 156 Q100 165 112 156" stroke="#57534e" stroke-width="4.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="76" cy="150" rx="6" ry="4" fill="#fda4af" opacity=".8"/><ellipse cx="124" cy="150" rx="6" ry="4" fill="#fda4af" opacity=".8"/>
    <path d="M36 96 C36 62 66 40 100 40 C134 40 164 62 164 96 C164 106 148 112 100 112 C52 112 36 106 36 96 Z" fill="#e11d48">
      <animateTransform attributeName="transform" type="scale" values="1 1;1.03 .97;1 1" dur="2.4s" repeatCount="indefinite"/>
    </path>
    <circle cx="64" cy="60" r="9" fill="#fecdd3"/><circle cx="104" cy="52" r="12" fill="#fecdd3"/><circle cx="132" cy="76" r="7" fill="#fda4af"/><circle cx="80" cy="82" r="5" fill="#fda4af"/>
    <g stroke="#16a34a" stroke-width="4" stroke-linecap="round" fill="none">
      <path d="M58 178 q-8 6 -16 6"><animate attributeName="opacity" values="1;.4;1" dur="2s" repeatCount="indefinite"/></path>
      <path d="M142 178 q8 6 16 6"><animate attributeName="opacity" values=".4;1;.4" dur="2.3s" repeatCount="indefinite"/></path>
    </g>
  </g>
</svg>`;
}
