/** Count Badge — a notification counter that ticks up with a pop. */
export interface CountBadgeOptions {
  to?: number;
  stepEvery?: number;
  color?: string;
}

export function createCountBadge(options: CountBadgeOptions = {}): string {
  const { to = 12, stepEvery = 1400, color = '#ef4444' } = options;
  const ticks = Array.from({ length: to }, (_, i) =>
    `<text x="30" y="26" text-anchor="middle" fill="#ffffff" font-size="17" font-weight="800" font-family="system-ui" opacity="0">${i + 1}
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.94;1" dur="${(to * stepEvery) / 1000}s" begin="${(i * stepEvery) / 1000}s" repeatCount="indefinite"/>
    </text>`,
  ).join('');
  return `<svg viewBox="0 0 60 44" height="44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="30" cy="22" r="17" fill="${color}"/>
  <circle cx="30" cy="22" r="17" fill="none" stroke="${color}" opacity="0.4">
    <animate attributeName="r" values="17;23" dur="1.4s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.4;0" dur="1.4s" repeatCount="indefinite"/>
  </circle>
  ${ticks}
</svg>`;
}
