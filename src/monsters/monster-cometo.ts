export interface CometoOptions {
  size?: number;
}

export function createCometo(options: CometoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="30" cy="88" rx="14" ry="2.5" fill="#000" opacity=".25"/>
  <g stroke="#67e8f9" stroke-linecap="round" opacity=".8">
    <line x1="58" y1="52" x2="88" y2="66"><animate attributeName="opacity" values=".8;.3;.8" dur="1.4s" repeatCount="indefinite"/></line>
    <line x1="54" y1="60" x2="80" y2="78" stroke="#38bdf8"><animate attributeName="opacity" values=".3;.8;.3" dur="1.4s" repeatCount="indefinite"/></line>
    <line x1="56" y1="44" x2="90" y2="50" stroke="#a5f3fc" stroke-width="2"><animate attributeName="opacity" values=".7;.2;.7" dur="1.1s" repeatCount="indefinite"/></line>
  </g>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;-3 2;0 0" dur="1.8s" repeatCount="indefinite"/>
    <path d="M30 34 L34 44 L45 46 L37 53 L39 64 L30 58 L21 64 L23 53 L15 46 L26 44 Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.5"/>
    <circle cx="30" cy="49" r="11" fill="#fde047"/>
    <circle cx="26" cy="48" r="2.6" fill="#fff"/>
    <circle cx="34" cy="48" r="2.6" fill="#fff"/>
    <circle cx="26.8" cy="48.8" r="1.3" fill="#713f12"/>
    <circle cx="34.8" cy="48.8" r="1.3" fill="#713f12"/>
    <path d="M27 54 Q30 57 33 54" stroke="#92400e" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <circle cx="22" cy="52" r="2" fill="#fb923c" opacity=".6"/>
    <circle cx="38" cy="52" r="2" fill="#fb923c" opacity=".6"/>
  </g>
  <circle cx="16" cy="24" r="1.3" fill="#e0f2fe" opacity=".8"><animate attributeName="opacity" values=".8;.1;.8" dur="2s" repeatCount="indefinite"/></circle>
  <circle cx="84" cy="22" r="1" fill="#e0f2fe" opacity=".5"><animate attributeName="opacity" values=".1;.7;.1" dur="2.6s" repeatCount="indefinite"/></circle>
</svg>`;
}
