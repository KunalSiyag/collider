export function createLoaderEmberRise(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-em{height:100%;display:flex;align-items:flex-end;justify-content:center;background:#0b0b10;overflow:hidden}
    .cl-em .p{position:relative;width:120px;height:110px}
    .cl-em i{position:absolute;bottom:0;left:50%;width:8px;height:8px;border-radius:50% 50% 50% 0;background:linear-gradient(#fb923c,#f472b6);opacity:0;animation:cl-em 2.2s linear infinite}
    .cl-em i:nth-child(1){margin-left:-30px;animation-delay:0s}
    .cl-em i:nth-child(2){margin-left:6px;animation-delay:.5s;background:linear-gradient(#67e8f9,#22d3ee)}
    .cl-em i:nth-child(3){margin-left:-6px;animation-delay:1s}
    .cl-em i:nth-child(4){margin-left:26px;animation-delay:1.5s;background:linear-gradient(#c084fc,#8b5cf6)}
    @keyframes cl-em{0%{transform:translateY(0) scale(1);opacity:0}12%{opacity:1}100%{transform:translateY(-96px) translateX(18px) scale(.3);opacity:0}}
  </style><div class="cl-em"><div class="p"><i></i><i></i><i></i><i></i></div></div>`;
  return () => { container.innerHTML = ''; };
}
