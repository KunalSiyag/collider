export interface AvatarVampireOptions {
  cape?: string;
  skin?: string;
  size?: number;
}

export function createAvatarVampire(options: AvatarVampireOptions = {}): string {
  const { cape = '#7f1d1d', skin = '#e0e7ff', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Vampire avatar">
  <rect width="128" height="128" rx="36" fill="#dc2626" opacity="0.1" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3.4s" repeatCount="indefinite" />
    <path d="M22 116 L40 88 H88 L106 116 Z" fill="${cape}" />
    <path d="M48 90 Q64 100 80 90 L76 104 H52 Z" fill="#111827" opacity="0.5" />
    <ellipse cx="64" cy="66" rx="27" ry="25" fill="${skin}" />
    <path d="M37 58 Q37 36 64 36 Q91 36 91 58 Q64 48 37 58 Z" fill="#111827" />
    <path d="M42 54 l6 -12 l4 10 Z M86 54 l-6 -12 l-4 10 Z" fill="#111827" />
    <ellipse cx="53" cy="64" rx="4.5" ry="5" fill="#dc2626">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.5s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="75" cy="64" rx="4.5" ry="5" fill="#dc2626">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.5s" repeatCount="indefinite" />
    </ellipse>
    <path d="M55 78 Q64 84 73 78 L70 86 Q64 89 58 86 Z" fill="#7f1d1d" />
    <path d="M59 81 l-1.5 6 M69 81 l1.5 6" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
    <circle cx="110" cy="24" r="8" fill="#fef9c3" opacity="0.95" />
    <circle cx="107" cy="21" r="6.5" fill="#e0e7ff" />
    <g fill="#fde047"><circle cx="18" cy="30" r="1.8" /><circle cx="26" cy="16" r="1.4" /></g>
  </g>
</svg>`;
}
