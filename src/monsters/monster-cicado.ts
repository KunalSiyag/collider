export interface CicadoOptions {
  size?: number;
}

export function createCicado(options: CicadoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3.5" fill="#000" opacity=".25"/>
  <g>
    <path d="M40 40 Q18 18 12 34 Q20 46 38 48 Z" fill="#a5f3fc" opacity=".55" stroke="#67e8f9">
      <animateTransform attributeName="transform" type="rotate" values="0 40 44;-16 40 44;0 40 44" dur=".25s" repeatCount="indefinite"/>
    </path>
    <path d="M56 40 Q78 18 84 34 Q76 46 58 48 Z" fill="#a5f3fc" opacity=".55" stroke="#67e8f9">
      <animateTransform attributeName="transform" type="rotate" values="0 56 44;16 56 44;0 56 44" dur=".25s" repeatCount="indefinite"/>
    </path>
    <ellipse cx="48" cy="56" rx="17" ry="22" fill="#14b8a6"/>
    <g stroke="#0f766e" stroke-width="2" opacity=".7">
      <path d="M36 62 Q48 68 60 62"/>
      <path d="M36 70 Q48 76 60 70"/>
    </g>
    <circle cx="48" cy="38" r="15" fill="#2dd4bf"/>
    <circle cx="43" cy="37" r="3" fill="#fff"/>
    <circle cx="53" cy="37" r="3" fill="#fff"/>
    <circle cx="44" cy="38" r="1.5" fill="#134e4a"/>
    <circle cx="54" cy="38" r="1.5" fill="#134e4a"/>
    <path d="M45 44 Q48 47 51 44" stroke="#115e59" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M34 28 Q32 20 38 18 M62 28 Q64 20 58 18" stroke="#0d9488" stroke-width="2" fill="none" stroke-linecap="round">
      <animateTransform attributeName="transform" type="rotate" values="0 48 30;-4 48 30;0 48 30" dur=".5s" repeatCount="indefinite"/>
    </path>
  </g>
</svg>`;
}
