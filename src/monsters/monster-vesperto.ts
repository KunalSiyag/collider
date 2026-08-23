export interface VespertoOptions {
  size?: number;
}

export function createVesperto(options: VespertoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="16" ry="2.5" fill="#000" opacity=".2"/>
  <g transform-origin="48px 88px">
    <animateTransform attributeName="transform" type="scale" values="1 1;1 .94;1 1" dur="2.4s" repeatCount="indefinite"/>
    <path d="M30 46 Q12 40 8 26 Q22 30 30 38 Z" fill="#6d28d9">
      <animateTransform attributeName="transform" type="rotate" values="0 32 44;-14 32 44;0 32 44" dur=".8s" repeatCount="indefinite"/>
    </path>
    <path d="M66 46 Q84 40 88 26 Q74 30 66 38 Z" fill="#6d28d9">
      <animateTransform attributeName="transform" type="rotate" values="0 64 44;14 64 44;0 64 44" dur=".8s" repeatCount="indefinite"/>
    </path>
    <ellipse cx="48" cy="58" rx="15" ry="17" fill="#7c3aed"/>
    <circle cx="48" cy="40" r="15" fill="#8b5cf6"/>
    <path d="M35 32 L33 16 L44 27 Z" fill="#7c3aed"/>
    <path d="M61 32 L63 16 L52 27 Z" fill="#7c3aed"/>
    <path d="M37 29 L36 21 L41 26 Z" fill="#c4b5fd"/>
    <path d="M59 29 L60 21 L55 26 Z" fill="#c4b5fd"/>
    <circle cx="42" cy="40" r="4" fill="#fff"/>
    <circle cx="54" cy="40" r="4" fill="#fff"/>
    <circle cx="43" cy="41" r="2" fill="#1e1b4b"/>
    <circle cx="55" cy="41" r="2" fill="#1e1b4b"/>
    <path d="M44 49 L46 51 L48 48 L50 51 L52 49" stroke="#4c1d95" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <ellipse cx="36" cy="46" rx="2.4" ry="1.6" fill="#a78bfa" opacity=".8"/>
    <ellipse cx="60" cy="46" rx="2.4" ry="1.6" fill="#a78bfa" opacity=".8"/>
  </g>
  <circle cx="20" cy="20" r="1.4" fill="#fef08a" opacity=".7"><animate attributeName="opacity" values=".7;.1;.7" dur="2s" repeatCount="indefinite"/></circle>
  <circle cx="76" cy="16" r="1.2" fill="#fef08a" opacity=".5"><animate attributeName="opacity" values=".1;.7;.1" dur="2.6s" repeatCount="indefinite"/></circle>
</svg>`;
}
