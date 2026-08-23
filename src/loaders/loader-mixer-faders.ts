export function createLoaderMixerFaders(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-mf{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;gap:16px}
    .cl-mf i{position:relative;display:block;width:8px;height:76px;border-radius:4px;background:#27272a}
    .cl-mf i::before{content:'';position:absolute;left:-5px;top:var(--p);width:18px;height:12px;border-radius:4px;background:#67e8f9;box-shadow:0 0 8px rgba(103,232,249,.7);animation:cl-mf-slide 1.6s ease-in-out infinite alternate}
    .cl-mf i:nth-child(1){--p:44px}.cl-mf i:nth-child(1)::before{background:#f472b6;box-shadow:0 0 8px rgba(244,114,182,.7)}
    .cl-mf i:nth-child(2){--p:20px}.cl-mf i:nth-child(2)::before{background:#8b5cf6;box-shadow:0 0 8px rgba(139,92,246,.7);animation-delay:.25s}
    .cl-mf i:nth-child(3){--p:56px}.cl-mf i:nth-child(3)::before{background:#a78bfa;animation-delay:.5s}
    .cl-mf i:nth-child(4){--p:30px}.cl-mf i:nth-child(4)::before{background:#f472b6;box-shadow:0 0 8px rgba(244,114,182,.7);animation-delay:.75s}
    @keyframes cl-mf-slide{to{top:6px}}
  </style><div class="cl-mf"><i></i><i></i><i></i><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
