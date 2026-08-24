/** Honeycomb Loader — hex cells filling with amber in a wave. */
export function createLoaderHoneycomb(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-hc{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-hc svg{width:96px;height:auto}
    .cl-hc path{fill:#27272a}
    @keyframes cl-hc{0%,100%{fill:#27272a}50%{fill:#f2b53c}}
  </style>
  <div class="cl-hc">
    <svg viewBox="0 0 120 104">
      ${[0, 1, 2].map((row) => [0, 1, 2].map((col) => {
        const x = 30 + col * 36 + (row % 2 ? 18 : 0);
        const y = 22 + row * 30;
        const delay = ((row * 3 + col) * 0.18).toFixed(2);
        return `<path d="M${x} ${y - 14} l12 7 v14 l-12 7 -12 -7 v-14 z" style="animation:cl-hc 1.8s ${delay}s infinite"/>`;
      }).join('')).join('')}
    </svg>
  </div>`;
  return () => { container.innerHTML = ''; };
}
