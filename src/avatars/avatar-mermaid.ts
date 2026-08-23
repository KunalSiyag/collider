export interface AvatarMermaidOptions {
  hair?: string;
  tail?: string;
  size?: number;
}

export function createAvatarMermaid(options: AvatarMermaidOptions = {}): string {
  const { hair = '#14b8a6', tail = '#22d3ee', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mermaid avatar">
  <rect width="128" height="128" rx="36" fill="#22d3ee" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3.7s" repeatCount="indefinite" />
    <path d="M64 66 Q50 96 58 112 Q64 104 68 112 Q78 96 64 66 Z" fill="${tail}" />
    <path d="M58 110 Q48 122 38 120 Q46 116 46 106 Q54 110 58 110 Z M70 110 Q80 122 90 120 Q82 116 82 106 Q74 110 70 110 Z" fill="#67e8f9" />
    <circle cx="42" cy="88" r="3" fill="#a5f3fc" opacity="0.9" />
    <circle cx="88" cy="72" r="2.5" fill="#a5f3fc" opacity="0.8" />
    <circle cx="96" cy="96" r="3" fill="#a5f3fc" opacity="0.7" />
    <ellipse cx="64" cy="56" rx="22" ry="22" fill="#fcd9b8" />
    <path d="M42 52 Q40 28 64 28 Q88 28 86 52 Q80 36 64 36 Q48 36 42 52 Z" fill="${hair}" />
    <path d="M42 50 Q32 62 38 76 L46 70 Z M86 50 Q96 62 90 76 L82 70 Z" fill="${hair}" />
    <circle cx="55" cy="55" r="3.5" fill="#0f172a">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.1s" repeatCount="indefinite" />
    </circle>
    <circle cx="73" cy="55" r="3.5" fill="#0f172a">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.1s" repeatCount="indefinite" />
    </circle>
    <path d="M58 65 Q64 70 70 65" stroke="#be185d" stroke-width="3" fill="none" stroke-linecap="round" />
    <path d="M46 44 l-4 -4 m8 0 l-2 -5 m8 3 l0 -5 m8 5 l2 -5 m8 3 l4 -4" stroke="#fef08a" stroke-width="2" stroke-linecap="round" opacity="0.9" />
    <ellipse cx="49" cy="61" rx="4" ry="3" fill="#fb7185" opacity="0.45" />
    <ellipse cx="79" cy="61" rx="4" ry="3" fill="#fb7185" opacity="0.45" />
  </g>
</svg>`;
}
