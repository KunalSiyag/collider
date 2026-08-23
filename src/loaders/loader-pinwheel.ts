export function createLoaderPinwheel(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-pw{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-pw i{position:relative;display:block;width:70px;height:70px;animation:cl-pw 2.8s linear infinite}
    .cl-pw i::before{content:'';position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,#8b5cf6,#a78bfa,#22d3ee,#67e8f9,#f472b6,#8b5cf6);mask:conic-gradient(from 0deg,#000 0 25%,transparent 25% 50%,#000 50% 75%,transparent 75%);-webkit-mask:conic-gradient(from 0deg,#000 0 25%,transparent 25% 50%,#000 50% 75%,transparent 75%)}
    .cl-pw i::after{content:'';position:absolute;left:calc(50% - 5px);top:calc(50% - 5px);width:10px;height:10px;border-radius:50%;background:#0b0b10;border:2px solid #a78bfa}
    @keyframes cl-pw{0%{transform:rotate(0)}60%{transform:rotate(360deg)}70%{transform:rotate(340deg)}80%,100%{transform:rotate(360deg)}}
  </style><div class="cl-pw"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
