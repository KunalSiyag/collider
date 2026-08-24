/** Linen — woven crosshatch fabric with slub irregularities. */
export interface LinenOptions {
  warpColor?: string;
  weftColor?: string;
  background?: string;
}

export function createTextureLinen(options: LinenOptions = {}): string {
  const { warpColor = '#d8cfc0', weftColor = '#b8ab96', background = 'transparent' } = options;
  const gap = 14;
  const cols = Math.ceil(1440 / gap) + 1;
  const rows = Math.ceil(720 / gap) + 1;

  let weave = '';
  for (let c = 0; c < cols; c++) {
    weave += `<rect x="${c * gap}" y="0" width="5" height="720" fill="${warpColor}" opacity="0.75"/>`;
  }
  for (let r = 0; r < rows; r++) {
    weave += `<rect x="0" y="${r * gap}" width="1440" height="5" fill="${weftColor}" opacity="0.75"/>`;
    for (let c = 0; c < cols; c++) {
      // Over-under weave: alternate which thread is on top per cell.
      if ((r + c) % 2 === 0) {
        weave += `<rect x="${c * gap - 1}" y="${r * gap - 1}" width="${gap - 3}" height="${gap - 3}" fill="${warpColor}" opacity="0.9"/>`;
      }
    }
  }

  return `<svg viewBox="0 0 1440 720" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="1440" height="720" fill="${background}"/>
  ${weave}
</svg>`;
}
