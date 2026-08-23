export interface DonutoOptions {
  size?: number;
}

export function createDonuto(options: DonutoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="88" rx="26" ry="3.5" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2 48 88;2 48 88;-2 48 88" dur="2.9s" repeatCount="indefinite"/>
    <circle cx="48" cy="52" r="30" fill="#d97706"/>
    <circle cx="48" cy="49" r="29" fill="#f59e0b"/>
    <circle cx="48" cy="49" r="21" fill="#fb7185"/>
    <path d="M27 42 Q40 30 58 33" stroke="#fda4af" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>
    <circle cx="48" cy="49" r="8" fill="#fef3c7"/>
    <g stroke-linecap="round">
      <line x1="34" y1="38" x2="37" y2="41" stroke="#fde047" stroke-width="2.4"/>
      <line x1="60" y1="36" x2="62" y2="40" stroke="#4ade80" stroke-width="2.4"/>
      <line x1="28" y1="54" x2="32" y2="55" stroke="#8b5cf6" stroke-width="2.4"/>
      <line x1="66" y1="52" x2="69" y2="55" stroke="#38bdf8" stroke-width="2.4"/>
      <line x1="40" y1="70" x2="43" y2="68" stroke="#f472b6" stroke-width="2.4"/>
      <line x1="56" y1="71" x2="59" y2="68" stroke="#a3e635" stroke-width="2.4"/>
    </g>
    <circle cx="42" cy="46" r="3.6" fill="#fff"/>
    <circle cx="54" cy="46" r="3.6" fill="#fff"/>
    <circle cx="43" cy="47" r="1.8" fill="#78350f"/>
    <circle cx="55" cy="47" r="1.8" fill="#78350f"/>
    <path d="M44 53 Q48 56.5 52 53" stroke="#9a3412" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="35" cy="51" rx="2.6" ry="1.8" fill="#fb7185" opacity=".8"/>
    <ellipse cx="61" cy="51" rx="2.6" ry="1.8" fill="#fb7185" opacity=".8"/>
  </g>
</svg>`;
}
