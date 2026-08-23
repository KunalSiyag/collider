export interface BlizzoOptions {
  size?: number;
}

export function createBlizzo(options: BlizzoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="18" ry="3" fill="#dbeafe" opacity=".8"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="2s" repeatCount="indefinite"/>
    <g>
      <animateTransform attributeName="transform" type="rotate" values="0 48 48;360 48 48" dur="14s" repeatCount="indefinite"/>
      <g stroke="#7dd3fc" stroke-width="3" stroke-linecap="round">
        <line x1="48" y1="12" x2="48" y2="30"/><line x1="48" y1="66" x2="48" y2="84"/>
        <line x1="15" y1="30" x2="31" y2="39"/><line x1="65" y1="57" x2="81" y2="66"/>
        <line x1="15" y1="66" x2="31" y2="57"/><line x1="65" y1="39" x2="81" y2="30"/>
      </g>
      <g fill="#bae6fd">
        <circle cx="48" cy="12" r="3"/><circle cx="48" cy="84" r="3"/><circle cx="15" cy="30" r="3"/>
        <circle cx="81" cy="30" r="3"/><circle cx="15" cy="66" r="3"/><circle cx="81" cy="66" r="3"/>
      </g>
    </g>
    <circle cx="48" cy="48" r="19" fill="#e0f2fe"/>
    <circle cx="48" cy="48" r="19" fill="none" stroke="#93c5fd" stroke-width="2"/>
    <circle cx="42" cy="46" r="4" fill="#fff"/>
    <circle cx="54" cy="46" r="4" fill="#fff"/>
    <circle cx="43" cy="47" r="2" fill="#0c4a6e"/>
    <circle cx="55" cy="47" r="2" fill="#0c4a6e"/>
    <path d="M44 54 Q48 58 52 54" stroke="#0369a1" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="36" cy="52" rx="3" ry="2" fill="#67e8f9" opacity=".8"/>
    <ellipse cx="60" cy="52" rx="3" ry="2" fill="#67e8f9" opacity=".8"/>
  </g>
</svg>`;
}
