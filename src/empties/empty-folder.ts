/** Empty Folder — a manila folder opening its flap, moths optional. */
export interface EmptyFolderOptions {
  accent?: string;
  label?: string;
}

export function createEmptyFolder(options: EmptyFolderOptions = {}): string {
  const { accent = '#fbbf24', label = 'Nothing here yet' } = options;
  return `<svg viewBox="0 0 260 200" width="260" height="200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g>
    <animateTransform attributeName="transform" type="rotate" values="0 130 110;-3 130 110;0 130 110" dur="5s" repeatCount="indefinite"/>
    <path d="M56 92 h60 l12 14 h76 a8 8 0 0 1 8 8 v52 a8 8 0 0 1 -8 8 H64 a8 8 0 0 1 -8 -8 z" fill="#3f3212" stroke="${accent}" stroke-width="2.5" stroke-linejoin="round" opacity="0.9"/>
    <path d="M56 118 L204 118 L192 174 L68 174 a12 12 0 0 1 -12 -12 z" fill="#57430f" stroke="${accent}" stroke-width="2.5" stroke-linejoin="round">
      <animateTransform attributeName="transform" type="rotate" values="0 130 118;1.6 130 118;0 130 118" dur="4s" repeatCount="indefinite"/>
    </path>
  </g>
  <text x="130" y="192" text-anchor="middle" fill="#71717a" font-size="12.5" font-weight="500" font-family="system-ui">${label}</text>
</svg>`;
}
