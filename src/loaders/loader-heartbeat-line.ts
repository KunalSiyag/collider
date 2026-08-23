export function createLoaderHeartbeatLine(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-hb{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-hb svg{width:170px;height:48px}
    .cl-hb path{fill:none;stroke:#f472b6;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;
      stroke-dasharray:340;stroke-dashoffset:340;filter:drop-shadow(0 0 6px #f472b6);animation:cl-hb-draw 2.2s linear infinite}
    @keyframes cl-hb-draw{0%{stroke-dashoffset:340;opacity:1}70%{stroke-dashoffset:0;opacity:1}90%,100%{stroke-dashoffset:-340;opacity:0}}
  </style><div class="cl-hb"><svg viewBox="0 0 170 48">
    <path d="M2 24h36l8-14 12 28 10-32 10 18h30l8-10 10 10h42"/>
  </svg></div>`;
  return () => { container.innerHTML = ''; };
}
