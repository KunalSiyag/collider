export interface IsoHouseOptions {
  size?: number;
}

export function createIsoHouse(options: IsoHouseOptions = {}): string {
  const { size = 280 } = options;
  return `<svg width="${size}" viewBox="0 0 300 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <ellipse cx="150" cy="226" rx="110" ry="20" fill="#000" opacity=".3"/>
  <g>
    <polygon points="70,120 150,80 230,120 150,160" fill="#f87171"/>
    <polygon points="60,124 150,168 240,124 230,116 150,76 70,116" fill="#b91c1c"/>
    <polygon points="80,128 140,98 200,128 140,158" fill="#7f1d1d"/>
    <polygon points="90,130 150,160 150,220 90,190" fill="#fcd34d"/>
    <polygon points="210,130 150,160 150,220 210,190" fill="#f59e0b"/>
    <rect x="126" y="176" width="28" height="34" rx="14" fill="#78350f" transform="skewY(26) translate(0 -66)"/>
    <rect x="104" y="146" width="24" height="18" rx="2" fill="#0ea5e9" transform="skewY(26) translate(0 -40)"/>
    <rect x="172" y="146" width="24" height="18" rx="2" fill="#bae6fd" transform="skewY(-26) translate(0 96)"/>
    <polygon points="118,58 150,42 182,58 182,72 150,56 118,72" fill="#9a3412"/>
    <rect x="146" y="30" width="8" height="26" fill="#57534e">
      <g><animate attributeName="opacity" values=".4;1;.4" dur="1.8s" repeatCount="indefinite"/><animate attributeName="fill" values="#94a3b8;#e2e8f0;#94a3b8" dur="1.8s" repeatCount="indefinite"/></g>
    </rect>
  </g>
</svg>`;
}
