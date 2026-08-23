export interface AvatarLampOptions {
  shade?: string;
  light?: string;
  size?: number;
}

export function createAvatarLamp(options: AvatarLampOptions = {}): string {
  const { shade = '#fbbf24', light = '#fde68a', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Lamp avatar">
  <rect width="128" height="128" rx="36" fill="#fbbf24" opacity="0.1" />
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2 64 110;2 64 110;-2 64 110" dur="4.4s" repeatCount="indefinite" />
    <path d="M40 20 H88 L100 56 H28 Z" fill="${shade}" />
    <path d="M34 48 Q64 62 94 48 L100 56 H28 Z" fill="#d97706" opacity="0.5" />
    <circle cx="52" cy="38" r="5" fill="#0f172a">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle cx="52" cy="39" r="5" fill="#0f172a" />
    <circle cx="76" cy="38" r="5" fill="#0f172a">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" begin="-0.4s" repeatCount="indefinite" />
    </circle>
    <circle cx="76" cy="39" r="5" fill="#0f172a" />
    <path d="M57 49 Q64 54 71 49" stroke="#0f172a" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M44 60 Q64 76 84 60 Q84 84 64 88 Q44 84 44 60 Z" fill="${light}" opacity="0.75">
      <animate attributeName="opacity" values="0.75;0.35;0.75" dur="3s" repeatCount="indefinite" />
    </path>
    <line x1="64" y1="88" x2="64" y2="108" stroke="#78716c" stroke-width="6" />
    <ellipse cx="64" cy="112" rx="22" ry="7" fill="#57534e" />
    <circle cx="104" cy="30" r="2.5" fill="${light}"><animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" /></circle>
    <circle cx="22" cy="36" r="2" fill="${light}"><animate attributeName="opacity" values="0.2;1;0.2" dur="2.4s" repeatCount="indefinite" /></circle>
  </g>
</svg>`;
}
