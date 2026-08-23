export function createLoaderLetterBounce(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-lb{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;gap:6px;font:700 22px system-ui,sans-serif}
    .cl-lb b{font-weight:inherit;animation:cl-lb 1.2s ease-in-out infinite;text-shadow:0 0 12px rgba(139,92,246,.4)}
    .cl-lb b:nth-child(odd){color:#a78bfa}
    .cl-lb b:nth-child(even){color:#67e8f9}
    .cl-lb b:nth-child(2){animation-delay:.1s}.cl-lb b:nth-child(3){animation-delay:.2s}
    .cl-lb b:nth-child(4){animation-delay:.3s}.cl-lb b:nth-child(5){animation-delay:.4s}
    .cl-lb b:nth-child(6){animation-delay:.5s}.cl-lb b:nth-child(7){animation-delay:.6s}
    @keyframes cl-lb{0%,100%{transform:translateY(0)}35%{transform:translateY(-14px)}70%{transform:translateY(3px)}}
  </style><div class="cl-lb"><b>L</b><b>O</b><b>A</b><b>D</b><b>I</b><b>N</b><b>G</b></div>`;
  return () => { container.innerHTML = ''; };
}
