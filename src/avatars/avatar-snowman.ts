export interface AvatarSnowmanOptions {
  scarf?: string;
  nose?: string;
  size?: number;
}

export function createAvatarSnowman(options: AvatarSnowmanOptions = {}): string {
  const { scarf = '#dc2626', nose = '#f97316', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Snowman avatar">
  <rect width="128" height="128" rx="36" fill="#38bdf8" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2 64 110;2 64 110;-2 64 110" dur="4s" repeatCount="indefinite" />
    <ellipse cx="64" cy="102" rx="34" ry="22" fill="#f8fafc" />
    <circle cx="64" cy="66" r="26" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" />
    <path d="M36 46 Q40 26 64 26 Q88 26 92 46 L92 50 H36 Z" fill="#1e293b" />
    <rect x="30" y="48" width="68" height="8" rx="4" fill="#0f172a" />
    <rect x="52" y="24" width="24" height="14" rx="6" fill="${scarf}" />
    <path d="M70 34 l10 18 l-8 -2 l-2 12 l-8 -3 l3 -11 l-7 -1 Z" fill="${scarf}" opacity="0.9" transform="translate(-4 -4) scale(0.9)" />
    <path d="M44 62 q5 -5 10 0 M74 62 q5 -5 10 0" stroke="#334155" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <circle cx="49" cy="61" r="3" fill="#334155"><animate attributeName="ry" values="1;1;0;1;1" dur="4.3s" repeatCount="indefinite" /></circle>
    <circle cx="49" cy="62" r="3" fill="#334155" />
    <circle cx="79" cy="61" r="3" fill="#334155"><animate attributeName="ry" values="1;1;0;1;1" dur="4.3s" begin="-0.4s" repeatCount="indefinite" /></circle>
    <circle cx="79" cy="62" r="3" fill="#334155" />
    <path d="M60 70 L86 76 L60 78 Z" fill="${nose}">
      <animate attributeName="points" values="60,70 86,76 60,78;60,70 84,73 60,78;60,70 86,76 60,78" dur="3.4s" repeatCount="indefinite" />
    </path>
    <g fill="#1e293b">
      <circle cx="56" cy="90" r="2.5" /><circle cx="66" cy="94" r="2.5" /><circle cx="74" cy="87" r="2.5" />
      <circle cx="50" cy="100" r="2.5" /><circle cx="72" cy="104" r="2.5" /><circle cx="82" cy="98" r="2.5" />
    </g>
    <line x1="28" y1="72" x2="10" y2="58" stroke="#78350f" stroke-width="4" stroke-linecap="round" />
    <g fill="#bae6fd"><circle cx="112" cy="20" r="2" /><circle cx="120" cy="42" r="1.6" /><circle cx="106" cy="34" r="1.4" /></g>
  </g>
</svg>`;
}
