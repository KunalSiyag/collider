export interface SunlingOptions {
  size?: number;
}

export function createSunling(options: SunlingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="16" ry="3" fill="#fbbf24" opacity=".5"/>
  <g stroke="#f59e0b" stroke-width="3" stroke-linecap="round">
    <g><animateTransform attributeName="transform" type="rotate" values="0 48 50;360 48 50" dur="16s" repeatCount="indefinite"/>
      <line x1="48" y1="14" x2="48" y2="24"/><line x1="48" y1="76" x2="48" y2="86"/>
      <line x1="12" y1="50" x2="22" y2="50"/><line x1="74" y1="50" x2="84" y2="50"/>
      <line x1="22" y1="24" x2="29" y2="31"/><line x1="67" y1="69" x2="74" y2="76"/>
      <line x1="22" y1="76" x2="29" y2="69"/><line x1="67" y1="31" x2="74" y2="24"/>
    </g>
  </g>
  <g transform-origin="48px 50px">
    <animateTransform attributeName="transform" type="scale" values="1 1;1.04 1.04;1 1" dur="2.2s" repeatCount="indefinite"/>
    <circle cx="48" cy="50" r="22" fill="#fbbf24"/>
    <circle cx="48" cy="50" r="17" fill="#fde047"/>
    <path d="M34 42 q4 -4 8 0 M54 42 q4 -4 8 0" stroke="#b45309" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <circle cx="41" cy="49" r="3.4" fill="#fff"/>
    <circle cx="55" cy="49" r="3.4" fill="#fff"/>
    <circle cx="42" cy="50" r="1.7" fill="#78350f"/>
    <circle cx="56" cy="50" r="1.7" fill="#78350f"/>
    <path d="M42 58 Q48 64 54 58" stroke="#b45309" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <ellipse cx="34" cy="54" rx="3" ry="2" fill="#fb923c" opacity=".7"/>
    <ellipse cx="62" cy="54" rx="3" ry="2" fill="#fb923c" opacity=".7"/>
  </g>
</svg>`;
}
