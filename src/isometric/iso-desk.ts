export interface IsoDeskOptions {
  size?: number;
}

export function createIsoDesk(options: IsoDeskOptions = {}): string {
  const { size = 300 } = options;
  return `<svg width="${size}" viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <ellipse cx="160" cy="228" rx="130" ry="24" fill="#000" opacity=".3"/>
  <g>
    <polygon points="40,150 160,90 280,150 160,210" fill="#a16207"/>
    <polygon points="40,150 160,210 160,222 40,162" fill="#713f12"/>
    <polygon points="280,150 160,210 160,222 280,162" fill="#854d0e"/>
    <polygon points="96,120 150,93 172,104 118,131" fill="#334155"/>
    <rect x="112" y="86" width="34" height="22" rx="3" fill="#1e293b" stroke="#67e8f9" stroke-width="2"/>
    <text x="129" y="101" font-size="9" fill="#67e8f9" text-anchor="middle" font-family="monospace">&lt;/&gt;</text>
    <polygon points="196,110 220,98 236,106 212,118" fill="#f8fafc"/>
    <rect x="206" y="92" width="8" height="16" fill="#e2e8f0"/>
    <ellipse cx="240" cy="128" rx="12" ry="6" fill="#f472b6"/>
    <path d="M252 124 q10 -6 4 -14" stroke="#f472b6" stroke-width="4" fill="none" stroke-linecap="round">
      <animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite"/>
    </path>
    <rect x="70" y="132" width="26" height="10" rx="5" fill="#22c55e"/>
    <circle cx="200" cy="140" r="7" fill="#facc15"/>
  </g>
</svg>`;
}
