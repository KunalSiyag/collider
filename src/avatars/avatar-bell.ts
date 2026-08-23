export interface AvatarBellOptions {
  body?: string;
  clapper?: string;
  size?: number;
}

export function createAvatarBell(options: AvatarBellOptions = {}): string {
  const { body = '#facc15', clapper = '#b45309', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bell avatar">
  <rect width="128" height="128" rx="36" fill="#fbbf24" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-8 64 30;8 64 30;-8 64 30" dur="2.4s" repeatCount="indefinite" />
    <path d="M64 18 v10 M58 16 q6 -6 12 0" stroke="${body}" stroke-width="6" fill="none" stroke-linecap="round" />
    <path d="M30 92 Q32 50 46 40 Q56 32 64 32 Q72 32 82 40 Q96 50 98 92 Z" fill="${body}" />
    <rect x="26" y="90" width="76" height="11" rx="5.5" fill="#eab308" />
    <circle cx="64" cy="110" r="9" fill="${clapper}">
      <animateTransform attributeName="transform" type="rotate" values="-14 64 101;14 64 101;-14 64 101" dur="2.4s" begin="-0.15s" repeatCount="indefinite" />
    </circle>
    <circle cx="53" cy="66" r="5" fill="#0f172a">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.3s" repeatCount="indefinite" />
    </circle>
    <circle cx="53" cy="67" r="5" fill="#0f172a" />
    <circle cx="75" cy="66" r="5" fill="#0f172a">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.3s" begin="-0.4s" repeatCount="indefinite" />
    </circle>
    <circle cx="75" cy="67" r="5" fill="#0f172a" />
    <path d="M57 78 Q64 83 71 78" stroke="#0f172a" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M42 52 q-4 8 -4 16" stroke="#fef9c3" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8" />
    <g stroke="#f59e0b" stroke-width="3" stroke-linecap="round" opacity="0.85">
      <path d="M14 66 l-8 -3"><animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" /></path>
      <path d="M114 66 l8 -3"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" begin="-0.6s" repeatCount="indefinite" /></path>
      <path d="M16 80 h-9"><animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="-0.3s" repeatCount="indefinite" /></path>
      <path d="M112 80 h9"><animate attributeName="opacity" values="1;0.3;1" dur="1.2s" begin="-0.9s" repeatCount="indefinite" /></path>
    </g>
  </g>
</svg>`;
}
