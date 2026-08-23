export interface MonsterOptions {
  size?: number;
}

export function createMonsterFluff(options: MonsterOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fluffling, a cloud chibi monster">
  <ellipse cx="100" cy="196" rx="52" ry="9" fill="#93c5fd" opacity="0.25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -8;0 -20;0 -8" dur="3.6s" repeatCount="indefinite"/>
    <g fill="#f8fafc">
      <circle cx="60" cy="110" r="30"/><circle cx="140" cy="110" r="30"/><circle cx="100" cy="84" r="38"/>
      <circle cx="70" cy="132" r="26"/><circle cx="130" cy="132" r="26"/><rect x="58" y="118" width="84" height="40"/>
      <animateTransform attributeName="transform" type="scale" values="1 1;1.03 .96;1 1" dur="2.2s" repeatCount="indefinite" additive="sum"/>
    </g>
    <path d="M56 74 C50 60 58 48 70 46 M144 74 C150 60 142 48 130 46" stroke="#e2e8f0" stroke-width="7" stroke-linecap="round" fill="none"/>
    <circle cx="82" cy="102" r="8.5" fill="#334155"><animate attributeName="ry" values="8.5;2;8.5" dur="4s" repeatCount="indefinite"/></circle>
    <circle cx="118" cy="102" r="8.5" fill="#334155"><animate attributeName="ry" values="8.5;2;8.5" dur="4s" repeatCount="indefinite"/></circle>
    <ellipse cx="64" cy="120" rx="8" ry="5" fill="#fbcfe8" opacity=".85"/>
    <ellipse cx="136" cy="120" rx="8" ry="5" fill="#fbcfe8" opacity=".85"/>
    <path d="M90 122 Q100 131 110 122" stroke="#475569" stroke-width="4" fill="none" stroke-linecap="round"/>
  </g>
  <g fill="#bfdbfe">
    <circle cx="36" cy="66" r="4"><animate attributeName="cy" values="66;44;66" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0;.8" dur="3s" repeatCount="indefinite"/></circle>
    <circle cx="166" cy="80" r="3.5"><animate attributeName="cy" values="80;56;80" dur="2.6s" begin=".5s" repeatCount="indefinite"/><animate attributeName="opacity" values=".7;0;.7" dur="2.6s" repeatCount="indefinite"/></circle>
  </g>
</svg>`;
}
