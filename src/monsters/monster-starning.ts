export interface MonsterOptions {
  size?: number;
}

export function createMonsterStarning(options: MonsterOptions = {}): string {
  const { size = 240 } = options;
  const star = (cx: number, cy: number, outer: number, inner: number, points: number): string => {
    let d = '';
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
      d += `${i === 0 ? 'M' : 'L'}${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)} `;
    }
    return `${d}Z`;
  };

  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Starning, a star chibi monster">
  <ellipse cx="100" cy="196" rx="46" ry="8" fill="#facc15" opacity="0.22"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -6;0 -18;0 -6" dur="2.9s" repeatCount="indefinite"/>
    <path d="${star(100, 104, 66, 30, 5)}" fill="#fde047">
      <animateTransform attributeName="transform" type="rotate" values="-5 100 110; 5 100 110; -5 100 110" dur="3.2s" repeatCount="indefinite"/>
    </path>
    <path d="${star(100, 104, 44, 20, 5)}" fill="#fef9c3" opacity=".85"/>
    <circle cx="88" cy="102" r="7" fill="#713f12"><animate attributeName="ry" values="7;1.5;7" dur="3.4s" repeatCount="indefinite"/></circle>
    <circle cx="112" cy="102" r="7" fill="#713f12"><animate attributeName="ry" values="7;1.5;7" dur="3.4s" repeatCount="indefinite"/></circle>
    <circle cx="90" cy="99" r="2.2" fill="#fff"/><circle cx="114" cy="99" r="2.2" fill="#fff"/>
    <path d="M92 118 Q100 125 108 118" stroke="#a16207" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <ellipse cx="76" cy="112" rx="6" ry="4" fill="#fb923c" opacity=".75"/><ellipse cx="124" cy="112" rx="6" ry="4" fill="#fb923c" opacity=".75"/>
    <g fill="#fef08a">
      <path d="M36 52 l3.5 9 9 3.5 -9 3.5 -3.5 9 -3.5 -9 -9 -3.5 9 -3.5 Z"><animate attributeName="opacity" values="1;.25;1" dur="2s" repeatCount="indefinite"/></path>
      <path d="M164 64 l3 7.5 7.5 3 -7.5 3 -3 7.5 -3 -7.5 -7.5 -3 7.5 -3 Z"><animate attributeName="opacity" values=".3;1;.3" dur="1.7s" repeatCount="indefinite"/></path>
      <path d="M158 158 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 Z"><animate attributeName="opacity" values=".8;.15;.8" dur="2.4s" repeatCount="indefinite"/></path>
    </g>
  </g>
</svg>`;
}
