export interface ElementalOptions {
  size?: number;
}

export function createElementalTerra(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Terra elemental">
  <ellipse cx="100" cy="198" rx="60" ry="11" fill="#000" opacity="0.3" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -4; 0 0" dur="3s" repeatCount="indefinite" />
    <path d="M52 78 L38 58 L64 54 Z" fill="#57534e"><animateTransform attributeName="transform" type="translate" values="0 0; 0 -8; 0 0" dur="2.6s" repeatCount="indefinite" /></path>
    <path d="M148 70 L166 52 L138 46 Z" fill="#57534e"><animateTransform attributeName="transform" type="translate" values="0 0; 0 -12; 0 0" dur="3.1s" repeatCount="indefinite" /></path>
    <path d="M100 40 C136 40 162 66 162 106 C162 148 136 176 100 176 C64 176 38 148 38 106 C38 66 64 40 100 40 Z" fill="#78716c" />
    <path d="M100 40 C136 40 162 66 162 106 L128 96 L118 44 Z" fill="#8a837c" />
    <path d="M56 92 L84 84 L92 112 L62 120 Z" fill="#57534e" />
    <path d="M116 128 L146 120 L152 142 L122 150 Z" fill="#57534e" />
    <path d="M74 140 L94 132 L98 154 L80 158 Z" fill="#44403c" />
    <g stroke="#f59e0b" stroke-width="3" stroke-linecap="round">
      <path d="M88 88 L96 104 L86 118">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.2s" repeatCount="indefinite" />
      </path>
      <path d="M124 108 L114 126 L124 140">
        <animate attributeName="opacity" values="1;0.35;1" dur="2.6s" repeatCount="indefinite" />
      </path>
    </g>
    <circle cx="76" cy="72" r="9" fill="#fef3c7" />
    <circle cx="124" cy="72" r="9" fill="#fef3c7" />
    <circle cx="78" cy="74" r="4.5" fill="#292524" />
    <circle cx="122" cy="74" r="4.5" fill="#292524" />
    <path d="M86 90 Q100 99 114 90" stroke="#292524" stroke-width="4.5" fill="none" stroke-linecap="round" />
    <ellipse cx="42" cy="130" rx="10" ry="6" fill="#4d7c0f" opacity="0.85" transform="rotate(-18 42 130)" />
    <ellipse cx="156" cy="96" rx="9" ry="5" fill="#4d7c0f" opacity="0.85" transform="rotate(14 156 96)" />
  </g>
</svg>`;
}
