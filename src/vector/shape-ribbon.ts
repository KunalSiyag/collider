export interface ShapeRibbonOptions {
  from?: string;
  to?: string;
  size?: number;
}

export function createShapeRibbon(options: ShapeRibbonOptions = {}): string {
  const { from = '#8b5cf6', to = '#22d3ee', size = 800 } = options;
  const c = size / 2;

  const band = (offset: number, opacity: number, dur: number) => `
    <path
      d="M ${-size * 0.1} ${(c + offset).toFixed(0)}
         C ${size * 0.2} ${(c + offset - size * 0.28).toFixed(0)}, ${size * 0.42} ${(c + offset + size * 0.24).toFixed(0)}, ${c} ${(c + offset).toFixed(0)}
         S ${size * 0.86} ${(c + offset - size * 0.26).toFixed(0)}, ${size * 1.1} ${(c + offset + size * 0.06).toFixed(0)}"
      fill="none" stroke="url(#ribbon-grad)" stroke-width="${(size * 0.055).toFixed(0)}"
      stroke-linecap="round" opacity="${opacity}">
      <animate attributeName="d" dur="${dur}s" repeatCount="indefinite"
        values="M ${-size * 0.1} ${(c + offset).toFixed(0)} C ${size * 0.2} ${(c + offset - size * 0.28).toFixed(0)}, ${size * 0.42} ${(c + offset + size * 0.24).toFixed(0)}, ${c} ${(c + offset).toFixed(0)} S ${size * 0.86} ${(c + offset - size * 0.26).toFixed(0)}, ${size * 1.1} ${(c + offset + size * 0.06).toFixed(0)};
                M ${-size * 0.1} ${(c + offset).toFixed(0)} C ${size * 0.2} ${(c + offset + size * 0.22).toFixed(0)}, ${size * 0.42} ${(c + offset - size * 0.2).toFixed(0)}, ${c} ${(c + offset).toFixed(0)} S ${size * 0.86} ${(c + offset + size * 0.28).toFixed(0)}, ${size * 1.1} ${(c + offset - size * 0.08).toFixed(0)};
                M ${-size * 0.1} ${(c + offset).toFixed(0)} C ${size * 0.2} ${(c + offset - size * 0.28).toFixed(0)}, ${size * 0.42} ${(c + offset + size * 0.24).toFixed(0)}, ${c} ${(c + offset).toFixed(0)} S ${size * 0.86} ${(c + offset - size * 0.26).toFixed(0)}, ${size * 1.1} ${(c + offset + size * 0.06).toFixed(0)}" />
    </path>`;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="ribbon-grad" x1="0" y1="${c}" x2="${size}" y2="${c}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${from}" />
      <stop offset="100%" stop-color="${to}" />
    </linearGradient>
  </defs>
${band(-size * 0.12, 0.5, 9)}
${band(0, 0.85, 7)}
${band(size * 0.12, 0.5, 11)}
</svg>`;
}
