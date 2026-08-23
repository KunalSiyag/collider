export interface TextureBlueprintOptions {
  line?: string;
  major?: string;
  bg?: string;
}

export function createTextureBlueprint(options: TextureBlueprintOptions = {}): string {
  const { line = '#1d4ed8', major = '#3b82f6', bg = '#0a1120' } = options;
  const minor: string[] = [];
  const majors: string[] = [];
  for (let i = 0; i <= 24; i++) {
    const p = i * 25;
    minor.push(`<line x1="${p}" y1="0" x2="${p}" y2="600" stroke-width="0.6" opacity="0.35" /><line x1="0" y1="${p}" x2="600" y2="${p}" stroke-width="0.6" opacity="0.35" />`);
  }
  for (let i = 0; i <= 6; i++) {
    const p = i * 100;
    majors.push(`<line x1="${p}" y1="0" x2="${p}" y2="600" stroke-width="1.4" opacity="0.7" /><line x1="0" y1="${p}" x2="600" y2="${p}" stroke-width="1.4" opacity="0.7" />`);
  }
  return `<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="600" height="600" fill="${bg}" />
  <g stroke="${line}" stroke-linecap="square">${minor.join('')}</g>
  <g stroke="${major}" stroke-linecap="square">${majors.join('')}</g>
  <circle cx="300" cy="300" r="140" fill="none" stroke="${major}" stroke-width="1.2" stroke-dasharray="6 5" opacity="0.8" />
</svg>`;
}
