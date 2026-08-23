export interface MonsterOptions {
  size?: number;
}

export function createMonsterWisp(options: MonsterOptions = {}): string {
  const { size = 240 } = options;

  return `<svg width="${size}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Wispling, a ghost-type chibi monster">
  <ellipse cx="100" cy="196" rx="40" ry="8" fill="#000" opacity="0.2" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -6; 0 -18; 0 -6" dur="3s" repeatCount="indefinite" />
    <path d="M100 34 C142 34 166 64 166 108 C166 128 164 146 158 162 C150 152 144 156 140 164 C134 154 126 154 120 164 C114 154 106 154 100 164 C94 154 86 154 80 164 C74 154 66 154 60 164 C56 156 50 152 42 162 C36 146 34 128 34 108 C34 64 58 34 100 34 Z"
      fill="#c4b5fd" opacity="0.95" />
    <path d="M100 44 C130 44 150 68 152 100 C136 88 118 82 100 82 C82 82 64 88 48 100 C50 68 70 44 100 44 Z" fill="#ddd6fe" opacity="0.7" />
    <circle cx="74" cy="104" r="13" fill="#ffffff" />
    <circle cx="126" cy="104" r="13" fill="#ffffff" />
    <circle cx="76" cy="107" r="6.5" fill="#4c1d95" />
    <circle cx="124" cy="107" r="6.5" fill="#4c1d95" />
    <circle cx="73.5" cy="103.5" r="2.5" fill="#ffffff" />
    <circle cx="121.5" cy="103.5" r="2.5" fill="#ffffff" />
    <ellipse cx="98" cy="128" rx="9" ry="12" fill="#4c1d95" opacity="0.85" />
    <ellipse cx="52" cy="122" rx="8" ry="5" fill="#a78bfa" opacity="0.7" />
    <ellipse cx="148" cy="122" rx="8" ry="5" fill="#a78bfa" opacity="0.7" />
    <g>
      <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.2s" repeatCount="indefinite" />
      <circle cx="38" cy="70" r="5" fill="#ddd6fe" />
      <circle cx="164" cy="84" r="4" fill="#ddd6fe" />
      <circle cx="52" cy="46" r="3" fill="#ddd6fe" />
    </g>
  </g>
</svg>`;
}
