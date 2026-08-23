export interface ElementalOptions {
  size?: number;
}

export function createElementalEcho(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Echo elemental">
  <circle cx="100" cy="110" r="14" fill="#c084fc"/>
  <circle cx="94" cy="106" r="3.5" fill="#f3e8ff"/><circle cx="106" cy="106" r="3.5" fill="#f3e8ff"/>
  <path d="M92 118 Q100 125 108 118" stroke="#581c87" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <g fill="none" stroke="#a78bfa" stroke-linecap="round">
    <circle cx="100" cy="110" r="26" stroke-width="4" opacity=".85">
      <animate attributeName="r" values="18;52;52" dur="2.2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values=".9;0;0" dur="2.2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="100" cy="110" r="40" stroke="#e9d5ff" stroke-width="3" opacity=".7">
      <animate attributeName="r" values="18;66;66" dur="2.2s" begin=".7s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values=".8;0;0" dur="2.2s" begin=".7s" repeatCount="indefinite"/>
    </circle>
    <circle cx="100" cy="110" r="54" stroke="#7c3aed" stroke-width="2.5" opacity=".55">
      <animate attributeName="r" values="18;82;82" dur="2.2s" begin="1.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values=".7;0;0" dur="2.2s" begin="1.4s" repeatCount="indefinite"/>
    </circle>
    ${[-38, -19, 0, 19, 38].map((deg) => `<line x1="100" y1="72" x2="100" y2="60" transform="rotate(${deg} 100 110)" stroke-width="4"><animate attributeName="y1" values="72;56;72" dur="1.6s" repeatCount="indefinite"/></line>`).join('')}
  </g>
</svg>`;
}
