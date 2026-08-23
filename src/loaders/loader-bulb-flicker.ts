export function createLoaderBulbFlicker(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-bu{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-bu i{position:relative;display:block;width:42px;height:42px;border-radius:50%;border:4px solid #facc15;border-color:#a78bfa;animation:cl-bu-glow 2s infinite}
    .cl-bu i::before{content:'';position:absolute;left:calc(50% - 7px);bottom:-16px;width:14px;height:14px;background:#a78bfa;border-radius:0 0 5px 5px;box-shadow:0 -30px 0 #0b0b10 inset}
    .cl-bu i::after{content:'';position:absolute;left:calc(50% - 9px);bottom:-24px;width:18px;height:8px;background:#8b5cf6;border-radius:2px}
    @keyframes cl-bu-glow{0%,100%{background:rgba(250,204,21,.06);box-shadow:none}8%{background:rgba(250,204,21,.35);box-shadow:0 0 26px rgba(250,204,21,.5)}14%{background:rgba(250,204,21,.05)}22%,60%{background:rgba(250,204,21,.4);box-shadow:0 0 30px rgba(167,139,250,.6)}70%{background:rgba(250,204,21,.08)}80%{background:rgba(250,204,21,.35);box-shadow:0 0 20px rgba(250,204,21,.4)}}
  </style><div class="cl-bu"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
