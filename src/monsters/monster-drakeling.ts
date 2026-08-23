export interface MonsterOptions {
  size?: number;
}

export function createMonsterDrakeling(options: MonsterOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Drakeling, a tiny dragon chibi monster">
  <ellipse cx="100" cy="198" rx="56" ry="10" fill="#dc2626" opacity="0.28"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -4;0 -14;0 -4" dur="2.5s" repeatCount="indefinite"/>
    <path d="M52 96 C34 84 30 66 38 54 C48 62 60 64 72 62 Z" fill="#ef4444">
      <animateTransform attributeName="transform" type="rotate" values="0 58 80; -16 58 80; 0 58 80" dur="1.5s" repeatCount="indefinite"/>
    </path>
    <path d="M148 96 C166 84 170 66 162 54 C152 62 140 64 128 62 Z" fill="#ef4444">
      <animateTransform attributeName="transform" type="rotate" values="0 142 80; 16 142 80; 0 142 80" dur="1.5s" repeatCount="indefinite"/>
    </path>
    <path d="M100 48 C132 48 154 70 154 104 C154 144 130 172 100 172 C70 172 46 144 46 104 C46 70 68 48 100 48 Z" fill="#f87171"/>
    <path d="M100 48 C132 48 154 70 154 104 L118 94 L108 52 Z" fill="#fb923c" opacity=".8"/>
    <path d="M92 44 Q98 30 112 28 Q106 40 110 48 Z" fill="#f97316">
      <animateTransform attributeName="transform" type="rotate" values="-6 100 44; 6 100 44; -6 100 44" dur="1.2s" repeatCount="indefinite"/>
    </path>
    <circle cx="82" cy="96" r="9" fill="#fff"/><circle cx="118" cy="96" r="9" fill="#fff"/>
    <circle cx="85" cy="98" r="4.5" fill="#7f1d1d"/><circle cx="115" cy="98" r="4.5" fill="#7f1d1d"/>
    <circle cx="83.5" cy="95" r="1.8" fill="#fff"/><circle cx="113.5" cy="95" r="1.8" fill="#fff"/>
    <path d="M86 120 Q100 129 114 120" stroke="#7f1d1d" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M74 116 q4 3 8 1 M126 116 q-4 3 -8 1" stroke="#b91c1c" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="76" cy="176" rx="15" ry="7" fill="#b91c1c"/><ellipse cx="124" cy="176" rx="15" ry="7" fill="#b91c1c"/>
    <circle cx="42" cy="150" r="4" fill="#fbbf24"><animate attributeName="opacity" values=".9;.1;.9" dur="1.8s" repeatCount="indefinite"/></circle>
    <circle cx="160" cy="140" r="3.5" fill="#fbbf24"><animate attributeName="opacity" values=".2;1;.2" dur="1.5s" repeatCount="indefinite"/></circle>
  </g>
</svg>`;
}
