export interface KelpoOptions {
  size?: number;
}

export function createKelpo(options: KelpoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3" fill="#134e4a" opacity=".7"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-4 48 88;4 48 88;-4 48 88" dur="3.4s" repeatCount="indefinite"/>
    <path d="M48 84 Q38 70 48 58 Q58 46 48 34 Q44 28 48 22" stroke="#16a34a" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M48 70 Q58 66 62 56 Q54 58 48 62 Z" fill="#22c55e"/>
    <path d="M48 52 Q38 48 34 38 Q43 40 48 46 Z" fill="#22c55e"/>
    <circle cx="48" cy="26" r="12" fill="#34d399"/>
    <path d="M36 22 Q30 16 32 10 Q38 14 40 20 Z" fill="#16a34a">
      <animateTransform attributeName="transform" type="rotate" values="0 38 18;-10 38 18;0 38 18" dur="2.2s" repeatCount="indefinite"/>
    </path>
    <path d="M60 22 Q66 16 64 10 Q58 14 56 20 Z" fill="#16a34a">
      <animateTransform attributeName="transform" type="rotate" values="0 58 18;10 58 18;0 58 18" dur="2.4s" repeatCount="indefinite"/>
    </path>
    <circle cx="44" cy="25" r="3" fill="#fff"/>
    <circle cx="52" cy="25" r="3" fill="#fff"/>
    <circle cx="44.8" cy="26" r="1.5" fill="#064e3b"/>
    <circle cx="52.8" cy="26" r="1.5" fill="#064e3b"/>
    <path d="M45 31 Q48 33.5 51 31" stroke="#065f46" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <ellipse cx="40" cy="29" rx="2.4" ry="1.5" fill="#a7f3d0" opacity=".8"/>
    <ellipse cx="56" cy="29" rx="2.4" ry="1.5" fill="#a7f3d0" opacity=".8"/>
  </g>
  <circle cx="76" cy="40" r="1.8" fill="#a5f3fc"><animate attributeName="cx" values="80;70" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.7;0" dur="3s" repeatCount="indefinite"/></circle>
</svg>`;
}
