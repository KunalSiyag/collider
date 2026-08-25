/** Slash Cut — an angled panel cut with a glowing accent edge. */
export interface SlashCutOptions {
  topColor?: string;
  edgeColor?: string;
  angle?: number;
}

export function createSlashCut(options: SlashCutOptions = {}): string {
  const { topColor = '#18181b', edgeColor = '#8b5cf6', angle = 90 } = options;
  return `<svg viewBox="0 0 1440 ${angle + 10}" preserveAspectRatio="none" width="100%" height="${angle + 10}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M0 ${angle + 10} L1440 0 L1440 10 L0 ${angle + 10} Z" fill="${edgeColor}" opacity="0.65"/>
  <path d="M0 ${angle + 10} L1440 0 L1440 ${angle + 10} Z" fill="${topColor}"/>
  <path d="M0 ${angle + 10} L1440 0" stroke="${edgeColor}" stroke-width="2.5" opacity="0.9">
    <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="4s" repeatCount="indefinite"/>
  </path>
</svg>`;
}
