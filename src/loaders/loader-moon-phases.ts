export function createLoaderMoonPhases(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-mo{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-mo i{position:relative;display:block;width:56px;height:56px;border-radius:50%;overflow:hidden;background:#a78bfa;box-shadow:0 0 22px rgba(167,139,250,.5)}
    .cl-mo i::before{content:'';position:absolute;inset:0;border-radius:50%;background:#0b0b10;animation:cl-mo 3.2s ease-in-out infinite}
    @keyframes cl-mo{0%{transform:translateX(-100%)}25%{transform:translateX(0) scale(.96)}50%{transform:translateX(100%) scale(.6)}75%{transform:translateX(0)}100%{transform:translateX(-100%)}}
  </style><div class="cl-mo"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
