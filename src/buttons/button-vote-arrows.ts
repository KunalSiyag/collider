export interface VoteArrowsOptions {
  label?: string;
}

export function createVoteArrowsButton(container: HTMLElement, options: VoteArrowsOptions = {}): () => void {
  const { label = 'Vote' } = options;

  container.innerHTML = `
    <style>
      .cl-va { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-va-group { display:flex; align-items:center; gap:14px; color:#e4e4e7; font-size:15px; font-weight:700; }
      .cl-va-btn { display:flex; align-items:center; justify-content:center; width:46px; height:42px;
        font-size:18px; color:#a78bfa; background:#16161f; border:1px solid #3f3f46; border-radius:10px;
        cursor:pointer; transition:all .18s ease; }
      .cl-va-btn:hover { background:#201d33; border-color:#8b5cf6; transform:translateY(-1px); }
      .cl-va-btn:focus-visible { outline:2px solid #a78bfa; outline-offset:3px; }
      .cl-va-btn:active { transform:scale(.92); }
      .cl-va-btn[data-on="true"] { background:#8b5cf6; color:#fff; border-color:#a78bfa;
        box-shadow:0 0 16px rgba(139,92,246,.5); }
      .cl-va-down[data-on="true"] { background:#22d3ee; border-color:#67e8f9; color:#0b0b10;
        box-shadow:0 0 16px rgba(34,211,238,.5); }
      .cl-va-count { min-width:36px; text-align:center; }
    </style>
    <div class="cl-va">
      <div class="cl-va-group" role="group" aria-label="${label}">
        <button type="button" class="cl-va-btn cl-va-up" data-on="false" aria-label="Upvote">▲</button>
        <span class="cl-va-count">0</span>
        <button type="button" class="cl-va-btn cl-va-down" data-on="false" aria-label="Downvote">▼</button>
      </div>
    </div>
  `;

  const up = container.querySelector<HTMLButtonElement>('.cl-va-up')!;
  const down = container.querySelector<HTMLButtonElement>('.cl-va-down')!;
  const countEl = container.querySelector<HTMLElement>('.cl-va-count')!;
  let state: -1 | 0 | 1 = 0;

  function render() {
    up.dataset.on = String(state === 1);
    down.dataset.on = String(state === -1);
    countEl.textContent = String(state);
  }

  function onUp() {
    state = state === 1 ? 0 : 1;
    render();
  }

  function onDown() {
    state = state === -1 ? 0 : -1;
    render();
  }

  up.addEventListener('click', onUp);
  down.addEventListener('click', onDown);

  return () => {
    up.removeEventListener('click', onUp);
    down.removeEventListener('click', onDown);
    container.innerHTML = '';
  };
}
