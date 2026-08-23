export interface AuroraMeshOptions {
  colorA?: string;
  colorB?: string;
  colorC?: string;
}

export function createAuroraMesh(options: AuroraMeshOptions = {}): string {
  const { colorA = '#8b5cf6', colorB = '#22d3ee', colorC = '#f472b6' } = options;
  return `<svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="aurora-blur" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="90" />
    </filter>
  </defs>
  <rect width="1440" height="720" fill="#09090b" />
  <g filter="url(#aurora-blur)" opacity="0.85">
    <ellipse cx="420" cy="300" rx="360" ry="240" fill="${colorA}">
      <animateTransform attributeName="transform" type="translate" values="0 0; 120 80; 0 0" dur="18s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="920" cy="380" rx="400" ry="260" fill="${colorB}" opacity="0.75">
      <animateTransform attributeName="transform" type="translate" values="0 0; -140 -60; 0 0" dur="22s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="700" cy="560" rx="340" ry="200" fill="${colorC}" opacity="0.6">
      <animateTransform attributeName="transform" type="translate" values="0 0; 80 -100; 0 0" dur="26s" repeatCount="indefinite" />
    </ellipse>
  </g>
</svg>`;
}
