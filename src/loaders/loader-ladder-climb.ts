export function createLoaderLadderClimb(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-la{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-la i{position:relative;display:block;width:52px;height:92px;border-left:4px solid #a78bfa;border-right:4px solid #a78bfa}
    .cl-la i::before,.cl-la i::after{content:'';position:absolute;left:0;right:0;height:4px;background:#8b5cf6}
    .cl-la i::before{top:22px}.cl-la i::after{bottom:22px}
    .cl-la b{position:absolute;left:calc(50% + 6px);top:calc(100% - 12px);width:11px;height:11px;border-radius:50%;background:#67e8f9;box-shadow:0 0 10px rgba(103,232,249,.7);animation:cl-la-climb 2.4s ease-in-out infinite;z-index:1}
    @keyframes cl-la-climb{0%{transform:translate(-14px,0)}25%{transform:translate(0,-34px)}50%{transform:translate(-14px,-68px)}62%{transform:translate(-14px,-68px)}87%{transform:translate(0,-34px)}100%{transform:translate(-14px,0)}}
  </style><div class="cl-la"><i><b></b></i></div>`;
  return () => { container.innerHTML = ''; };
}
