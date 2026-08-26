/** Achievement Rosette — a prize rosette with pleats and a star center. */
export interface AchievementRosetteOptions {
  color?: string;
  size?: number;
}

export function createAchievementRosette(options: AchievementRosetteOptions = {}): string {
  const { color = '#8b5cf6', size = 110 } = options;
  const pleats = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    const x = 50 + Math.cos(a) * 26;
    const y = 44 + Math.sin(a) * 26;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8.5" fill="${color}" opacity="${i % 2 ? 0.75 : 1}"/>`;
  }).join('');
  return `<svg viewBox="0 0 100 130" width="${size * 0.77}" height="${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M42 66 L36 108 L50 98 L64 108 L58 66 Z" fill="#be123c"/>
  <path d="M42 66 L36 108 L50 98 L47 68 Z" fill="#e11d48"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="3.2s" repeatCount="indefinite"/>
    ${pleats}
    <circle cx="50" cy="44" r="24" fill="${color}"/>
    <circle cx="50" cy="44" r="24" fill="none" stroke="#4c1d95" stroke-width="2.5"/>
    <path d="M50 30 l4.4 9 9.9 1.4 -7.2 7 1.7 9.8 -8.8 -4.6 -8.8 4.6 1.7 -9.8 -7.2 -7 9.9 -1.4 z" fill="#fde68a"/>
  </g>
</svg>`;
}
