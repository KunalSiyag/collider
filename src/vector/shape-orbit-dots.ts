/** Orbit Dots — concentric dot rings with satellites circling on them. */
export interface OrbitDotsOptions {
  ringColor?: string;
  satelliteColor?: string;
  coreColor?: string;
  rings?: number;
  background?: string;
}

export function createOrbitDots(options: OrbitDotsOptions = {}): string {
  const {
    ringColor = '#3f3f46', satelliteColor = '#8b5cf6', coreColor = '#22d3ee',
    rings = 5, background = 'transparent',
  } = options;

  const cx = 720;
  const cy = 360;
  let out = `<rect width="1440" height="720" fill="${background}"/>`;

  for (let r = 1; r <= rings; r++) {
    const radius = r * 62;
    const dots = 8 + r * 6;
    let ring = '';
    for (let d = 0; d < dots; d++) {
      const a = (360 / dots) * d;
      ring += `<circle cx="0" cy="${-radius}" r="2.6" fill="${ringColor}" transform="rotate(${a})"/>`;
    }
    out += `<g transform="translate(${cx} ${cy})"><g>${ring}</g></g>`;

    // Satellites orbit each ring at different speeds/directions.
    const dur = 9 + r * 4;
    out += `<g transform="translate(${cx} ${cy})"><g>
      <animateTransform attributeName="transform" type="rotate" values="0;${r % 2 ? 360 : -360}" dur="${dur}s" repeatCount="indefinite"/>
      <circle cx="0" cy="${-radius}" r="6.5" fill="${satelliteColor}"/>
      <circle cx="0" cy="${-radius}" r="10" fill="${satelliteColor}" opacity="0.25"/>
    </g></g>`;
  }

  out += `<circle cx="${cx}" cy="${cy}" r="17" fill="${coreColor}">
    <animate attributeName="r" values="15;19;15" dur="3.2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="${cx}" cy="${cy}" r="26" fill="none" stroke="${coreColor}" stroke-width="1.6" opacity="0.5">
    <animate attributeName="r" values="22;34;22" dur="3.2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.5;0;0.5" dur="3.2s" repeatCount="indefinite"/>
  </circle>`;

  return `<svg viewBox="0 0 1440 720" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${out}</svg>`;
}
