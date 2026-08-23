export interface AvatarYetiOptions {
  fur?: string;
  face?: string;
  size?: number;
}

export function createAvatarYeti(options: AvatarYetiOptions = {}): string {
  const { fur = '#e0f2fe', face = '#bae6fd', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Yeti avatar">
  <rect width="128" height="128" rx="36" fill="#22d3ee" opacity="0.1" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3.5s" repeatCount="indefinite" />
    <circle cx="30" cy="40" r="13" fill="${fur}" />
    <circle cx="98" cy="40" r="13" fill="${fur}" />
    <ellipse cx="64" cy="74" rx="38" ry="33" fill="${fur}" />
    <ellipse cx="64" cy="84" rx="21" ry="17" fill="${face}" />
    <path d="M44 66 q4 -4 8 0 M76 66 q4 -4 8 0" stroke="#0369a1" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <circle cx="48" cy="67" r="2.5" fill="#0c4a6e">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="80" cy="67" r="2.5" fill="#0c4a6e">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.5s" repeatCount="indefinite" />
    </circle>
    <ellipse cx="64" cy="80" rx="5" ry="3.5" fill="#0c4a6e" opacity="0.7" />
    <path d="M52 88 Q64 96 76 88 Q72 97 64 97 Q56 97 52 88 Z" fill="#0c4a6e" />
    <path d="M58 90 v3 m6 -3 v3" stroke="#f0f9ff" stroke-width="2" stroke-linecap="round" />
    <g stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" opacity="0.8">
      <path d="M36 54 l-4 4 M92 54 l4 4 M28 78 l-5 2 M100 78 l5 2" />
    </g>
    <g fill="#f0f9ff"><circle cx="18" cy="108" r="2.5" /><circle cx="112" cy="104" r="2" /><circle cx="102" cy="116" r="1.6" /></g>
  </g>
</svg>`;
}
