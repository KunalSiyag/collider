export function createLoaderBatteryFill(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-bf{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-bf i{position:relative;display:block;width:72px;height:34px;border:3px solid #a78bfa;border-radius:8px}
    .cl-bf i::after{content:'';position:absolute;right:-11px;top:8px;width:8px;height:18px;background:#a78bfa;border-radius:0 4px 4px 0}
    .cl-bf i::before{content:'';position:absolute;left:3px;top:3px;bottom:3px;width:10%;border-radius:3px;background:linear-gradient(90deg,#22d3ee,#8b5cf6);animation:cl-bf 2s ease-in-out infinite}
    @keyframes cl-bf{0%{width:8%;filter:brightness(1)}55%{width:88%}70%{filter:brightness(1.7)}85%,100%{width:88%;filter:brightness(1)}}
  </style><div class="cl-bf"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
