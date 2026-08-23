export function createLoaderProgress(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-l7{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0b0b10;gap:12px}
    .cl-l7-track{width:220px;height:8px;border-radius:99px;background:#1f1f23;overflow:hidden}
    .cl-l7-fill{height:100%;width:40%;border-radius:99px;background:linear-gradient(90deg,#8b5cf6,#22d3ee);animation:cl-l7 1.4s ease-in-out infinite}
    @keyframes cl-l7{0%{margin-left:-40%}100%{margin-left:100%}}
    .cl-l7 span{color:#71717a;font-size:12px;letter-spacing:.14em}
  </style><div class="cl-l7"><div class="cl-l7-track"><div class="cl-l7-fill"></div></div><span>LOADING</span></div>`;
  return () => { container.innerHTML = ''; };
}
