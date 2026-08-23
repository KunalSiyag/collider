export interface AvatarFlowerOptions {
  petal?: string;
  center?: string;
  size?: number;
}

export function createAvatarFlower(options: AvatarFlowerOptions = {}): string {
  const { petal = '#f472b6', center = '#fbbf24', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flower avatar">
  <rect width="128" height="128" rx="36" fill="#4ade80" opacity="0.1" />
  <path d="M64 78 V116 M64 96 Q48 94 44 82 M64 104 Q80 102 84 90" stroke="#16a34a" stroke-width="6" fill="none" stroke-linecap="round" />
  <path d="M44 82 q-12 -2 -14 -12 q12 0 14 12 Z M84 90 q12 -2 14 -12 q-12 0 -14 12 Z" fill="#22c55e">
    <animateTransform attributeName="transform" type="rotate" values="0 64 88;-5 64 88;0 64 88;5 64 88;0 64 88" dur="5s" repeatCount="indefinite" />
  </path>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-3 64 52;3 64 52;-3 64 52" dur="4s" repeatCount="indefinite" />
    <g fill="${petal}">
      <ellipse cx="64" cy="26" rx="11" ry="15" /><ellipse cx="64" cy="78" rx="11" ry="15" />
      <ellipse cx="38" cy="52" rx="15" ry="11" /><ellipse cx="90" cy="52" rx="15" ry="11" />
      <ellipse cx="46" cy="34" rx="12" ry="10" transform="rotate(-45 46 34)" /><ellipse cx="82" cy="70" rx="12" ry="10" transform="rotate(-45 82 70)" />
      <ellipse cx="82" cy="34" rx="12" ry="10" transform="rotate(45 82 34)" /><ellipse cx="46" cy="70" rx="12" ry="10" transform="rotate(45 46 70)" />
    </g>
    <circle cx="64" cy="52" r="15" fill="${center}" />
    <circle cx="58" cy="49" r="3" fill="#1c1917"><animate attributeName="ry" values="1;1;0;1;1" dur="4.1s" repeatCount="indefinite" /></circle>
    <circle cx="58" cy="50" r="3" fill="#1c1917" />
    <circle cx="70" cy="49" r="3" fill="#1c1917"><animate attributeName="ry" values="1;1;0;1;1" dur="4.1s" begin="-0.4s" repeatCount="indefinite" /></circle>
    <circle cx="70" cy="50" r="3" fill="#1c1917" />
    <path d="M59 56 Q64 60 69 56" stroke="#92400e" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <ellipse cx="55" cy="55" rx="3" ry="2" fill="#fb7185" opacity="0.5" />
    <ellipse cx="73" cy="55" rx="3" ry="2" fill="#fb7185" opacity="0.5" />
  </g>
</svg>`;
}
