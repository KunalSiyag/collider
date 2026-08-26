/** Error Crash — a friendly bug sitting on a cracked screen line. */
export interface ErrorCrashOptions {
  accent?: string;
  label?: string;
}

export function createErrorCrash(options: ErrorCrashOptions = {}): string {
  const { accent = '#f472b6', label = 'Something broke — we rolled back' } = options;
  return `<svg viewBox="0 0 260 200" width="260" height="200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M40 150 L96 150 L112 128 L128 152 L142 132 L156 150 L220 150" fill="none" stroke="#3f3f46" stroke-width="3" stroke-linejoin="round"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="2.8s" repeatCount="indefinite"/>
    <ellipse cx="130" cy="118" rx="26" ry="19" fill="${accent}"/>
    <circle cx="130" cy="92" r="13" fill="${accent}"/>
    <g stroke="${accent}" stroke-width="4" stroke-linecap="round">
      <line x1="112" y1="86" x2="102" y2="78"><animate attributeName="opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite"/></line>
      <line x1="148" y1="86" x2="158" y2="78"><animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite"/></line>
    </g>
    <g stroke="${accent}" stroke-width="3.4" stroke-linecap="round">
      <line x1="108" y1="112" x2="98" y2="106"/><line x1="108" y1="122" x2="97" y2="124"/>
      <line x1="152" y1="112" x2="162" y2="106"/><line x1="152" y1="122" x2="163" y2="124"/>
    </g>
    <circle cx="125" cy="91" r="2.4" fill="#1c1c22"/>
    <circle cx="135" cy="91" r="2.4" fill="#1c1c22"/>
  </g>
  <text x="130" y="176" text-anchor="middle" fill="#71717a" font-size="12.5" font-family="system-ui">${label}</text>
</svg>`;
}
