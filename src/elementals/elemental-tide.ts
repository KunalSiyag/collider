export interface ElementalOptions {
  size?: number;
}

export function createElementalTide(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tide elemental">
  <ellipse cx="100" cy="200" rx="56" ry="10" fill="#0ea5e9" opacity="0.25" />
  <defs>
    <clipPath id="tide-body">
      <path d="M100 34 C142 34 166 66 166 112 C166 158 138 184 100 184 C62 184 34 158 34 112 C34 66 58 34 100 34 Z" />
    </clipPath>
  </defs>
  <path d="M100 34 C142 34 166 66 166 112 C166 158 138 184 100 184 C62 184 34 158 34 112 C34 66 58 34 100 34 Z" fill="#0284c7" />
  <g clip-path="url(#tide-body)">
    <rect x="20" y="96" width="160" height="90" fill="#0ea5e9" />
    <path d="M20 100 Q45 88 70 100 T120 100 T170 100 L170 190 L20 190 Z" fill="#38bdf8">
      <animate attributeName="d" dur="3s" repeatCount="indefinite"
        values="M20 100 Q45 88 70 100 T120 100 T170 100 L170 190 L20 190 Z;
                M20 104 Q45 116 70 104 T120 104 T170 104 L170 190 L20 190 Z;
                M20 100 Q45 88 70 100 T120 100 T170 100 L170 190 L20 190 Z" />
    </path>
    <path d="M20 130 Q50 118 80 130 T140 130 T200 126 L200 190 L20 190 Z" fill="#7dd3fc" opacity="0.85">
      <animate attributeName="d" dur="2.4s" repeatCount="indefinite"
        values="M20 130 Q50 118 80 130 T140 130 T200 126 L200 190 L20 190 Z;
                M20 134 Q50 146 80 134 T140 134 T200 130 L200 190 L20 190 Z;
                M20 130 Q50 118 80 130 T140 130 T200 126 L200 190 L20 190 Z" />
    </path>
  </g>
  <circle cx="76" cy="76" r="9" fill="#fff" />
  <circle cx="124" cy="76" r="9" fill="#fff" />
  <circle cx="78.5" cy="78" r="4.5" fill="#0c4a6e" />
  <circle cx="121.5" cy="78" r="4.5" fill="#0c4a6e" />
  <circle cx="77" cy="74" r="1.8" fill="#fff" />
  <circle cx="120" cy="74" r="1.8" fill="#fff" />
  <path d="M88 94 Q100 104 112 94" stroke="#e0f2fe" stroke-width="5" fill="none" stroke-linecap="round" />
  <g fill="#bae6fd">
    <circle cx="40" cy="60" r="5"><animate attributeName="cy" values="60;24;60" dur="3.2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.8;0;0.8" dur="3.2s" repeatCount="indefinite" /></circle>
    <circle cx="164" cy="72" r="6"><animate attributeName="cy" values="72;30;72" dur="2.7s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.7;0;0.7" dur="2.7s" repeatCount="indefinite" /></circle>
    <circle cx="52" cy="150" r="4"><animate attributeName="cy" values="150;108;150" dur="2.2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.6;0;0.6" dur="2.2s" repeatCount="indefinite" /></circle>
  </g>
</svg>`;
}
