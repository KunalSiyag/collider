export function createLoaderNeonFlicker(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-ne{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-ne b{font:800 30px system-ui,sans-serif;color:#fdf4ff;text-transform:uppercase;letter-spacing:6px;
      text-shadow:0 0 6px #f472b6,0 0 18px #f472b6,0 0 42px #8b5cf6;animation:cl-ne 2.4s steps(1) infinite}
    .cl-ne b em{font-style:normal;color:#ecfeff;text-shadow:0 0 6px #22d3ee,0 0 20px #22d3ee}
    @keyframes cl-ne{0%,100%{opacity:1}7%{opacity:.4}9%{opacity:1}11%{opacity:.6}13%{opacity:1}62%{opacity:1}63%{opacity:.3}64%{opacity:1}}
  </style><div class="cl-ne"><b>Lo<em>AD</em>ing</b></div>`;
  return () => { container.innerHTML = ''; };
}
