export interface BasiliskoOptions {
  size?: number;
}

export function createBasilisko(options: BasiliskoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="26" ry="4" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2.5;0 0" dur="2.6s" repeatCount="indefinite"/>
    <path d="M24 82 Q14 74 22 66 Q40 52 62 56 Q84 60 82 74 Q80 84 62 84 L34 84 Q26 84 24 82 Z" fill="#10b981"/>
    <path d="M30 78 Q26 72 34 68 Q48 62 64 66" stroke="#047857" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>
    <path d="M62 56 Q66 34 56 24 Q46 14 40 22 Q36 28 44 30 Q52 32 52 44 L54 58 Z" fill="#34d399"/>
    <path d="M40 22 L36 12 L46 18 Z" fill="#fbbf24"/>
    <path d="M44 20 L46 8 L52 18 Z" fill="#fbbf24"/>
    <path d="M50 22 L58 12 L56 24 Z" fill="#fbbf24"/>
    <circle cx="47" cy="27" r="4" fill="#fff"/>
    <circle cx="47" cy="27" r="2" fill="#b91c1c"/>
    <line x1="47" y1="25" x2="47" y2="29" stroke="#7f1d1d" stroke-width="1"/>
    <path d="M44 35 Q47 38 50 35" stroke="#065f46" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M52 37 L60 36 M60 36 L63 33 M60 36 L63 39" stroke="#f43f5e" stroke-width="1.6" fill="none" stroke-linecap="round">
      <animateTransform attributeName="transform" type="scale" values="1 1;1 .2;1 1" additive="sum" dur="1.4s" repeatCount="indefinite"/>
    </path>
  </g>
  <circle cx="76" cy="24" r="1.5" fill="#fde047" opacity=".8"><animate attributeName="opacity" values=".8;.2;.8" dur="2s" repeatCount="indefinite"/></circle>
  <circle cx="20" cy="30" r="1.2" fill="#fde047" opacity=".6"><animate attributeName="opacity" values=".2;.8;.2" dur="2.4s" repeatCount="indefinite"/></circle>
</svg>`;
}
