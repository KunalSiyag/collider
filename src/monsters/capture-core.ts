export interface CaptureCoreOptions {
  color?: string;
  size?: number;
}

export function createCaptureCore(options: CaptureCoreOptions = {}): string {
  const { color = '#8b5cf6', size = 240 } = options;
  const c = 110;

  const hexPoints = (cx: number, cy: number, r: number): string => {
    const pts: string[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      pts.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`);
    }
    return pts.join(' ');
  };

  return `<svg width="${size}" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Capture Core, an original capture device orb">
  <defs>
    <linearGradient id="core-grad" x1="40" y1="30" x2="180" y2="190" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${color}" />
      <stop offset="100%" stop-color="#22d3ee" />
    </linearGradient>
  </defs>
  <ellipse cx="110" cy="200" rx="62" ry="10" fill="#000" opacity="0.3" />
  <circle cx="110" cy="104" r="86" fill="#18181b" />
  <path d="M110 18 A86 86 0 0 1 196 104 L24 104 A86 86 0 0 1 110 18 Z" fill="url(#core-grad)" />
  <line x1="24" y1="106" x2="196" y2="106" stroke="#fafafa" stroke-width="7">
    <animate attributeName="stroke" values="#fafafa;#22d3ee;#fafafa" dur="2.4s" repeatCount="indefinite" />
  </line>
  <g stroke="#09090b" stroke-width="3" opacity="0.5">
    <line x1="60" y1="52" x2="76" y2="68" />
    <line x1="160" y1="52" x2="144" y2="68" />
    <line x1="46" y1="140" x2="66" y2="134" />
    <line x1="174" y1="140" x2="154" y2="134" />
  </g>
  <polygon points="${hexPoints(c, c, 34)}" fill="#09090b" stroke="#fafafa" stroke-width="4" />
  <polygon points="${hexPoints(c, c, 18)}" fill="url(#core-grad)">
    <animate attributeName="opacity" values="1;0.45;1" dur="1.6s" repeatCount="indefinite" />
  </polygon>
  <circle cx="110" cy="104" r="92" fill="none" stroke="url(#core-grad)" stroke-width="3" opacity="0.5">
    <animate attributeName="r" values="88;98;88" dur="2.8s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.5;0.15;0.5" dur="2.8s" repeatCount="indefinite" />
  </circle>
</svg>`;
}
