export interface LeafVeinsOptions {
  size?: number;
  stroke?: string;
  accent?: string;
}

export function createLeafVeins(options: LeafVeinsOptions = {}): string {
  const { size = 720, stroke = '#3f3f46', accent = '#22d3ee' } = options;
  const cx = size / 2;
  const topY = size * 0.08;
  const botY = size * 0.94;
  const halfW = size * 0.26;
  const veins: string[] = [];
  const pairs = 12;

  for (let i = 1; i <= pairs; i++) {
    const t = i / (pairs + 1);
    const y = topY + (botY - topY) * t;
    const spread = Math.sin(Math.PI * t);
    const len = halfW * spread * 0.85;
    const droop = len * 0.35;
    for (const dir of [1, -1]) {
      veins.push(
        `      <path d="M${cx} ${(y + (botY - topY) * 0.02).toFixed(1)} Q${(cx + dir * len * 0.55).toFixed(1)} ${(y + droop * 0.15).toFixed(1)} ${(cx + dir * len).toFixed(1)} ${(y + droop).toFixed(1)}" />`,
      );
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <path d="M${cx} ${botY} C${cx - halfW} ${(topY + botY) / 2 + 60} ${cx - halfW * 0.7} ${topY + 40} ${cx} ${topY} C${cx + halfW * 0.7} ${topY + 40} ${cx + halfW} ${(topY + botY) / 2 + 60} ${cx} ${botY} Z" fill="#12121a" stroke="#27272a" stroke-width="1.5" />
  <g fill="none" stroke="${accent}" stroke-width="1.1" stroke-linecap="round">
${veins.join('\n')}
    <animate attributeName="stroke-opacity" values="1;0.45;1" dur="6s" repeatCount="indefinite" />
  </g>
  <line x1="${cx}" y1="${topY}" x2="${cx}" y2="${botY}" stroke="${stroke}" stroke-width="2" />
</svg>`;
}
