export interface ShapeNeonFrameOptions {
  colors?: string[];
  size?: number;
}

export function createShapeNeonFrame(options: ShapeNeonFrameOptions = {}): string {
  const { colors = ['#22d3ee', '#f472b6'], size = 320 } = options;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
<rect x="52" y="52" width="216" height="216" rx="28" fill="none" stroke="#18181b" stroke-width="18" />
<rect x="52" y="52" width="216" height="216" rx="28" fill="none" stroke="${colors[0]}" stroke-width="6">
  <animate attributeName="opacity" values="1;1;0.35;1;1;0.5;1" dur="4.2s" repeatCount="indefinite" keyTimes="0;0.3;0.34;0.38;0.7;0.74;1" />
</animate></rect>
<rect x="76" y="76" width="168" height="168" rx="20" fill="none" stroke="${colors[1]}" stroke-width="4" stroke-dasharray="30 14">
  <animate attributeName="stroke-dashoffset" from="88" to="0" dur="6s" repeatCount="indefinite" />
</rect>
<circle cx="160" cy="160" r="26" fill="none" stroke="${colors[0]}" stroke-width="4"><animate attributeName="r" values="26;32;26" dur="3s" repeatCount="indefinite" /></circle>
</svg>`;
}
