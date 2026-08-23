export interface EffectOptions {
  avatars?: string[];
}

export function createAvatarStackFan(container: HTMLElement, options: EffectOptions = {}): () => void {
  const avatars = options.avatars ?? ['KS', 'AM', 'JL', 'TR', 'ZP'];

  container.innerHTML = `
    <style>
      .cl-asf { height:100%; display:flex; align-items:center; justify-content:center; background:#0b0b10; }
      .cl-asf-row { display:flex; padding-left:56px; }
      .cl-asf-av { width:64px; height:64px; border-radius:50%; margin-left:-40px; display:flex; align-items:center;
        justify-content:center; font-weight:700; font-size:16px; color:#0b0b10; border:3px solid #18181b;
        transition:transform .35s cubic-bezier(.34,1.56,.64,1), margin .35s; cursor:pointer; }
      .cl-asf-row:hover .cl-asf-av { margin-left:-14px; }
      .cl-asf-av:hover { transform:translateY(-10px) scale(1.12); z-index:5; }
      .cl-asf-av:nth-child(1){background:#8b5cf6}.cl-asf-av:nth-child(2){background:#a78bfa}
      .cl-asf-av:nth-child(3){background:#22d3ee}.cl-asf-av:nth-child(4){background:#67e8f9}
      .cl-asf-av:nth-child(5){background:#f472b6}
    </style>
    <div class="cl-asf"><div class="cl-asf-row">
      ${avatars.map(a => `<div class="cl-asf-av">${a}</div>`).join('')}
    </div></div>
  `;

  return () => {
    container.innerHTML = '';
  };
}
