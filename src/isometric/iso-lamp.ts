export interface IsoLampOptions {
  size?: number;
}

export function createIsoLamp(options: IsoLampOptions = {}): string {
  const { size = 220 } = options;
  return `<svg width="${size}" viewBox="0 0 220 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <ellipse cx="110" cy="212" rx="56" ry="12" fill="#000" opacity=".3"/>
  <g>
    <polygon points="88,196 132,196 126,206 94,206" fill="#334155"/>
    <line x1="110" y1="70" x2="110" y2="198" stroke="#475569" stroke-width="6"/>
    <path d="M74 74 L146 74 L120 34 L100 34 Z" fill="#f59e0b">
      <animate attributeName="fill" values="#f59e0b;#fbbf24;#f59e0b" dur="2.4s" repeatCount="indefinite"/>
    </path>
    <ellipse cx="110" cy="80" rx="40" ry="8" fill="#fbbf24" opacity=".35">
      <animate attributeName="opacity" values=".35;.15;.35" dur="2.4s" repeatCount="indefinite"/>
    </ellipse>
    <circle cx="110" cy="66" r="7" fill="#fef3c7"><animate attributeName="r" values="6;8;6" dur="2.4s" repeatCount="indefinite"/></circle>
    <g stroke="#fde68a" stroke-linecap="round" opacity=".5">
      <path d="M78 96 L64 116"><animate attributeName="opacity" values=".6;.15;.6" dur="2.4s" repeatCount="indefinite"/></path>
      <path d="M142 96 L156 116"><animate attributeName="opacity" values=".15;.6;.15" dur="2.4s" begin=".5s" repeatCount="indefinite"/></path>
    </g>
  </g>
</svg>`;
}
