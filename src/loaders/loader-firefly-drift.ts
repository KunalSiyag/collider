export function createLoaderFireflyDrift(container: HTMLElement): () => void {
  container.innerHTML = `<style>
    .cl-fr{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10;position:relative;overflow:hidden}
    .cl-fr i{position:absolute;width:7px;height:7px;border-radius:50%;background:#fde68a;box-shadow:0 0 12px #facc15;animation:cl-fr-glow 1.1s ease-in-out infinite alternate,cl-fr-move 5.5s ease-in-out infinite alternate}
    .cl-fr i:nth-child(1){left:22%;top:36%}
    .cl-fr i:nth-child(2){left:48%;top:58%;animation-delay:.9s,0s;background:#67e8f9;box-shadow:0 0 12px #22d3ee}
    .cl-fr i:nth-child(3){left:66%;top:30%;animation-delay:1.7s,0s;background:#f472b6;box-shadow:0 0 12px #f472b6}
    .cl-fr i:nth-child(4){left:36%;top:66%;animation-delay:2.4s,0s}
    @keyframes cl-fr-glow{from{opacity:.25}to{opacity:1}}
    @keyframes cl-fr-move{from{margin:0}to{margin:-22px 26px 18px -26px}}
  </style><div class="cl-fr"><i></i><i></i><i></i><i></i></div>`;
  return () => { container.innerHTML = ''; };
}
