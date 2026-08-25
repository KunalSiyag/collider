/** Ribbon Swoosh — two silky ribbons crossing the seam in opposite arcs. */
export interface RibbonSwooshOptions {
  colorA?: string;
  colorB?: string;
}

export function createRibbonSwoosh(options: RibbonSwooshOptions = {}): string {
  const { colorA = '#8b5cf6', colorB = '#22d3ee' } = options;
  return `<svg viewBox="0 0 1440 120" preserveAspectRatio="none" width="100%" height="120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M0 70 C 320 10 640 130 900 60 C 1120 4 1320 60 1440 34 L1440 52 C 1300 76 1120 22 910 76 C 650 142 320 28 0 86 Z" fill="${colorA}" opacity="0.85">
    <animate attributeName="d" dur="9s" repeatCount="indefinite"
      values="M0 70 C 320 10 640 130 900 60 C 1120 4 1320 60 1440 34 L1440 52 C 1300 76 1120 22 910 76 C 650 142 320 28 0 86 Z;
             M0 58 C 320 118 640 8 900 74 C 1120 128 1320 40 1440 46 L1440 60 C 1320 54 1120 112 910 60 C 650 -6 320 106 0 74 Z;
             M0 70 C 320 10 640 130 900 60 C 1120 4 1320 60 1440 34 L1440 52 C 1300 76 1120 22 910 76 C 650 142 320 28 0 86 Z"/>
  </path>
  <path d="M0 92 C 360 44 720 116 1040 66 C 1240 36 1360 66 1440 52 L1440 62 C 1350 76 1240 48 1050 78 C 730 126 360 58 0 102 Z" fill="${colorB}" opacity="0.7">
    <animate attributeName="d" dur="11s" repeatCount="indefinite"
      values="M0 92 C 360 44 720 116 1040 66 C 1240 36 1360 66 1440 52 L1440 62 C 1350 76 1240 48 1050 78 C 730 126 360 58 0 102 Z;
             M0 78 C 360 112 720 52 1040 88 C 1240 110 1360 52 1440 64 L1440 74 C 1360 62 1240 122 1050 100 C 720 66 360 124 0 90 Z;
             M0 92 C 360 44 720 116 1040 66 C 1240 36 1360 66 1440 52 L1440 62 C 1350 76 1240 48 1050 78 C 730 126 360 58 0 102 Z"/>
  </path>
</svg>`;
}
