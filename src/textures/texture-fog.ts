export interface TextureFogOptions {
  tint?: string;
}

export function createTextureFog(options: TextureFogOptions = {}): string {
  const { tint = '#c7d2fe' } = options;
  return `<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="fog-f" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.008 0.02" numOctaves="5" seed="14" result="n">
        <animate attributeName="baseFrequency" values="0.008 0.02;0.010 0.026;0.008 0.02" dur="22s" repeatCount="indefinite" />
      </feTurbulence>
      <feColorMatrix in="n" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.9 0.9 0.9 0 -0.85" />
    </filter>
  </defs>
  <rect width="640" height="400" fill="#0f1222" />
  <rect width="640" height="400" filter="url(#fog-f)" fill="${tint}" opacity="0.55" style="mix-blend-mode:screen" />
</svg>`;
}
