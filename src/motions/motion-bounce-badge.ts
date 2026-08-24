/** Bounce Badge — notification badge that boings when its count changes. */
export interface BounceBadgeOptions {
  initial?: number;
  incrementEvery?: number;
}

export function createBounceBadge(container: HTMLElement, options: BounceBadgeOptions = {}): () => void {
  const { initial = 3, incrementEvery = 2600 } = options;
  container.innerHTML = `<style>
    .mo-bb{height:100%;display:flex;align-items:center;justify-content:center;background:#0b0b10}
    .mo-bb .bell{position:relative;font-size:34px;filter:grayscale(1) brightness(2)}
    .mo-bb .badge{position:absolute;top:-8px;right:-12px;min-width:24px;height:24px;padding:0 7px;
      display:grid;place-items:center;border-radius:999px;background:#ef4444;color:#fff;
      font:700 12px/1 system-ui;box-shadow:0 2px 8px rgba(239,68,68,.5)}
    .mo-bb .badge.boing{animation:mo-bb .6s cubic-bezier(.34,2,.5,1)}
    @keyframes mo-bb{0%{transform:scale(.3)}55%{transform:scale(1.35)}75%{transform:scale(.9)}100%{transform:scale(1)}}
    .mo-bb .hint{position:absolute;margin-top:110px;color:#71717a;font:400 12.5px system-ui}
  </style>
  <div class="mo-bb">
    <div class="bell">🔔<span class="badge">${initial}</span></div>
    <span class="hint">count updates on its own</span>
  </div>`;

  const badge = container.querySelector<HTMLElement>('.badge')!;
  let count = initial;
  const timer = window.setInterval(() => {
    count += 1;
    badge.textContent = String(count > 99 ? '99+' : count);
    badge.classList.remove('boing');
    void badge.offsetWidth; // restart the animation
    badge.classList.add('boing');
  }, incrementEvery);

  return () => {
    window.clearInterval(timer);
    container.innerHTML = '';
  };
}
