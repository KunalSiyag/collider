/** Shuffle Loader — tiles sliding around a 2x2 grid like a shuffle animation. */
export function createLoaderShuffle(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-sh{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .cl-sh .grid{display:grid;grid-template-columns:repeat(2,26px);gap:8px}
    .cl-sh i{width:26px;height:26px;border-radius:7px;background:#8b5cf6;animation:cl-sh 1.6s cubic-bezier(.65,0,.35,1) infinite}
    .cl-sh i:nth-child(2){background:#22d3ee;animation-name:cl-sh2}
    .cl-sh i:nth-child(3){background:#f472b6;animation-name:cl-sh3}
    .cl-sh i:nth-child(4){background:#fbbf24;animation-name:cl-sh4}
    @keyframes cl-sh{0%,100%{transform:translate(0,0)}25%{transform:translate(34px,0)}50%{transform:translate(34px,34px)}75%{transform:translate(0,34px)}}
    @keyframes cl-sh2{0%,100%{transform:translate(0,0)}25%{transform:translate(0,34px)}50%{transform:translate(-34px,34px)}75%{transform:translate(-34px,0)}}
    @keyframes cl-sh3{0%,100%{transform:translate(0,0)}25%{transform:translate(0,-34px)}50%{transform:translate(34px,-34px)}75%{transform:translate(34px,0)}}
    @keyframes cl-sh4{0%,100%{transform:translate(0,0)}25%{transform:translate(-34px,0)}50%{transform:translate(-34px,-34px)}75%{transform:translate(0,-34px)}}
  </style>
  <div class="cl-sh"><div class="grid"><i></i><i></i><i></i><i></i></div></div>`;
  return () => { container.innerHTML = ''; };
}
