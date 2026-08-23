export interface ThistloOptions {
  size?: number;
}

export function createThistlo(options: ThistloOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="14" ry="3" fill="#000" opacity=".25"/>
  <path d="M48 66 Q46 78 42 87" stroke="#166534" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <path d="M46 76 Q38 72 34 78" stroke="#15803d" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;2 -4;0 0;-2 -3;0 0" dur="3.8s" repeatCount="indefinite"/>
    <ellipse cx="48" cy="44" rx="19" ry="22" fill="#7e22ce"/>
    <g stroke="#a855f7" stroke-width="1.4" opacity=".9">
      <line x1="48" y1="24" x2="48" y2="18"/><line x1="36" y1="28" x2="32" y2="22"/><line x1="60" y1="28" x2="64" y2="22"/>
      <line x1="30" y1="40" x2="23" y2="38"/><line x1="66" y1="40" x2="73" y2="38"/><line x1="32" y1="54" x2="26" y2="58"/><line x1="64" y1="54" x2="70" y2="58"/>
    </g>
    <path d="M34 34 Q42 28 52 30" stroke="#c084fc" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>
    <circle cx="43" cy="46" r="3.6" fill="#fff"/>
    <circle cx="54" cy="46" r="3.6" fill="#fff"/>
    <circle cx="44" cy="47" r="1.8" fill="#3b0764"/>
    <circle cx="55" cy="47" r="1.8" fill="#3b0764"/>
    <path d="M46 54 L48 57 L50 54 L52 57" stroke="#581c87" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <ellipse cx="35" cy="51" rx="2.4" ry="1.6" fill="#d8b4fe" opacity=".8"/>
    <ellipse cx="61" cy="51" rx="2.4" ry="1.6" fill="#d8b4fe" opacity=".8"/>
  </g>
</svg>`;
}
