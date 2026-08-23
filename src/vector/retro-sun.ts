export interface RetroSunOptions {
  color?: string;
  glow?: string;
  size?: number;
}

export function createRetroSun(options: RetroSunOptions = {}): string {
  const { color = '#fb7185', glow = '#f59e0b', size = 600 } = options;
  const c = size / 2;
  const r = size * 0.32;
  const stripes: string[] = [];
  const stripeCount = 7;

  for (let i = 0; i < stripeCount; i++) {
    const y = c + size * 0.02 + i * (r * 0.9) / stripeCount;
    const bandHeight = (i + 1) * (r * 0.09) / stripeCount + 1.5;
    stripes.push(
      `      <rect x="${c - r - 4}" y="${y.toFixed(1)}" width="${(r + 4) * 2}" height="${bandHeight.toFixed(1)}" fill="#09090b" />`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="sun-grad" x1="${c}" y1="${(c - r).toFixed(0)}" x2="${c}" y2="${(c + r).toFixed(0)}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${glow}" />
      <stop offset="100%" stop-color="${color}" />
    </linearGradient>
    <filter id="sun-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="${size * 0.03}" />
    </filter>
  </defs>
  <circle cx="${c}" cy="${c}" r="${r}" fill="url(#sun-grad)" filter="url(#sun-glow)" opacity="0.55" />
  <circle cx="${c}" cy="${c}" r="${r}" fill="url(#sun-grad)" />
  <clipPath id="sun-clip">
    <circle cx="${c}" cy="${c}" r="${r}" />
  </clipPath>
  <g clip-path="url(#sun-clip)">
${stripes.join('\n')}
  </g>
</svg>`;
}
