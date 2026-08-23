export function createLoaderOscilloscope(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-os{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-os svg{width:180px;height:64px;display:block;background:#101018;border-radius:8px;border:1px solid #27272a}
    .cl-os path{fill:none;stroke:#67e8f9;stroke-width:2.4;stroke-linecap:round;stroke-dasharray:360;animation:cl-os-sweep 2.6s linear infinite;filter:drop-shadow(0 0 4px #22d3ee)}
    @keyframes cl-os-sweep{from{stroke-dashoffset:720}to{stroke-dashoffset:0}}
  </style><div class="cl-os">
    <svg viewBox="0 0 180 64">
      <path d="M0 32q7.5-24 15 0t15 0 15 0 15 0 15 0 15 0 15 0 15 0 15 0 15 0 15 0 15 0"/>
    </svg>
  </div>`;
  return () => { container.innerHTML = ''; };
}
