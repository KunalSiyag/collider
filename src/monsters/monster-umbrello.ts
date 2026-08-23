export interface UmbrelloOptions {
  size?: number;
}

export function createUmbrello(options: UmbrelloOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="18" ry="3" fill="#000" opacity=".25"/>
  <line x1="48" y1="52" x2="48" y2="84" stroke="#7f1d1d" stroke-width="2.6"/>
  <path d="M48 84 q0 5 -5 5" stroke="#7f1d1d" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2 48 40;2 48 40;-2 48 40" dur="3.4s" repeatCount="indefinite"/>
    <path d="M12 44 A36 34 0 0 1 84 44 Q72 38 60 44 Q54 38 48 38 Q42 38 36 44 Q24 38 12 44 Z" fill="#8b5cf6"/>
    <path d="M30 20 A36 34 0 0 1 66 22 L60 44 Q54 38 48 38 Q42 38 36 44 Z" fill="#a78bfa"/>
    <circle cx="48" cy="14" r="2.6" fill="#7c3aed"/>
    <g stroke="#6d28d9" stroke-width="1.6"><line x1="30" y1="21" x2="36" y2="43"/><line x1="48" y1="15" x2="48" y2="37"/><line x1="66" y1="23" x2="60" y2="43"/></g>
    <circle cx="38" cy="56" r="3.8" fill="#fff"/>
    <circle cx="58" cy="56" r="3.8" fill="#fff"/>
    <circle cx="39" cy="57" r="1.9" fill="#3b0764"/>
    <circle cx="59" cy="57" r="1.9" fill="#3b0764"/>
    <path d="M43 64 Q48 68 53 64" stroke="#5b21b6" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="32" cy="62" rx="2.6" ry="1.7" fill="#ddd6fe" opacity=".9"/>
    <ellipse cx="64" cy="62" rx="2.6" ry="1.7" fill="#ddd6fe" opacity=".9"/>
  </g>
  <line x1="16" y1="70" x2="14" y2="76" stroke="#93c5fd" stroke-width="2" stroke-linecap="round"><animate attributeName="opacity" values="0;.9;0" dur="1.6s" repeatCount="indefinite"/></line>
  <line x1="82" y1="74" x2="80" y2="80" stroke="#93c5fd" stroke-width="2" stroke-linecap="round"><animate attributeName="opacity" values=".9;0;.9" dur="2s" repeatCount="indefinite"/></line>
</svg>`;
}
