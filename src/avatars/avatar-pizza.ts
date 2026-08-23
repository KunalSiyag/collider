export interface AvatarPizzaOptions {
  base?: string;
  pepperoni?: string;
  size?: number;
}

export function createAvatarPizza(options: AvatarPizzaOptions = {}): string {
  const { base = '#fbbf24', pepperoni = '#dc2626', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pizza avatar">
  <rect width="128" height="128" rx="36" fill="#f59e0b" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3s" repeatCount="indefinite" />
    <path d="M64 116 L24 34 Q64 10 104 34 Z" fill="#eab308" />
    <path d="M64 108 L31 40 Q64 20 97 40 Z" fill="${base}" />
    <path d="M24 34 Q64 10 104 34 L100 42 Q64 20 28 42 Z" fill="#b45309" opacity="0.35" />
    <circle cx="64" cy="52" r="8" fill="${pepperoni}" />
    <circle cx="47" cy="72" r="7" fill="${pepperoni}" />
    <circle cx="81" cy="72" r="7" fill="${pepperoni}" />
    <circle cx="61" cy="56" r="2.5" fill="#111827">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle cx="67" cy="56" r="2.5" fill="#111827">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" begin="-0.3s" repeatCount="indefinite" />
    </circle>
    <circle cx="45" cy="71" r="2" fill="#111827" />
    <circle cx="49" cy="73" r="2" fill="#111827" />
    <circle cx="79" cy="71" r="2" fill="#111827" />
    <circle cx="83" cy="73" r="2" fill="#111827" />
    <path d="M55 88 Q64 95 73 88" stroke="#7c2d12" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <g fill="#16a34a">
      <rect x="70" y="60" width="8" height="3.5" rx="1.75" transform="rotate(20 74 62)" />
      <rect x="52" y="66" width="8" height="3.5" rx="1.75" transform="rotate(-15 56 68)" />
      <rect x="63" y="76" width="8" height="3.5" rx="1.75" transform="rotate(8 67 78)" />
    </g>
  </g>
</svg>`;
}
