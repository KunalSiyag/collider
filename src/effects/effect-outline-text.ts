export interface EffectOptions {
  text?: string;
}

export function createOutlineText(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { text = 'OUTLINE' } = options;
  container.innerHTML = `<style>
    .cl-ot{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-ot span{font-size:clamp(44px,8vw,86px);font-weight:800;letter-spacing:.05em;color:transparent;
      -webkit-text-stroke:2.5px #67e8f9;transition:color .35s ease,-webkit-text-stroke-color .35s ease;cursor:default}
    .cl-ot span:hover{color:#67e8f9;-webkit-text-stroke-color:#0b0b10}
  </style><div class="cl-ot"><span>${text}</span></div>`;
  return () => { container.innerHTML = ''; };
}
