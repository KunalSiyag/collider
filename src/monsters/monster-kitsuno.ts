export interface KitsunoOptions {
  size?: number;
}

export function createKitsuno(options: KitsunoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3.5" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2.5;0 0" dur="2.1s" repeatCount="indefinite"/>
    <path d="M66 74 Q80 70 82 58 Q72 60 68 66 Z" fill="#f97316"/>
    <path d="M70 76 Q84 74 86 66 Q78 68 72 72 Z" fill="#fdba74">
      <animateTransform attributeName="transform" type="rotate" values="0 74 74;8 74 74;0 74 74" dur="1.4s" repeatCount="indefinite"/>
    </path>
    <path d="M62 72 Q76 64 74 54 Q66 58 62 64 Z" fill="#fb923c"/>
    <ellipse cx="48" cy="66" rx="17" ry="13" fill="#f97316"/>
    <circle cx="48" cy="42" r="17" fill="#fb923c"/>
    <path d="M34 32 L30 18 L42 26 Z" fill="#f97316"/>
    <path d="M62 32 L66 18 L54 26 Z" fill="#f97316"/>
    <path d="M36 29 L34 22 L40 27 Z" fill="#fed7aa"/>
    <path d="M60 29 L62 22 L56 27 Z" fill="#fed7aa"/>
    <circle cx="42" cy="41" r="3.4" fill="#fff"/>
    <circle cx="54" cy="41" r="3.4" fill="#fff"/>
    <circle cx="43" cy="42" r="1.7" fill="#431407"/>
    <circle cx="55" cy="42" r="1.7" fill="#431407"/>
    <ellipse cx="48" cy="48" rx="1.6" ry="1.1" fill="#431407"/>
    <path d="M44 50 Q48 53 52 50" stroke="#7c2d12" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <ellipse cx="35" cy="47" rx="2.8" ry="1.8" fill="#fb7185" opacity=".7"/>
    <ellipse cx="61" cy="47" rx="2.8" ry="1.8" fill="#fb7185" opacity=".7"/>
  </g>
  <circle cx="24" cy="24" r="1.6" fill="#fbbf24" opacity=".8"><animate attributeName="opacity" values=".8;.2;.8" dur="1.8s" repeatCount="indefinite"/></circle>
</svg>`;
}
