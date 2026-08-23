export interface SnowpoOptions {
  size?: number;
}

export function createSnowpo(options: SnowpoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="22" ry="3.5" fill="#dbeafe" opacity=".8"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2 48 88;2 48 88;-2 48 88" dur="3.2s" repeatCount="indefinite"/>
    <ellipse cx="48" cy="72" rx="18" ry="13" fill="#fff" stroke="#bae6fd" stroke-width="1.5"/>
    <circle cx="48" cy="48" r="14" fill="#fff" stroke="#bae6fd" stroke-width="1.5"/>
    <path d="M36 34 A14 14 0 0 1 60 34 L56 30 A10 10 0 0 0 40 30 Z" fill="#a16207"/>
    <ellipse cx="48" cy="30" rx="13" ry="5" fill="#b45309"/>
    <path d="M44 30 L40 22 L48 26 Z" fill="#92400e"/>
    <path d="M48 48 L58 50 L48 52 Z" fill="#fb923c"/>
    <circle cx="42" cy="45" r="2.8" fill="#0c4a6e"/>
    <circle cx="54" cy="45" r="2.8" fill="#0c4a6e"/>
    <circle cx="43" cy="44" r=".9" fill="#fff"/>
    <circle cx="55" cy="44" r=".9" fill="#fff"/>
    <path d="M44 56 Q48 59 52 56" stroke="#0369a1" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <g stroke="#94a3b8" stroke-width="3" stroke-linecap="round">
      <line x1="30" y1="66" x2="20" y2="60"><animateTransform attributeName="transform" type="rotate" values="0 30 66;-10 30 66;0 30 66" dur="2s" repeatCount="indefinite"/></line>
      <line x1="66" y1="66" x2="76" y2="60"><animateTransform attributeName="transform" type="rotate" values="0 66 66;10 66 66;0 66 66" dur="2s" repeatCount="indefinite"/></line>
    </g>
    <g fill="#22c55e"><circle cx="40" cy="68" r="1.6"/><circle cx="56" cy="70" r="1.6"/></g>
    <g fill="#f43f5e"><circle cx="48" cy="66" r="1.6"/></g>
  </g>
</svg>`;
}
