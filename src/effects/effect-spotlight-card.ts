export interface EffectOptions {
  title?: string;
}

export function createSpotlightCard(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'Spotlight follows your cursor' } = options;

  container.innerHTML = `
    <style>
      .cl-sc { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-sc-card { --mx: 50%; --my: 50%; width:min(76%, 320px); padding:34px 26px; border-radius:18px;
        border:1px solid #2c2c33; color:#e4e4e7; font-weight:600; text-align:center;
        position:relative; overflow:hidden; background:#101014; }
      .cl-sc-card::before { content:''; position:absolute; inset:0;
        background: radial-gradient(240px circle at var(--mx) var(--my), rgba(139,92,246,0.28), transparent 65%);
        opacity:0; transition:opacity .3s ease; }
      .cl-sc-card:hover::before { opacity:1; }
    </style>
    <div class="cl-sc"><div class="cl-sc-card">${title}</div></div>
  `;

  const card = container.querySelector<HTMLElement>('.cl-sc-card')!;

  function onMove(event: PointerEvent) {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }

  container.addEventListener('pointermove', onMove);

  return () => {
    container.removeEventListener('pointermove', onMove);
    container.innerHTML = '';
  };
}
