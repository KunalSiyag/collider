/** Gustling — a wind-type chibi riding its own swirl of leaves. */
export interface GustlingOptions {
  bodyColor?: string;
  swirlColor?: string;
  background?: string;
}

export function createGustling(options: GustlingOptions = {}): string {
  const { bodyColor = '#c9e8f2', swirlColor = '#8fd0b8', background = 'transparent' } = options;

  const leaves = [-1, 1].map((side) =>
    `<path d="M${120 + side * 70} 120 q ${side * 26} -8 ${side * 44} 4 q ${-side * 18} 12 ${-side * 44} 8 z" fill="${swirlColor}">
      <animateTransform attributeName="transform" type="rotate" values="0 ${120 + side * 70} 120;${side * 14} ${120 + side * 70} 120;0 ${120 + side * 70} 120" dur="${side < 0 ? 3.4 : 4.1}s" repeatCount="indefinite"/>
    </path>`,
  ).join('');

  return `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="240" height="240" rx="48" fill="${background}"/>

  <!-- swirl wrapping the body -->
  <path d="M56 150 C 90 128 150 172 184 150" stroke="${swirlColor}" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.85">
    <animate attributeName="d" values="M56 150 C 90 128 150 172 184 150;M56 156 C 90 178 150 134 184 156;M56 150 C 90 128 150 172 184 150" dur="4.4s" repeatCount="indefinite"/>
  </path>

  <!-- cloud-like body bobbing -->
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -7;0 0" dur="3.6s" repeatCount="indefinite"/>
    <ellipse cx="120" cy="130" rx="52" ry="40" fill="${bodyColor}"/>
    <ellipse cx="86" cy="140" rx="22" ry="16" fill="${bodyColor}"/>
    <ellipse cx="154" cy="140" rx="22" ry="16" fill="${bodyColor}"/>
    <ellipse cx="120" cy="104" rx="26" ry="18" fill="#e8f6fa"/>

    <g>
      <circle cx="102" cy="126" r="8" fill="#ffffff"/>
      <circle cx="138" cy="126" r="8" fill="#ffffff"/>
      <circle cx="103" cy="127" r="4" fill="#2a4a5a"/>
      <circle cx="137" cy="127" r="4" fill="#2a4a5a"/>
      <animate attributeName="opacity" values="1;1;0;1" keyTimes="0;0.46;0.52;0.58" dur="5.4s" repeatCount="indefinite"/>
    </g>
    <path d="M113 142 Q 120 148 127 142" stroke="#2a4a5a" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <ellipse cx="88" cy="140" rx="7" ry="4.5" fill="#f2c9d8" opacity="0.8"/>
    <ellipse cx="152" cy="140" rx="7" ry="4.5" fill="#f2c9d8" opacity="0.8"/>
  </g>

  ${leaves}

  <!-- wind streaks -->
  <g stroke="#b8dce8" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8">
    <path d="M40 96 q 20 -8 40 0"><animate attributeName="opacity" values="0.1;0.8;0.1" dur="2.6s" repeatCount="indefinite"/></path>
    <path d="M168 84 q 18 -8 36 0"><animate attributeName="opacity" values="0.1;0.8;0.1" dur="3s" begin="-1s" repeatCount="indefinite"/></path>
  </g>
</svg>`;
}
