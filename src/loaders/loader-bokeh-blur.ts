export function createLoaderBokehBlur(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-bk{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;position:relative;overflow:hidden}
    .cl-bk i{position:absolute;border-radius:50%;filter:blur(3px);opacity:0;animation:cl-bk 3s ease-in-out infinite}
    .cl-bk i:nth-child(1){width:52px;height:52px;left:18%;top:28%;background:rgba(139,92,246,.55)}
    .cl-bk i:nth-child(2){width:34px;height:34px;left:62%;top:22%;background:rgba(34,211,238,.55);animation-delay:.6s}
    .cl-bk i:nth-child(3){width:64px;height:64px;left:56%;top:52%;background:rgba(244,114,182,.5);animation-delay:1.2s}
    .cl-bk i:nth-child(4){width:28px;height:28px;left:32%;top:60%;background:rgba(103,232,249,.6);animation-delay:1.8s}
    @keyframes cl-bk{0%{opacity:0;transform:scale(.4)}35%,60%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.3)}}
  </style><div class="cl-bk"><i></i><i></i><i></i><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
