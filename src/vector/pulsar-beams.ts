export interface PulsarBeamsOptions {
  size?: number;
  core?: string;
  beam?: string;
}

export function createPulsarBeams(options: PulsarBeamsOptions = {}): string {
  const { size = 720, core = '#e4e4e7', beam = '#67e8f9' } = options;
  const c = size / 2;
  const len = size * 0.72;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <g transform="rotate(-24 ${c} ${c})">
    <polygon points="${c},${c - 10} ${c - 26},${c - len} ${c + 26},${c - len}" fill="${beam}" opacity="0.28">
      <animate attributeName="opacity" values="0.05;0.35;0.05" dur="2.6s" repeatCount="indefinite" />
    </polygon>
    <polygon points="${c},${c + 10} ${c - 26},${c + len} ${c + 26},${c + len}" fill="${beam}" opacity="0.28">
      <animate attributeName="opacity" values="0.05;0.35;0.05" dur="2.6s" repeatCount="indefinite" />
    </polygon>
    <line x1="${c}" y1="${c - len}" x2="${c}" y2="${c - 8}" stroke="${beam}" stroke-width="2" opacity="0.5" />
    <line x1="${c}" y1="${c + 8}" x2="${c}" y2="${c + len}" stroke="${beam}" stroke-width="2" opacity="0.5" />
  </g>
  <circle cx="${c}" cy="${c}" r="34" fill="#18181b" stroke="#3f3f46" stroke-width="2" />
  <circle cx="${c}" cy="${c}" r="18" fill="${core}">
    <animate attributeName="r" values="14;20;14" dur="1.3s" repeatCount="indefinite" />
  </circle>
  <ellipse cx="${c}" cy="${c}" rx="${size * 0.42}" ry="${size * 0.16}" fill="none" stroke="#27272a" stroke-width="1" transform="rotate(24 ${c} ${c})" />
</svg>`;
}
