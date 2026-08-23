export interface SeahoOptions {
  size?: number;
}

export function createSeaho(options: SeahoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="16" ry="3" fill="#134e4a" opacity=".6"/>
  <path d="M70 8 Q66 30 70 50 Q72 70 66 88" stroke="#15803d" stroke-width="3" fill="none" stroke-linecap="round"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-4 66 60;4 66 60;-4 66 60" dur="3s" repeatCount="indefinite"/>
    <path d="M40 78 Q30 74 32 62 Q34 52 44 52 L52 52 Q60 52 60 62 Q60 74 50 78 Z" fill="#2dd4bf"/>
    <path d="M44 78 Q40 86 34 88" stroke="#14b8a6" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="44" cy="40" r="13" fill="#5eead4"/>
    <path d="M44 28 Q40 20 46 14 Q52 20 48 28 Z" fill="#2dd4bf"/>
    <path d="M32 38 Q26 34 26 28 Q32 30 34 36 Z" fill="#2dd4bf"/>
    <path d="M56 38 Q62 34 62 28 Q56 30 54 36 Z" fill="#2dd4bf"/>
    <path d="M52 56 Q62 54 66 46 Q68 56 58 62 Z" fill="#14b8a6"/>
    <circle cx="39" cy="40" r="3" fill="#fff"/>
    <circle cx="49" cy="40" r="3" fill="#fff"/>
    <circle cx="39.8" cy="41" r="1.5" fill="#134e4a"/>
    <circle cx="49.8" cy="41" r="1.5" fill="#134e4a"/>
    <path d="M40 47 Q44 50 48 47" stroke="#0f766e" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <ellipse cx="36" cy="45" rx="2.2" ry="1.4" fill="#99f6e4" opacity=".8"/>
    <ellipse cx="52" cy="45" rx="2.2" ry="1.4" fill="#99f6e4" opacity=".8"/>
    <g fill="#99f6e4" stroke="#14b8a6" stroke-width="1"><circle cx="60" cy="70" r="1.4"/><circle cx="64" cy="64" r="1.1"/></g>
  </g>
</svg>`;
}
