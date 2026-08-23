export interface EffectOptions {
  title?: string;
  price?: string;
}

export function createPricingPopularGlow(container: HTMLElement, options: EffectOptions = {}): () => void {
  const { title = 'Pro', price = '$12/mo' } = options;

  container.innerHTML = `
    <style>
      .cl-ppg { height:100%; display:flex; align-items:center; justify-content:center;
        background:#0b0b10; padding:22px; }
      .cl-ppg-card { position:relative; width:min(100%,300px); padding:30px 26px; border-radius:20px;
        background:#18181b; border:1px solid rgba(139,92,246,0.55);
        box-shadow:0 0 0 1px rgba(139,92,246,0.25), 0 0 34px rgba(139,92,246,0.35), 0 26px 50px rgba(0,0,0,0.5);
        animation:cl-ppg-glow 2.6s ease-in-out infinite alternate; }
      @keyframes cl-ppg-glow {
        from { box-shadow:0 0 0 1px rgba(139,92,246,0.25), 0 0 22px rgba(139,92,246,0.28), 0 26px 50px rgba(0,0,0,0.5); }
        to { box-shadow:0 0 0 1px rgba(139,92,246,0.45), 0 0 52px rgba(34,211,238,0.35), 0 26px 50px rgba(0,0,0,0.5); }
      }
      .cl-ppg-badge { position:absolute; top:-13px; left:50%; transform:translateX(-50%); padding:5px 16px;
        border-radius:999px; font-size:11px; font-weight:700; letter-spacing:0.16em; color:#0b0b10;
        background:linear-gradient(90deg,#a78bfa,#67e8f9); }
      .cl-ppg-card h3 { color:#fafafa; text-align:center; margin-bottom:4px; }
      .cl-ppg-price { text-align:center; font-size:32px; font-weight:800; margin-bottom:16px;
        background:linear-gradient(90deg,#c4b5fd,#67e8f9); -webkit-background-clip:text; background-clip:text;
        color:transparent; }
      .cl-ppg-feat { list-style:none; padding:0; margin:0 0 20px; color:rgba(255,255,255,0.7); font-size:13.5px;
        display:flex; flex-direction:column; gap:8px; }
      .cl-ppg-feat li::before { content:'✓'; color:#4ade80; margin-right:9px; font-weight:700; }
      .cl-ppg-btn { display:block; width:100%; padding:12px; border-radius:12px; border:0; cursor:pointer;
        color:#fff; font-weight:700; font-size:14px; background:linear-gradient(90deg,#8b5cf6,#22d3ee); }
    </style>
    <div class="cl-ppg"><div class="cl-ppg-card">
      <span class="cl-ppg-badge">MOST POPULAR</span>
      <h3>${title}</h3><div class="cl-ppg-price">${price}</div>
      <ul class="cl-ppg-feat"><li>Unlimited effects</li><li>Priority support</li><li>Commercial license</li></ul>
      <button class="cl-ppg-btn" type="button">Choose plan</button>
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
