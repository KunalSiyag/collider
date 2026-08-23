export interface ShapeLensStreakOptions {
  colors?: string[];
  size?: number;
}

export function createShapeLensStreak(options: ShapeLensStreakOptions = {}): string {
  const { colors = ['#22d3ee', '#8b5cf6', '#f472b6'], size = 320 } = options;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>
  <linearGradient id="ls-fade" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="${colors[1]}" stop-opacity="0" />
    <stop offset="50%" stop-color="${colors[1]}" stop-opacity="1" />
    <stop offset="100%" stop-color="${colors[1]}" stop-opacity="0" />
  </linearGradient>
</defs>
<rect width="${size}" height="${size}" fill="#0b0b10" />
<circle cx="160" cy="160" r="26" fill="#fafafa">
  <animate attributeName="r" values="26;34;26" dur="3.5s" repeatCount="indefinite" />
</circle>
<rect x="20" y="152" width="280" height="16" rx="8" fill="url(#ls-fade)" opacity="0.9">
  <animate attributeName="opacity" values="0.9;0.4;0.9" dur="3.5s" repeatCount="indefinite" />
</rect>
<rect x="70" y="176" width="180" height="6" rx="3" fill="${colors[0]}" opacity="0.7">
  <animate attributeName="width" values="180;120;180" dur="4s" repeatCount="indefinite" />
</rect>
<rect x="90" y="138" width="140" height="5" rx="2.5" fill="${colors[2]}" opacity="0.6">
  <animate attributeName="width" values="140;190;140" dur="4.5s" repeatCount="indefinite" />
</rect>
<circle cx="160" cy="160" r="44" fill="none" stroke="#fafafa" stroke-opacity="0.15" stroke-width="2" />
<circle cx="160" cy="160" r="66" fill="none" stroke="#67e8f9" stroke-opacity="0.12" stroke-width="2" />
</svg>`;
}
