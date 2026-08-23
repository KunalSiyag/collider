export function createLoaderShineBar(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-sh{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-sh i{position:relative;display:block;width:150px;height:8px;border-radius:6px;background:#1c1c24;overflow:hidden}
    .cl-sh i::before{content:'';position:absolute;inset:0;width:40%;border-radius:6px;background:linear-gradient(90deg,#8b5cf6,#22d3ee,#f472b6,#8b5cf6);background-size:200% 100%;animation:cl-sh-fill 1.6s ease-in-out infinite,cl-sh-hue 3s linear infinite}
    .cl-sh i::after{content:'';position:absolute;top:0;bottom:0;width:34px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent);animation:cl-sh-glint 1.6s ease-in-out infinite}
    @keyframes cl-sh-fill{0%{left:-40%}100%{left:100%}}
    @keyframes cl-sh-glint{0%{left:-40px}100%{left:170px}}
    @keyframes cl-sh-hue{to{filter:hue-rotate(360deg)}}
  </style><div class="cl-sh"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
