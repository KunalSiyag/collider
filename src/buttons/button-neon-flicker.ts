export interface ButtonOptions {
  label?: string;
}

export function createNeonFlickerButton(container: HTMLElement, options: ButtonOptions = {}): () => void {
  const { label = 'Power on' } = options;
  container.innerHTML = `<style>
    .cl-nf{height:100%;display:flex;align-items:center;justify-content:center;background:#050508}
    .cl-nf-btn{padding:15px 36px;font-size:15px;font-weight:600;letter-spacing:.06em;color:#f0abfc;
      background:transparent;border:2px solid #e879f9;border-radius:12px;cursor:pointer;
      box-shadow:0 0 14px rgba(232,121,249,.55), inset 0 0 12px rgba(232,121,249,.25);
      animation:cl-nf-flicker 4s linear infinite;transition:transform .2s ease}
    .cl-nf-btn:hover{transform:translateY(-2px)}
    @keyframes cl-nf-flicker{
      0%,19%,21%,80%,100%{opacity:1;box-shadow:0 0 14px rgba(232,121,249,.55), inset 0 0 12px rgba(232,121,249,.25)}
      20%{opacity:.5;box-shadow:none}
      81%,84%{opacity:.6;box-shadow:0 0 6px rgba(232,121,249,.3)}
    }
  </style><div class="cl-nf"><button type="button" class="cl-nf-btn">${label}</button></div>`;
  return () => { container.innerHTML = ''; };
}
