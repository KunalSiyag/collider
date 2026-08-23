export interface SegmentedControlOptions {
  labels?: string[];
}

export function createSegmentedControl(container: HTMLElement, options: SegmentedControlOptions = {}): () => void {
  const labels = options.labels ?? ['Day', 'Week', 'Month'];

  container.innerHTML = `
    <style>
      .cl-sc { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-sc-track { position:relative; display:flex; padding:5px; background:#18181f; border:1px solid #3f3f46;
        border-radius:999px; }
      .cl-sc-thumb { position:absolute; top:5px; bottom:5px; width:calc((100% - 10px) / ${labels.length});
        left:5px; background:linear-gradient(120deg,#8b5cf6,#22d3ee); border-radius:999px;
        transition:left .28s cubic-bezier(.34,1.56,.64,1); }
      .cl-sc-opt { position:relative; z-index:1; padding:9px 22px; font-size:14px; font-weight:700;
        color:#a1a1aa; background:none; border:none; border-radius:999px; cursor:pointer;
        transition:color .25s ease; white-space:nowrap; }
      .cl-sc-opt:hover { color:#d4d4d8; }
      .cl-sc-opt:focus-visible { outline:2px solid #a78bfa; outline-offset:2px; }
      .cl-sc-opt[aria-selected="true"] { color:#0b0b10; }
    </style>
    <div class="cl-sc">
      <div class="cl-sc-track" role="tablist">
        <span class="cl-sc-thumb"></span>
        ${labels.map((l) => `<button type="button" class="cl-sc-opt" role="tab" aria-selected="false">${l}</button>`).join('')}
      </div>
    </div>
  `;

  const opts = Array.from(container.querySelectorAll<HTMLButtonElement>('.cl-sc-opt'));
  const thumb = container.querySelector<HTMLElement>('.cl-sc-thumb')!;
  let index = 0;

  function select(i: number) {
    index = i;
    opts.forEach((o, j) => o.setAttribute('aria-selected', String(i === j)));
    thumb.style.left = `calc(5px + (100% - 10px) / ${opts.length} * ${i})`;
  }

  function onClick(i: number) {
    return () => select(i);
  }

  opts.forEach((o, i) => {
    o.addEventListener('click', onClick(i));
  });
  select(0);

  return () => {
    opts.forEach((o, i) => o.removeEventListener('click', onClick(i)));
    container.innerHTML = '';
  };
}
