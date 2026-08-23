export interface BooklingOptions {
  size?: number;
}

export function createBookling(options: BooklingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="24" ry="3.5" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.4s" repeatCount="indefinite"/>
    <path d="M14 30 Q30 24 48 30 Q66 24 82 30 L82 74 Q66 68 48 74 Q30 68 14 74 Z" fill="#7c3aed"/>
    <path d="M48 30 L48 74" stroke="#4c1d95" stroke-width="2"/>
    <path d="M20 34 Q33 30 44 35 L44 68 Q33 63 20 67 Z" fill="#f5f3ff"/>
    <path d="M76 34 Q63 30 52 35 L52 68 Q63 63 76 67 Z" fill="#ede9fe"/>
    <g stroke="#a78bfa" stroke-width="1.4" stroke-linecap="round">
      <line x1="26" y1="42" x2="38" y2="44"/><line x1="26" y1="48" x2="38" y2="50"/><line x1="26" y1="54" x2="34" y2="56"/>
      <line x1="58" y1="44" x2="70" y2="42"/><line x1="58" y1="50" x2="70" y2="48"/><line x1="58" y1="56" x2="66" y2="54"/>
    </g>
    <circle cx="33" cy="46" r="0" fill="none"/>
    <circle cx="41" cy="47" r="3.2" fill="#1e1b4b"/>
    <circle cx="55" cy="47" r="3.2" fill="#1e1b4b"/>
    <circle cx="42" cy="46" r="1" fill="#fff"/>
    <circle cx="56" cy="46" r="1" fill="#fff"/>
    <path d="M44 56 Q48 59 52 56" stroke="#4c1d95" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M48 74 L48 86 L54 80 L48 74" fill="#f43f5e">
      <animateTransform attributeName="transform" type="rotate" values="0 48 74;-8 48 74;0 48 74" dur="2s" repeatCount="indefinite"/>
    </path>
    <path d="M20 34 Q33 30 44 35 L44 40 Q33 35 20 39 Z" fill="#ddd6fe">
      <animateTransform attributeName="transform" type="rotate" values="0 20 34;10 20 34;0 20 34" dur="3s" repeatCount="indefinite"/>
    </path>
  </g>
</svg>`;
}
