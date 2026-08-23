export interface ElementalOptions {
  size?: number;
}

export function createElementalMagma(options: ElementalOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Magma elemental">
  <ellipse cx="100" cy="198" rx="58" ry="10" fill="#dc2626" opacity="0.25" />
  <defs>
    <clipPath id="magma-body">
      <path d="M100 42 C138 42 164 70 164 112 C164 154 138 180 100 180 C62 180 36 154 36 112 C36 70 62 42 100 42 Z" />
    </clipPath>
  </defs>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -4; 0 0" dur="3.4s" repeatCount="indefinite" />
    <path d="M100 42 C138 42 164 70 164 112 C164 154 138 180 100 180 C62 180 36 154 36 112 C36 70 62 42 100 42 Z" fill="#292524" />
    <g clip-path="url(#magma-body)">
      <g stroke="#f97316" stroke-width="5" fill="none" stroke-linecap="round">
        <path d="M60 60 L84 92 L64 122 L92 156">
          <animate attributeName="opacity" values="1;0.45;1" dur="2.3s" repeatCount="indefinite" />
        </path>
        <path d="M140 56 L118 90 L142 120 L120 152">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.8s" repeatCount="indefinite" />
        </path>
        <path d="M100 40 L96 76 L108 104 L98 140">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
        </path>
      </g>
      <circle cx="84" cy="92" r="6" fill="#fbbf24"><animate attributeName="r" values="5;7.5;5" dur="1.8s" repeatCount="indefinite" /></circle>
      <circle cx="118" cy="90" r="5" fill="#fbbf24"><animate attributeName="r" values="6;4;6" dur="2.4s" repeatCount="indefinite" /></circle>
      <circle cx="98" cy="140" r="6.5" fill="#ef4444"><animate attributeName="cy" values="140;128;140" dur="3.1s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.9;0.3;0.9" dur="3.1s" repeatCount="indefinite" /></circle>
    </g>
    <circle cx="74" cy="88" r="9" fill="#fef3c7" />
    <circle cx="126" cy="88" r="9" fill="#fef3c7" />
    <circle cx="76" cy="90" r="4.5" fill="#1c1917" />
    <circle cx="124" cy="90" r="4.5" fill="#1c1917" />
    <path d="M86 106 Q100 115 114 106" stroke="#fef3c7" stroke-width="4.5" fill="none" stroke-linecap="round" />
    <g fill="#f97316">
      <circle cx="46" cy="66" r="4"><animate attributeName="cy" values="66;40;66" dur="2.6s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.9;0;0.9" dur="2.6s" repeatCount="indefinite" /></circle>
      <circle cx="156" cy="80" r="5"><animate attributeName="cy" values="80;50;80" dur="3s" begin="0.6s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" /></circle>
    </g>
  </g>
</svg>`;
}
