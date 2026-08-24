/** Sunrise Loader — an arc climbing over a horizon bar, then resetting. */
export function createLoaderSunrise(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-sr{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-sr svg{width:110px;height:auto;overflow:visible}
    .cl-sr .disc{fill:#fbbf24;transform-origin:55px 46px;animation:cl-sr-rise 2.4s cubic-bezier(.4,0,.2,1) infinite}
    .cl-sr .bar{fill:#3f3f46}
    .cl-sr .ray{stroke:#fbbf24;stroke-width:3;stroke-linecap:round;opacity:0;animation:cl-sr-ray 2.4s ease-out infinite}
    @keyframes cl-sr-rise{0%{transform:translateY(26px)}55%,80%{transform:translateY(0)}100%{transform:translateY(-4px);opacity:0}}
    @keyframes cl-sr-ray{50%{opacity:0}72%{opacity:1}100%{opacity:0}}
  </style>
  <div class="cl-sr">
    <svg viewBox="0 0 110 70">
      <line class="bar" x1="10" y1="52" x2="100" y2="52" stroke-width="4" stroke="#3f3f46"/>
      <circle class="disc" cx="55" cy="46" r="14"/>
      <g class="ray">
        <line x1="55" y1="18" x2="55" y2="8"/><line x1="31" y1="26" x2="24" y2="19"/><line x1="79" y1="26" x2="86" y2="19"/>
      </g>
    </svg>
  </div>`;
  return () => { container.innerHTML = ''; };
}
