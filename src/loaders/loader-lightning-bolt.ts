export function createLoaderLightningBolt(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-ln{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-ln i{display:block;width:44px;height:64px;background:#67e8f9;clip-path:polygon(58% 0,100% 0,62% 38%,92% 38%,34% 100%,48% 56%,8% 56%);filter:drop-shadow(0 0 12px #22d3ee);animation:cl-ln 1.4s steps(1) infinite}
    @keyframes cl-ln{0%,100%{opacity:.15}6%{opacity:1}18%{opacity:.3}26%{opacity:1}40%{opacity:1;transform:scale(1.08)}55%,90%{opacity:.15;transform:scale(1)}}
  </style><div class="cl-ln"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
