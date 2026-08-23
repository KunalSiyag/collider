export function createLoaderClockHands(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-ch{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-ch i{position:relative;display:block;width:64px;height:64px;border-radius:50%;border:3px solid #a78bfa;box-shadow:0 0 18px rgba(167,139,250,.3)}
    .cl-ch i::before,.cl-ch i::after{content:'';position:absolute;left:50%;bottom:50%;transform-origin:50% 100%;border-radius:2px}
    .cl-ch i::before{width:3px;height:21px;margin-left:-1.5px;background:#67e8f9;animation:cl-ch 1.8s linear infinite}
    .cl-ch i::after{width:3px;height:14px;margin-left:-1.5px;background:#f472b6;animation:cl-ch 10.8s linear infinite}
    @keyframes cl-ch{to{transform:rotate(360deg)}}
  </style><div class="cl-ch"><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
