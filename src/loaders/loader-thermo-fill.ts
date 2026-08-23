export function createLoaderThermoFill(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-th{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-th i{position:relative;display:block;width:18px;height:66px;border:3px solid #f472b6;border-bottom:none;border-radius:10px 10px 0 0}
    .cl-th i::before{content:'';position:absolute;left:-13px;bottom:-24px;width:38px;height:38px;border-radius:50%;border:3px solid #f472b6;background:#0b0b10}
    .cl-th i::after{content:'';position:absolute;left:2px;bottom:-8px;width:8px;height:8px;border-radius:50%;background:linear-gradient(#f472b6,#8b5cf6);animation:cl-th-rise 1.8s ease-in-out infinite}
    @keyframes cl-th-rise{0%{height:8px;bottom:-8px}55%,80%{height:62px}100%{height:8px;bottom:-8px}}
  </style><div class="cl-th"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
