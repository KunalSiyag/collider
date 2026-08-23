export interface TextureHoundstoothOptions {
  a?: string;
  b?: string;
}

export function createTextureHoundstooth(options: TextureHoundstoothOptions = {}): string {
  const { a = '#e8e2d4', b = '#26221c' } = options;
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <pattern id="hst-p" width="80" height="80" patternUnits="userSpaceOnUse">
      <rect width="80" height="80" fill="${a}"/>
      <path fill="${b}" d="M0,0h40v20q-20,0-20,20t20,20v20H0V60q20,0,20-20T0,20Z"/>
      <path fill="#000" opacity="0.22" d="M40,60q20,0,20-20t-20-20Z"/>
      <path fill="${b}" opacity="0.35" d="M40,40h40v20q-20,0-20,20t20,20v20H40v-20q20,0,20-20t-20-20Z"/>
    </pattern>
  </defs>
  <rect width="320" height="320" fill="url(#hst-p)"/>
</svg>`;
}
