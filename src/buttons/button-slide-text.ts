export interface SlideTextButtonOptions {
  labels?: [string, string];
}

export function createSlideTextButton(container: HTMLElement, options: SlideTextButtonOptions = {}): () => void {
  const { labels = ['Download', '.ZIP · 4.2 MB'] } = options;

  container.innerHTML = `
    <style>
      .cl-st2 { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-st2-btn { position:relative; overflow:hidden; padding:15px 36px; font-size:15px; font-weight:600;
        color:#fafafa; background:#7c3aed; border:none; border-radius:12px; cursor:pointer; height:50px; }
      .cl-st2-row { display:flex; flex-direction:column; transition:transform .32s cubic-bezier(.4,0,.2,1); }
      .cl-st2-btn:hover .cl-st2-row { transform:translateY(-50%); }
      .cl-st2-row span { display:flex; align-items:center; justify-content:center; height:20px; white-space:nowrap; }
      .cl-st2-row span:last-child { color:#ddd6fe; font-size:12.5px; }
    </style>
    <div class="cl-st2">
      <button type="button" class="cl-st2-btn"><span class="cl-st2-row"><span>${labels[0]}</span><span>${labels[1]}</span></span></button>
    </div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
