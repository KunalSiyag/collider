export interface AvatarPenguinOptions {
  size?: number;
}

export function createAvatarPenguin(options: AvatarPenguinOptions = {}): string {
  const { size = 128 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Penguin avatar">
  <rect width="128" height="128" rx="36" fill="#0ea5e9" opacity="0.13"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-3 64 100;3 64 100;-3 64 100" dur="2.8s" repeatCount="indefinite"/>
    <ellipse cx="40" cy="78" rx="10" ry="20" fill="#1e293b" transform="rotate(18 40 78)"/>
    <ellipse cx="88" cy="78" rx="10" ry="20" fill="#1e293b" transform="rotate(-18 88 78)"/>
    <ellipse cx="64" cy="72" rx="34" ry="42" fill="#1e293b"/>
    <ellipse cx="64" cy="82" rx="24" ry="30" fill="#f8fafc"/>
    <circle cx="52" cy="52" r="6.5" fill="#0f172a"/><circle cx="76" cy="52" r="6.5" fill="#0f172a"/>
    <circle cx="54" cy="50" r="2.2" fill="#fff"/><circle cx="78" cy="50" r="2.2" fill="#fff"/>
    <path d="M56 62 L64 70 L72 62 L68 74 L60 74 Z" fill="#f97316"/>
    <path d="M48 108 L58 118 M80 108 L70 118" stroke="#f97316" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="64" cy="112" rx="18" ry="7" fill="#f97316" opacity=".85"/>
  </g>
</svg>`;
}
