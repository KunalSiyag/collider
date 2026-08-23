export function createLoaderBalloonBob(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-ba{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-ba i{position:relative;display:block;width:44px;height:54px;border-radius:50% 50% 48% 48%;background:radial-gradient(circle at 32% 28%,#c084fc,#8b5cf6);box-shadow:0 0 20px rgba(139,92,246,.5);animation:cl-ba-bob 2.6s ease-in-out infinite}
    .cl-ba i::before{content:'';position:absolute;left:calc(50% - 4px);bottom:-6px;width:8px;height:7px;background:#6d28d9;clip-path:polygon(50% 0,100% 100%,0 100%)}
    .cl-ba i::after{content:'';position:absolute;left:calc(50% - 1px);top:calc(100% + 1px);width:2px;height:52px;background:repeating-linear-gradient(#a78bfa 0 5px,transparent 5px 9px)}
    @keyframes cl-ba-bob{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-16px) rotate(2deg)}}
  </style><div class="cl-ba"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
