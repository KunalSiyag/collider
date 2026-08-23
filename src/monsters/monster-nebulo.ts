export interface NebuloOptions {
  size?: number;
}

export function createNebulo(options: NebuloOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="88" rx="22" ry="3" fill="#1e1b4b" opacity=".7"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="3s" repeatCount="indefinite"/>
    <path d="M22 62 Q14 62 14 52 Q14 44 24 44 Q26 32 40 32 Q50 24 60 32 Q74 32 74 46 Q82 50 80 58 Q78 64 68 64 Z" fill="#7c3aed" opacity=".75"/>
    <path d="M30 44 Q40 36 54 40 Q66 42 68 52" stroke="#c084fc" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>
    <circle cx="36" cy="50" r="4" fill="#fff"/>
    <circle cx="52" cy="50" r="4" fill="#fff"/>
    <circle cx="37" cy="51" r="2" fill="#2e1065"/>
    <circle cx="53" cy="51" r="2" fill="#2e1065"/>
    <path d="M40 58 Q44 61 48 58 Q52 55 56 58" stroke="#ddd6fe" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="30" cy="56" r="2.2" fill="#f0abfc" opacity=".8"/>
    <circle cx="62" cy="56" r="2.2" fill="#f0abfc" opacity=".8"/>
  </g>
  <g fill="#fde047">
    <path d="M20 24 l1.4 3.6 l3.6 1.4 l-3.6 1.4 l-1.4 3.6 l-1.4 -3.6 l-3.6 -1.4 l3.6 -1.4 Z"><animate attributeName="opacity" values="1;.3;1" dur="1.8s" repeatCount="indefinite"/></path>
    <circle cx="76" cy="20" r="1.6"><animate attributeName="opacity" values=".4;1;.4" dur="2.2s" repeatCount="indefinite"/></circle>
    <circle cx="66" cy="80" r="1.2"><animate attributeName="opacity" values="1;.3;1" dur="2.6s" repeatCount="indefinite"/></circle>
  </g>
</svg>`;
}
