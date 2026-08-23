export interface WaveDividerOptions {
  colorA?: string;
  colorB?: string;
  colorC?: string;
}

export function createWaveDivider(options: WaveDividerOptions = {}): string {
  const { colorA = '#8b5cf6', colorB = '#22d3ee', colorC = '#f472b6' } = options;
  return `<svg viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path fill="${colorA}" fill-opacity="0.25" d="M0,160 C240,240 480,80 720,140 C960,200 1200,60 1440,120 L1440,320 L0,320 Z">
    <animate attributeName="d" dur="16s" repeatCount="indefinite"
      values="M0,160 C240,240 480,80 720,140 C960,200 1200,60 1440,120 L1440,320 L0,320 Z;
              M0,140 C240,60 480,220 720,160 C960,100 1200,220 1440,150 L1440,320 L0,320 Z;
              M0,160 C240,240 480,80 720,140 C960,200 1200,60 1440,120 L1440,320 L0,320 Z" />
  </path>
  <path fill="${colorB}" fill-opacity="0.22" d="M0,200 C260,120 520,260 760,190 C1000,120 1240,230 1440,180 L1440,320 L0,320 Z">
    <animate attributeName="d" dur="20s" repeatCount="indefinite"
      values="M0,200 C260,120 520,260 760,190 C1000,120 1240,230 1440,180 L1440,320 L0,320 Z;
              M0,180 C260,250 520,110 760,170 C1000,230 1240,120 1440,210 L1440,320 L0,320 Z;
              M0,200 C260,120 520,260 760,190 C1000,120 1240,230 1440,180 L1440,320 L0,320 Z" />
  </path>
  <path fill="${colorC}" fill-opacity="0.18" d="M0,250 C300,190 560,290 820,240 C1080,190 1280,280 1440,240 L1440,320 L0,320 Z">
    <animate attributeName="d" dur="24s" repeatCount="indefinite"
      values="M0,250 C300,190 560,290 820,240 C1080,190 1280,280 1440,240 L1440,320 L0,320 Z;
              M0,230 C300,290 560,200 820,260 C1080,300 1280,210 1440,260 L1440,320 L0,320 Z;
              M0,250 C300,190 560,290 820,240 C1080,190 1280,280 1440,240 L1440,320 L0,320 Z" />
  </path>
</svg>`;
}
