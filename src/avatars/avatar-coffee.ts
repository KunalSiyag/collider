export interface AvatarCoffeeOptions {
  cup?: string;
  brew?: string;
  size?: number;
}

export function createAvatarCoffee(options: AvatarCoffeeOptions = {}): string {
  const { cup = '#fef3c7', brew = '#78350f', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coffee avatar">
  <rect width="128" height="128" rx="36" fill="#fbbf24" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="2.9s" repeatCount="indefinite" />
    <g stroke="#94a3b8" stroke-width="3.5" fill="none" stroke-linecap="round">
      <path d="M50 26 q-5 -7 0 -13"><animate attributeName="opacity" values="0.9;0.2;0.9" dur="2s" repeatCount="indefinite" /></path>
      <path d="M64 22 q-5 -7 0 -13"><animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="-0.7s" repeatCount="indefinite" /></path>
      <path d="M78 26 q-5 -7 0 -13"><animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" begin="-1.4s" repeatCount="indefinite" /></path>
    </g>
    <path d="M28 40 H96 L90 92 Q88 102 76 102 H48 Q36 102 34 92 Z" fill="${cup}" />
    <path d="M32 46 H92 L91 56 Q64 66 33 56 Z" fill="${brew}" />
    <path d="M96 52 q18 -2 14 16 q-3 12 -18 10" fill="none" stroke="#d6d3d1" stroke-width="6" />
    <ellipse cx="53" cy="70" rx="5" ry="5.5" fill="${brew}">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.2s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="71" cy="70" rx="5" ry="5.5" fill="${brew}">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.2s" begin="-0.4s" repeatCount="indefinite" />
    </ellipse>
    <circle cx="54.5" cy="68.5" r="1.8" fill="#ffffff" /><circle cx="72.5" cy="68.5" r="1.8" fill="#ffffff" />
    <path d="M55 82 Q62 87 69 82" stroke="${brew}" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <ellipse cx="45" cy="79" rx="4.5" ry="3" fill="#fb7185" opacity="0.45" />
    <ellipse cx="81" cy="79" rx="4.5" ry="3" fill="#fb7185" opacity="0.45" />
    <path d="M20 112 h88" stroke="#a8a29e" stroke-width="5" stroke-linecap="round" opacity="0.5" />
  </g>
</svg>`;
}
