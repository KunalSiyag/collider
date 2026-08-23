export interface PengoOptions {
  size?: number;
}

export function createPengo(options: PengoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="18" ry="3" fill="#bae6fd" opacity=".8"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2 48 88;2 48 88;-2 48 88" dur="2.4s" repeatCount="indefinite"/>
    <ellipse cx="40" cy="52" rx="6" ry="12" fill="#334155">
      <animateTransform attributeName="transform" type="rotate" values="0 40 52;-16 40 52;0 40 52" dur="1.2s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="56" cy="52" rx="6" ry="12" fill="#334155">
      <animateTransform attributeName="transform" type="rotate" values="0 56 52;16 56 52;0 56 52" dur="1.2s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="48" cy="56" rx="17" ry="22" fill="#1e293b"/>
    <ellipse cx="48" cy="62" rx="11" ry="13" fill="#f8fafc"/>
    <circle cx="48" cy="38" r="14" fill="#1e293b"/>
    <circle cx="43" cy="37" r="3.4" fill="#fff"/>
    <circle cx="53" cy="37" r="3.4" fill="#fff"/>
    <circle cx="44" cy="38" r="1.7" fill="#0f172a"/>
    <circle cx="54" cy="38" r="1.7" fill="#0f172a"/>
    <path d="M45 43 L51 43 L48 48 Z" fill="#fb923c"/>
    <ellipse cx="48" cy="74" rx="7" ry="3" fill="#f97316"/>
    <ellipse cx="41" cy="85" rx="7" ry="2.6" fill="#fb923c"/>
    <ellipse cx="55" cy="85" rx="7" ry="2.6" fill="#fb923c"/>
    <circle cx="35" cy="31" r="2" fill="#38bdf8"/><circle cx="61" cy="31" r="2" fill="#38bdf8"/>
  </g>
  <path d="M20 30 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 Z" fill="#e0f2fe"><animate attributeName="opacity" values="1;.2;1" dur="2.4s" repeatCount="indefinite"/></path>
</svg>`;
}
