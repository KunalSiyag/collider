/** Live Indicator — an on-air badge with a blinking recording dot. */
export interface LiveIndicatorOptions {
  label?: string;
  color?: string;
}

export function createLiveIndicator(options: LiveIndicatorOptions = {}): string {
  const { label = 'LIVE', color = '#ef4444' } = options;
  return `<svg viewBox="0 0 92 34" height="34" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="1" y="1" width="90" height="32" rx="9" fill="#18181b" stroke="${color}" stroke-opacity="0.6"/>
  <circle cx="20" cy="17" r="5" fill="${color}">
    <animate attributeName="opacity" values="1;0.2;1" dur="1.1s" repeatCount="indefinite"/>
  </circle>
  <text x="34" y="22" fill="${color}" font-size="14" font-weight="800" letter-spacing="2" font-family="system-ui">${label}</text>
</svg>`;
}
