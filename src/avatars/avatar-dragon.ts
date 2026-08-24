/** Avatar Dragon — friendly baby dragon with flapping wings and smoke puffs. */
export interface AvatarDragonOptions {
  scaleColor?: string;
  bellyColor?: string;
  wingColor?: string;
  background?: string;
}

export function createAvatarDragon(options: AvatarDragonOptions = {}): string {
  const { scaleColor = '#4a9e5c', bellyColor = '#c9e8b8', wingColor = '#3a7a4a', background = 'transparent' } = options;
  return `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="240" height="240" rx="48" fill="${background}"/>

  <!-- wings behind body, flapping -->
  <g fill="${wingColor}">
    <path d="M62 120 C 30 96 26 66 44 52 C 66 62 78 88 80 112 Z">
      <animateTransform attributeName="transform" type="rotate" values="0 76 112;-14 76 112;0 76 112" dur="2.6s" repeatCount="indefinite"/>
    </path>
    <path d="M178 120 C 210 96 214 66 196 52 C 174 62 162 88 160 112 Z">
      <animateTransform attributeName="transform" type="rotate" values="0 164 112;14 164 112;0 164 112" dur="2.6s" repeatCount="indefinite"/>
    </path>
  </g>

  <!-- head + body -->
  <ellipse cx="120" cy="140" rx="52" ry="58" fill="${scaleColor}"/>
  <ellipse cx="120" cy="156" rx="34" ry="38" fill="${bellyColor}"/>
  <!-- horns -->
  <path d="M96 92 L88 68 L106 84 Z M144 92 L152 68 L134 84 Z" fill="#f2e8c9"/>
  <!-- snout -->
  <ellipse cx="120" cy="132" rx="22" ry="15" fill="${bellyColor}"/>
  <circle cx="112" cy="130" r="2.6" fill="#3a2a1c"/>
  <circle cx="128" cy="130" r="2.6" fill="#3a2a1c"/>
  <path d="M114 138 Q 120 142 126 138" stroke="#3a2a1c" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- eyes -->
  <g>
    <circle cx="98" cy="112" r="9" fill="#ffffff"/>
    <circle cx="142" cy="112" r="9" fill="#ffffff"/>
    <circle cx="100" cy="113" r="4.4" fill="#20301c"/>
    <circle cx="140" cy="113" r="4.4" fill="#20301c"/>
    <animate attributeName="opacity" values="1;1;0;1;1" keyTimes="0;0.46;0.5;0.54;1" dur="5.2s" repeatCount="indefinite"/>
  </g>
  <!-- back spikes -->
  <path d="M120 82 L126 68 L132 82 L138 70 L142 84" stroke="${scaleColor}" stroke-width="5" fill="none" stroke-linecap="round"/>

  <!-- smoke puffs from nostrils -->
  <g fill="#d8e8d0">
    <circle cx="132" cy="146" r="4" opacity="0.7">
      <animate attributeName="cy" values="146;120" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="cx" values="132;142" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.7;0" dur="3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="128" cy="146" r="3" opacity="0.6">
      <animate attributeName="cy" values="146;126" dur="3.8s" begin="-1.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.6;0" dur="3.8s" begin="-1.4s" repeatCount="indefinite"/>
    </circle>
  </g>
</svg>`;
}
