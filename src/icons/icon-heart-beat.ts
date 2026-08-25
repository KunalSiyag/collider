/** Heart Beat — a heart pulsing with an EKG line running beneath it. */
export interface HeartBeatOptions {
  color?: string;
  size?: number;
}

export function createHeartBeat(options: HeartBeatOptions = {}): string {
  const { color = '#f43f5e', size = 120 } = options;
  const ekg = 'M0 30 H28 L36 14 L46 44 L54 22 L60 30 H120';
  return `<svg viewBox="0 0 120 96" width="${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M60 34 C 54 20 36 16 28 26 C 20 36 24 48 34 56 L60 76 L86 56 C 96 48 100 36 92 26 C 84 16 66 20 60 34 Z" fill="${color}">
    <animateTransform attributeName="transform" type="scale" values="1;1.14;1;1.06;1" keyTimes="0;0.14;0.28;0.42;1" dur="1.6s" repeatCount="indefinite" additive="sum"/>
  </path>
  <path d="${ekg}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
    stroke-dasharray="200" stroke-dashoffset="200" opacity="0.7">
    <animate attributeName="stroke-dashoffset" values="200;0" dur="1.6s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.7;0.7;0;0.7" keyTimes="0;0.85;0.95;1" dur="1.6s" repeatCount="indefinite"/>
  </path>
</svg>`;
}
