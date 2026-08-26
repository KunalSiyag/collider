/** Price Tag — a sale tag with a swinging string and discount punch. */
export interface PriceTagOptions {
  label?: string;
  value?: string;
  color?: string;
}

export function createPriceTag(options: PriceTagOptions = {}): string {
  const { label = 'SALE', value = '-40%', color = '#f97316' } = options;
  return `<svg viewBox="0 0 150 130" height="130" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <line x1="75" y1="0" x2="75" y2="22" stroke="#52525b" stroke-width="2.5"/>
  <g transform="translate(75 78)">
    <animateTransform attributeName="transform" type="rotate" values="0 75 22;-4 75 22;4 75 22;0 75 22" dur="4.4s" repeatCount="indefinite" additive="sum"/>
    <path d="M-46 -56 L46 -56 L58 -20 L46 16 L-46 16 L-58 -20 Z" fill="${color}"/>
    <path d="M-46 -56 L46 -56 L58 -20 L-58 -20 Z" fill="#fb923c" opacity="0.55"/>
    <circle cy="-56" r="7" fill="#0b0b10"/>
    <text y="-30" text-anchor="middle" fill="#fff7ed" font-size="15" font-weight="800" letter-spacing="3" font-family="system-ui">${label}</text>
    <text y="6" text-anchor="middle" fill="#ffffff" font-size="30" font-weight="900" font-family="system-ui">${value}</text>
  </g>
</svg>`;
}
