/** Dots Fade — a dot grid that dissolves from dense to sparse across the rule. */
export interface DotsFadeOptions {
  color?: string;
  accentColor?: string;
  rows?: number;
}

export function createDotsFade(options: DotsFadeOptions = {}): string {
  const { color = '#3f3f46', accentColor = '#8b5cf6', rows = 5 } = options;
  const gapX = 22, gapY = 16, r = 2.6;
  const cols = 64;
  const h = rows * gapY + 8;

  let dots = '';
  for (let c = 0; c < cols; c++) {
    // Fade probability toward the edges; keep a solid spine in the middle.
    const t = Math.abs(c - cols / 2) / (cols / 2);
    const keep = 1 - t * 0.92;
    for (let r2 = 0; r2 < rows; r2++) {
      const on = (c * 7 + r2 * 13) % 10 / 10 < keep;
      if (!on) continue;
      const isAccent = c === Math.floor(cols / 2) && r2 === Math.floor(rows / 2);
      dots += `<circle cx="${c * gapX + 10}" cy="${r2 * gapY + 6}" r="${isAccent ? 4 : r}" fill="${isAccent ? accentColor : color}">
        ${isAccent ? '<animate attributeName="r" values="4;5.5;4" dur="2.4s" repeatCount="indefinite"/>' : ''}
      </circle>`;
    }
  }

  return `<svg viewBox="0 0 1440 ${h}" preserveAspectRatio="xMidYMid meet" width="100%" height="${h}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${dots}</svg>`;
}
