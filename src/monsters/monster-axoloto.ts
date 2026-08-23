export interface AxolotoOptions {
  size?: number;
}

export function createAxoloto(options: AxolotoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="22" ry="3.5" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="2.2s" repeatCount="indefinite"/>
    <path d="M22 62 Q10 68 12 80 Q24 74 30 66 Z" fill="#f472b6"/>
    <path d="M28 56 Q16 54 12 44 Q26 46 32 52 Z" fill="#f472b6">
      <animateTransform attributeName="transform" type="rotate" values="-4 28 56;4 28 56;-4 28 56" dur="1.6s" repeatCount="indefinite"/>
    </path>
    <path d="M68 56 Q80 54 84 44 Q70 46 64 52 Z" fill="#f472b6">
      <animateTransform attributeName="transform" type="rotate" values="4 68 56;-4 68 56;4 68 56" dur="1.6s" repeatCount="indefinite"/>
    </path>
    <ellipse cx="48" cy="66" rx="24" ry="16" fill="#f9a8d4"/>
    <circle cx="48" cy="42" r="21" fill="#f9a8d4"/>
    <ellipse cx="48" cy="72" rx="13" ry="8" fill="#fce7f3"/>
    <circle cx="39" cy="43" r="5.5" fill="#fff"/>
    <circle cx="57" cy="43" r="5.5" fill="#fff"/>
    <circle cx="40.5" cy="44" r="2.6" fill="#3b0764"/>
    <circle cx="58.5" cy="44" r="2.6" fill="#3b0764"/>
    <circle cx="41.5" cy="41.5" r="1" fill="#fff"/>
    <circle cx="59.5" cy="41.5" r="1" fill="#fff"/>
    <path d="M43 53 Q48 57 53 53" stroke="#9d174d" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="33" cy="51" rx="4" ry="2.5" fill="#fb7185" opacity=".55"/>
    <ellipse cx="63" cy="51" rx="4" ry="2.5" fill="#fb7185" opacity=".55"/>
    <ellipse cx="36" cy="82" rx="7" ry="3.5" fill="#f472b6"/>
    <ellipse cx="60" cy="82" rx="7" ry="3.5" fill="#f472b6"/>
  </g>
  <circle cx="76" cy="30" r="2" fill="#bae6fd"><animate attributeName="cy" values="34;16" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.8;0" dur="3s" repeatCount="indefinite"/></circle>
  <circle cx="18" cy="26" r="1.5" fill="#bae6fd"><animate attributeName="cy" values="30;10" dur="3.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.7;0" dur="3.6s" repeatCount="indefinite"/></circle>
</svg>`;
}
