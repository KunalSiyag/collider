export function createLoaderRipplePond(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-rp{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;position:relative}
    .cl-rp i{position:absolute;width:20px;height:20px;border-radius:50%;border:3px solid #22d3ee;opacity:0;animation:cl-rp 2.4s cubic-bezier(.2,.5,.4,1) infinite}
    .cl-rp i:nth-child(1){border-color:#8b5cf6}
    .cl-rp i:nth-child(2){animation-delay:.8s;border-color:#22d3ee}
    .cl-rp i:nth-child(3){animation-delay:1.6s;border-color:#f472b6}
    .cl-rp b{position:relative;width:14px;height:14px;border-radius:50%;background:#e0f2fe;box-shadow:0 0 14px rgba(103,232,249,.8)}
    @keyframes cl-rp{0%{transform:scale(1);opacity:.9}100%{transform:scale(6.5);opacity:0}}
  </style><div class="cl-rp"><i></i><i></i><i></i><b></b></div>`;
  return () => { container.innerHTML = ''; };
}
