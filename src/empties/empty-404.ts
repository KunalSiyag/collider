/** Error 404 — big ghosted digits with a floating astronaut tether. */
export interface Error404Options {
  accent?: string;
  code?: string;
  label?: string;
}

export function createError404(options: Error404Options = {}): string {
  const { accent = '#8b5cf6', code = '404', label = 'This page drifted off into space' } = options;
  return `<svg viewBox="0 0 300 200" width="300" height="200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <text x="150" y="112" text-anchor="middle" fill="none" stroke="#27272a" stroke-width="2"
    font-size="86" font-weight="900" letter-spacing="4" font-family="system-ui">${code}</text>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -9;0 0" dur="3.6s" repeatCount="indefinite"/>
    <circle cx="228" cy="64" r="17" fill="#e4e4e7"/>
    <rect x="219" y="78" width="18" height="24" rx="8" fill="#e4e4e7"/>
    <rect x="224" y="58" width="8" height="4" rx="2" fill="#18181b"/>
    <line x1="219" y1="96" x2="188" y2="118" stroke="#71717a" stroke-width="2" stroke-dasharray="3 4"/>
    <circle cx="184" cy="120" r="4" fill="${accent}"/>
  </g>
  ${Array.from({ length: 5 }, (_, i) => `<circle cx="${44 + i * 52}" cy="${30 + (i % 2) * 18}" r="1.7" fill="#3f3f46">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="${(2 + i * 0.4).toFixed(1)}s" begin="${(-i * 0.5).toFixed(1)}s" repeatCount="indefinite"/>
  </circle>`).join('')}
  <text x="150" y="168" text-anchor="middle" fill="#71717a" font-size="12.5" font-family="system-ui">${label}</text>
</svg>`;
}
