export function createLoaderUfoBeam(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-uf{height:100%;display:flex;align-items:flex-end;justify-content:center;background:#0b0b10;padding-bottom:18px}
    .cl-uf i{position:relative;display:block;width:150px;height:130px}
    .cl-uf i::before{content:'';position:absolute;top:0;left:50%;width:64px;height:22px;margin-left:-32px;border-radius:50%;background:linear-gradient(#67e8f9,#22d3ee);box-shadow:0 0 20px rgba(34,211,238,.6);animation:cl-uf-hover 2s ease-in-out infinite}
    .cl-uf i::after{content:'';position:absolute;top:16px;left:50%;width:104px;height:60px;margin-left:-52px;
      background:linear-gradient(to bottom,rgba(167,139,250,.55),transparent);
      clip-path:polygon(38% 0,62% 0,100% 100%,0 100%);animation:cl-uf-beam 1.1s ease-in-out infinite alternate;transform-origin:top center}
    .cl-uf b{position:absolute;bottom:0;left:50%;width:12px;height:12px;margin-left:-6px;border-radius:50% 50% 40% 40%;background:#f472b6;animation:cl-uf-abduct 2s ease-in-out infinite}
    @keyframes cl-uf-hover{0%,100%{transform:translateX(-16px)}50%{transform:translateX(16px)}}
    @keyframes cl-uf-beam{from{opacity:.5;transform:scaleX(.85)}to{opacity:1;transform:scaleX(1.05)}}
    @keyframes cl-uf-abduct{0%,35%{transform:translateY(0)}70%,80%{transform:translateY(-86px) scaleY(1.3)}100%{transform:translateY(0)}}
  </style><div class="cl-uf"><i><b></b></i></div>`;
  return () => { container.innerHTML = ''; };
}
