/** Pulse Line — a flat rule with a heartbeat spike and a traveling spark. */
export interface PulseLineOptions {
  color?: string;
  sparkColor?: string;
}

export function createPulseLine(options: PulseLineOptions = {}): string {
  const { color = '#27272a', sparkColor = '#f43f5e' } = options;
  const path = 'M0 40 H560 L590 40 L605 18 L622 62 L638 30 L650 40 H1440';
  return `<svg viewBox="0 0 1440 80" preserveAspectRatio="none" width="100%" height="80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="${path}" fill="none" stroke="${color}" stroke-width="2.5"/>
  <circle r="5" fill="${sparkColor}">
    <animateMotion path="${path}" dur="3.6s" repeatCount="indefinite"/>
  </circle>
  <circle r="10" fill="${sparkColor}" opacity="0.25">
    <animateMotion path="${path}" dur="3.6s" repeatCount="indefinite"/>
    <animate attributeName="r" values="6;12;6" dur="1.2s" repeatCount="indefinite"/>
  </circle>
</svg>`;
}
