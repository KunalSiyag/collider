export function createLoaderGearTurn(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-gr{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;gap:4px}
    .cl-gr svg{display:block}
    .cl-gr .g1{transform-origin:26px 26px;animation:cl-gr 3s linear infinite}
    .cl-gr .g2{transform-origin:78px 78px;animation:cl-gr 3s linear infinite reverse}
    .g1,.g2{fill:none;stroke-width:6}
    .g1{stroke:#8b5cf6}.g2{stroke:#22d3ee}
    @keyframes cl-gr{to{transform:rotate(360deg)}}
  </style><div class="cl-gr">
    <svg width="104" height="104" viewBox="0 0 104 104">
      <circle class="g1" cx="26" cy="26" r="16" stroke-dasharray="7.489 4.993"/>
      <circle class="g2" cx="78" cy="78" r="16" stroke-dasharray="7.489 4.993"/>
      <circle cx="26" cy="26" r="5" fill="#a78bfa"/>
      <circle cx="78" cy="78" r="5" fill="#67e8f9"/>
    </svg>
  </div>`;
  return () => { container.innerHTML = ''; };
}
