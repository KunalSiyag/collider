export function createLoaderVinylSpin(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-vi{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-vi i{position:relative;display:block;width:84px;height:84px;border-radius:50%;background:repeating-radial-gradient(circle,#18181f 0 4px,#23232e 4px 8px);animation:cl-vi 2.6s linear infinite}
    .cl-vi i::before{content:'';position:absolute;left:calc(50% - 15px);top:calc(50% - 15px);width:30px;height:30px;border-radius:50%;background:#8b5cf6;box-shadow:0 0 14px rgba(139,92,246,.6)}
    .cl-vi i::after{content:'';position:absolute;left:calc(50% - 4px);top:calc(50% - 4px);width:8px;height:8px;border-radius:50%;background:#0b0b10}
    @keyframes cl-vi{28%{transform:rotate(360deg)}36%,64%{transform:rotate(360deg) scale(.97)}72%,100%{transform:rotate(720deg)}}
  </style><div class="cl-vi"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
