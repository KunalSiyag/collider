export function createLoaderCheckmarkDraw(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-cm{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-cm svg{display:block}
    .cl-cm circle{fill:none;stroke:#27272a;stroke-width:5}
    .cl-cm .arc{stroke:#22d3ee;stroke-linecap:round;stroke-dasharray:163;stroke-dashoffset:163;animation:cl-cm-arc 1.6s ease-in-out infinite}
    .cl-cm path{fill:none;stroke:#67e8f9;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;
      stroke-dasharray:48;stroke-dashoffset:48;animation:cl-cm-check 1.6s ease-in-out infinite;filter:drop-shadow(0 0 5px #22d3ee)}
    @keyframes cl-cm-arc{40%,80%{stroke-dashoffset:0}100%{stroke-dashoffset:-163}}
    @keyframes cl-cm-check{30%{stroke-dashoffset:48}55%,85%{stroke-dashoffset:0}100%{stroke-dashoffset:96}}
  </style><div class="cl-cm">
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle cx="36" cy="36" r="26"/>
      <circle class="arc" cx="36" cy="36" r="26"/>
      <path d="M24 37l9 9 16-18"/>
    </svg>
  </div>`;
  return () => { container.innerHTML = ''; };
}
