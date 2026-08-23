export interface YetlingOptions {
  size?: number;
}

export function createYetling(options: YetlingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="22" ry="3.5" fill="#dbeafe" opacity=".8"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2.5;0 0" dur="2.5s" repeatCount="indefinite"/>
    <ellipse cx="20" cy="60" rx="8" ry="10" fill="#e0f2fe" transform="rotate(24 20 60)">
      <animateTransform attributeName="transform" type="rotate" values="24 20 60;34 20 60;24 20 60" additive="sum" dur="1.8s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="76" cy="60" rx="8" ry="10" fill="#e0f2fe" transform="rotate(-24 76 60)">
      <animateTransform attributeName="transform" type="rotate" values="-24 76 60;-34 76 60;-24 76 60" additive="sum" dur="1.8s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="48" cy="66" rx="19" ry="17" fill="#f0f9ff"/>
    <circle cx="48" cy="42" r="17" fill="#f0f9ff"/>
    <path d="M31 40 Q34 34 40 36 M65 40 Q62 34 56 36" stroke="#bae6fd" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <circle cx="42" cy="42" r="3.6" fill="#0c4a6e"/>
    <circle cx="54" cy="42" r="3.6" fill="#0c4a6e"/>
    <circle cx="43" cy="41" r="1.1" fill="#fff"/>
    <circle cx="55" cy="41" r="1.1" fill="#fff"/>
    <path d="M44 50 Q48 54 52 50" stroke="#075985" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <ellipse cx="34" cy="48" rx="2.8" ry="1.8" fill="#7dd3fc" opacity=".7"/>
    <ellipse cx="62" cy="48" rx="2.8" ry="1.8" fill="#7dd3fc" opacity=".7"/>
    <ellipse cx="40" cy="83" rx="8" ry="3.4" fill="#bae6fd"/>
    <ellipse cx="57" cy="83" rx="8" ry="3.4" fill="#bae6fd"/>
  </g>
  <path d="M14 26 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 Z" fill="#e0f2fe"><animate attributeName="opacity" values="1;.2;1" dur="2.4s" repeatCount="indefinite"/></path>
</svg>`;
}
