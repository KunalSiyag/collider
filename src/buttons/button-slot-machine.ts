export interface SlotMachineOptions {
  label?: string;
}

export function createSlotMachineButton(container: HTMLElement, options: SlotMachineOptions = {}): () => void {
  const { label = 'Spin' } = options;
  const icons = ['🍒', '🍋', '💎', '7️⃣', '⭐'];

  container.innerHTML = `
    <style>
      .cl-sm { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; gap:16px; }
      .cl-sm-window { display:flex; gap:8px; padding:12px 18px; background:#1a1024;
        border:2px solid #8b5cf6; border-radius:14px; box-shadow:inset 0 0 14px rgba(0,0,0,.6); }
      .cl-sm-reel { width:38px; height:44px; display:flex; align-items:center; justify-content:center;
        font-size:26px; background:#0b0b10; border-radius:8px; }
      .cl-sm-btn { padding:13px 30px; font-size:15px; font-weight:800; letter-spacing:.08em;
        text-transform:uppercase; color:#fff; background:linear-gradient(120deg,#f472b6,#8b5cf6);
        border:none; border-radius:10px; cursor:pointer; transition:filter .2s ease, transform .1s ease; }
      .cl-sm-btn:hover { filter:brightness(1.12); }
      .cl-sm-btn:focus-visible { outline:2px solid #f472b6; outline-offset:3px; }
      .cl-sm-btn:active { transform:scale(.95); }
    </style>
    <div class="cl-sm">
      <span class="cl-sm-window" aria-live="polite">
        <span class="cl-sm-reel">${icons[0]}</span><span class="cl-sm-reel">${icons[1]}</span><span class="cl-sm-reel">${icons[2]}</span>
      </span>
      <button type="button" class="cl-sm-btn">${label}</button>
    </div>
  `;

  const reels = Array.from(container.querySelectorAll<HTMLElement>('.cl-sm-reel'));
  const btn = container.querySelector<HTMLButtonElement>('.cl-sm-btn')!;
  let spinning = false;

  function onClick() {
    if (spinning) return;
    spinning = true;
    let ticks = 0;
    const iv = setInterval(() => {
      reels.forEach((r, i) => {
        if (ticks % (i + 2) === 0) r.textContent = icons[Math.floor(Math.random() * icons.length)];
      });
      if (++ticks > 22) {
        clearInterval(iv);
        const win = Math.random() < 0.25;
        reels.forEach((r) => { r.textContent = win ? '💎' : icons[Math.floor(Math.random() * icons.length)]; });
        btn.textContent = win ? 'JACKPOT!' : label;
        setTimeout(() => { btn.textContent = label; spinning = false; }, 1100);
      }
    }, 65);
  }

  btn.addEventListener('click', onClick);

  return () => {
    btn.removeEventListener('click', onClick);
    container.innerHTML = '';
  };
}
