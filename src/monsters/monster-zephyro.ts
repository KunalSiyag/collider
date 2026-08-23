export interface ZephyroOptions {
  size?: number;
}

export function createZephyro(options: ZephyroOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="88" rx="22" ry="3" fill="#a7f3d0" opacity=".4"/>
  <g opacity=".85">
    <animateTransform attributeName="transform" type="translate" values="-3 0;3 0;-3 0" dur="2.8s" repeatCount="indefinite"/>
    <path d="M14 40 Q26 32 38 40 M20 50 Q34 42 48 50 M28 60 Q40 54 52 60" stroke="#5eead4" stroke-width="3" fill="none" stroke-linecap="round">
      <animate attributeName="stroke" values="#5eead4;#99f6e4;#5eead4" dur="2.4s" repeatCount="indefinite"/>
    </path>
    <circle cx="58" cy="46" r="14" fill="#ccfbf1"/>
    <path d="M50 40 Q56 34 64 38" stroke="#99f6e4" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <circle cx="54" cy="45" r="3" fill="#fff"/>
    <circle cx="63" cy="45" r="3" fill="#fff"/>
    <circle cx="54.8" cy="46" r="1.5" fill="#134e4a"/>
    <circle cx="63.8" cy="46" r="1.5" fill="#134e4a"/>
    <path d="M56 52 Q59 54.5 62 52" stroke="#0f766e" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <ellipse cx="49" cy="49" rx="2.2" ry="1.4" fill="#5eead4" opacity=".9"/>
    <ellipse cx="69" cy="49" rx="2.2" ry="1.4" fill="#5eead4" opacity=".9"/>
  </g>
  <path d="M74 24 q6 -6 12 0" stroke="#99f6e4" stroke-width="2" fill="none" stroke-linecap="round">
    <animate attributeName="x" values="0;-6;0" dur="2s" repeatCount="indefinite"/>
  </path>
  <path d="M12 22 q5 -5 10 0" stroke="#99f6e4" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".7">
    <animate attributeName="x" values="0;5;0" dur="2.6s" repeatCount="indefinite"/>
  </path>
</svg>`;
}
