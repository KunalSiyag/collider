export interface EffectOptions {
  title?: string;
  code?: string;
}

export function createTicketNotchCard(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'Collider Conf', code = 'CLX-2026' } = options;

  container.innerHTML = `
    <style>
      .cl-tnc { height:100%; display:flex; align-items:center; justify-content:center;
        background:radial-gradient(circle at 50% 30%, #1b1230, #0b0b10 70%); }
      .cl-tnc-card { position:relative; width:min(84%,340px); border-radius:18px; overflow:hidden;
        background:linear-gradient(140deg,#221a3f,#141024);
        border:1px dashed rgba(167,139,250,0.5);
        transition:transform .35s cubic-bezier(.34,1.4,.64,1), box-shadow .35s; cursor:pointer; }
      .cl-tnc-card:hover { transform:translateY(-8px) rotate(-0.6deg); box-shadow:0 26px 46px rgba(139,92,246,0.28); }
      .cl-tnc-main { padding:24px 26px 18px; }
      .cl-tnc-eyebrow { font-size:10.5px; letter-spacing:0.3em; color:#67e8f9; margin-bottom:6px; }
      .cl-tnc-title { color:#fafafa; font-size:21px; font-weight:800; }
      .cl-tnc-perf { position:absolute; top:0; bottom:0; width:20px; left:calc(100% - 92px); border-left:1.5px dashed rgba(167,139,250,0.4); }
      .cl-tnc-notch { position:absolute; width:26px; height:26px; border-radius:50%; background:#0b0b10; right:79px;
        box-shadow:inset 0 0 6px rgba(0,0,0,0.6); z-index:1; }
      .cl-tnc-stub { display:flex; align-items:center; gap:10px; padding:14px 16px; background:rgba(255,255,255,0.03); }
      .cl-tnc-code { flex:1; text-align:center; font-family:ui-monospace,monospace; letter-spacing:0.22em;
        color:#c4b5fd; font-size:14px; font-weight:700; }
    </style>
    <div class="cl-tnc"><div class="cl-tnc-card">
      <div class="cl-tnc-notch" style="top:-13px"></div>
      <div class="cl-tnc-notch" style="bottom:-13px"></div>
      <div class="cl-tnc-perf"></div>
      <div class="cl-tnc-main">
        <div class="cl-tnc-eyebrow">ADMIT ONE · VIP</div>
        <div class="cl-tnc-title">${title}</div>
        <div style="color:rgba(255,255,255,0.55); font-size:12.5px; margin-top:6px">Row F · Seat 12 · Aug 23</div>
      </div>
      <div class="cl-tnc-stub">
        <span class="cl-tnc-code">${code}</span>
        <span style="font-size:26px">🎫</span>
      </div>
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
