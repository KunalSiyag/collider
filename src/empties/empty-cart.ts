/** Empty Cart — a shopping cart with a lone tumbleweed rolling through. */
export interface EmptyCartOptions {
  accent?: string;
  label?: string;
}

export function createEmptyCart(options: EmptyCartOptions = {}): string {
  const { accent = '#fbbf24', label = 'Your cart is empty' } = options;
  return `<svg viewBox="0 0 260 200" width="260" height="200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g stroke="#a1a1aa" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M52 56 h16 l16 62 h84 l16 -46 H84"/>
  </g>
  <circle cx="96" cy="146" r="9" fill="none" stroke="#a1a1aa" stroke-width="4"/>
  <circle cx="156" cy="146" r="9" fill="none" stroke="#a1a1aa" stroke-width="4"/>
  <g>
    <animateMotion path="M-30 150 q 40 -18 80 0 t 80 0 t 80 0 t 80 0" dur="6s" repeatCount="indefinite"/>
    <circle r="11" fill="none" stroke="${accent}" stroke-width="2.4" stroke-dasharray="3 4">
      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2.4s" repeatCount="indefinite"/>
    </circle>
  </g>
  <text x="130" y="182" text-anchor="middle" fill="#71717a" font-size="12.5" font-weight="500" font-family="system-ui">${label}</text>
</svg>`;
}
