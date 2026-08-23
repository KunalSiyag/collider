export interface MonsterOptions {
  size?: number;
}

export function createMonsterWormling(options: MonsterOptions = {}): string {
  const { size = 240 } = options;
  const seg = (x: number, y: number, r: number, o: number): string =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="#f472b6" opacity="${o}"/>`;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Wormling, a garden worm chibi monster">
  <ellipse cx="100" cy="198" rx="60" ry="9" fill="#f472b6" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0" dur="2.6s" repeatCount="indefinite"/>
    ${seg(52, 150, 20, 0.75)}
    ${seg(74, 140, 23, 0.85)}
    ${seg(100, 134, 26, 1)}
    ${seg(126, 140, 22, 0.85)}
    ${seg(146, 152, 18, 0.7)}
    <path d="M84 128 Q100 118 116 128 Q108 138 100 132 Q92 138 84 128 Z" fill="#9d174d"/>
    <circle cx="90" cy="124" r="5.5" fill="#fff"/><circle cx="110" cy="124" r="5.5" fill="#fff"/>
    <circle cx="91.5" cy="125" r="2.8" fill="#500724"/><circle cx="108.5" cy="125" r="2.8" fill="#500724"/>
    <ellipse cx="80" cy="136" rx="5.5" ry="3.5" fill="#fb7185" opacity=".85"/>
    <ellipse cx="120" cy="136" rx="5.5" ry="3.5" fill="#fb7185" opacity=".85"/>
    <g stroke="#e879a9" stroke-width="3" stroke-linecap="round">
      <line x1="52" y1="132" x2="46" y2="122"><animate attributeName="opacity" values="1;.3;1" dur="1.4s" repeatCount="indefinite"/></line>
      <line x1="148" y1="142" x2="154" y2="132"><animate attributeName="opacity" values=".3;1;.3" dur="1.7s" repeatCount="indefinite"/></line>
    </g>
  </g>
</svg>`;
}
