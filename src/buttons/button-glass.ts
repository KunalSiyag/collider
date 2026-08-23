export interface ButtonOptions {
  label?: string;
}

export function createGlassButton(container: HTMLElement, options: ButtonOptions = {}): () => void {
  const { label = 'Glass action' } = options;

  container.innerHTML = `
    <style>
      .cl-gb2 { height:100%; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden;
        background:linear-gradient(130deg,#312e81,#155e75,#831843); background-size:300% 300%; animation:cl-gb2-bg 10s ease infinite; }
      @keyframes cl-gb2-bg { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
      .cl-gb2-btn { padding:14px 34px; font-size:15px; font-weight:600; color:#fff;
        background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.28); border-radius:999px;
        backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); cursor:pointer;
        transition:background .25s ease, transform .2s ease; }
      .cl-gb2-btn:hover { background:rgba(255,255,255,0.2); transform:translateY(-1.5px); }
    </style>
    <div class="cl-gb2"><button type="button" class="cl-gb2-btn">${label}</button></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
