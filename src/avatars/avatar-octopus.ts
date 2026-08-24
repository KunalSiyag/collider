/** Avatar Octopus — wobbly eight-armed sea friend in a rounded frame. */
export interface AvatarOctopusOptions {
  bodyColor?: string;
  cheekColor?: string;
  background?: string;
}

export function createAvatarOctopus(options: AvatarOctopusOptions = {}): string {
  const { bodyColor = '#b06ab8', cheekColor = '#e8a8d8', background = 'transparent' } = options;

  const arms = [-3, -2, -1, 0, 1, 2]
    .map((i) => {
      const x = 120 + i * 17;
      const sway = (i % 2 ? 6 : -6).toFixed(1);
      const dur = (2.2 + Math.abs(i) * 0.35).toFixed(2);
      return `<path d="M${x} 150 q ${i * 2} 26 ${i * 5} 40 q ${i * 3} 10 ${i * 6} 12" stroke="${bodyColor}" stroke-width="11" fill="none" stroke-linecap="round">
        <animateTransform attributeName="transform" type="rotate" values="0 ${x} 150;${sway} ${x} 150;0 ${x} 150" dur="${dur}s" repeatCount="indefinite"/>
      </path>`;
    })
    .join('');

  return `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="240" height="240" rx="48" fill="${background}"/>
  ${arms}

  <ellipse cx="120" cy="118" rx="52" ry="50" fill="${bodyColor}"/>
  <ellipse cx="120" cy="140" rx="30" ry="20" fill="#c98ac9" opacity="0.6"/>

  <!-- eyes on stalks -->
  <g>
    <circle cx="100" cy="102" r="13" fill="#ffffff"/>
    <circle cx="140" cy="102" r="13" fill="#ffffff"/>
    <circle cx="102" cy="104" r="6" fill="#2a1a30"/>
    <circle cx="138" cy="104" r="6" fill="#2a1a30"/>
    <circle cx="104" cy="101" r="2" fill="#ffffff"/>
    <circle cx="136" cy="101" r="2" fill="#ffffff"/>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 2;0 0" dur="4s" repeatCount="indefinite"/>
  </g>
  <ellipse cx="88" cy="126" rx="8" ry="5" fill="${cheekColor}"/>
  <ellipse cx="152" cy="126" rx="8" ry="5" fill="${cheekColor}"/>
  <path d="M112 126 Q 120 132 128 126" stroke="#5a2a60" stroke-width="2.4" fill="none" stroke-linecap="round"/>

  <!-- rising bubbles -->
  <g fill="#e8d0f0">
    <circle cx="70" cy="180" r="3.4" opacity="0.7">
      <animate attributeName="cy" values="180;120" dur="4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.7;0" dur="4s" repeatCount="indefinite"/>
    </circle>
    <circle cx="176" cy="190" r="2.6" opacity="0.6">
      <animate attributeName="cy" values="190;130" dur="5s" begin="-2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.6;0" dur="5s" begin="-2s" repeatCount="indefinite"/>
    </circle>
  </g>
</svg>`;
}
