export function createLoaderBubbleRise(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-bb{height:100%;display:flex;align-items:flex-end;justify-content:center;background:#0b0b10;overflow:hidden;padding-bottom:14px}
    .cl-bb .p{position:relative;width:130px;height:130px}
    .cl-bb i{position:absolute;bottom:-14px;border-radius:50%;border:2px solid #67e8f9;background:rgba(34,211,238,.14);opacity:0;animation:cl-bb-rise 3s ease-in infinite}
    .cl-bb i:nth-child(1){left:14%;width:13px;height:13px}
    .cl-bb i:nth-child(2){left:38%;width:19px;height:19px;animation-delay:.7s}
    .cl-bb i:nth-child(3){left:62%;width:10px;height:10px;animation-delay:1.4s;border-color:#c4b5fd;background:rgba(139,92,246,.14)}
    .cl-bb i:nth-child(4){left:82%;width:16px;height:16px;animation-delay:2.1s;border-color:#f9a8d4;background:rgba(244,114,182,.14)}
    @keyframes cl-bb-rise{0%{transform:translateY(0) translateX(0);opacity:0}10%{opacity:1}50%{transform:translateY(-66px) translateX(8px)}100%{transform:translateY(-132px) translateX(-6px);opacity:0}}
  </style><div class="cl-bb"><div class="p"><i></i><i></i><i></i><i></i></div></div>`;
  return () => { container.innerHTML = ''; };
}
