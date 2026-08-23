export function createLoaderPulseCircle(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-l10{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-l10 i{position:relative;width:20px;height:20px;border-radius:50%;background:#22d3ee;display:block}
    .cl-l10 i::before,.cl-l10 i::after{content:'';position:absolute;inset:-8px;border-radius:50%;border:2px solid #22d3ee;animation:cl-l10 1.6s ease-out infinite}
    .cl-l10 i::after{animation-delay:.8s}
    @keyframes cl-l10{from{transform:scale(.7);opacity:1}to{transform:scale(2.6);opacity:0}}
  </style><div class="cl-l10"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
