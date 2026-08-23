export interface ShapeGearRingOptions {
  colors?: string[];
  size?: number;
  teeth?: number;
}

export function createShapeGearRing(options: ShapeGearRingOptions = {}): string {
  const { colors = ['#8b5cf6', '#3f3f46'], size = 320, teeth = 12 } = options;
  const c = size / 2;
  const parts: string[] = [];

  for (let i = 0; i < teeth; i++) {
    const angle = (360 / teeth) * i;
    parts.push(
      `  <rect x="${c - 9}" y="${c - 138}" width="18" height="34" rx="4" fill="${i % 2 === 0 ? colors[0] : colors[1]}" transform="rotate(${angle} ${c} ${c})" />`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  ${parts.join('\n  ')}
  <circle cx="${c}" cy="${c}" r="112" fill="none" stroke="${colors[0]}" stroke-width="16" />
  <circle cx="${c}" cy="${c}" r="82" fill="none" stroke="#27272a" stroke-width="8" />
  <circle cx="${c}" cy="${c}" r="40" fill="#18181b" stroke="#67e8f9" stroke-width="5" />
  <g>
    <animateTransform attributeName="transform" type="rotate" from="0 ${c} ${c}" to="360 ${c} ${c}" dur="20s" repeatCount="indefinite" />
    <circle cx="${c}" cy="${c - 60}" r="7" fill="#f472b6" />
  </g>
</svg>`;
}
