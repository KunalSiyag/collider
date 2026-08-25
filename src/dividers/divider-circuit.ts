/** Circuit Divider — PCB traces with pads and a traveling signal pulse. */
export interface CircuitDividerOptions {
  traceColor?: string;
  padColor?: string;
  pulseColor?: string;
}

export function createCircuitDivider(options: CircuitDividerOptions = {}): string {
  const { traceColor = '#27272a', padColor = '#3f3f46', pulseColor = '#22d3ee' } = options;

  const traces = [
    'M0 40 H240 L280 20 H420 L460 40 H700',
    'M0 52 H180 L220 72 H520 L560 52 H860 L900 32 H1200 L1240 52 H1440',
    'M0 28 H140 L180 48 H380 L420 28 H640 L680 48 H980 L1020 28 H1440',
  ];
  const pads = [[240, 40], [420, 20], [700, 40], [180, 52], [520, 72], [860, 52], [1240, 52], [380, 48], [640, 28], [980, 48]];

  return `<svg viewBox="0 0 1440 80" preserveAspectRatio="none" width="100%" height="80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  ${traces.map((d) => `<path d="${d}" fill="none" stroke="${traceColor}" stroke-width="3"/>`).join('')}
  ${pads.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.5" fill="${padColor}"/>`).join('')}
  <!-- signal pulses racing along the middle trace -->
  <circle r="4" fill="${pulseColor}">
    <animateMotion path="M0 52 H180 L220 72 H520 L560 52 H860 L900 32 H1200 L1240 52 H1440" dur="5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.9;1" dur="5s" repeatCount="indefinite"/>
  </circle>
  <circle r="3" fill="${pulseColor}" opacity="0.7">
    <animateMotion path="M1440 28 H1020 L980 48 H680 L640 28 H420 L380 48 H180 L140 28 H0" dur="7s" repeatCount="indefinite"/>
  </circle>
</svg>`;
}
