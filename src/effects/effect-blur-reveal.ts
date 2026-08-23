export interface EffectOptions {
  title?: string;
}

export function createBlurReveal(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'Focus pulls in' } = options;
  container.innerHTML = `<style>
    .cl-br{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;background:#0b0b10}
    .cl-br h2{color:#fafafa;font-size:clamp(24px,4vw,42px);letter-spacing:-.02em;
      animation:cl-br-in 1.1s cubic-bezier(.2,.7,.3,1) both}
    .cl-br p{color:#71717a;font-size:15px;max-width:380px;text-align:center;
      animation:cl-br-in 1.1s .18s cubic-bezier(.2,.7,.3,1) both}
    @keyframes cl-br-in{from{filter:blur(14px);opacity:0;transform:scale(1.06)}to{filter:blur(0);opacity:1;transform:none}}
  </style><div class="cl-br"><h2>${title}</h2><p>Blur-to-sharp entrance for hero copy — plays once on load.</p></div>`;
  return () => { container.innerHTML = ''; };
}
